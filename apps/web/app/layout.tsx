"use client"
import "@ui/styles/globals.css";
import { ThemeProvider } from "@/Components/theme-provider"
import {RecoilRoot} from 'recoil'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
       </ThemeProvider>
      </body>
    </html>
    </RecoilRoot>
  );
}
