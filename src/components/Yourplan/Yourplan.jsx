  import React from 'react'
  import X from '../../assets/admin/x.svg'
  
  import { useTranslations } from "next-intl";

  export default function Yourplan() {


     const t = useTranslations("yourplan");

    return (
      <>

        <div className=" d-flex  flex-column w-100 rounded-4  p-3 cardbg min-yourplan-ht h-100  ">
          <div className=" d-flex gap-5 flex-column  p-3 pt-3  h-100 ">
            <div className=" newbg mt-5  d-flex flex-column gap-5 h-100 rounded-4 p-3 ">
              <div className="  ">
                <div className=" d-flex justify-content-between  p-3    ">
                  <h3 className="tit-16-600  "> {t("your_plan")}</h3>
                  <X />
                </div>

                <div className=" d-flex  justify-content-between ">
                  <h5>{t("emails_sent")} </h5>
                  <h5> 50 of 100</h5>
                </div>
                <div>
                  <div className="progress w-75" style={{ height: "8px" }}>
                    <div
                      className={`progress-bar custButton  `}
                      role="progressbar"
                      style={{ width: 200 }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <div className=" d-flex  justify-content-between ">
                  <h5> {t("sms_sent")} </h5>
                  <h5> 50 of 100</h5>
                </div>
                <div>
                  <div className="progress w-75" style={{ height: "8px" }}>
                    <div
                      className={`progress-bar custButton  `}
                      role="progressbar"
                      style={{ width: 200 }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <div className=" d-flex  justify-content-between ">
                  <h5> {t("sms_sent")} </h5>
                  <h5> 50 of 100</h5>
                </div>
                <div>
                  <div className="progress w-75" style={{ height: "8px" }}>
                    <div
                      className={`progress-bar custButton  `}
                      role="progressbar"
                      style={{ width: 200 }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>

              <h3 className="Tit-14-700">{t("want_more")}</h3>
            </div>
          </div>
        </div>
      </>
    );
  }
  