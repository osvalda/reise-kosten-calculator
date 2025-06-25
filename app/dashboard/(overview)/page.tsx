import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import CardWrapper from '@/app/ui/dashboard/cards';
import { Suspense } from 'react';
import { RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Text, Heading, Grid } from "@radix-ui/themes";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default function Page() {

  return (
    <main>
			<Heading as="h3" size="6" trim="start" mb="2">
				Dashboard
			</Heading>
			<Text as="p" size="2" mb="6" color="gray">
				Review your travels compared to the month before.
			</Text>

      <Grid columns={{xs: "2", md: "4"}} gap="2">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </Grid>

      <Grid columns="2" gap="2">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
      </Grid>
    </main>
  );
}