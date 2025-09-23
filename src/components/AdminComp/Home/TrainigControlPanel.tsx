import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Rec from "@/assets/admin/rec.png";

const TrainigControlPanel = () => {
  const tD = useTranslations("DashboardA");




  return (

      <div className="card border-0 shadow-sm d-flex  flex-sm-row  p-2  rounded-3 min-tr-ht  ">
        <div className=" row  g-3 ">

          <div className=" col-12 col-md-5  ">
            <div className="  d-flex  justify-content-start align-items-center ">
              <Image
                src={Rec}
                alt="rec"
                className=" w-100 rounded-2 "
                height={230}
              />
            </div>
          </div>

          <div className={` col-12 col-md-7   `}>
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

  );
};

export default TrainigControlPanel;
