import React from 'react'
import { useTranslations } from "next-intl";
import LineChart from "@/components/AdminComp/charts/LineChart/LineChart"
import ActiveUsersAnalysis from '@/components/AdminComp/Home/ActiveUsersAnalysis'
import DashboardCards from "@/components/AdminComp/Home/DashboardCards"
import LatestTrain from '@/components/AdminComp/latestTrain/LatestTrain'
import OngoingTraincomp from '@/components/OngoingTraincomp/OngoingTraincomp'
import TrainingGuideCard from "@/components/AdminComp/Home/TrainingGuideCard";
import TrainigControlPanel from "@/components/AdminComp/Home/TrainigControlPanel";



export default  async function Admin() {

let dataa = []
  
  
try {
  const data = await fetch(
    "https://api.lxera.net/api/development/organization/vodafone",
    {
      method: "GET",
      headers: {
        "x-api-key": "1234",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUwODQxODg1LCJuYmYiOjE3NTA4NDE4ODUsImp0aSI6IjltV2lHYngyQ2RzTEZ2anQiLCJzdWIiOiIxMTkyIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9._JykCIXVh7czjOgQqLYFFIt7p5-r2oaSdlaB9re06t4`,
      },
    }
  );


  const  respond = await data.json();
   dataa = respond.data
   console.log(dataa)
} catch (err) {
  console.error("Fetch error:", err);
}
 
  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className="  ">
          <div className=" row m-0  p-2 g-3">
            <div className="col-lg-12">
              <DashboardCards data={dataa} />
            </div>

            <div className="  col-xl-5 col-lg-12 col-md-12 col-12">
              <TrainingGuideCard />
            </div>

            <div className="  col-xl-7   col-lg-12  col-md-12 col-12">
              <TrainigControlPanel />
            </div>

            <div className=" col-xl-7 col-lg-12  col-12 ">
              <LineChart />
            </div>

            <div className=" col-xl-5  col-lg-12 col-12">
              <ActiveUsersAnalysis dat={dataa} />
            </div>

            <div className=" col-xl-4  col-lg-12 col-12">
              <LatestTrain />
            </div>

            <div className=" col-xl-8  col-lg-12 col-12">

            <OngoingTraincomp/>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
