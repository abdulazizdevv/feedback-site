// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const companyId = url.searchParams.get('company_id');
  const branchId = url.searchParams.get('branch_id');
  const hasCompanyCookie = request.cookies.has('company_id');

  if (!hasCompanyCookie && companyId) {
    const response = NextResponse.next();
    response.cookies.set('company_id', companyId, {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    if (branchId) {
      response.cookies.set('branch_id', branchId, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      });
    }

    return response;
  }

  return NextResponse.next();
}
