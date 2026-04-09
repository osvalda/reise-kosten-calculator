import { Metadata } from 'next';
import StatisticsCard from '@/components/dashboard/statistics-card';
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from '@/components/ui/card';
import {
  CalendarX2Icon,
  TriangleAlertIcon,
  TruckIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Dashboard',
};

// Statistics card data
const StatisticsCardData = [
  {
    icon: <TruckIcon className='size-4' />,
    value: '42',
    title: 'Shipped Orders',
    changePercentage: '+18.2%'
  },
  {
    icon: <TriangleAlertIcon className='size-4' />,
    value: '8',
    title: 'Damaged Returns',
    changePercentage: '-8.7%'
  },
  {
    icon: <CalendarX2Icon className='size-4' />,
    value: '27',
    title: 'Missed Delivery Slots',
    changePercentage: '+4.3%'
  }
]

export default function Page() {

  return (
    <section className='mx-auto size-full  flex-1 px-4 py-6 sm:px-6'>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

        <div className='col-span-full grid gap-6 sm:grid-cols-4 md:max-lg:grid-cols-1'>
          {StatisticsCardData.map((card, index) => (
            <StatisticsCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              changePercentage={card.changePercentage}
            />
          ))}

        <Card className="@container/card">
          <CardHeader>
            <CardDescription className='flex items-center gap-2'><TruckIcon/>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUpIcon />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        </div>

        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div> */}
      </div>
    </section>
  );
}