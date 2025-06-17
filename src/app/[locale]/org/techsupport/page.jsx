import React from "react";
import { useTranslations } from "next-intl";
import NewTechCard from "@/components/NewTechCard/NewTechCard";
import StartTechCard from "@/components/StartTechCard/StartTechCard";
import AiCard from "@/components/AICard/AICard";
import FrequentlyAskedQues from "@/components/FrequentlyAskedQues/FrequentlyAskedQues";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import ticket from "@/assets/admin/ticket.svg";
import SelectCard from "@/components/SelectCard/SelectCard";

export default function TechSupport() {
  const t = useTranslations("techSupport");

  const TableHead = [
    t("ticket_number"),
    t("subject"),
    t("status"),
    t("last_updated"),
    t("action"),
  ];

  const trainingData = [
    {
      columns: [
        { type: "text", value: "#20321" },
        { type: "text", value: t("problem-signing-in") },
        {
          type: "button",
          value: t("inProgress"),
          icon: false,
          color: "#FFD900",
          width: "70%",
        },
        { type: "text", value: "05 مايو 2025" },
        {
          type: "button",
          value: t("show-details"),
          icon: true,
          textColor: "#216ED7",
          color: "#fff",
          decoration: "underline",
          width: "100%",
        }
      ],
    },
    {
      columns: [
        { type: "text", value: "#20321" },
        { type: "text", value: t("problem-signing-in") },
        {
          type: "button",
          value: t("completed"),
          icon: false,
          color: "#50C1FA",
          width: "70%",
        },
        { type: "text", value: "03 مايو 2025" },
        {
          type: "button",
          value: t("show-details"),
          icon: true,
          textColor: "#216ED7",
          color: "#fff",
          decoration: "underline",
          width: "100%",
        }
      ],
    },
    {
      columns: [
        { type: "text", value: "#20321" },
        { type: "text", value: t("problem-signing-in") },
        {
          type: "button",
          value: t("inProgress"),
          icon: false,
          color: "#FFD900",
          width: "70%",
        },
        { type: "text", value: "05 مايو 2025" },
        {
          type: "button",
          value: t("show-details"),
          icon: true,
          textColor: "#216ED7",
          color: "#fff",
          decoration: "underline",
          width: "100%",
        }
      ],
    }
  ];

 const selectCardData = {
  inputs: [
    {
      title: "",
      type: "select",
      options: ["React", "Next.js", "Laravel"]
    },
    {
      title: "",
      type: "select",
      options: ["Cairo", "Alex"]
    },
    {
      title: "",
      type: "select",
      options: ["Cairo", "Alex"]
    },
    {
      title: "",
      type: "select",
      options: ["on", "off"]
    },{
      title: "",
      type: "search",
    },
  ]
};

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
                    <SelectCard selectCardData={selectCardData} isTechSupport={true}/>
                  </div>
                </div>
              </div>

              {/* Right sidebar (bg-danger box) */}
              <div className="col-xl-3 min-file-ht">
                  <AiCard />
              </div>
            </div>
            <div className="row g-3 m-0">
              <div className="col-xl-9 col-lg-12 ">
                <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
                  button={false}
                  Icon={ticket}
                  viewAllTickets={true}
                />
              </div>
              <div className="col-xl-3">
                <div className=" h-100 ">
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
