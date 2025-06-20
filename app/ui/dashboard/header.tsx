'use client'

import { Flex, Text } from "@radix-ui/themes";
import ThemeSwitch from '../theme-switch';

export default function Header() {
  return (
    <Flex direction={{xs: "row", xl: "row"}} justify={'between'} gap="3" width="100%"  id='header' p={"2"} align="center">
        <Text>GeldBlick</Text>
        <ThemeSwitch></ThemeSwitch>
    </Flex>
  );
}