import React from "react";
import { useTranslations } from "next-intl";
import Upload from "@/assets/admin/uploadd.svg";
import Line from "@/assets/admin/Line18.svg";
import Teams from "@/assets/admin/teams.svg"
import Office from "@/assets/admin/office.svg";
import Tab from "@/assets/admin/tab.svg"
import White from "@/assets/admin/whitescren.svg"
import Black from '@/assets/admin/black.svg'

export default function OrgSettSystem() {
  const t = useTranslations("adminSettingsTeam");

  return (
    <>
      <div className=" d-flex  flex-column">
        <div className=" cardbg rounded-4 p-4">
          <div>
            <h3 className=" tit-18-700  textcolor mb-0">
              {" "}
              {t("system_settings")}{" "}
            </h3>

            <Line className="w-75" />
          </div>

          <div className=" d-flex  align-items-center  gap-4 pt-2 ">
            <div
              className="  btncolor   rounded-circle  d-flex justify-content-center align-items-center  text-center text-white Tit-12-700 "
              style={{ width: "74px", height: "74px" }}
            >
              Upload Image
            </div>

            <div
              className=" d-flex  justify-content-center align-items-center rounded-3  px-3  py-1  gap-2   "
              style={{ border: "1px  solid  #E3E3E3" }}
            >
              <Upload className=" iconSize1   " />
              <h3 className=" Tit-14-700   mb-0  "> {t("upload_logo")}</h3>
            </div>
          </div>

          <div className=" row pt-4  g-3   ">
            <div className="col-12   col-lg-6 col-xl-3   ">
              <div>
                <h3 className=" Tit-12-700"> {t("organization_name")}</h3>

                <input
                  type="text"
                  value={" خالد محمد العنزي"}
                  className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                  style={{ border: "1px  solid  #E3E3E3" }}
                />
              </div>
            </div>

            <div className="col-12  col-lg-6 col-xl-3 ">
              <div>
                <h3 className=" Tit-12-700"> {t("default_language")}</h3>

                <input
                  type="text"
                  value={" Khaled_Mohammed@gmail.com  "}
                  className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700  w-100  "
                  style={{ border: "1px  solid  #E3E3E3" }}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 col-xl-3   ">
              <div>
                <h3 className=" Tit-12-700"> {t("default_region")}</h3>

                <input
                  type="text"
                  value={" 55 555 5555  966+ "}
                  className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700 w-100  "
                  style={{ border: "1px  solid  #E3E3E3" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="  mt-4 cardbg rounded-4 p-4">
          <div>
            <h3 className=" tit-18-700  textcolor mb-0">
              {" "}
              {t("login_security")}{" "}
            </h3>

            <Line className="w-75" />
          </div>

          <div className=" row pt-4 g-3">
            <h3 className=" Tit-12-700"> {t("enable_2fa")} </h3>
            <div className="col-12   col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {t("2fa_settings")}</h3>

              <input
                type="text"
                value={" XXXXXXXXXX  "}
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700  w-100 "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className="col-12   col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {t("session_duration")}</h3>

              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700  w-100 "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className="col-12   col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {t("reset_active_sessions")}</h3>

              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700 w-100  "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>
          </div>
        </div>

        <div className=" row">
          <div className="col-12 col-xl-5">
            <div className="  mt-4 cardbg rounded-4 p-4 min-systm-ht">

              <div>
                <h3 className=" tit-18-700  textcolor mb-0">
                  {" "}
                  {t("integration_settings")}{" "}
                </h3>

                <Line className="w-100" />
              </div>
              <div className=" row pt-3  g-3 ">
                <div className="col-12 d-flex    align-items-center    justify-content-between">
                  <div className=" d-flex gap-3  justify-content-center align-items-center ">
                    <Teams className="iconSize110" />
                    <div className=" d-flex flex-column">
                      <h3 className=" Tit-14-700"> teams</h3>
                      <p className=" tit-12-400">{t("last_used")}</p>
                    </div>
                  </div>

                  <button className="btn btn-danger Tit-12-700  px-4 text-nowrap">
                    {" "}
                    {t("unlink")}{" "}
                  </button>
                </div>

                <div className="col-12 d-flex    align-items-center    justify-content-between">
                  <div className=" d-flex gap-3  justify-content-center align-items-center ">
                    <Office className="iconSize110" />
                    <div className=" d-flex flex-column">
                      <h3 className=" Tit-14-700"> Office 365</h3>
                      <p className=" tit-12-400">{t("last_used")}</p>
                    </div>
                  </div>

                  <button className="btn  btn-light btncolor Tit-12-700 px-4 text-white text-nowrap">
                    {" "}
                    {t("relink")}{" "}
                  </button>
                </div>

                <div className="col-12 d-flex    align-items-center    justify-content-between">
                  <div className=" d-flex gap-3  justify-content-center align-items-center ">
                    <Office className="iconSize110" />
                    <div className=" d-flex flex-column">
                      <h3 className=" Tit-14-700"> Zoom</h3>
                      <p className=" tit-12-400">{t("last_used")}</p>
                    </div>
                  </div>

                  <button className="btn  btn-light  btncolor Tit-12-700 px-4 text-white text-nowrap">
                    {" "}
                    {t("relink")}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-7">
            <div className="  mt-4 cardbg rounded-4 p-4 min-systm-ht">

              <div>
                <h3 className=" tit-18-700  textcolor mb-0">
                  {" "}
                  {t("customize_interface")}{" "}
                </h3>

                <Line className="w-100" />
              </div>
              <div className=" row pt-3  g-3  ">
                <div className="col-12 d-flex    align-items-center    justify-content-between">
                  <div className=" d-flex gap-3   flex-column ">
                    <div className=" d-flex flex-column">
                      <h3 className=" Tit-14-700"> {t("primary_color")}</h3>
                    </div>

                    <div
                      className=" d-flex gap-4 p-2 rounded-3 justify-content-between align-items-center"
                      style={{ border: "1px  solidrgb(75, 33, 33)" }}
                    >
                      <div className=" d-flex justify-content-between gap-2">
                        <div
                          className=" btncolor"
                          style={{ width: "43px", height: "20px" }}
                        ></div>

                        <div className=" tit-14-400">#216ED7</div>
                      </div>

                      <Tab />
                    </div>
                    <h3 className=" Tit-14-700"> {t("theme_style")}</h3>
                    <div className=" d-flex   justify-content-between gap-3">
                      <div
                        className=" d-flex flex-column  p-3  rounded-2"
                        style={{ border: "1px  solid  #216ED7" }}
                      >
                        <div className="form-check  d-flex flex-row-reverse  gap-4 ">
                          <label
                            className="form-check-label ms-2 me-2 Tit-12-700"
                            for="flexRadioDefault1"
                          >
                            {t("light_mode")}
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                        </div>

                        <White className="   " width={100} height={50} />
                      </div>

                      <div
                        className=" d-flex flex-column p-3 rounded-2 "
                        style={{ border: "1px  solid  #216ED7" }}
                      >
                        <div className="form-check  d-flex flex-row-reverse  gap-4 ">
                          <label
                            className="form-check-label ms-2 me-2 Tit-12-700 text-nowrap"
                            for="flexRadioDefault1"
                          >
                            {t("dark_mode")}
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                        </div>

                        <Black className="" width={100} height={50} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
