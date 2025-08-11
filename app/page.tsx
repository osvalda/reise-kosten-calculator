import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button, Tooltip, Text, Flex} from "@radix-ui/themes";
import "./landing.css"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">

      <div className="flex items-center bb-black p-4 justify-between">
        <AcmeLogo />
        <AcmeLogo />
      </div>
      {/* <Flex className="items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"> */}
      <Flex className="hero-container">
        <Flex className="hero-content flex-col">
          <Text className="text-3xl font-bold md:text-4xl">
            Welcome to the Dashboard
          </Text>
          <Text className="mt-4 text-lg">
            Your one-stop solution for managing your projects efficiently.
          </Text>
          <Link href="/login" className='pt-5'>
            <Button>Log in<ArrowRightIcon className="w-5 md:w-6" /></Button>
          </Link>
        </Flex>
      </Flex>

      <div className="flex bg-gray-100 p-6 md:p-12 justify-center items-center">
        <Text className="text-center text-sm text-gray-600">
          Made by osvalda.
        </Text>
      </div>
    </main>
  );
}
