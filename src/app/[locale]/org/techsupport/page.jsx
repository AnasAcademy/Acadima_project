import React from "react";
import { useTranslations, getTranslations } from "next-intl/server";
import NewTechCard from "@/components/NewTechCard/NewTechCard";
import StartTechCard from "@/components/StartTechCard/StartTechCard";
import AiCard from "@/components/AICard/AICard";
import FrequentlyAskedQues from "@/components/FrequentlyAskedQues/FrequentlyAskedQues";
<<<<<<< HEAD


import SelectCard from "@/components/SelectCard/SelectCard";
=======
>>>>>>> 6586ee9 (Modifications_p1)
import PastticketComp from "@/components/PastticketComp/PastticketComp"


export default async function TechSupport() {

 
  const t = await getTranslations("techSupport");
   let dataa = []
   let qestions =[]
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
        dataa =respond
      console.log(dataa.supports || []);

   } catch (error) {
    console.log(error);
    
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
     console.log(qestions.data || []);
   } catch (error) {
     console.log(error);
   }


<<<<<<< HEAD
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
=======
 
>>>>>>> 6586ee9 (Modifications_p1)

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
<<<<<<< HEAD
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
                    <SelectCard
                      selectCardData={selectCardData}
                      isTechSupport={true}
                      dataa = {dataa}
                    />
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
                <PastticketComp dataa={dataa} />
              </div>

              <div className="col-xl-3">
                <div className=" h-100 ">
                  <FrequentlyAskedQues qestions={qestions} />
=======
        <div className=" p-4 ">
          <h2 className="hvvv py-3 ">{t("tech-support")}</h2>

          <div className="row g-3">
            <div className="col-xl-8 col-12     ">
              <div className="row g-3">
                <div className="col-6  ">
                  <NewTechCard />
                </div>

                <div className="col-6 ">
                  <StartTechCard />
                </div>

                <div className=" col-12 ">
                  <PastticketComp dataa={dataa} />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-12   ">
              <div className="row g-3">
                <div className="col-12 min-file-ht ">
                  <AiCard />
                </div>

                <div className="col-12">
                  <div className=" h-100 ">
                    <FrequentlyAskedQues qestions={qestions} dataa={dataa} />
                  </div>
>>>>>>> 6586ee9 (Modifications_p1)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
