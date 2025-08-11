import React from "react";
import FilterCard from "@/components/FilterCard/FilterCard";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { useTranslations } from "next-intl";
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import roundimage from "@/assets/admin/personla.png";
import { cookies } from "next/headers";
export default async function CourseRegistration() {
  // const t = useTranslations("employee_progress");
  // const ts = await getTranslations("tables");
  // const locale = await getLocale(); // Get current locale
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;





  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            {/* <h2 className="hvvv"></h2> */}
            <div className=" col-12 ">
              <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">

                {/* <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
  
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
