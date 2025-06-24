  import React from 'react'
  import { useTranslations } from "next-intl";
  import AdminSmallCard from "@/components/AdminSmallCard/AdminSmallCard"
  import CompnamCard from "@/components/compnamCard/CompnamCard"
  import AddPymntCard from "@/components/AddPymntCard/AddPymntCard"
  import PymntDetails from "@/components/PymntDetails/PymntDetails"
  import Yourplan from "@/components/Yourplan/Yourplan"
  import Blue from "@/assets/admin/blue screen.svg"

  export default async function SubscriptionManagement() {





  
let dataa = [];



try {
  const data = await fetch(
    "http://127.0.0.1:8000/api/development/organization/vodafone/plans",
    {
      method: "GET",
      headers: {
        "x-api-key": "1234",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUwNTk4NDU3LCJuYmYiOjE3NTA1OTg0NTcsImp0aSI6IlJONFpXWmpvaENaSXJycVMiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.PqWTQQSu9QZ_Nk0BVA8K98C1AGYcJ_mNEHtE1pxChZU`,
      },
    }
  );


  const  respond = await data.json();
   dataa = respond.message;
   console.log(dataa)
} catch (err) {
  console.error("Fetch error:", err);
}
 







    return (
      <>
        <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
          <div className="   pt-0">
            <div className=" row m-0  p-2 g-3 ">
              <h2 className=" hvvv p-4 pb-0"> متابعة تقدم الموظفين </h2>
              <div className=" col-xl-4  ">
                <CompnamCard  dat={dataa}   />
              </div>

              <div className="  col-lg-7 col-xl-4  d-flex  gap-2">
                <AdminSmallCard Frame="SubMan" Img={Blue} />
                <AdminSmallCard Frame="SubMan" Img={Blue} />
              </div>

              <div className=" col-lg-5  col-xl-4   ">
                <AddPymntCard />
              </div>

              <div className="col-lg-7   ">
                <PymntDetails />
              </div>
              <div className="col-lg-5 ">
                <Yourplan />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  