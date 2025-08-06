  import React from 'react'
  import { useTranslations } from "next-intl";
  import Backg from "@/assets/admin/Backund.png";
  import Image from "next/image";
  export default function CompnamCard({dat}) {

  
  
      const t = useTranslations("SubMan");

    return (
      <>
        <h2 className=" hvvv p-4 pb-0 pt-0"> {t("ref")} </h2>
        <div className=" col-xl-4 ">
          <div className="  position-relative ">
            <div className="  text-white position-absolute  z-0    p-5   ">
              <h3 className="tit-18-700 text-white"> {t("company_name")} </h3>
              <h3 className="tit-18-700 text-white">
                {" "}
                {dat.plans[1].name_ar}{" "}
              </h3>

              <h3 className="tit-20-700 text-white ">
                {"$"} {dat.plans[1].price}.00
              </h3>

              <div className=" d-flex gap-4 mt-3 ">
                <div>
                  <h3 className="tit-12-400  text-white">
                    {t("subscription_date")}
                  </h3>
                  <h3 className="  Tit-12-700  text-white">
                    {dat.plans[1].start_date}
                  </h3>
                </div>
                <div>
                  <h3 className="tit-12-400  text-white">{t("end_date")}</h3>
                  <h3 className="  Tit-12-700  text-white">
                    {dat.plans[1].end_date}
                  </h3>
                </div>
                <div>
                  <h3 className="tit-12-400  text-white text-nowrap">
                    {t("employees")}
                  </h3>
                  <h3 className="  Tit-12-700  text-white text-nowrap">
                    {dat.plans[1].max_users}
                  </h3>
                </div>
              </div>
            </div>

            <Image src={Backg} alt="ai" className=" w-100" height={294} />
          </div>
        </div>
      </>
    );
  }
  