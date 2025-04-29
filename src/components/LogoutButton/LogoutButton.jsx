"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logout from "@/assets/Sidebar icons/logout.svg";
import { useTranslations } from "next-intl";

export default function LogoutButton() {
  const router = useRouter();
  const t = useTranslations("Sidebar");

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div
      onClick={handleLogout}
      className="d-flex align-items-center gap-2 text-decoration-none"
      style={{ cursor: "pointer" }}
    >
      <Image src={logout} alt="Logout" width={24} height={24} />
      <span className="nav-link hvv text-danger">{t("logout")}</span>
    </div>
  );
}
