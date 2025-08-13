import AnlageProLogo from '@/app/ui/anlage-pro-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button, Text, Flex} from "@radix-ui/themes";
import "./landing.css"

export default function Page() {
  return (
    <main className="flex main flex-col">

      <div className="flex items-center header p-4 justify-between">
        <AnlageProLogo />
        <div>
          <Link href="/login">
            <Button variant='surface' color='gray' style={{cursor:"pointer"}}>Log in<ArrowRightIcon className="w-5 md:w-6" /></Button>
          </Link>
        </div>
      </div>

      <Flex className="hero-container">
        <Flex className="hero-content flex-col">
          <Text className="text-3xl font-bold md:text-4xl">
            Welcome to Anlage Pro
          </Text>
          <Text className="mt-4 text-lg">
            Your one-stop solution for managing your travel and tax efficiently.
          </Text>
        </Flex>
      </Flex>

      <div className="flex footer md:p-6 justify-center items-center">
        <Text className="text-center text-sm">
          Made by osvalda.
        </Text>
      </div>

    </main>
  );
}
