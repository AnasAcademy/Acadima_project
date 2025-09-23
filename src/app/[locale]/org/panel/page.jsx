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

import { FaUserTie, FaAward } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { RiBarChart2Fill } from "react-icons/ri";

export default async function Admin() {
  const ts = await getTranslations("SidebarA");
  const t = await getTranslations("DashboardA");

  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Server-side fetch

  let dat = [];
  let datad = [];
  let current_page = [] || 1;
  let totalPages = [];

  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const respond = await res.json();
    dat = respond.data || {};
    console.log(dat);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }

  // try {
  //   const res = await fetch(`${BASE_URL}/progress/bundlesProgress`, {
  //     method: "GET",
  //     headers: {
  //       "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const respond = await res.json();

  //   datad = respond.data || [];
  //   current_page = respond.current_page || 1;
  //   totalPages = respond.last_page || 1;
  //   console.log(datad);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }

  const cards = [
    {
      title: t("employees_registered"),
      value: dat.total_users,
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("active_courses"),
      value: dat.total_active_webinars,
      icon: <RiBarChart2Fill size={18} />,
    },
    {
      title: t("total_certificates"),
      value: dat.total_certificates,
      icon: <FaAward size={18} />,
    },
    {
      title: t("course_completion"),
      value: `${dat.active_webinars_percentage || 0}%`,
      icon: <PiCertificateFill size={18} />,
    },
  ];

  return (
    <div className="m-0 container-fluid p-0 d-flex flex-column  ">
      <div>
        <div className="row m-0 p-2 g-3">
          <div className="col-lg-12">
            <DashboardCards cards={cards} />
          </div>

          <div className="col-xl-5 col-lg-12 col-md-12 col-12 ">
            <TrainingGuideCard />
          </div>

          <div className="col-xl-7 col-lg-12 col-md-12 col-12 ">
            <TrainigControlPanel />
          </div>

          <div className="col-xl-6 col-lg-12 col-12">
            <LineChart />
          </div>

          <div className="col-xl-6 col-lg-12 col-12">
            <ActiveUsersAnalysis dat={dat} />
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
