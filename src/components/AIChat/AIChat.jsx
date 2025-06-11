import React from "react";
import { useTranslations } from "next-intl";
import HelpIcon from "@/assets/admin/helpIcon.svg";
import bg from "@/assets/admin/AIbg.png";
import Image from "next/image";
import Send from "@/assets/admin/send.svg";

export default function FilterCard() {
  const t = useTranslations("techSupport");
  return (
    <>
      <div className=" mt-1  cardbg text-white h-100 position-relative   z-0 ">
        <div className="">
          <Image src={bg} className=" w-100" alt="ai"/>
          <h3 className="px-3 position-absolute top-5 text-white d-flex gap-2 align-items-center">
            <HelpIcon className="iconSize2 iconcolor" />
            {t("Your-AI-CAHT-Assistant")}
          </h3>
        </div>
        <div className="d-flex flex-column justify-content-between h-80">
          <div className="chat-body p-3 d-flex flex-column gap-2 position-relative">
            <div className="user-message align-self-start">
              <span className="bubble user-bubble">.............</span>
            </div>

            <div className="align-self-end">
              <div className="ai-meta d-flex align-items-center justify-content-end gap-1">
                <small className="text-muted">AI NAME</small>
                <HelpIcon className="iconSize2 iconcolor" />
              </div>
              <div className="ai-message align-self-end position-relative">
                <span className="bubble ai-bubble">.............</span>
              </div>
            </div>
          </div>

          {/* Chat input */}
          <div className="chat-input p-3 d-flex align-items-center gap-2 pb-xl-0 pb-4">
            <Send width={28} />

            <input
              type="text"
              className="form-control rounded-4 px-3 bg-body-tertiary"
              placeholder={t("send-placeholder")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
