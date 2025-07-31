import { fetchStaticData } from '@/app/lib/staticData';
import ClientPage from './ClientPage';

export default async function Home() {
  try {
    const staticData = await fetchStaticData();

    return <ClientPage staticData={staticData} />;
  } catch (error) {
    return <div>Error loading page: {error.message}</div>;
  }
}
