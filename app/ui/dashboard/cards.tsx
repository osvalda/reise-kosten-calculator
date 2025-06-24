import {
  BanknotesIcon,
  ClockIcon,
  ArrowUpIcon, ArrowDownIcon, MinusIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { fetchCardData } from '@/app/lib/data';
import { Flex, Text, Badge, Box, Card } from "@radix-ui/themes";
import { badgePropDefs } from "@radix-ui/themes/dist/esm/components/badge.props.js";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

const directionMap = {
  up: ArrowUpIcon,
  down: ArrowDownIcon,
  neutral: MinusIcon,
};

export default async function CardWrapper() {
  const {
    numberOfTravels,
    // numberOfCustomers,
    // totalPaidInvoices,
    // totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <KpiCard title="Total Travels" value={numberOfTravels} type="invoices" direction='up' diff={5.6}/>
      <KpiCard title="Total Year Revenue" value={"2345 €"} type="collected" direction='down' diff={2.4}/>
      <KpiCard title="Total VisitedCities" value={"22"} type="pending" direction='neutral' diff={0}/>
      <KpiCard title="Total Kilometers" value={"6546 km"} type="collected" direction='up' diff={4.0}/>
    </>
  );
}

export function KpiCard({
  title,
  value,
  type,
  direction,
  diff
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
  direction: 'up' | 'down' | 'neutral';
  diff: number;
}) {
  const Icon = iconMap[type];
  const DirectionIcon = directionMap[direction];
  let badgeColor;

  if (direction=='up') {
    badgeColor = badgePropDefs.color.values[19];
  } else if (direction=='down') {
    badgeColor = badgePropDefs.color.values[8];
  } else {
    badgeColor = badgePropDefs.color.values[4];
  }

  return (
    <Card size="2">
      <Box>
        <Flex gap="2" mb="2" align="center">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <Text size="2" color="gray">
            {title}
          </Text>
          <Badge variant="surface" color={badgeColor} radius="full">
            {DirectionIcon ? <DirectionIcon
              width="12"
              height="12"
              style={{ marginLeft: -2 }} /> : null}
            {diff}%
          </Badge>
        </Flex>
        <Text as="div" mb="2" size="8" weight="bold">
          {value}
        </Text>
      </Box>
    </Card>
  );

}
