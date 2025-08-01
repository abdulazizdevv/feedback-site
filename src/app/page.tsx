import { getHomeResources } from '@/modules/home/_service';
import { Home } from '@/modules/home/_ui';
export interface PageProps {
  searchParams: Record<string, string>;
  params: Record<string, string>;
}
export default async function Page({
  searchParams,
  params: { locale },
}: PageProps) {
  const response = await getHomeResources(searchParams);

  return (
    <>
      <Home data={response} />
    </>
  );
}
