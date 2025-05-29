import React from 'react'
import { useTranslations } from "next-intl";
import LineChart from "@/components/AdminComp/charts/LineChart/LineChart"
import ActiveUsersAnalysis from '@/components/AdminComp/Home/ActiveUsersAnalysis'
import DashboardCards from "@/components/AdminComp/Home/DashboardCards"
import LatestTrain from '@/components/AdminComp/latestTrain/LatestTrain'
import OngoingTrain from '@/components/AdminComp/ongoingTrain/OngoingTrain'
import TrainingGuideCard from "@/components/AdminComp/Home/TrainingGuideCard";
import TrainigControlPanel from "@/components/AdminComp/Home/TrainigControlPanel";



export default function Admin() {



  const tD = useTranslations("Dashboard");


  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <div className="col-lg-12">
              <DashboardCards />
            </div>

            <div className="  col-xl-5 col-lg-12 col-md-12 col-12 ">
              <TrainingGuideCard />
            </div>

            <div className="  col-xl-7   col-lg-12  col-md-12 col-12">
              <TrainigControlPanel />
            </div>

            <div className=" col-xl-8 col-lg-12  col-12 ">
              <LineChart />
            </div>

            <div className=" col-xl-4  col-lg-12 col-12">
              <ActiveUsersAnalysis />
            </div>

            <div className="col-lg-4 ">
              <LatestTrain />
            </div>

            <div className="col-lg-8">
              <OngoingTrain />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
