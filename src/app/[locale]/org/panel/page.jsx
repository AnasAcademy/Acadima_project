import React from "react";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import LineChart from "@/components/AdminComp/charts/LineChart/LineChart";
import ActiveUsersAnalysis from "@/components/AdminComp/Home/ActiveUsersAnalysis";
import DashboardCards from "@/components/AdminComp/Home/DashboardCards";
import LatestTrain from "@/components/AdminComp/latestTrain/LatestTrain";
import OngoingTraincomp from "@/components/OngoingTraincomp/OngoingTraincomp";
import TrainingGuideCard from "@/components/AdminComp/Home/TrainingGuideCard";
import TrainigControlPanel from "@/components/AdminComp/Home/TrainigControlPanel";

export default async function Admin() {
  const ts = await getTranslations("SidebarA");

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const companyName = process.env.company_name;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace(
    "${company_name}",
    companyName
  );

  // Server-side fetch
  async function fetchDashboardData() {
    try {
      const res = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store", // prevent stale data
      });

      const respond = await res.json();
      return respond.data || {};
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return {};
    }
  }

  const dashboardData = await fetchDashboardData();

  return (
    <div className="m-0 container-fluid p-0 d-flex flex-column">
      <div>
        <div className="row m-0 p-2 g-3">
          <div className="col-lg-12">
            <DashboardCards data={dashboardData} />
          </div>

          <div className="col-xl-5 col-lg-12 col-md-12 col-12">
            <TrainingGuideCard />
          </div>

          <div className="col-xl-7 col-lg-12 col-md-12 col-12">
            <TrainigControlPanel />
          </div>

          <div className="col-xl-7 col-lg-12 col-12">
            <LineChart />
          </div>

          <div className="col-xl-5 col-lg-12 col-12">
            <ActiveUsersAnalysis dat={dashboardData} />
          </div>

          <div className="col-xl-4 col-lg-12 col-12">
            <LatestTrain />
          </div>

          <div className="col-xl-8 col-lg-12 col-12">
            <OngoingTraincomp />
          </div>
        </div>
      </div>
    </div>
  );
}
