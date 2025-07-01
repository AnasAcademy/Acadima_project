import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavbarWrapper from "../../components/AdminComp/navbarWrapper/NavbarWrapper";
import NotificationProvider from "@/context/NotificationContext";
import BootstrapClient from "@/components/bootstrapClient/BootstrapClient";
import SideBarWrapper from "@/components/sideBarWrapper/SideBarWrapper";
import SidebarWrapperUser from "@/components/AdminComp/sideBarWrapper/SideBarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lxera",
  description: "Lxera",
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
  console.log(locale);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BootstrapClient />
        <NextIntlClientProvider>
          <NotificationProvider>
            <div className="d-flex vh-100">
              {/* Sidebar – visible on lg and xl only */}
              <div className="d-none d-sm-none d-md-none d-lg-flex d-xl-flex">
                <SidebarWrapperUser />
                <SideBarWrapper />
              </div>

              {/* Main content area */}
              <div className="d-flex flex-column w-100">
                <NavbarWrapper />

                {/* Scrollable content area */}
                <div className="flex-grow-1 overflow-auto">{children}</div>
              </div>
            </div>
          </NotificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
