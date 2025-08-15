import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { fetchRevenue } from '@/app/lib/data';
import Example from '@/app/ui/dashboard/charts/revenue-chart';

export default async function RevenueChart() {
  const revenue: Revenue[] = await fetchRevenue();

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <Example revenues={revenue}/>
    </div>
  );
}
