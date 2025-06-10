  import React from 'react'
  import Image from 'next/image';
  import { useTranslations } from "next-intl";
  import Bluerec from "@/assets/admin/bluerec.svg"
  import Smallcard from "@/components/smallCard/Smallcard"
  import CompnamCard from "@/components/compnamCard/CompnamCard"
  import AddPymntCard from "@/components/AddPymntCard/AddPymntCard"
  import PymntDetails from "@/components/PymntDetails/PymntDetails"
  import Yourplan from "@/components/Yourplan/Yourplan"


  export default function SubscriptionManagement() {

   const t = useTranslations("SubMan");

    return (
      <>
        <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
          <div className=" p-lg-4  pt-0">
            <div className=" row m-0  p-2 g-3 ">
              <h2 className=" hvvv p-4 pb-0"> {t("tracking")} </h2>
              <div className="col-lg-8 col-xl-4  position-relative">
                <CompnamCard />
              </div>

              <div className="  col-lg-8 col-xl-4  d-flex  gap-3">
                <Smallcard Frame="SubMan" />
                <Smallcard Frame="SubMan" />
              </div>

              <div className=" col-lg-4  col-xl-4    ">
                <AddPymntCard />
              </div>

              <div className="col-lg-8   ">
                <PymntDetails />
              </div>
              <div className="col-lg-4 ">
                <Yourplan />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  