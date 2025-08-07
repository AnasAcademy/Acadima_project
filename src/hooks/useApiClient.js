

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getTokenFromCookie = () => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/auth_token=([^;]+)/);
  return match ? match[1] : null;
};

export const useApiClient = () => {
  const token = getTokenFromCookie();
  console.log("API Token:", token);
  const request = async ({ method = 'GET', urlPath, body = null }) => {
    try {
      const headers = {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch(`${BASE_URL}${urlPath}`, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'API request failed');

      return data;
    } catch (err) {
      console.error(`${method} ${urlPath} error:`, err);
      throw err;
    }
  };

  return { request };
};