import type { Metadata } from "next";
import {ThemeProvider} from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import { SessionProvider } from "next-auth/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Protected Notes",
  description: "Application to store notes securely , Also could be used as single entry system accounting.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider> 
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              themes={["light", "dark"]}
              storageKey="theme"
            >
                {children}
                <Toaster expand={true} visibleToasts={9} duration={10000}/>
            </ThemeProvider>


        </SessionProvider>
      </body>
    </html>
  );
}
