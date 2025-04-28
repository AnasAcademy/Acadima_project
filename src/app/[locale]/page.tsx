import Image from "next/image";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Sidebar from "@/components/sidebar/sidebarr/Sidebar";
import Navbar from "@/components/sidebar/navbar/Navbar";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");

  return <></>;
}
