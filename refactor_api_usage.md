# Refactor API Requests Across Project

## Goal
Standardize all API requests in the project:

- In **all client components**, replace any `fetch(...)` calls or other custom request code with `useApiClient().request(...)` so all calls go through our `/api/proxy` route.
- In **all server components**, get the `auth_token` from `cookies()` and `company_name` from `process.env.company_name` dynamically.
- Do **NOT** change `.env` variable names or values.

---

## Environment Variables
These are already set — do not rename or modify them:
```
company_name=vodafone
NEXT_PUBLIC_API_BASE_URL=https://api.lxera.net/api/development/organization/${company_name}
NEXT_PUBLIC_API_Login_URL=https://api.lxera.net/api/development/login
NEXT_PUBLIC_API_KEY=1234
```

---

## Client Component Changes

### 1. Import Hook
At the top of **every client component** that makes API calls:
```js
import { useApiClient } from "@/hooks/useApiClient";
```

### 2. Initialize Request
Inside the component:
```js
const { request } = useApiClient();
```

### 3. Replace API Calls

#### GET with query params
**Before:**
```js
const res = await fetch(`https://api.lxera.net/api/development/organization/vodafone/students/all?page=${page}`, { method: "GET" });
const json = await res.json();
```
**After:**
```js
const json = await request({
  method: "GET",
  urlPath: "/students/all",
  query: { page },
});
```

#### POST
**Before:**
```js
await fetch(`https://api.lxera.net/api/development/organization/vodafone/students`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(apiData),
});
```
**After:**
```js
await request({
  method: "POST",
  urlPath: "/students",
  body: apiData,
});
```

#### PUT
**Before:**
```js
await fetch(`https://api.lxera.net/api/development/organization/vodafone/students/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(apiData),
});
```
**After:**
```js
await request({
  method: "PUT",
  urlPath: `/students/${id}`,
  body: apiData,
});
```

#### DELETE
**Before:**
```js
await fetch(`https://api.lxera.net/api/development/organization/vodafone/students/${id}`, {
  method: "DELETE",
});
```
**After:**
```js
await request({
  method: "DELETE",
  urlPath: `/students/${id}`,
});
```

#### File Export (Excel)
**Before:**
```js
<button onClick={() => fetch('https://api.lxera.net/.../students/excelAll')}>Excel</button>
```
**After:**
```js
<ExcelDownload
  endpoint="/api/proxy/students/excelAll"
  filename="all_students_report"
/>
```

---

## Server Component Changes

### 1. Get Token and Company Name Dynamically
At the top:
```js
import { cookies } from "next/headers";
```

Inside your async function:
```js
const cookieStore = cookies();
const token = cookieStore.get("auth_token")?.value ?? null;
const companyName = process.env.company_name;
```

### 2. Build Headers Dynamically
```js
const headers = {
  "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "1234",
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};
```

### 3. Use in Fetch Calls
**Before:**
```js
const res = await fetch(
  `https://api.lxera.net/api/development/organization/vodafone/students/all?page=1`,
  { method: "GET", headers: { "x-api-key": "1234" } }
);
```
**After:**
```js
const res = await fetch(
  `https://api.lxera.net/api/development/organization/${companyName}/students/all?page=1`,
  { method: "GET", headers, cache: "no-store" }
);
```

---

## Proxy Route Reference
Ensure the proxy route exists at:  
`/app/api/proxy/[...path]/route.js`

```js
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(req, { params })  { return proxyRequest(req, "GET", params); }
export async function POST(req, { params }) { return proxyRequest(req, "POST", params); }
export async function PUT(req, { params })  { return proxyRequest(req, "PUT", params); }
export async function DELETE(req, { params }) { return proxyRequest(req, "DELETE", params); }

async function proxyRequest(req, method, params) {
  const urlObj = new URL(req.url);
  const token = req.cookies?.get?.("auth_token")?.value;
  const url = `${BASE_URL}/${params.path.join("/")}${urlObj.search ? urlObj.search : ""}`;
  const body = ["POST", "PUT"].includes(method) ? await req.text() : undefined;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY || "",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body,
    cache: "no-store",
  });

  const raw = await res.text();
  return new NextResponse(raw, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}
```

---

## Rules for Copilot
- Initialize `const { request } = useApiClient();` in all **client components** that make API calls.
- Replace all API calls with `request({ ... })` as shown in examples.
- In **server components**, always get the token from `cookies()` and company name from env.
- Do not touch unrelated code, styling, translations, or markup.
- No hardcoded JWTs or company names anywhere.
- Keep pagination, filters, and file downloads functioning exactly the same.

---

## Expected Result
- All client components use the `useApiClient` hook for API calls.
- All server components get `token` from cookies and `companyName` from env dynamically.
- Proxy route handles all upstream calls with correct headers.
- No `"request is not defined"` errors.
