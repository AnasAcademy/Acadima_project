
import React from "react";
import FilterCard from "@/components/FilterCard/FilterCard";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { getTranslations } from "next-intl/server";
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import roundimage from "@/assets/admin/personla.png";
import ElectronicServiceTable from "@/components/ElectronicServiceTable/ElectronicServiceTable"


export default async function ElectronicServicesList() {
  const ts = await getTranslations("SidebarA");
  // const t = useTranslations("employee_progress");

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("electronic-services")}</h2>

            {/* <div className=" col-lg-12 ">
              <SelectCard selectCardData={selectCardData} />
            </div> */}

            <div className=" col-12 ">
              <ElectronicServiceTable />

              {/* <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
                <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
                  button={false}
                  Icon={Pin}
                  Icon2={Removebin}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
