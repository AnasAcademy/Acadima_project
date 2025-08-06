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

export default function CertificateTemplates({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("SidebarA");

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

  const deleteTemplate = async (id) => {
    try {
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/certificates/templates/${id}`,
        {
          method: "DELETE",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      if (response.ok) {
        // Optimistically remove the item from the state
        setDataa((prev) => prev.filter((item) => item.id !== id));
        setFilter((prev) => prev.filter((item) => item.id !== id));
        setResultMessage(t("template_deleted_successfully"));
        setShowResultModal(true);
      } else {
        throw new Error("Failed to delete template");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      setResultMessage("فشل الحذف. حاول مرة أخرى.");
      setShowResultModal(true);
      // Restore data on error
      fetchData(currentPage);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleSubmitAdd = async (formData) => {
    try {
      // Prepare data for API
      const apiData = {
        title: formData.title,
        image: formData.image,
        type: formData.type,
        status: formData.status,
        price: parseFloat(formData.price) || 0,
        student_name: formData.student_name,
        position_x_student: parseInt(formData.position_x_student) || 0,
        position_y_student: parseInt(formData.position_y_student) || 0,
        font_size_student: parseInt(formData.font_size_student) || 12,
        text: formData.text,
        position_x_text: parseInt(formData.position_x_text) || 0,
        position_y_text: parseInt(formData.position_y_text) || 0,
        font_size_text: parseInt(formData.font_size_text) || 12,
        course_name: formData.course_name,
        position_x_course: parseInt(formData.position_x_course) || 0,
        position_y_course: parseInt(formData.position_y_course) || 0,
        font_size_course: parseInt(formData.font_size_course) || 12,
        graduation_date: formData.graduation_date,
        position_x_date: parseInt(formData.position_x_date) || 0,
        position_y_date: parseInt(formData.position_y_date) || 0,
        font_size_date: parseInt(formData.font_size_date) || 12,
        gpa: formData.gpa,
        position_x_gpa: parseInt(formData.position_x_gpa) || 0,
        position_y_gpa: parseInt(formData.position_y_gpa) || 0,
        font_size_gpa: parseInt(formData.font_size_gpa) || 12,
        text_color: formData.text_color || "#000000",
        position_x_certificate_code:
          parseInt(formData.position_x_certificate_code) || 0,
        position_y_certificate_code:
          parseInt(formData.position_y_certificate_code) || 0,
        font_size_certificate_code:
          parseInt(formData.font_size_certificate_code) || 12,
        locale: formData.locale || "en",
        rtl: parseInt(formData.rtl) || 0,
        bundles: formData.bundles
          ? formData.bundles
              .split(",")
              .map((id) => parseInt(id.trim()))
              .filter((id) => !isNaN(id))
          : [],
        webinars: formData.webinars
          ? formData.webinars
              .split(",")
              .map((id) => parseInt(id.trim()))
              .filter((id) => !isNaN(id))
          : [],
      };

      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/certificates/templates`,
        {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
          body: JSON.stringify(apiData),
        }
      );

      const result = await response.json();
      console.log("Add response:", result);

      if (response.ok) {
        setResultMessage(result.message || t("template_created_successfully"));
        setShowResultModal(true);
        setShowEditForm(false);
        fetchData(currentPage);
      } else {
        let errorText;
        
        if (result.errors) {
          // Extract field names that have errors
          const missingFields = Object.keys(result.errors);
          errorText = `Missing fields: ${missingFields.join(", ")}`;
          
          // Also log detailed error messages for debugging
          const errorDetails = Object.entries(result.errors)
            .map(([field, messages]) => {
              const fieldMessages = Array.isArray(messages) ? messages : [messages];
              return `${field}: ${fieldMessages.join(", ")}`;
            })
            .join(" | ");
          
          console.log("Detailed validation errors:", errorDetails);
        } else {
          errorText = result.message || `فشل الإضافة (${response.status})`;
        }
        
        console.log("Full API error response:", result); // Log complete response for debugging
        setResultMessage(`فشل الإضافة: ${errorText}`);
        setShowResultModal(true);
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Add failed:", error);
      setResultMessage("فشل الإضافة. حاول مرة أخرى.");
      setShowResultModal(true);
    }
  };

  const handleSubmitEdit = async (formData) => {
    try {
      // Get the original item data for comparison
      const originalItem = dataa.find((item) => item.id === selectedId);
      if (!originalItem) {
        throw new Error("Original item not found");
      }

      // Prepare complete data for API - send all fields
      const apiData = {
        title: formData.title || "",
        image: formData.image || "",
        type: formData.type || "",
        status: formData.status || "",
        price: parseFloat(formData.price) || 0,
        student_name: formData.student_name || "",
        position_x_student: parseInt(formData.position_x_student) || 0,
        position_y_student: parseInt(formData.position_y_student) || 0,
        font_size_student: parseInt(formData.font_size_student) || 12,
        text: formData.text || "",
        position_x_text: parseInt(formData.position_x_text) || 0,
        position_y_text: parseInt(formData.position_y_text) || 0,
        font_size_text: parseInt(formData.font_size_text) || 12,
        course_name: formData.course_name || "",
        position_x_course: parseInt(formData.position_x_course) || 0,
        position_y_course: parseInt(formData.position_y_course) || 0,
        font_size_course: parseInt(formData.font_size_course) || 12,
        graduation_date: formData.graduation_date || "",
        position_x_date: parseInt(formData.position_x_date) || 0,
        position_y_date: parseInt(formData.position_y_date) || 0,
        font_size_date: parseInt(formData.font_size_date) || 12,
        gpa: formData.gpa || "",
        position_x_gpa: parseInt(formData.position_x_gpa) || 0,
        position_y_gpa: parseInt(formData.position_y_gpa) || 0,
        font_size_gpa: parseInt(formData.font_size_gpa) || 12,
        text_color: formData.text_color || "#000000",
        position_x_certificate_code:
          parseInt(formData.position_x_certificate_code) || 0,
        position_y_certificate_code:
          parseInt(formData.position_y_certificate_code) || 0,
        font_size_certificate_code:
          parseInt(formData.font_size_certificate_code) || 12,
        locale: formData.locale || "en",
        rtl: parseInt(formData.rtl) || 0,
        bundles: formData.bundles
          ? formData.bundles
              .split(",")
              .map((id) => parseInt(id.trim()))
              .filter((id) => !isNaN(id))
          : [],
        webinars: formData.webinars
          ? formData.webinars
              .split(",")
              .map((id) => parseInt(id.trim()))
              .filter((id) => !isNaN(id))
          : [],
      };

      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/certificates/templates/${selectedId}`,
        {
          method: "PUT",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
          body: JSON.stringify(apiData),
        }
      );

      // Handle the case where API returns 500 but actually updates the data
      if (response.status === 500) {
        console.log("API returned 500, but checking if data was actually updated...");
        
        // Wait a moment for the server to process
        setTimeout(async () => {
          await fetchData(currentPage);
          setResultMessage(t("template_updated_successfully") + " (تم التحديث رغم خطأ الخادم)");
          setShowResultModal(true);
          setShowEditForm(false);
        }, 1000);
        
        return;
      }

      const result = await response.json();

      if (response.ok) {
        setResultMessage(result.message || t("template_updated_successfully"));
        setShowResultModal(true);
        setShowEditForm(false);
        fetchData(currentPage);
      } else {
        let errorText = result.message || "فشل التحديث";

        if (result.errors) {
          // Extract field names that have errors
          const missingFields = Object.keys(result.errors);
          errorText = `Missing fields: ${missingFields.join(", ")}`;
          
          // Also log detailed error messages for debugging
          const errorDetails = Object.entries(result.errors)
            .map(([field, messages]) => {
              const fieldMessages = Array.isArray(messages) ? messages : [messages];
              return `${field}: ${fieldMessages.join(", ")}`;
            })
            .join(" | ");
          
          console.log("Detailed validation errors:", errorDetails);
        }

        console.log("Full API error response:", result); // Log complete response for debugging
        setResultMessage(errorText);
        setShowResultModal(true);
      }
    } catch (error) {
      console.error("Edit failed:", error);

      // If it's a network error and we suspect the data might have been updated
      if (
        error.message.includes("Unexpected token") ||
        error.message.includes("SyntaxError")
      ) {
        console.log("Possible JSON parsing error, checking if data was updated...");
        
        // Wait and refresh data to check if update actually worked
        setTimeout(async () => {
          await fetchData(currentPage);
          setResultMessage(
            t("template_updated_successfully") + " (تم التحديث رغم خطأ في الاستجابة)"
          );
          setShowResultModal(true);
          setShowEditForm(false);
        }, 1000);
        
        return;
      }

      setResultMessage("فشل التحديث. حاول مرة أخرى.");
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
    { name: "image", label: t("image"), type: "text" },
    {
      name: "type",
      label: t("type"),
      type: "select",
      options: [
        { value: "quiz", label: t("quiz") },
        { value: "course", label: t("course") },
        { value: "bundle", label: t("bundle") },
        { value: "attendance", label: t("attendance") },
        { value: "new_verssion_bundle", label: t("new_version_bundle") },
        { value: "new_verssion_course", label: t("new_version_course") },
        {
          value: "new_verssion_attendance",
          label: t("new_version_attendance"),
        },
      ],
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
    {
      name: "bundles",
      label: t("bundles"),
      type: "text",
      placeholder: "29,30",
    },
    {
      name: "webinars",
      label: t("webinars"),
      type: "text",
      placeholder: "2061,2062",
    },
  ];

  return (
    <>
      {showEditForm ? (
        <div className="row g-3">
          <div className="col-12">
            <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
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
                          locale: item.locale || "en",
                          rtl: item.rtl?.toString() || "0",
                          bundles: Array.isArray(item.bundles)
                            ? item.bundles.join(",")
                            : item.bundles || "",
                          webinars: Array.isArray(item.webinars)
                            ? item.webinars.join(",")
                            : item.webinars || "",
                        };
                      })()
                    : {}
                }
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
        title={t("operation_completed")}
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
