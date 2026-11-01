import { Metadata } from 'next';
import {
} from 'lucide-react'
import CardWrapper from '@/components/dashboard/statistic-cards-wrapper';
import { ChartAreaInteractive } from '@/components/dashboard/chart-wrapper';
import { fetchActiveUserData } from '@/app/lib/actions';
import { User } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {

  const activeUser: User = await fetchActiveUserData();

  return (
    <div className="flex flex-1 flex-col gap-4 p-0 pt-0">
      <CardWrapper userId={activeUser?.id} />
      <ChartAreaInteractive />
    </div>
  );
}