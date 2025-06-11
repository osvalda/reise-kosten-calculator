'use client';

import {
  UserGroupIcon,
  HomeIcon,
  MapIcon,
  MapPinIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Button, Tooltip, Text} from "@radix-ui/themes";
import ThemeSwitch from '../theme-switch';


const links = [
  { name: 'Home',
    href: '/dashboard',
    icon: HomeIcon
  },
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: 'Customers',
  //   href: '/dashboard/customers',
  //   icon: UserGroupIcon
  // },
  { name: 'Travels',
    href: '/dashboard/travels',
    icon: MapIcon
  },
  { name: 'Locations',
    href: '/dashboard/locations',
    icon: MapPinIcon
  },
  { name: 'Prefferences',
    href: '/dashboard/prefferences',
    icon: Cog6ToothIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name} href={link.href}>
            <Button id='navBtn' variant={pathname === link.href ? "surface" : "solid"}>
              <LinkIcon className="w-6" />
              <Text className="hidden md:block">{link.name}</Text>
            </Button>
          </Link>
        );
      })}
      <ThemeSwitch></ThemeSwitch>
    </>
  );
}
