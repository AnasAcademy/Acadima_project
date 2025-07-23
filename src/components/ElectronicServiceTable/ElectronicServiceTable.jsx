
'use client'
  import React, { useState } from 'react'
  import { useTranslations } from "next-intl";
  import Pin from "@/assets/admin/pin.svg";
  import Removebin from "@/assets/admin/removebin.svg";
  import roundimage from "@/assets/admin/personla.png";
  import FilterCard from "@/components/FilterCard/FilterCard";
  import SelectCard from "@/components/SelectCard/SelectCard";
 import AlertModal from "@/components/AlertModal/AlertModal";
  import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
  export default function ElectronicServiceTable({dat}) {

   const [showModal, setShowModal] = useState(false);

 const t = useTranslations("tables");

    const [data , setData] = useState(dat)

 const remove = async (id) => {
  try {
    const response = await fetch(
      `https://api.lxera.net/api/development/organization/vodafone/services/${id}`,
      {
        method: "DELETE",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
      }
      
   
        
    );

    const data = await response.json();

         setData((prev) => prev.filter((item) => item.id !== id));

    console.log(data.message)
 
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};


const edit = async (id) => {
  try {
    const response = await fetch(
      `https://api.lxera.net/api/development/organization/vodafone/services/${id}`,
      {
        method: "PUT",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
       body: JSON.stringify({
          price: 1200.0,
        }),
      
      }
    );

    const data = await response.json();

 

    console.log(data.message);
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};




    const TableHead = [
      "#",
      t("title"),
      t("desc"),
      t("price"),
      t("status"),
      t("creator"),
      t("creation_date"),
      t("start_date"),
      t("end_date"),
      t("actions"),
    ];

    const trainingData = data.map((item, index) => ({
      columns: [
        { type: "text", value: item.id },
        { type: "text", value: item.title },
        { type: "text", value: item.description },
        { type: "text", value: item.price },
        { type: "text", value: item.status },
        { type: "text", value: item.created_by },
        { type: "text", value: item.created_at },
        { type: "text", value: item.start_date },
        { type: "text", value: item.end_date },

        {
          type: "buttons",
          buttons: [
            {
              label: "تعديل",
              action: () =>  edit(item.id),
              color: "#48BB78",
            },
            { 
              label:"حذف",
              action: () => remove(item.id),
              color: "#fc544b",
            },
          ],
        },
      ],
    }));


    return (
      <>
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
                <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
                  button={false}
                  Icon={Pin}
                  Icon2={Removebin}
                />
              </div>

              <AlertModal
                      show={showModal}
                      onClose={() => setShowModal(false)}
                      onSubmit={handleRejectionSubmit}
                      title="رفض الطلب"
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleRejectionSubmit();
                        }}
                      >
                        <div className="mb-3">
                          <label htmlFor="reason" className="form-label">
                            سبب الرفض:
                          </label>
                          <textarea
                            id="reason"
                            className="form-control"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={1}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="detailed-reason" className="form-label">
                            تفاصيل الرفض:
                          </label>
                          <textarea
                            id="detailed-reason"
                            className="form-control"
                            value={detailedRejectionReason}
                            onChange={(e) => setDetailedRejectionReason(e.target.value)}
                            rows={4}
                            required
                          />
                        </div>
                      </form>
                    </AlertModal>
      </>
    );
  }
  