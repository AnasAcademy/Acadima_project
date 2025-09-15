"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Editform from "@/components/Editform/Editform";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useUserData } from "@/context/UserDataContext";
import { useApiClient } from "@/hooks/useApiClient";
import { useRouter } from "next/navigation";

export default function NewUserForm() {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
  const { getRoleOptions, getStatusOptions } = useUserData();
  const { request } = useApiClient();
  const router = useRouter();

  const [formState] = useState("add");
  const [submitting, setSubmitting] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const formTitles = [
    { label: "", type: "text" },
    { label: t("add"), type: "text" },
  ];

  const fields = [
    { name: "full_name", label: ts("full_name"), type: "text" },
    { name: "username", label: ts("user_name"), type: "text" },
    {
      name: "role_name",
      label: ts("user_role"),
      type: "select",
      options: getRoleOptions(), // [{value:1,label:'user'}, ...]
    },
    { name: "password", label: ts("password"), type: "text" },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: getStatusOptions(),
    },
  ];

  // 👇 rename to handleSubmitAdd
  const handleSubmitAdd = async (formData) => {
    console.log("handleSubmitAdd called with:", formData);

    const required = [
      "full_name",
      "username",
      "role_name",
      "password",
      "status",
    ];
    const missing = required.filter((k) => {
      const v = formData[k];
      return v === undefined || v === null || String(v).trim() === "";
    });

    if (missing.length) {
      setResultMessage("يرجى ملء جميع الحقول المطلوبة.");
      setShowResultModal(true);
      return;
    }

    const payload = {
      username: String(formData.username).trim(),
      full_name: String(formData.full_name).trim(),
      role_id: Number(formData.role_name), // option.value (numeric)
      password: String(formData.password),
      status: String(formData.status).toLowerCase(),
    };

    try {
      setSubmitting(true);
      console.log("Submitting new user:", payload);

      const res = await request({
        method: "POST",
        urlPath: `/users`,
        body: payload,
      });

      if (res?.msg) {
        setResultMessage(res.msg); // e.g. max users reached
        setShowResultModal(true);
        return;
      }

      setResultMessage(t("operation_completed"));
      setShowResultModal(true);

      // ✅ redirect after success (optional)
      router.push("/org/user-management/users/staff");
    } catch (err) {
      const apiMsg =
        err?.response?.data?.msg ||
        err?.data?.msg ||
        "فشل الإضافة. حاول مرة أخرى.";
      setResultMessage(apiMsg);
      setShowResultModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="col-12 bg-white rounded-4 shadow-sm p-4">
        <Editform
          fields={fields}
          formState={formState} // "add"
          formTitles={formTitles}
          handleSubmitAdd={handleSubmitAdd} // ✅ use the correct prop
          loading={submitting}
          setShowModal={() => router.push("/org/user-management/users/staff")} // runs on close/cancel if Editform calls it
        />
      </div>

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </>
  );
}
