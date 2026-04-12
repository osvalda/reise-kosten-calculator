import { Metadata } from 'next';
import TravelTableWrapper from '@/components/travels/travel-table-wrapper';
import { fetchActiveUserData } from '@/app/lib/actions';

export const metadata: Metadata = {
  title: 'Travels',
};

export default async function Page() {
  const activeUser = await fetchActiveUserData();

  return <div>
    <p>Travels</p>
    <TravelTableWrapper userId={activeUser?.id} />
  </div>;
}