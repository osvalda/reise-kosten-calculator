import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Select } from "@radix-ui/themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Select.Root defaultValue={theme} onValueChange={setTheme}>
        <Select.Trigger/>
        <Select.Content >
            <Select.Item value="system">System</Select.Item>
            <Select.Item value="dark">Dark</Select.Item>
            <Select.Item value="light">Light</Select.Item>
        </Select.Content>
    </Select.Root>
  )
}

export default ThemeSwitch