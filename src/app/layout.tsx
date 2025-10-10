import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";
import { Providers } from "@/providers/provider";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth/auth";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fit app",
  description: "Your Fitnes AI assistance",
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
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

