import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavbarWrapper from "@/components/navbarWrapper/NavbarWrapper";
import SideBarWrapper from "@/components/sideBarWrapper/SideBarWrapper";
import NotificationProvider from "@/context/NotificationContext";
import BootstrapClient from '@/components/bootstrapClient/BootstrapClient'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acadima",
  description: "Acadima",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; segments?: string[] }; // add segments if your config allows it
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BootstrapClient/>
        <NextIntlClientProvider>
          <NotificationProvider>
            <NavbarWrapper />
            <div className="d-flex">
              <div className="d-none d-sm-none d-md-none d-lg-flex d-xl-flex">
                <SideBarWrapper />
              </div>
              {children}
            </div>
          </NotificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
