import { Metadata } from 'next';
import {
} from 'lucide-react'
import CardWrapper from '@/components/dashboard/statistic-cards-wrapper';
import { ChartAreaInteractive } from '@/components/dashboard/chart-wrapper';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-0 pt-0">
      <CardWrapper />
      <ChartAreaInteractive />
    </div>
  );
}