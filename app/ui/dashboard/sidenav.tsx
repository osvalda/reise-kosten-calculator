import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Button, Tooltip, Flex, Text } from "@radix-ui/themes";
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2" id="sideNav">
      <Flex direction={{md: "row", xl: "column"}} justify={'between'} gap="3" width="100%" flexGrow="1">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
          <Button id='navBtn' variant='outline'>
            <Flex direction={"row"} justify={'start'} width="100%" align={"center"} gap="2">
              <PowerIcon className="w-6" />
              <Text className="hidden md:block">Sign Out</Text>
            </Flex>
          </Button>
        </form>
      </Flex>
    </div>
  );
}
