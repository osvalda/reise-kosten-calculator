import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | AnlagePro',
    default: 'AnlagePro Dashboard',
  },
  description: 'Travel cost collector and calculator app',
  metadataBase: new URL('https://something.com/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class">
          <Theme accentColor="plum" radius="small">
            {children}
            {/* <ThemePanel /> */}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
