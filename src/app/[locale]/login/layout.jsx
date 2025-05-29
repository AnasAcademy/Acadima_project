
'use client'
import { usePathname } from "next/navigation";
import { routing } from "../../../i18n/routing";
export default function LoginLayout({ children }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const locale = routing.locales.includes(segments[0])
    ? segments[0]
    : routing.defaultLocale;

  return (
    <html dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
