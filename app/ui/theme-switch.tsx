import { useTheme } from 'next-themes'
import { IconButton } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  function switchTheme() {
    if (theme === 'dark') {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <IconButton
			color="gray"
			highContrast
			style={{ margin: 0 }}
			onClick={() =>
				switchTheme()
			}
		>
		{theme === 'dark' ? (
			<SunIcon width="20" height="20" />
		) : (
			<MoonIcon width="20" height="20" />
		)}
		</IconButton>
  )
}

export default ThemeSwitch