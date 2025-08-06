"use client";
import React, { useState } from "react";
import Image from "next/image";
import Planbg from "@/assets/admin/icon 1.svg";
import Line from "@/assets/navbar assets/Line 49.svg";
import Icon from "@/assets/payments icons/rs.svg"
import Editform from "@/components/Editform/Editform";
import { useTranslations } from "next-intl";
export default function PlansComp({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState("");
  const tr = useTranslations("tables");
  const ts = useTranslations("SidebarA");
  const [Itemid, setId] = useState(null);
  const formTitles = [
        {
          label:
            (formState === "add" ? tr("add") + " " : tr("edit") + " ") +
            ts("classes"),
          type: "text",
        },
        { label: formState === "add" ? tr("add") + " " : tr("edit"), type: "text" },
      ];

      const fields = [
        { name: "name", label: tr("plan_name"), type: "text" },
        { name: "name_ar", label: tr("plan_name"), type: "text" },
      ];

      function toogle() {
        setShowModal(!showModal);
      }

 



  const handleSubmitEdit = async (dataa) => {
    try {
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/plans`,
        {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
          body: JSON.stringify({
            name: dataa.name,
            name_ar: dataa.name_ar,
          }),
        }
      );

      const result = await response.json();

      const updatedItem = {
        ...data.find((item) => item.id === Itemid),
        ...dataa,
      };
      setData((prev) =>
        prev.map(
          (item) => (item.id === Itemid ? updatedItem : item) // replace only the edited item
        )
      );
    } catch (error) {
      console.error("Status update failed:", error);
      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
    }
  };



  return (
    <>
      {showModal ? (
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
          <Editform
            fields={fields}
            data={data}
            formTitles={formTitles}
            handleSubmitEdit={handleSubmitEdit}
            setShowModal={toogle}
            // handleSubmitAdd={handleSubmitAdd}
            formState={formState}
          />
        </div>
      ) : (
        <div className="row g-3">
          <div className=" d-flex  justify-content-between  align-items-center  col-12">
            <h2 className="  hvvv pb-0 pt-0  "> {tr("plan_details")} </h2>
            <button
              className="btn   custfontbtn  text-nowrap"
              onClick={() => {
                toogle();
                setFormState("edit");
              }}
            >
              اضافة خطة جديدة
            </button>
          </div>

          {data.map((plan, index) => (
            <div key={index} className=" col-12  col-xl-12 col-xxl-10 ">
              <div className="row g-3">
                <div className="col-12  col-xl-6   ">
                  <div className="bg-white card border-0 rounded-4 p-5  d-flex  justify-content-center align-items-center  align-items-md-start justify-content-md-start">
                    <div className=" row">
                      <div className="position-relative p-0  col-12  d-flex justify-content-center align-items-center align-items-md-start justify-content-md-start ">
                        <div className=" d-flex   justify-content-center justify-content-md-start ">
                          <Planbg
                            className="h-auto"
                            style={{ opacity: 0.8 }}
                            width={210}
                            height={50}
                          />
                        </div>
                        <h4 className="position-absolute text-white planabsolute text-nowrap">
                          {plan.name}
                        </h4>
                      </div>
                    </div>
                    <div className="row   g-md-5      col-0 col-md-12   ">
                      <div className="d-flex flex-column col-12 col-md-6 p-2 justify-content-center align-items-center  align-items-md-start">
                        <h3 className="  tit-20-700 text-dark text-nowrap">
                          {plan.name_ar}
                        </h3>
                        <h4 className="tit-16-400">{plan.description}</h4>
                      </div>
                      <div className="col-12 col-md-6   ">
                        <div className="d-flex  justify-content-center  justify-content-md-start">
                          <h3 className="tit-40-700 text-dark text-start text-nowrap d-flex  justify-content-center align-items-center ">
                            <Icon />
                            {plan.price}
                          </h3>
                          <h4 className="tit-20-400 pt-3 text-start text-nowrap">
                            /الشهر
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className=" row ">
                      <div className="mt-1 col-12 col-md-12 p-2     ">
                        <div className=" d-flex justify-content-between  flex-column flex-md-row  gap-md-5">
                          <h3 className=" tit-14-400 text-nowrap">
                            50 / 250 مستخدم
                          </h3>
                          <h3 className=" tit-14-400 text-nowrap">
                            متاح إضافة 150 مستخدم
                          </h3>
                        </div>
                        <div className="progress  " style={{ height: "11px" }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "25%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12  col-xl-6">
                  <div className="d-flex bg-white card border-0 rounded-4 p-5 justify-content-between justify-content-center align-items-center gap-5  align-items-md-start ">
                    <div className="d-flex flex-column">
                      <h4 className="tit-20-700 text-dark text-nowrap">
                        {tr("subscription_validity")}
                      </h4>
                      <div className="d-flex gap-3">
                        <h5 className="tit-16-400 text-nowrap">
                          {plan.start_date}
                        </h5>
                        <h5 className="tit-16-400 text-nowrap ">
                          {plan.end_date}
                        </h5>
                      </div>
                    </div>

                    <div className="d-flex gap-2 flex-column col-9 ">
                      <h4 className="tit-16-700">ادارة الاشتراك</h4>
                      <div className="d-flex   flex-column justify-content-between gap-1 flex-md-row">
                        <button className="btn planbtn-g w-100 text-nowrap">
                          حالة الإشتراك : نشط
                        </button>
                        <button className="btn planbtn-b w-100 text-nowrap">
                          تعديل الخطة
                        </button>
                        <button className="btn planbtn-r w-100 text-nowrap">
                          إيقاف الخطة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

}
