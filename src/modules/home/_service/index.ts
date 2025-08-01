import { apiRequest } from '@/shared/api';
import { cookies } from 'next/headers';

export async function getHomeResources(searchParams: Record<string, string>) {
  // Get review targets using the universal API gateway
  const cookieStore = await cookies();
  const companyId =
    cookieStore.get('company_id')?.value || searchParams?.['company_id'];

  const reviewTargets = await apiRequest({
    endpoint: 'v1/review_target/',
    params: {
      page: 1,
      limit: 10,
    },
    useCompanyId: true,
    customCompanyId: companyId,
  });

  return {
    reviewTargets,
  };
}
