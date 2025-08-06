"use client";
import React, { useState } from "react";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { useTranslations } from "next-intl";
import Editform from "@/components/Editform/Editform";
import AlertModal from "@/components/AlertModal/AlertModal";

export default function StudentsCodeTable({ dat }) {
  const ts = useTranslations("SidebarA");
  const [showModal, setShowModal] = useState(false);
  const [showAddCodeModal, setShowAddCodeModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [formState, setFormState] = useState("");
  const [data, setData] = useState(dat);
  const [Itemid, setId] = useState(null);
  const [studentCode, setStudentCode] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const t = useTranslations("tables");
  
  const TableHead = [t("student_code"), t("last_student_code")];

  const trainingData = data.map((item, index) => ({
    columns: [
      { type: "text", value: item.student_code },
      { type: "text", value: item.lst_sd_code },
    ],
  }));

  const handleAddCode = async () => {
    if (!studentCode.trim()) {
      setResultMessage(t("student_code_required"));
      setShowResultModal(true);
      return;
    }

    try {
      const response = await fetch(
        "https://api.lxera.net/api/development/organization/vodafone/codes",
        {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
          body: JSON.stringify({
            student_code: studentCode,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        // Update the data to increment lst_sd_code by 1
        // setData(prevData => 
        //   prevData.map(item => ({
        //     ...item,
        //     student_code: (parseInt(item.student_code) + 1)
        //   }))
        // );

        setResultMessage(t("code_created_successfully"));
        setShowAddCodeModal(false);
        setStudentCode("");
      } else {
        throw new Error(result.message || t("code_creation_failed"));
      }
    } catch (error) {
      console.error("Failed to create code:", error);
      setResultMessage(error.message || t("code_creation_failed"));
    } finally {
      setShowResultModal(true);
    }
  };

  return (
    <>
      <div className="rounded-4 shadow-sm p-md-4 p-2 container-fluid cardbg min-train-ht">
        {/* Add Code Button */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-light custfontbtn"
            onClick={() => setShowAddCodeModal(true)}
          >
            {t("add_student_code")}
          </button>
        </div>

        <OngoingTrain
          TableHead={TableHead}
          trainingData={trainingData}
          //    button={false}
          //    Icon={Pin}
          //    Icon2={Removebin}
        />
      </div>

      {/* Add Code Modal */}
      <AlertModal
        show={showAddCodeModal}
        onClose={() => {
          setShowAddCodeModal(false);
          setStudentCode("");
        }}
        onSubmit={handleAddCode}
        title={t("add_student_code")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCode();
          }}
        >
          <div className="mb-3">
            <label htmlFor="student-code" className="form-label">
              {t("student_code")} <span className="text-danger">*</span>
            </label>
            <input
              id="student-code"
              type="text"
              className="form-control"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder={t("enter_student_code")}
              required
            />
            <p className="alertFont m-0 p-2 rounded-3 text-danger">{t("code_start")}</p>
          </div>
        </form>
      </AlertModal>

      {/* Result Modal */}
      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_result")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </>
  );
}
