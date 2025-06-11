  import React from 'react'
  import { useTranslations } from "next-intl";
  import Backg from "@/assets/admin/Backund.png";
  import Image from "next/image";
  export default function CompnamCard() {



      const t = useTranslations("SubMan");

    return (
      <>
        <div className="  text-white position-absolute  w-100  z-0 p-5">
          <h3 className="tit-18-700 text-white"> {t("company_name")} </h3>
          <h3 className="tit-18-700 text-white"> {t("plan_title")} </h3>

          <h3 className="tit-20-700 text-white ">
            {"$"} {t("monthly_price")}
          </h3>

          <div className=" d-flex gap-3 mt-3">
            <div>
              <h3 className="tit-12-400  text-white">{t("end_date")}</h3>
              <h3 className="  Tit-12-700  text-white">11.05.2025</h3>
            </div>
            <div>
              <h3 className="tit-12-400  text-white">{t("end_date")}</h3>
              <h3 className="  Tit-12-700  text-white">11.05.2025</h3>
            </div>
            <div>
              <h3 className="tit-12-400  text-white">{t("employees")}</h3>
              <h3 className="  Tit-12-700  text-white">90 موظف/ة</h3>
            </div>
          </div>
        </div>

        <Image src={Backg} alt="ai" className=" w-100" />
      </>
    );
  }
  