'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';

export default function InitializeSettings() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get('company_id');

  useEffect(() => {
    if (companyId) {
      console.log('company_id found:', companyId);
      setCookie('company_id', companyId, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
  }, [companyId]);

  return null;
}
