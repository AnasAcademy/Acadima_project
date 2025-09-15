import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Rec from "@/assets/admin/rec.png";

const TrainigControlPanel = () => {
  const tD = useTranslations("DashboardA");




  return (
    <div className="    ">
      <div className="card border-0 shadow-sm d-flex flex-sm-row   rounded-3 min-tr-ht ">
        <div className=" row d-flex  m-2 ">
          <div className=" col-5 ">
            <div className="  d-flex  justify-content-start ">
              <Image src={Rec} alt="rec" className=" w-100 rounded-2 " height={230} />
            </div>
          </div>

          <div className={` col-7   `}>
            <h3 className="fw-bold mb-2">{tD("training_system_title")}</h3>
            <h6 className="mb-2 fw-nornal">{tD("training_system_desc")}</h6>
            <Link
              href="#"
              className="textcolor fw-semibold text-decoration-none"
            >
              {tD("training_system_cta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainigControlPanel;
