import { fetchCardData } from '@/app/lib/data';
import StatisticsCard from '@/components/dashboard/statistics-card';
import {
    TruckIcon,
    HandCoinsIcon,
    ClipboardClockIcon
} from 'lucide-react';
import {formatCurrency} from '@/app/lib/utils';

export default async function CardWrapper() {
    const {
        numberOfTravels,
        roundedDuration,
        totalEarnings
    } = await fetchCardData();

    return (
        <div className='col-span-full grid gap-6 sm:grid-cols-4 md:max-lg:grid-cols-1'>

            <StatisticsCard
                key={numberOfTravels}
                icon={<TruckIcon className='size-4' />}
                title={numberOfTravels > 1 ? 'Travels' : 'Travel'}
                value={numberOfTravels.toString()}
                isUpwardTrend={numberOfTravels.toString().startsWith('+')}
                changePercentage={numberOfTravels.toString()}
                footerText='Trending up this month'
                footerDescription='Travels for the last 12 months'
            />
            <StatisticsCard
                key={totalEarnings}
                icon={<HandCoinsIcon className='size-4' />}
                title={'Total revenue'}
                value={formatCurrency(totalEarnings, 'de-DE', 'EUR')}
                isUpwardTrend={totalEarnings.toString().startsWith('+')}
                changePercentage={totalEarnings.toString()}
                footerText='Trending up this month'
                footerDescription='Total brutto revenue for the last 12 months'
            />
            <StatisticsCard
                key={roundedDuration}
                icon={<ClipboardClockIcon className='size-4' />}
                title={'Total Rounded Duration'}
                value={(roundedDuration/60) + ' h' || '0 h'}
                isUpwardTrend={roundedDuration.toString().startsWith('+')}
                changePercentage={roundedDuration.toString()}
                footerText='Trending up this month'
                footerDescription='Spent hours for the last 12 months'
            />
            <StatisticsCard
                key={444}
                icon={<TruckIcon className='size-4' />}
                title={roundedDuration > 1 ? 'Rounded Duration' : 'Rounded Duration'}
                value={roundedDuration.toString()}
                isUpwardTrend={roundedDuration.toString().startsWith('+')}
                changePercentage={roundedDuration.toString()}
                footerText='Trending up this month'
                footerDescription='Spent hours for the last 12 months'
            />

        </div>
    );
}