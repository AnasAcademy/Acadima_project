"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoutIcon from "@/assets/Sidebar icons/logout.svg";
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
      className="d-flex align-items-center text-decoration-none"
      style={{ cursor: "pointer" }}
    >
      <LogoutIcon  className="iconSize1 iconcolor" />
      <span className="nav-link hvv text-danger">{t("logout")}</span>
    </div>
  );
}
