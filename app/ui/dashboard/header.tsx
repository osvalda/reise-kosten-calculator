'use client'

import { Flex, Text } from "@radix-ui/themes";
import ThemeSwitch from '../theme-switch';
import { User } from "@/app/lib/definitions";

export default function Header({ userName }: { userName: string|undefined }) {

  return (
    <Flex direction={{xs: "row", xl: "row"}} justify={'between'} gap="3" width="100%"  id='header' p={"2"} align="center">
        <Text>GeldBlick: {userName}</Text>
        <ThemeSwitch></ThemeSwitch>
    </Flex>
  );
}