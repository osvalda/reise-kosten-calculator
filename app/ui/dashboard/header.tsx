'use client'

import { Flex } from "@radix-ui/themes";
import ThemeSwitch from '../theme-switch';

export default function Header() {
  return (
    <Flex direction={{xs: "row", xl: "row"}} justify={'end'} gap="3" width="100%"  id='header' p={"2"}>
        <ThemeSwitch></ThemeSwitch>
    </Flex>
  );
}
