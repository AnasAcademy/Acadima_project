"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import printer from "@/assets/admin/printer.svg";
import Pen from "@/assets/admin/pen.svg";
import { useApiClient } from "@/hooks/useApiClient";
import { useLocale } from "next-intl";
import { useUserData } from "@/context/UserDataContext";
import { Placeholder } from "react-bootstrap";
import { title } from "process";

export default function CertificateTemplates({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("SidebarA");

  const { getBundleOptions, getWebinarOptions } = useUserData();

  const [dataa, setDataa] = useState(initialData);
  const [filter, setFilter] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [formState, setFormState] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const { request } = useApiClient();
  const appLocale = useLocale();
  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/certificates/templates?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );
      const respond = await res.json();
      // Handle both possible response structures
      const data = respond?.data?.data || respond?.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(respond?.data?.current_page || respond?.current_page || 1);
      setTotalPages(respond?.data?.last_page || respond?.last_page || 1);
      setPage(respond?.data?.current_page || respond?.current_page || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch data on page change, not on initial mount since we have initialData
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return; // Skip fetch on initial mount
    }
    fetchData(page);
  }, [page]);

  const handleEdit = (id) => {
    setSelectedId(id);
    setFormState("edit");
    setShowEditForm(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setConfirmMessage(t("are_you_sure_you_want_to_delete"));
    setConfirmAction(() => () => deleteTemplate(id));
    setShowConfirmModal(true);
  };

  // DELETE
  const deleteTemplate = async (id) => {
    try {
      await request({
        method: "DELETE",
        urlPath: `/certificates/templates/${id}`,
      });

      // If request didn't throw, consider it success
      setDataa((prev) => prev.filter((it) => it.id !== id));
      setFilter((prev) => prev.filter((it) => it.id !== id));
      setResultMessage(t("template_deleted_successfully"));
      setShowResultModal(true);
    } catch (err) {
      console.error("Delete failed:", err);
      setResultMessage("فشل الحذف. حاول مرة أخرى.");
      setShowResultModal(true);
      fetchData(currentPage);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const toInt = (v) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 0;
  };
  const toFloat = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };
  const normalizeIdArray = (input) => {
    if (!input) return [];
    // Already numbers?
    if (Array.isArray(input)) {
      if (input.length && typeof input[0] === "object") {
        return input
          .map((o) => toInt(o?.value ?? o?.id))
          .filter((x) => Number.isFinite(x));
      }
      return input.map((x) => toInt(x)).filter((x) => Number.isFinite(x));
    }
    // Comma-separated string fallback
    return String(input)
      .split(",")
      .map((s) => toInt(s.trim()))
      .filter((x) => Number.isFinite(x));
  };

  // Build payload identical for add/edit
  const buildTemplatePayload = (formData) => ({
    title: formData.title || "",
    image: formData.image || "",
    type: formData.type || "",
    status: formData.status || "",
    price: toFloat(formData.price),
    student_name: formData.student_name || "",
    position_x_student: toInt(formData.position_x_student),
    position_y_student: toInt(formData.position_y_student),
    font_size_student: toInt(formData.font_size_student) || 12,
    text: formData.text || "",
    position_x_text: toInt(formData.position_x_text),
    position_y_text: toInt(formData.position_y_text),
    font_size_text: toInt(formData.font_size_text) || 12,
    course_name: formData.course_name || "",
    position_x_course: toInt(formData.position_x_course),
    position_y_course: toInt(formData.position_y_course),
    font_size_course: toInt(formData.font_size_course) || 12,
    graduation_date: formData.graduation_date || "",
    position_x_date: toInt(formData.position_x_date),
    position_y_date: toInt(formData.position_y_date),
    font_size_date: toInt(formData.font_size_date) || 12,
    gpa: formData.gpa || "",
    position_x_gpa: toInt(formData.position_x_gpa),
    position_y_gpa: toInt(formData.position_y_gpa),
    font_size_gpa: toInt(formData.font_size_gpa) || 12,
    text_color: formData.text_color || "#000000",
    position_x_certificate_code: toInt(formData.position_x_certificate_code),
    position_y_certificate_code: toInt(formData.position_y_certificate_code),
    font_size_certificate_code:
      toInt(formData.font_size_certificate_code) || 12,
    locale: formData.locale || "en",
    rtl: toInt(formData.rtl),
    bundle: normalizeIdArray(formData.bundle),
    webinar: normalizeIdArray(formData.webinar),
  });

  // Build a nice error message (handles { ar, en } objects)
  const buildErrorMessage = (error, prefLang = "en", t) => {
    const pref = (prefLang || "en").split("-")[0];
    const data = error?.data || error?.response?.data;
    const status = error?.status ?? error?.code ?? data?.status;
    const rawErrors = data?.errors || error?.errors || null;

    const joiner = typeof t === "function" ? ` ${t("and")} ` : " | ";

    const pickMsg = (val) => {
      if (typeof val === "string") return val;
      if (Array.isArray(val)) return val.join(", ");
      if (val && typeof val === "object") {
        return (
          val[pref] ||
          val.en ||
          val.ar ||
          Object.values(val).map(pickMsg).filter(Boolean).join(joiner)
        );
      }
      return "";
    };

    if (status === 422 || rawErrors) {
      const parts = Object.entries(rawErrors || {}).map(([field, v]) => {
        const m = pickMsg(v);
        return m ? `${field}: ${m}` : field;
      });
      return `${parts.join(t("and"))}`;
    }

    if (data?.message) return data.message;
    return "حدث خطأ غير متوقع. حاول مرة أخرى.";
  };

  const handleSubmitAdd = async (formData) => {
    try {
      const apiData = buildTemplatePayload(formData);

      const result = await request({
        method: "POST",
        urlPath: `/certificates/templates`,
        body: apiData, // keep as object if your hook stringifies
        // headers: { "Content-Type": "application/json" } // only if your hook needs it
      });

      setResultMessage(result?.message || t("template_created_successfully"));
      setShowResultModal(true);
      setShowEditForm(false);
      await fetchData(currentPage);
    } catch (error) {
      const msg = buildErrorMessage(error, formData?.locale || appLocale, t);
      setResultMessage(msg);
      setShowResultModal(true);
    }
  };

  const handleSubmitEdit = async (formData) => {
    try {
      const originalItem = dataa.find((item) => item.id === selectedId);
      if (!originalItem) throw new Error("Original item not found");

      const apiData = buildTemplatePayload(formData);

      const result = await request({
        method: "PUT",
        urlPath: `/certificates/templates/${selectedId}`,
        body: apiData,
      });
      console.log("Edit result:", apiData);
      setResultMessage(result?.message || t("template_updated_successfully"));
      setShowResultModal(true);
      setShowEditForm(false);
      await fetchData(currentPage);
    } catch (error) {
      // Some backends succeed but return invalid JSON; keep your special case if needed:
      if (
        error?.message?.includes("Unexpected token") ||
        error?.message?.includes("SyntaxError")
      ) {
        await fetchData(currentPage);
        setResultMessage(
          t("template_updated_successfully") +
            " (تم التحديث رغم خطأ في الاستجابة)"
        );
        setShowResultModal(true);
        setShowEditForm(false);
        return;
      }

      const msg = buildErrorMessage(error, formData?.locale || appLocale, t);
      setResultMessage(msg);
      setShowResultModal(true);
    }
  };

  const trainingData = filter.map((item, index) => {
    return {
      key: item.id || index,
      columns: [
        {
          type: "text",
          value: item.translations?.[0].title || item.course_name || "-",
        },
        { type: "text", value: item.price || "-" },
        { type: "text", value: item.type || "-" },
        { type: "label", value: item.status || "-" },
        {
          type: "actionbutton",
          label: t("actions"),
          action: () => {
            setShowModal(!showModal);
            setSelectedId(item.id);
          },
          icon: Arrowdown,
          lists: [
            {
              label: t("edit"),
              action: () => handleEdit(item.id),
              icon: Pen,
            },
            {
              label: t("delete"),
              action: () => handleDelete(item.id),
              icon: X,
            },
          ],
          id: item.id,
        },
      ],
    };
  });

  const TableHead = [
    t("title"),
    t("price"),
    t("type"),
    t("status"),
    t("actions"),
  ];

  const formTitles = [
    {
      label: t("add-certificate-template"),
      type: "text",
    },
    { label: formState === "add" ? t("add") : t("edit"), type: "text" },
  ];

  const fields = [
    { name: "title", label: t("title"), type: "text" },
    { name: "image", label: t("image"), type: "text", required: false },
    {
      name: "type",
      label: t("type"),
      type: "select",
      options: [
        { value: "quiz", label: t("quiz") },
        { value: "course", label: t("course") },
        { value: "bundle", label: t("bundle") },
        { value: "attendance", label: t("attendance") },
      ],
    },
    { type: "" },
    {
      name: "bundle",
      label: t("bundles"),
      type: "multiselectsearch",
      options: getBundleOptions(),
      Placeholder: t("search"),
    },
    {
      name: "webinar",
      label: t("webinars"),
      type: "multiselectsearch",
      options: getWebinarOptions(),
      Placeholder: t("search"),
    },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: [
        { value: "draft", label: t("draft") },
        { value: "publish", label: t("publish") },
      ],
    },
    { name: "price", label: t("price"), type: "number" },

    // Student Name Fields
    { name: "student_name", label: t("student_name"), type: "text" },
    {
      name: "position_x_student",
      label: t("position_x_student"),
      type: "number",
    },
    {
      name: "position_y_student",
      label: t("position_y_student"),
      type: "number",
    },
    {
      name: "font_size_student",
      label: t("font_size_student"),
      type: "number",
    },

    // Text Fields
    { name: "text", label: t("text"), type: "textarea" },
    { name: "position_x_text", label: t("position_x_text"), type: "number" },
    { name: "position_y_text", label: t("position_y_text"), type: "number" },
    { name: "font_size_text", label: t("font_size_text"), type: "number" },

    // Course Name Fields
    { name: "course_name", label: t("course_name"), type: "text" },
    {
      name: "position_x_course",
      label: t("position_x_course"),
      type: "number",
    },
    {
      name: "position_y_course",
      label: t("position_y_course"),
      type: "number",
    },
    { name: "font_size_course", label: t("font_size_course"), type: "number" },

    // Graduation Date Fields
    { name: "graduation_date", label: t("graduation_date"), type: "date" },
    { name: "position_x_date", label: t("position_x_date"), type: "number" },
    { name: "position_y_date", label: t("position_y_date"), type: "number" },
    { name: "font_size_date", label: t("font_size_date"), type: "number" },

    // GPA Fields
    { name: "gpa", label: t("gpa"), type: "text" },
    { name: "position_x_gpa", label: t("position_x_gpa"), type: "number" },
    { name: "position_y_gpa", label: t("position_y_gpa"), type: "number" },
    { name: "font_size_gpa", label: t("font_size_gpa"), type: "number" },

    // Other Fields
    { name: "text_color", label: t("text_color"), type: "color" },
    {
      name: "position_x_certificate_code",
      label: t("position_x_certificate_code"),
      type: "number",
    },
    {
      name: "position_y_certificate_code",
      label: t("position_y_certificate_code"),
      type: "number",
    },
    {
      name: "font_size_certificate_code",
      label: t("font_size_certificate_code"),
      type: "number",
    },
    {
      name: "locale",
      label: t("locale"),
      type: "select",
      options: [
        { value: "en", label: "en" },
        { value: "ar", label: "ar" },
      ],
    },
    {
      name: "rtl",
      label: t("rtl"),
      type: "select",
      options: [
        { value: 0, label: t("no") },
        { value: 1, label: t("yes") },
      ],
    },
  ];

  return (
    <>
      {showEditForm ? (
        <div className="row g-3">
          <div className="col-12">
            <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
              <div className="d-flex justify-content-end align-items-center mb-3">
                <button
                  type="button"
                  className="btn btn-light custfontbtn d-inline-flex align-items-center gap-2"
                  onClick={() => setShowEditForm(false)}
                  aria-label="Back"
                >
                  {t?.("back")}
                </button>
              </div>
              <Editform
                fields={fields}
                formTitles={formTitles}
                handleSubmitAdd={handleSubmitAdd}
                handleSubmitEdit={handleSubmitEdit}
                setShowModal={() => setShowEditForm(false)}
                formState={formState}
                loading={loading}
                data={
                  formState === "edit"
                    ? (() => {
                        const item =
                          dataa.find((i) => i.id === selectedId) || {};
                        return {
                          ...item,
                          title: item.translations?.[0]?.title || "",
                          image: item.image || "",
                          locale: item.locale || "en",
                          rtl: String(item.rtl ?? "0"),
                          bundle: Array.isArray(item.bundle)
                            ? item.bundle // [29, 30]
                            : normalizeIdArray(item.bundle), // fallback
                          webinar: Array.isArray(item.webinar)
                            ? item.webinar
                            : normalizeIdArray(item.webinar),
                        };
                      })()
                    : {}
                }
                controlByType
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          <div className="col-12">
            <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
              {/* Add Template Button (like ElectronicServiceTable) */}
              <div className="d-flex justify-content-end align-items-center mb-3">
                <button
                  className="btn btn-light custfontbtn"
                  onClick={() => {
                    setShowEditForm(true);
                    setFormState("add");
                    setSelectedId(null);
                  }}
                >
                  {t("add-certificate-template")}
                </button>
              </div>

              <OngoingTrain
                TableHead={TableHead}
                trainingData={trainingData}
                button={false}
              />

              <div className="row justify-content-center align-items-center gap-3 mt-3">
                <button
                  disabled={currentPage === 1 || loading}
                  className="btn custfontbtn col-1"
                  onClick={() => setPage(Math.max(currentPage - 1, 1))}
                >
                  {loading ? "..." : t("previous-page")}
                </button>
                <span className="px-2 align-self-center col-1 text-center">
                  {t("page")} {currentPage}
                </span>
                <button
                  disabled={currentPage >= totalPages || loading}
                  className="btn custfontbtn col-1"
                  onClick={() => setPage(currentPage + 1)}
                >
                  {loading ? "..." : t("next-page")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_failed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>

      <AlertModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onSubmit={() => {
          if (confirmAction) {
            confirmAction();
          }
        }}
        title={t("operation_completed")}
      >
        <p className="m-0 text-center">{confirmMessage}</p>
      </AlertModal>
    </>
  );
}
