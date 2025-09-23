import React from "react";
import Logo from "@/assets/admin/73763.svg";
import LatestTrain from "@/components/AdminComp/latestTrain/LatestTrain";
import OrgProfileTable from "@/components/OrgProfileTable/OrgProfileTable";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import Planbg from "@/assets/admin/icon1.svg";
import Trianum from "@/assets/admin/VectorGraph.svg";
import Trainmn from "@/assets/admin/Vectortr12.svg";
import Arrow from "@/assets/admin/arrow down.svg";
import Up from "@/assets/admin/uparows.svg";
import photo from "@/assets/admin/photo.png";
import Image from "next/image";
import Icon from "@/assets/admin/Icon.svg";
import Icon2 from "@/assets/admin/Icon2.svg";
import Icon3 from "@/assets/payments icons/rs.svg";
import Org1 from "@/assets/admin/org1.svg";
import Org2 from "@/assets/admin/org2.svg";
import Org3 from "@/assets/admin/org3.svg";
import Search from "@/assets/admin/search.svg";
import Circles from "@/assets/admin/circles.svg";

export default async function OrgProfile() {
  const t = await getTranslations("employee_progress");
  const ts = await getTranslations("orgProfile");

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
    dataa = respond.message.plans;
    console.log(dataa);
  } catch (err) {
    console.error("Fetch error:", err);
  }

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
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
        <div className=" p-lg-4 pt-0">
          <div className="  btncolor  rounded-3 position-relative overflow-visible ">
            <div
              className=" position-absolute w-100 h-100 "
              style={{ top: 125, left: 0, zIndex: 1, pointerEvents: "none" }}
            >
              <Circles className="iconSize8" />
            </div>

            <div className=" d-flex justify-content-between align-items-start ">
              <div className="  w-100 p-4   ">
                <h5 className=" Tit-14-700 text-white">
                  {" "}
                  {ts("organization_profile")}{" "}
                </h5>

                <h2 className=" tit-18-700 text-white p-3">
                  {" "}
                  {ts("company")} lxera{" "}
                </h2>
              </div>

              <form className="form-inline d-flex  w-25  m-4 ">
                <div className="form-control mr-sm-2  d-flex gap-2 align-items-center rounded-4">
                  <Search className="iconSize" />
                  <input
                    className="tit-12-400 border-0 w-100 py-1 "
                    type="search"
                    placeholder={t("search_placeholder")}
                    aria-label="Search"
                  />
                </div>
              </form>
            </div>
            <div
              className="bguser mx-3 p-3   mb-5"
              style={{ transform: "translateY(30%)" }}
            >
              <div className=" d-flex justify-content-between gap-2  flex-column  flex-md-row  ">
                <div className="d-flex   align-items-center gap-3">
                  <div className=" rounded-4">
                    <Image src={photo} width={91} className="rounded-4 " />
                  </div>
                  <div>
                    <h4 className=" tit-18-700"> {ts("username")} </h4>
                    <h5 className=" tit-14-400">usermail@simmmple.com</h5>
                  </div>
                </div>

                <div className=" d-flex  gap-3 justify-content-center align-items-center flex-lg-row flex-column ">
                  <button className=" btn btn-light Tit-12-700 d-flex gap-1 align-items-center ">
                    {" "}
                    {ts("org_general_info")}
                    <Icon />
                  </button>
                  <button className=" btn btn-light Tit-12-700 d-flex gap-1 align-items-center ">
                    {" "}
                    {ts("reports_and_statistics")}
                    <Icon2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {(() => {
            const active = (dataa || []).find(
              (p) => Number(p?.is_active) === 1
            );
            return active ? (
              <div className=" row m-0     g-4      ">
                <div className="col-xl-5    col-md-6    ">
                  <div className=" d-flex   flex-column  justify-content-between   align-content-between h-100   gap-3">
                    <div className="rounded-4 shadow-sm     p-3 py-4 cardbg     ">
                      <Logo className=" iconSize15" />

                      <p className=" tit-16-400">
                        <span className="fw-bold">{ts("company_title")}</span>
                        {ts("company_desc")}
                      </p>
                    </div>

                    <div className=" card border-0 rounded-4 p-3 py-4 shadow-sm   d-flex flex-column justify-content-start align-items-center  align-items-md-start justify-content-md-start   ">
                      <div className=" p-0  col-12  d-flex justify-content-start align-items-center align-items-md-start justify-content-md-start">
                        <div className="   position-relative d-flex   justify-content-center   ">
                          <Planbg
                            className="h-auto"
                            style={{ opacity: 0.8 }}
                            width={210}
                            height={50}
                          />
                          <div className=" d-flex justify-content-start justify-content-md-start ">
                            <h4 className="position-absolute text-white planabsolute text-nowrap m-0  text-center ">
                              {active.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <h3 className="  tit-20-700 text-dark text-nowrap d-flex justify-content-start ">
                        {active.name_ar}
                      </h3>
                      <h4 className="tit-16-400">{active.description}</h4>
                      <div className="d-flex  justify-content-center  justify-content-md-start mt-3">
                        <h3 className="tit-20-700 text-dark text-start text-nowrap d-flex  justify-content-center align-items-center ">
                          <Icon3 />
                          {active.price}
                        </h3>
                        <h6 className="tit-20-400 pt-3 text-start text-nowrap">
                          /{t("month")}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3  col-md-6  ">
                  <div className="  d-flex   flex-column  justify-content-between   align-content-between h-100   gap-3 ">
                    <div className="bg-white card border-0 rounded-4 p-3 gap-3 shadow-sm  ">
                      <div className="d-flex gap-2 align-items-center">
                        <div className="border rounded-2 shadow-sm  p-2 width-fit">
                          <Org1 className={`iconcolor`} />
                        </div>

                        <h3 className="tit-18-700 textcolor m-0 p-0">
                          {" "}
                          {ts("organization_name")}:
                        </h3>
                        <p className="tit-16-400 fw-bold m-0 p-0">
                          {" "}
                          شركة الرؤية المستقبلية للتقنيات
                        </p>
                      </div>
                    </div>

                    <div className=" bg-white card border-0 rounded-4 p-3 gap-3 shadow-sm  ">
                      <div className="d-flex gap-2 align-items-center      ">
                        <div className="border rounded-2 shadow-sm  p-2 width-fit">
                          <Org1 className={`iconcolor`} />
                        </div>

                        <h3 className="tit-18-700 textcolor p-0 m-0 ">
                          {" "}
                          {ts("field")} :{" "}
                        </h3>
                        <p className="tit-16-400 fw-bold m-0 p-0">
                          {" "}
                          {ts("information_technology")}{" "}
                        </p>
                      </div>
                    </div>

                    <div className=" bg-white card border-0 rounded-4 p-3 gap-3 shadow-sm ">
                      <div className="d-flex gap-2 align-items-center   ">
                        <div className="border rounded-2 shadow-sm  p-2 width-fit">
                          <Org2 />
                        </div>
                        <h3 className="tit-18-700 textcolor p-0 m-0 ">
                          {" "}
                          {ts("employees_count")}:
                        </h3>
                        <p className="tit-16-400 fw-bold m-0 p-0">
                          {" "}
                          {dashboardData.total_users} {ts("employee")}:
                        </p>
                      </div>
                    </div>

                    <div className=" bg-white card border-0 rounded-4 p-3 gap-3 shadow-sm ">
                      <div className="d-flex gap-2 align-items-center    ">
                        <div className="border rounded-2 shadow-sm  p-2 width-fit">
                          <Org3 />
                        </div>
                        <h3 className="tit-18-700 textcolor p-0 m-0 ">
                          {" "}
                          {ts("registration_date")} :
                        </h3>
                        <p className="tit-16-400 fw-bold m-0 p-0">
                          {" "}
                          {active.start_date}{" "}
                        </p>
                      </div>
                    </div>

                    <div className=" bg-white card border-0 rounded-4 p-3 gap-3 shadow-sm ">
                      <div className="d-flex gap-2 align-items-center    ">
                        <div className="border rounded-2 shadow-sm  p-2 width-fit">
                          <Org3 />
                        </div>
                        <h3 className="tit-18-700 textcolor p-0 m-0 ">
                          {" "}
                          {ts("registration_date")} :
                        </h3>
                        <p className="tit-16-400 fw-bold m-0 p-0">
                          {" "}
                          {active.end_date}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="  col-xl-4  col-md-12  ">
                  <div className=" d-flex flex-column gap-3 cardbg rounded-4 p-3  ">
                    <div className="  d-flex  justify-content-between">
                      <h4 className="  tit-18-700 ">
                        {" "}
                        {ts("training_perf_indicators")}{" "}
                      </h4>

                      {/* <div className="d-flex justify-content-center  align-items-center   position-relative   ">
                        <select
                          className="form-selectt   cselect  custroundbtn  tit-9-400   "
                          aria-label="Default select example"
                          defaultValue={0}
                        >
                          <option value="0"> الشهر الحالي </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <Arrow className="iconSize5 position-absolute selclass p-1" />
                      </div> */}
                    </div>

                    <div className=" row  ">
                      <div className="col-6  ">
                        <div className=" d-flex gap-3  flex-column">
                          <div className="trainNum  rounded-4  p-0  ">
                            <div className="  p-3 pb-5 mb-4">
                              <h4 className=" tit-12-400 text-white">
                                {" "}
                                {ts("total_trainees")}{" "}
                              </h4>

                              <div className=" d-flex align-items-center">
                                <h1 className=" tit-20-700 text-white">
                                  {dashboardData.total_users}
                                </h1>
                                <h4 className=" tit-10-700 text-white">
                                  {ts("trainee")}
                                </h4>
                              </div>

                              <h4 className=" tit-10-400 text-white">+9%</h4>
                            </div>
                            <div className="   ">
                              <Trianum className=" iconSize13 " />
                            </div>
                          </div>

                          <div className=" bg-white rounded-4 p-3 cardbg  border-1  border-dark-subtle border  bgprim ">
                            <h4 className=" tit-12-400 text-white">
                              {" "}
                              {ts("comp_train_pro")}
                            </h4>

                            <div className=" d-flex">
                              <h2 className=" text-white">
                                {dashboardData.total_active_webinars}
                              </h2>
                              <h4 className=" tit-10-400 text-white">
                                {ts("certificate")}
                              </h4>
                            </div>

                            <Up className="iconSize9" />
                          </div>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className=" d-flex flex-column gap-3 ">
                          <div className=" bg-white rounded-4 p-3  cardbg border-1  border-dark-subtle border  ">
                            <h4 className=" tit-12-400">
                              {" "}
                              {ts("certificates_issued")}
                            </h4>

                            <div className=" d-flex">
                              <h2>{dashboardData.total_certificates}</h2>
                              <h4 className=" tit-10-400">
                                {" "}
                                {ts("certificate")}
                              </h4>
                            </div>

                            <h4 className=" tit-10-400 text-success">
                              + 12% {ts("from_last_month")}
                            </h4>
                          </div>

                          <div className=" bg-white rounded-4 border-1  border-dark-subtle border ">
                            <div className=" p-3 pb-5 mb-4">
                              <h4 className=" tit-12-400 text-dark">
                                {" "}
                                {ts("comp_pro_ratio")}{" "}
                              </h4>

                              <div className=" d-flex align-items-center">
                                <h1 className=" tit-20-700 text-dark">
                                  {dashboardData.active_bundles_percentage}
                                </h1>
                                <h4 className=" tit-10-700 text-dark">%</h4>
                              </div>
                              <h4 className=" text-danger tit-10-400">
                                -6%% {ts("from_last_month")}
                              </h4>
                            </div>
                            <div className="      ">
                              <Trainmn className=" iconSize13 " />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="  col-lg-12 col-xl-3    ">
              <LatestTrain h={"min-prf-ht"} />
            </div> */}
                {/* 
            <div className="col-12">
              <SelectCard selectCardData={selectCardData} isOrgProfile={true} />
            </div>

            <div className="col-lg-12  ">
                  <OrgProfileTable />
            </div> */}
              </div>
            ) : null;
          })()}
        </div>
      </div>
    </>
  );
}
