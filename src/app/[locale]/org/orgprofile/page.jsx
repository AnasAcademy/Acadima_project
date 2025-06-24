import React from "react";
import Logo from "@/assets/admin/73763.svg";
import LatestTrain from "@/components/AdminComp/latestTrain/LatestTrain";
import TechFilter from "@/components/TechFilter/TechFilter";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { useTranslations } from "next-intl";
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import Trianum from "@/assets/admin/VectorGraph.svg";
import Trainmn from "@/assets/admin/Vectortr12.svg";
import Arrow from "@/assets/admin/arrow down.svg";
import Up from "@/assets/admin/uparows.svg";
import photo from "@/assets/admin/photo.png";
import Image from "next/image";
import Icon from "@/assets/admin/Icon.svg";
import Icon2 from "@/assets/admin/Icon2.svg";
import Search from "@/assets/admin/search.svg";
import Circles from "@/assets/admin/circles.svg";
import SelectCard from "@/components/SelectCard/SelectCard";


export default function OrgProfile() {
  const t = useTranslations("employee_progress");
  const ts = useTranslations("orgProfile");
  const TableHead = [
    t("employee_name"),
    t("training_course"),
    t("program_status"),
    t("join_date"),
    t("completion_rate"),
    t("profile_access"),
  ];

  const trainingData = [
    {
      columns: [
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("completed"),
          icon: false,
          color: "#48BB78",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    },
    {
      columns: [
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("inProgress"),
          icon: false,
          color: "#50C1FA",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    },
    {
      columns: [
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("notStarted"),
          icon: false,
          color: "#CBD5E0",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    },
    {
      columns: [
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("completed"),
          icon: false,
          color: "#48BB78",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    },
    {
      columns: [
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("completed"),
          icon: false,
          color: "#48BB78",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    },
    {
      columns: [
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("completed"),
          icon: false,
          color: "#50C1FA",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    },
  ];

   const selectCardData = {
  inputs: [
    {
      title: "",
      type: "select",
      options: ["React", "Next.js", "Laravel"]
    },
    {
      title: "",
      type: "select",
      options: ["Cairo", "Alex"]
    },
    {
      title: "",
      type: "select",
      options: ["Cairo", "Alex"]
    },
    {
      title: "",
      type: "select",
      options: ["on", "off"]
    },{
      title: "",
      type: "search",
    },
  ]
};

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
        <div className=" p-lg-4 pt-0">
          <div className="  btncolor  rounded-3 position-relative overflow-visible ">
            <div
              className=" position-absolute w-100 h-100"
              style={{ top: 120, left: 0, zIndex: 1, pointerEvents: "none" }}
            >
              <Circles className="iconSize8" />
            </div>

            <div className=" d-flex justify-content-between align-items-start">
              <div className="  w-100 p-4   ">
                <h5 className=" Tit-14-700 text-white">الملف الشخصي للمنشئة</h5>

                <h2 className=" tit-18-700 text-white p-4"> شركة lxera </h2>
              </div>

              <form className="form-inline d-flex  w-25  m-4">
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
              className="bguser mx-3 p-2"
              style={{ transform: "translateY(50%)" }}
            >
              <div className=" d-flex justify-content-between gap-2 ">
                <div className="d-flex   align-items-center gap-3">
                  <div className=" rounded-4">
                    <Image src={photo} width={91} className="rounded-4 " />
                  </div>
                  <div>
                    <h4 className=" tit-18-700"> {ts("username")} </h4>
                    <h5 className=" tit-14-400">usermail@simmmple.com</h5>
                  </div>
                </div>

                <div className=" d-flex  gap-3 justify-content-center align-items-center flex-lg-row flex-column">
                  <button className=" btn btn-light Tit-12-700 d-flex gap-1 align-items-center ">
                    {" "}
                    معلومات عامة للمنشئة
                    <Icon />
                  </button>
                  <button className=" btn btn-light Tit-12-700 d-flex gap-1 align-items-center ">
                    {" "}
                    التقارير و الإحصائيات
                    <Icon2 />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className=" row m-0   g-3   ">
            <h2 className=" hvvv p-4 pb-0"> </h2>
            <div className="col-lg-6 col-xl-4 ">
              <div className=" position-relative rounded-4 shadow-sm     p-5 cardbg   min-prf-ht  ">
                <Logo className=" iconSize4" />

                <p className=" tit-12-400">{ts("company_desc")}</p>

                <div className=" d-flex flex-column gap-1">
                  <h5 className="  tit-14-400">
                    <span className=" textcolor"> اسم المنشأة :</span> شركة
                    الرؤية المستقبلية للتقنيات
                  </h5>
                  <h5 className="  tit-14-400">
                    {" "}
                    <span className=" textcolor"> المجال:</span> تقنية معلومات
                  </h5>
                  <h5 className="  tit-14-400">
                    {" "}
                    <span className=" textcolor">عدد الموظفين:</span> 125 موظف
                  </h5>
                  <h5 className="  tit-14-400">
                    <span className=" textcolor">المدينة:</span>
                    الرياض، السعودية
                  </h5>
                  <h5 className="  tit-14-400">
                    <span className=" textcolor"> خطة الاشتراك: </span>
                    باقة الشركات المتقدمة
                  </h5>
                  <h5 className="  tit-14-400">
                    <span className=" textcolor"> تاريخ التسجيل: </span>
                    12 فبراير 2024
                  </h5>
                  <h5 className="  tit-14-400">
                    <span className=" textcolor"> تاريخ إنتهاء الإشتراك :</span>
                    12 فبراير 2025
                  </h5>
                </div>
              </div>
            </div>

            <div className="  col-lg-6 col-xl-5   ">
              <div className=" d-flex flex-column gap-3 cardbg rounded-4 p-5 min-prf-ht ">
                <div className="  d-flex  justify-content-between">
                  <h4 className="  tit-18-700 "> مؤشرات أداء التدريب </h4>

                  <div className="d-flex justify-content-center  align-items-center   position-relative   ">
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
                  </div>
                </div>

                <div className=" row ">
                  <div className="col-6  ">
                    <div className=" d-flex gap-3  flex-column">
                      <div className="trainNum  rounded-4  p-0  ">
                        <div className="  p-3 pb-5 mb-4">
                          <h4 className=" tit-12-400 text-white">
                            {" "}
                            عدد المتدربين الإجمالي{" "}
                          </h4>

                          <div className=" d-flex align-items-center">
                            <h1 className=" tit-20-700 text-white">112</h1>
                            <h4 className=" tit-10-700 text-white">متدرب</h4>
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
                          الشهادات المُصدّرة{" "}
                        </h4>

                        <div className=" d-flex">
                          <h2 className=" text-white">68</h2>
                          <h4 className=" tit-10-400 text-white"> شهادة</h4>
                        </div>

                        <Up className="iconSize9" />
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className=" d-flex flex-column gap-3 ">
                      <div className=" bg-white rounded-4 p-3  cardbg border-1  border-dark-subtle border  ">
                        <h4 className=" tit-12-400"> الشهادات المُصدّرة </h4>

                        <div className=" d-flex">
                          <h2>68</h2>
                          <h4 className=" tit-10-400"> شهادة</h4>
                        </div>

                        <h4 className=" tit-10-400 text-success">
                          + 12%من الشهر الماضي
                        </h4>
                      </div>

                      <div className=" bg-white rounded-4 border-1  border-dark-subtle border ">
                        <div className=" p-3 pb-5 mb-4">
                          <h4 className=" tit-12-400 text-dark">
                            {" "}
                            عدد المتدربين الإجمالي{" "}
                          </h4>

                          <div className=" d-flex align-items-center">
                            <h1 className=" tit-20-700 text-dark">112</h1>
                            <h4 className=" tit-10-700 text-dark">متدرب</h4>
                          </div>
                          <h4 className=" text-danger tit-10-400">
                            -6%% من الشهر الماضي
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

            <div className="  col-lg-12 col-xl-3    ">
              <LatestTrain h={"min-prf-ht"} />
            </div>

            <div className="col-12">
              <SelectCard selectCardData={selectCardData} isOrgProfile={true} />
            </div>

            <div className="col-lg-12  ">
              <OngoingTrain
                TableHead={TableHead}
                trainingData={trainingData}
                button={false}
                Icon={Pin}
                Icon2={Removebin}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
