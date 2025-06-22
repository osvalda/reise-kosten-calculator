import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '@/app/ui/dashboard/header';
import { Flex } from "@radix-ui/themes";
import { fetchActiveUserData } from '@/app/lib/actions';

export default async function Layout({ children }: { children: React.ReactNode }) {

  const activeUser = await fetchActiveUserData();

  return (
  <div className='flex flex-col h-screen' >
    <Header userName={activeUser?.name}/>
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Flex >
        <SideNav />
      </Flex>
      <Flex width={{md: "16rem"}} flexGrow={"1"} p={{xl:"6", md:"12"}} overflowY={'auto'} justify={'start'}>
        {children}
      </Flex>
    </div>
   </div>
  );
}