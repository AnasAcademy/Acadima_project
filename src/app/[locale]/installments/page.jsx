import React from "react";
import { useTranslations } from "next-intl";
import InstallmentsCard from "@/components/InstallmentsCard/InstallmentsCard";





export default function Installments() {
  const t = useTranslations();
  const info = t.raw("installments");

  return (
    <>
      <div className="   container p-3  mt-5 ">
        <h2 className="hvvv">{info.title}</h2>

        <div className=" d-flex row ">
          <div className=" mt-4 d-flex gap-3 flex-column w-100 ">
            <InstallmentsCard info={info} />
          </div>
        </div>
      </div>
    </>
  );
}
