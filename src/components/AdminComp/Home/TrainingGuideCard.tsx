import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import imgbk from "@/assets/admin/imgbk.png";


const TrainingGuideCard = () => {
  const tD = useTranslations("DashboardA");

  return (
    <div className=" mb-lg-0  ">
      <div className="card border-0 shadow-sm overflow-hidden   rounded-3  min-tr-ht">
        <div className="position-relative rounded-2">
          <Image
            src={imgbk}
            alt="Training"
            width={200}
            height={250}
            className="w-100 rounded-2"
            style={{ objectFit: "cover" }}
          />
          <div
            className="position-absolute top-0 end-0 p-4 text-white d-flex flex-column justify-content-between h-100 rounded-2"
            style={{
              background:
                "linear-gradient(0deg, rgba(16, 36, 221, 0.12) 0%, rgba(16, 36, 221, 0.80) 100%)",
              width: "100%",
              height: "100%",
            }}
          >
            <div className="d-flex flex-column w-lg-50">
              <h3 className="text-white fw-bold">{tD("training_dashboard_title")}</h3>
              <h4 className="text-white">{tD("training_dashboard_desc")}</h4>
            </div>
            <Link
              href="#"
              className="text-white fw-semibold text-decoration-none"
              style={{ fontSize: "14px" }}
            >
              {tD("training_dashboard_cta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingGuideCard;
