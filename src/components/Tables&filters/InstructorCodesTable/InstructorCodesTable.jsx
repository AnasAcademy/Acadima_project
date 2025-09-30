"use client";
import React, { useState } from "react";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { useTranslations } from "next-intl";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useApiClient } from "@/hooks/useApiClient";
export default function InstructorCodesTable({ dat }) {
  const t = useTranslations("tables");
  const [showAddCodeModal, setShowAddCodeModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [data, setData] = useState(dat);
  const [instructorCode, setInstructorCode] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const { request } = useApiClient();
  const handleAddCode = async () => {
    if (!instructorCode.trim()) {
      setResultMessage(t("instructor_code_required"));
      setShowResultModal(true);
      return;
    }

    try {
      const response = await request(
        {
          method: "POST",
          urlPath: `/codes/instructor_store`,
          body: {
            instructor_code: instructorCode,
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        // Update both instructor_code to submitted value and increment lst_tr_code
        setData((prevData) =>
          prevData.map((item) => ({
            ...item,
            instructor_code: instructorCode, // Update to the submitted value
            lst_tr_code: (parseInt(item.lst_tr_code) + 1).toString(),
          }))
        );

        setResultMessage(t("code_created_successfully"));
        setShowAddCodeModal(false);
        setInstructorCode("");
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

  const TableHead = [t("teacher_codes"), t("last_teacher_code")];

  const trainingData = data.map((item, index) => ({
    columns: [
      { type: "text", value: item.instructor_code || "-" },
      { type: "text", value: item.lst_tr_code || "-" },
    ],
  }));

  return (
    <>
      <div className="rounded-4 shadow-sm p-md-4 p-2 container-fluid cardbg min-train-ht">
        {/* Add Code Button */}
        {/* <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-light custfontbtn"
            onClick={() => setShowAddCodeModal(true)}
          >
            {t("add_instructor_code")}
          </button>
        </div> */}

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
          setInstructorCode("");
        }}
        onSubmit={handleAddCode}
        title={t("add_instructor_code")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCode();
          }}
        >
          <div className="mb-3">
            <label htmlFor="instructor-code" className="form-label">
              {t("instructor_code")} <span className="text-danger">*</span>
            </label>
            <input
              id="instructor-code"
              type="text"
              className="form-control"
              value={instructorCode}
              onChange={(e) => setInstructorCode(e.target.value)}
              placeholder={t("enter_instructor_code")}
              required
            />
            <p className="alertFont m-0 p-2 rounded-3 text-danger">{t("inst_code_start")}</p>
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
