import React from "react";
import { useTranslations } from "next-intl";
import NewTechCard from "@/components/NewTechCard/NewTechCard";
import StartTechCard from "@/components/StartTechCard/StartTechCard";
import TechFilter from "@/components/TechFilter/TechFilter";
import AIChat from "@/components/AIChat/AIChat";
import FrequentlyAskedQues from "@/components/FrequentlyAskedQues/FrequentlyAskedQues";

export default function EmployeeProgress() {
  const t = useTranslations("techSupport");

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
        <div className=" p-lg-4  pt-0">
          <div className="row m-0 p-2 g-3">
            <h2 className="hvvv p-4 pb-0">{t("tech-support")}</h2>
            <div className="row m-0 g-3">
              <div className="col-xl-9 col-lg-12">
                <div className="row g-3">
                  <div className="col-xl-8 col-md-8 ">
                    <NewTechCard />
                  </div>
                  <div className="col-xl-4 col-md-4">
                    <StartTechCard />
                  </div>
                  <div className="col-12">
                    <TechFilter />
                  </div>
                </div>
              </div>

              {/* Right sidebar (bg-danger box) */}
              <div className="col-xl-3">
                <div className=" h-100 ">
                  <AIChat />
                </div>
              </div>
            </div>
            <div className="row g-3 m-0">
              <div className="col-xl-9 col-lg-12 ">
                {/* Table */}
                <div className="bg-primary">dddd</div>
              </div>
              <div className="col-xl-3">
                <div className=" h-100 ">
                  {/* Table */}
                  <FrequentlyAskedQues />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
