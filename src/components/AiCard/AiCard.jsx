import React from "react";
import { useTranslations } from "next-intl";
import HelpIcon from "@/assets/admin/helpIcon.svg";
import bg from "@/assets/admin/AIbg.png";
import Image from "next/image";
import AIChat from "@/components/AIChat/AIChat";

export default function AiCard() {
  const t = useTranslations("techSupport");
  return (
    <>
      <div className=" mt-1  cardbg rounded-4 text-white h-100 position-relative   z-0 ">
        <div className="">
          <Image src={bg} className=" w-100" alt="ai" />
          <h3 className="px-3 position-absolute top-5 text-white d-flex gap-2 align-items-center">
            <HelpIcon className="iconSize2 iconcolor" />
            {t("Your-AI-CAHT-Assistant")}
          </h3>
        </div>
       <AIChat maxHeight="250px" heightClass="h-80"/>       
      </div>
    </>
  );
}
