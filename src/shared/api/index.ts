// app/utils/api-gateway.ts
// import { cookies } from 'next/headers';
import { parseCookies } from 'nookies';

interface RequestOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, string | number | boolean>;
  body?: any;
  headers?: Record<string, string>;
  cache?: RequestCache;
  useCompanyId?: boolean;
  customCompanyId?: string;
}

export async function apiRequest<T = any>({
  endpoint,
  method = 'GET',
  params = {},
  body = null,
  headers = {},
  cache = 'no-store',
  useCompanyId = true,
  customCompanyId = '',
}: RequestOptions): Promise<T> {
  let companyId = customCompanyId;
  const { company_id } = parseCookies();
  console.log(company_id);

  if (useCompanyId && !customCompanyId) {
    companyId = company_id || '';

    // if (!companyId) {
    //   throw new Error('company_id cookie not found');
    // }
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (useCompanyId && companyId) {
    requestHeaders.CompanyId = companyId;
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    cache,
  };

  if (method !== 'GET' && body !== null) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), requestOptions);

  console.log(`API request to: ${url.toString()}`);
  console.log(`Status: ${response.status}`);

  // if (!response.ok) {
  //   throw new Error(`API error with status ${response.status}`);
  // }

  return await response.json();
}
