import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const dynamic = 'force-dynamic';

export async function GET(request, context) {
  const { params } = await context; // ✅ fix
  return proxyRequest(request, 'GET', params);
}

export async function POST(request, context) {
  const { params } = await context;
  return proxyRequest(request, 'POST', params);
}

export async function PUT(request, context) {
  const { params } = await context;
  return proxyRequest(request, 'PUT', params);
}

export async function DELETE(request, context) {
  const { params } = await context;
  return proxyRequest(request, 'DELETE', params);
}

async function proxyRequest(req, method, params) {
  const token = req.cookies.get('auth_token')?.value;
  const query = req.nextUrl.searchParams;
  const url = `${BASE_URL}/${params.path.join('/')}${query.toString() ? `?${query.toString()}` : ''}`;

  const body = ['POST', 'PUT'].includes(method) ? await req.text() : undefined;

  console.log('--- Proxy Debug ---');
  console.log('Incoming request method:', method);
  console.log('Backend URL:', url);
  console.log('Token from cookie:', token ? '[Present]' : '[Missing]');
  if (body) console.log('Request Body:', body);

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY || '',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body,
    cache: 'no-store',
  });

  const rawResponse = await res.text();
  console.log('Backend Response Status:', res.status);
  console.log('Backend Raw Response:', rawResponse);

  return new NextResponse(rawResponse, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'application/json',
    },
  });
}