import { fetchUserPreferences } from '@/app/lib/data';
import { Flex, DataList, Badge, Heading, Code, Link, Separator } from "@radix-ui/themes";
import { Metadata } from 'next';
import { fetchActiveUserData } from '@/app/lib/actions';

export const metadata: Metadata = {
  title: 'Preferences',
};

export default async function Page() {
  const activeUser = await fetchActiveUserData();
  const id = activeUser?.id;
  const userPreferences = await fetchUserPreferences(id? id : "");

  return <div><Heading>Preferences Page</Heading>
    <Separator my="3" size="4" />
    <DataList.Root>
	<DataList.Item align="center">
		<DataList.Label minWidth="88px">Status</DataList.Label>
		<DataList.Value>
			<Badge color="jade" variant="soft" radius="full">
				{activeUser?.role}
			</Badge>
		</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">ID</DataList.Label>
		<DataList.Value>
			<Flex align="center" gap="2">
				<Code variant="ghost">{userPreferences[0].id}</Code>
			</Flex>
		</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">User_ID</DataList.Label>
		<DataList.Value>
			<Flex align="center" gap="2">
				<Code variant="ghost">{userPreferences[0].user_id}</Code>
			</Flex>
		</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">Name</DataList.Label>
		<DataList.Value>{activeUser?.name}</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">Currency</DataList.Label>
		<DataList.Value>{userPreferences[0].currency}</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">Daily Fee</DataList.Label>
		<DataList.Value>{userPreferences[0].daily_fee}</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">Home Base</DataList.Label>
		<DataList.Value>{userPreferences[0].home_base}</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">Language</DataList.Label>
		<DataList.Value>{userPreferences[0].language}</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">Routing Rule</DataList.Label>
		<DataList.Value>{userPreferences[0].rounding_rule}</DataList.Value>
	</DataList.Item>
	<DataList.Item>
		<DataList.Label minWidth="88px">Email</DataList.Label>
		<DataList.Value>
			<Link href={activeUser?.email}>{activeUser?.email}</Link>
		</DataList.Value>
	</DataList.Item>
</DataList.Root>
  </div>;
}