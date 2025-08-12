const BASE_URL = '/api/proxy'; // local proxy

export const useApiClient = () => {
  const request = async ({ method = 'GET', urlPath, body = null, query = {} }) => {
    const headers = { 'Content-Type': 'application/json' };
    const queryString = new URLSearchParams(query).toString();
    const url = `${BASE_URL}${urlPath}${queryString ? `?${queryString}` : ''}`;

    // console.log('--- useApiClient Debug ---');
    // console.log('Method:', method);
    // console.log('Final URL:', url);
    // if (body) console.log('Request Body:', body);

    const res = await fetch(url, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      const text = await res.text();
      console.error('Non-JSON response from API:', text);
      throw new Error(`Invalid JSON: ${text}`);
    }

    // console.log('Response Status:', res.status);
    // console.log('Response Data:', data);

    if (!res.ok) throw new Error(data.message || 'API Error');
    return data;
  };

  return { request };
};