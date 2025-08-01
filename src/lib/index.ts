// lib/company.ts
export const saveCompanyIdToSession = () => {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const companyId = params.get('company_id');
  if (companyId) {
    sessionStorage.setItem('company_id', companyId);
  }
};

export const getCompanyIdFromSession = () => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('company_id');
};
