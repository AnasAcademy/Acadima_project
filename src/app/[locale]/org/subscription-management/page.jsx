import React from "react";
import { getTranslations } from "next-intl/server";
import AdminSmallCard from "@/components/AdminSmallCard/AdminSmallCard";
import CompnamCard from "@/components/compnamCard/CompnamCard";
import AddPymntCard from "@/components/AddPymntCard/AddPymntCard";
import PymntDetails from "@/components/PymntDetails/PymntDetails";
import Yourplan from "@/components/Yourplan/Yourplan";
import Blue from "@/assets/admin/blue screen.svg";
import Backg from "@/assets/admin/Backund.png";
import { cookies } from "next/headers";


export default async function SubscriptionManagement() {
  const t = await getTranslations("SubMan");
const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const companyName = process.env.company_name;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace(
    "${company_name}",
    companyName
  );
  let dataa = [];

  try {
    const data = await fetch(`${baseUrl}/plans`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store", // prevent stale data
    });

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
              <AdminSmallCard Frame="SubMan" Img={Blue} isUpgrade={true} />
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
