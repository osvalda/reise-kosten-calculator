import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Tooltip, Text, Flex} from "@radix-ui/themes";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex h-20 shrink-0 items-end bg-blue-800 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <Link href="/login">
            <Button>Log in<ArrowRightIcon className="w-5 md:w-6" /></Button>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        <Image
          src="/hero-desktop.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/hero-mobile.png"
          width={560}
          height={620}
          className="block md:hidden"
          alt="Screenshot of the dashboard project showing mobile version"
        />
        </div>
      </div>
    </main>
  );
}
