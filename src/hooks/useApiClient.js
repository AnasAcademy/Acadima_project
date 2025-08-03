// hooks/useApiClient.js
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getTokenFromCookie = () => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/auth_token=([^;]+)/);
  return match ? match[1] : null;
};

export const useApiClient = () => {
  const token = getTokenFromCookie();

  const request = async ({ method = 'GET', urlPath, body = null }) => {
    try {

        console.log("token" ,token)
      const res = await fetch(`${BASE_URL}${urlPath}`, {
        method,
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
        ...(body && { body: JSON.stringify(body) }),
      });
  
      const data = await res.json();
       console.log(data)
      if (!res.ok) throw new Error(data.message || 'API request failed');

      return data;
    } catch (err) {
      console.error(`${method} ${urlPath} error:`, err);
      throw err;
    }
  };

  return { request };
};
