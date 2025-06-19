import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class">
            <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
              {children}
              {/* <ThemePanel /> */}
            </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
