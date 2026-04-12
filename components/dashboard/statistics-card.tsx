import type { ReactNode } from 'react'
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    TrendingUpIcon,
    TrendingDownIcon
} from 'lucide-react'

type StatisticsCardProps = {
    icon: ReactNode
    value: string
    title: string
    changePercentage: string
    isUpwardTrend?: boolean
    footerText?: string
    footerDescription?: string
}

const StatisticsCard = ({ icon, value, title, changePercentage, isUpwardTrend, footerText, footerDescription }: StatisticsCardProps) => {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription className='flex items-center gap-2'>{icon}{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {value}
                </CardTitle>
                <CardAction>
                    <Badge variant="outline">
                        {isUpwardTrend ? <TrendingUpIcon className="size-4" /> : <TrendingDownIcon className="size-4" />}
                        {changePercentage}
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {footerText}
                </div>
                <div className="text-muted-foreground">
                    {footerDescription}
                </div>
            </CardFooter>
        </Card>
    )
}

export default StatisticsCard