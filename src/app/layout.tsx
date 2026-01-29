import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";
import { Providers } from "@/providers/provider";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth/auth";
import AppLoader from "@/components/hoc/app-loader";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fit app",
  description: "Your Fitnes AI assistance",
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} font-sans antialiased flex flex-col overflow-hidden`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              {children}
              <Footer />
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

