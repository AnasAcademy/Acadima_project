import React from "react";
import { getTranslations } from "next-intl/server";
import NewTechCard from "@/components/NewTechCard/NewTechCard";
import StartTechCard from "@/components/StartTechCard/StartTechCard";
import AiCard from "@/components/AICard/AICard";
import FrequentlyAskedQues from "@/components/FrequentlyAskedQues/FrequentlyAskedQues";
import PastticketComp from "@/components/PastticketComp/PastticketComp";

export default async function TechSupport() {
  const t = await getTranslations("techSupport");

  let dataa = { supports: [] };
  let qestions = [];

  try {
    const res = await fetch(
      "https://api.lxera.net/api/development/organization/vodafone/supports",
      {
        method: "GET",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
      }
    );
    const respond = await res.json();
    dataa = respond;
  } catch (error) {
    console.error("Error fetching supports:", error);
  }

  try {
    const res = await fetch(
      "https://api.lxera.net/api/development/organization/vodafone/supports-questions",
      {
        method: "GET",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
      }
    );
    const respond = await res.json();
    qestions = respond;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }

  const TableHead = [
    t("ticket_number"),
    t("subject"),
    t("status"),
    t("last_updated"),
    t("action"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: "",
        type: "select",
        options: ["React", "Next.js", "Laravel"],
      },
      {
        title: "",
        type: "select",
        options: ["open", "close"],
      },
      {
        title: "",
        type: "select",
        options: ["Cairo", "Alex"],
      },
      {
        title: "",
        type: "select",
        options: ["on", "off"],
      },
      {
        title: "",
        type: "search",
      },
    ],
  };

  return (
    <div className="m-0 container-fluid p-0 d-flex flex-column">
      <div className="p-4">
        <h2 className="hvvv py-3">{t("tech-support")}</h2>

        <div className="row g-3">
          <div className="col-xl-8 col-12">
            <div className="row g-3">
              <div className="col-6">
                <NewTechCard />
              </div>
              <div className="col-6">
                <StartTechCard />
              </div>
              <div className="col-12">
                <PastticketComp
                  dataa={dataa?.supports}
                  selectCardData={selectCardData}
                  TableHead={TableHead}
                  type="support"
                />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-12">
            <div className="row g-3">
              <div className="col-12 min-file-ht">
                <AiCard />
              </div>
              <div className="col-12">
                <div className="h-100">
                  <FrequentlyAskedQues qestions={qestions} dataa={dataa} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
