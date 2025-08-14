import React from "react";
import { getTranslations } from "next-intl/server";
import AdminSmallCard from "@/components/AdminSmallCard/AdminSmallCard";
import CompnamCard from "@/components/compnamCard/CompnamCard";
import AddPymntCard from "@/components/AddPymntCard/AddPymntCard";
import PymntDetails from "@/components/PymntDetails/PymntDetails";
import Yourplan from "@/components/Yourplan/Yourplan";
import Blue from "@/assets/admin/blue screen.svg";
import Backg from "@/assets/admin/Backund.png";

export default async function SubscriptionManagement() {

    const t = await getTranslations("SubMan");

  let dataa = [];

  try {
    const data = await fetch(
      "https://api.lxera.net/api/development/organization/vodafone/plans",
      {
        method: "GET",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUwODQzMzU1LCJuYmYiOjE3NTA4NDMzNTUsImp0aSI6IjBVZDcwYTNoa1RpZDd3WUMiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.LKM9YIlrS8FOnNBTXP7aRm2gLNDNbJflcB4_rHIFJBs`,
        },
      }
    );

    const respond = await data.json();
    dataa = respond.message;
  } catch (err) {
    console.error("Fetch error:", err);
  }

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
        <div className="   pt-0">
          <div className=" row m-0  p-2 g-3 ">
            <h2 className=" hvvv p-4 pb-0 pt-0"> {t("ref")} </h2>
            <div className=" col-xl-4 ">
              <CompnamCard dat={dataa} Img={Backg} />
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
