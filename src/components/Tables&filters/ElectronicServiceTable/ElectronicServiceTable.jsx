"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import Eye from "@/assets/admin/eye.svg";
import AlertModal from "@/components/AlertModal/AlertModal";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload";
import { useUserData } from "@/context/UserDataContext";
import check from "@/assets/admin/Check.svg";
import { useApiClient } from "@/hooks/useApiClient";
import { formatDate } from "@/functions/formatDate";

export default function ElectronicServiceTable({
  dat,
  current_page,
  last_page,
}) {
  const [currentPage, setCurrentPage] = useState(current_page);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [Alertmssg, setAlertmssg] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [Itemid, setId] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(""); // Add state for selected target
  const t = useTranslations("tables");
  const ts = useTranslations("SidebarA");
  const [data, setData] = useState(dat);
  const [formState, setFormState] = useState("");
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [reqtble, setReqtble] = useState(false);
  const [reqtbledata, setReqtbledata] = useState([]);
  const {
    loading: contextLoading,
    getStatusOptions,
    getTargetOptions,
    getBundleOptions,
    getWebinarOptions, // Add webinar options helper
  } = useUserData();
  
  const { request } = useApiClient();

  async function fetchy(stat) {
    const newPage = stat === "up" ? currentPage + 1 : currentPage - 1;

    if (stat === "up") {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }

    try {
      const respond = await request({
        method: "GET",
        urlPath: `/services?page=${newPage}`,
      });

      dat = respond.data.data;
      setData(dat);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  const remove = async (id) => {
    try {
      const response = await request({
        method: "DELETE",
        urlPath: `/services/${id}`,
      });

      // Remove the item from local state
      setData((prev) => prev.filter((item) => item.id !== id));
      setResultMessage(t("service_deleted_successfully"));

      // } else {
      // //   throw new Error(t("service_delete_failed"));
      // // }
    } catch (error) {
      console.error("Delete failed:", error);
      setResultMessage(t("service_delete_failed"));
    } finally {
      setShowResultModal(true);
    }
  };

  const handleSubmitEdit = async (formData) => {
    try {
      const originalItem = data.find((item) => item.id === Itemid);

        console.log(Itemid)
      if (!originalItem) {
        throw new Error("Original item not found");
      }

      const changedData = {};

      if (formData.title !== originalItem.title) {
        changedData.title = formData.title;
      }

      if (formData.description !== originalItem.description) {
        changedData.description = formData.description;
      }

      if (formData.price !== originalItem.price) {
        changedData.price = formData.price;
      }

      if (formData.status !== originalItem.status) {
        changedData.status = formData.status;
      }

      if (formData.target !== originalItem.target) {
        changedData.target = formData.target;
      }

      if (formData.start_date !== originalItem.start_date) {
        changedData.start_date = formData.start_date;
      }

      if (formData.end_date !== originalItem.end_date) {
        changedData.end_date = formData.end_date;
      }

      // Add bundles if target is specific_bundles
      if (formData.target === "specific_bundles" && formData.bundles) {
        changedData.bundles = formData.bundles;
      }

      // Add courses (webinars) if target is specific_webinars
      if (formData.target === "specific_webinars" && formData.webinars) {
        changedData.courses = formData.webinars; // Send as 'courses' to API
      }

      if (Object.keys(changedData).length === 0) {
        setResultMessage("no_changes_detected");
        setShowResultModal(true);
        return;
      }

      const result = await request({
        method: "PUT",
        urlPath: `/services/${Itemid}`,
        body: changedData ,
      });


      if (result.success || result.message) {
        const updatedItem = {
          ...originalItem,
          ...changedData,
          // Update local state with webinars field for consistency
          webinars:
            formData.target === "specific_webinars" && formData.webinars
              ? originalItem.webinars
                  ?.map((w) => (formData.webinars.includes(w.id) ? w : null))
                  .filter(Boolean) || []
              : originalItem.webinars,
        };

        // Remove courses from changedData as it's only for API
        delete updatedItem.courses;

        setData((prev) =>
          prev.map((item) => (item.id === Itemid ? updatedItem : item))
        );

        setShowModal(false);
        setResultMessage(t("service_updated_successfully"));
        setShowResultModal(true);
      } else {
        throw new Error(t("service_update_failed"));
      }
    } catch (error) {

  const { errors } = error.data;
const firstKey = Object.keys(errors)[0]; // e.g., "status" or "title"
 const message = errors[firstKey]?.ar;
      console.error("Update failed:", error);
      setResultMessage(message);
      setShowResultModal(true);


    }
  };

  const handleSubmitAdd = async (dataa) => {
    try {
      const requestBody = {
        title: dataa.title,
        description: dataa.description,
        price: dataa.price,
        start_date: dataa.start_date,
        end_date: dataa.end_date,
        status: dataa.status,
        target: dataa.target,
      };

      // Add bundles array if target is specific_bundles
      if (dataa.target === "specific_bundles" && dataa.bundles) {
        requestBody.bundles = dataa.bundles;
      }

      // Add courses (webinars) array if target is specific_webinars
      if (dataa.target === "specific_webinars" && dataa.webinars) {
        requestBody.courses = dataa.webinars; // Send as 'courses' to API
      }

      const result = await request({
        method: "POST",
        urlPath: `/services`,
        body: requestBody,
      });

      // if (result.errors) {
      //   const messages = Object.values(result.errors).map(
      //     (error) => error.ar || error
      //   );
      //   setAlertmssg(messages.join("\n"));
      //   setShowAlertModal(true);
      //   return;
      // }

      if (result.message || result.service) {
        if (result.service) {
          const newItem = result.service;
          setData((prev) => [...prev, newItem]);
        } else {
          const tempItem = {
            id: Date.now(),
            title: dataa.title,
            description: dataa.description,
            price: dataa.price,
            status: dataa.status,
            start_date: dataa.start_date,
            end_date: dataa.end_date,
            target: dataa.target,
            bundles: dataa.bundles || null,
            webinars: dataa.webinars || null, // Store as 'webinars' in temp item for consistency
            created_at: new Date().toISOString(),
            created_by: { full_name: "Current User" },
          };
          setData((prev) => [...prev, tempItem]);
        }

        setShowModal(false);
        setResultMessage(t("service_added_successfully"));
        setShowResultModal(true);
      } else {
        throw new Error(t("service_add_failed"));
      }
    } catch (err) {


const { errors } = err.data;

const firstKey = Object.keys(errors)[0]; // e.g., "status" or "title"
const message = errors[firstKey]?.ar;
      console.error("Update failed:", message);

   
      setResultMessage(message);
      setShowResultModal(true);
    }
  };

  const getReqData = async (id) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/services/${id}/requests`,
      });

      setReqtbledata(response.service_users.data);
    } catch (error) {}
  };

  const getServiceDetails = async (id) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/services/${id}`,
      });

      setSelectedService(response.service?.[0]);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Failed to fetch service details:", error);
      setResultMessage(t("service_details_fetch_failed"));
      setShowResultModal(true);
    }
  };

  function toogle() {
    setShowModal(!showModal);
  }

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

  const TableHeadReq = [
    "#",
    t("student"),
    t("student_name"),
    t("request_status"),
    t("request_content"),
    t("request_date"),
    t("actions"),
  ];

  // Add new state for rejection modal and reason
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // Accept function
  const Accept = async (id) => {
    try {
      const result = await request({
        method: "GET",
        urlPath: `/services/requests/${id}/approve`,
      });

      console.log("Accept result:", result.status);
      if (result[0].status === "success") {
        // Update the status in local state
        setReqtbledata((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: "approved" } : item
          )
        );
        setResultMessage(response.msg || t("request_approved_successfully"));
      } else {
        throw new Error(response.message || t("request_approval_failed"));
      }
    } catch (error) {
      console.error("Accept failed:", error);
      setResultMessage(error.message || t("request_approval_failed"));
    } finally {
      setShowResultModal(true);
    }
  };

  // Decline function - opens modal
  const openDeclineModal = (id) => {
    setSelectedRequestId(id);
    setRejectionReason("");
    setShowRejectionModal(true);
  };

  // Handle rejection submission
  const handleRejectionSubmit = async () => {
    if (!rejectionReason.trim()) {
      setResultMessage(t("rejection_reason_required"));
      setShowResultModal(true);
      return;
    }

    try {
      const result = await request({
        method: "POST",
        urlPath: `/services/requests/${selectedRequestId}/reject`,
        body: {
          message: rejectionReason,
        },
      });

      if (result.status === "success") {
        // Update the status in local state
        setReqtbledata((prevData) =>
          prevData.map((item) =>
            item.id === selectedRequestId
              ? { ...item, status: "rejected" }
              : item
          )
        );
        setResultMessage(response.msg || t("request_rejected_successfully"));
        setShowRejectionModal(false);
        setRejectionReason("");
        setSelectedRequestId(null);
      } else {
        throw new Error(response.message || t("request_rejection_failed"));
      }
    } catch (error) {
      console.error("Decline failed:", error);
      setResultMessage(error.message || t("request_rejection_failed"));
    } finally {
      setShowResultModal(true);
    }
  };

  // Fixed reqDat with proper conditional rendering and correct function call
  const reqDat = reqtbledata.map((item, index) => ({
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.id },
      { type: "text", value: item.user.full_name },
      { type: "text", value: item.status },
      { type: "text", value: item.content },
      { type: "text", value: formatDate(item.created_at) },
      // Only show actions column if status is pending
      ...(item.status === "pending"
        ? [
            {
              type: "actionbutton",
              label: t("actions"),
              action: () => {
                setId(item.id); // Fixed: Changed from setSelectedId to setId
              },
              icon: Arrowdown,
              lists: [
                {
                  label: t("accept"),
                  action: () => Accept(item.id),
                  icon: check,
                },
                {
                  label: t("reject"),
                  action: () => openDeclineModal(item.id),
                  icon: X,
                },
              ],
              id: item.id,
            },
          ]
        : [{ type: "text", value: "-" }]), // Show dash if not pending
    ],
  }));

  const trainingData = data.map((item, index) => ({
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.title },
      { type: "text", value: item.description },
      { type: "text", value: item.price },
      { type: "label", value: item.status },
      { type: "text", value: item.created_by.full_name },
      { type: "text", value: formatDate(item.created_at) },
      { type: "text", value: formatDate(item.start_date) },
      { type: "text", value: formatDate(item.end_date) },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);
          setId(item.id);
          setFormState("edit");
        },
        icon: Arrowdown,
        color: "#48BB78",
        lists: [
          {
            label: t("details"),
            action: () => {
              getServiceDetails(item.id);
            },
            icon: Eye,
          },
          {
            label: t("requests"),
            action: () => {
              setId(item.id);
              getReqData(item.id);
              setReqtble(true);
            },
            icon: Pen,
          },
          {
            label: t("edit"),
            action: () => {
              setShowModal(!showModal);
              setId(item.id);
              setFormState("edit");
            },
            icon: Pen,
          },
          {
            label: t("delete"),
            action: () => remove(item.id),
            icon: X,
          },
        ],
        id: item.id,
      },
    ],
  }));

  const getDynamicFields = () => {
    // Get translatable target options
    const translatedTargetOptions = getTargetOptions().map((option) => ({
      value: option.value,
      label: t(option.value) || option.label, // Translate the option label
    }));

    const baseFields = [
      { name: "title", label: t("title"), type: "text" },
      { name: "description", label: t("desc"), type: "text" },
      { name: "price", label: t("price"), type: "number" },
      {
        name: "status",
        label: t("status"),
        type: "select",
        options: getStatusOptions().filter(
          (o) => String(o?.value).toLowerCase() !== "pending"
        ),
      },
      {
        name: "target",
        label: t("target"),
        type: "select",
        options: translatedTargetOptions,
        onChange: (value) => setSelectedTarget(value),
      },
      // Always include bundles field, but conditionally show/hide it
      {
        name: "bundles",
        label: t("select_bundles"),
        type: "multiselect",
        options: getBundleOptions(),
        multiple: true,
        required: selectedTarget === "specific_bundles",
        hidden: selectedTarget !== "specific_bundles", // Add hidden property
        style: {
          display: selectedTarget === "specific_bundles" ? "block" : "none",
        },
      },
      // Always include webinars field, but conditionally show/hide it
      {
        name: "webinars", // Changed from "courses" to "webinars" for consistency
        label: t("select_webinars"),
        type: "multiselect",
        options: getWebinarOptions(),
        multiple: true,
        required: selectedTarget === "specific_webinars",
        hidden: selectedTarget !== "specific_webinars", // Add hidden property
        style: {
          display: selectedTarget === "specific_webinars" ? "block" : "none",
        },
      },
      { name: "start_date", label: t("start_date"), type: "date" },
      { name: "end_date", label: t("end_date"), type: "date" },
    ];

    return baseFields;
  };

  const formTitles = [
    {
      label:
        (formState === "add" ? t("add") + " " : t("edit") + " ") +
        ts("electronic-services"),
      type: "text",
    },
    { label: formState === "add" ? t("add") + " " : t("edit"), type: "text" },
  ];

  // Set initial target value when editing
  React.useEffect(() => {
    if (formState === "edit" && Itemid) {
      const item = data.find((item) => item.id === Itemid);
      if (item) {
        setSelectedTarget(item.target || "");
      }
    } else if (formState === "add") {
      setSelectedTarget("");
    }
  }, [formState, Itemid, data]);

  return (
    <>
      {showModal ? (
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
          <Editform
            fields={getDynamicFields()}
            data={{
              ...(data.find((item) => item.id === Itemid) || {}),
              bundles:
                data
                  .find((item) => item.id === Itemid)
                  ?.bundles?.map((b) => b.id) || [],
              webinars:
                data
                  .find((item) => item.id === Itemid)
                  ?.webinars?.map((c) => c.id) || [], // Use 'courses' field from API data
              start_date:
                data
                  .find((item) => item.id === Itemid)
                  ?.start_date?.split("T")[0] || "",
              end_date:
                data
                  .find((item) => item.id === Itemid)
                  ?.end_date?.split("T")[0] || "",
              target: data.find((item) => item.id === Itemid)?.target || "",
            }}
            formTitles={formTitles}
            handleSubmitEdit={handleSubmitEdit}
            setShowModal={toogle}
            handleSubmitAdd={handleSubmitAdd}
            formState={formState}
          />

          <AlertModal
            show={showAlertModal}
            onClose={() => setShowAlertModal(false)}
            onSubmit={() => setShowAlertModal(false)}
            title={t("validation_error")}
          >
            <div className="mb-3">
              <p className="m-0 text-center">{Alertmssg}</p>
            </div>
          </AlertModal>
        </div>
      ) : (
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
          <div className=" d-flex justify-content-end  ">
            {reqtble ? (
              <div className=" d-flex justify-content-between align-items-start w-100">
                <div className=" d-flex flex-column justify-content-start align-items-center gap-2">
                  <h4 className="m-0">
                    {t("service")}{" "}
                    {data.find((item) => item.id === Itemid)?.title || ""}{" "}
                  </h4>
                  <ExcelDownload
                    endpoint={`/api/proxy/services/requests/${Itemid}/export`}
                    filename={`${
                      data.find((item) => item.id === Itemid)?.title ||
                      "service"
                    }_requests`}
                    className="btn custfontbtn rounded-2"
                    disabled={!Itemid}
                    onSuccess={() => {
                      setResultMessage(t("download_success"));
                      setShowResultModal(true);
                    }}
                    onError={() => {
                      setResultMessage(t("download_failed"));
                      setShowResultModal(true);
                    }}
                  >
                    Excel
                  </ExcelDownload>
                </div>

                <button
                  className="btn btn-light custfontbtn"
                  onClick={() => {
                    setReqtble(false);
                  }}
                >
                  {t("back")}
                </button>
              </div>
            ) : (
              <button
                className="btn btn-light custfontbtn"
                onClick={() => {
                  setShowModal(true);
                  setId(null);
                  setFormState("add");
                }}
              >
                {t("add_new_service")}
              </button>
            )}
          </div>
          {reqtble ? (
            <>
              <OngoingTrain TableHead={TableHeadReq} trainingData={reqDat} />
            </>
          ) : (
            <OngoingTrain TableHead={TableHead} trainingData={trainingData} />
          )}

          <div className="row justify-content-center align-items-center mt-3">
            <button
              disabled={currentPage === 1}
              className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
              onClick={() => {
                fetchy("down");
              }}
            >
              {t("previous-page")}
            </button>
            <span className="mx-2 align-self-center col-md-2 col-4 text-center p-0 my-2">
              {t("page")} {currentPage}
            </span>
            <button
              disabled={currentPage === last_page}
              className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
              onClick={() => {
                fetchy("up");
              }}
            >
              {t("next-page")}
            </button>
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      <AlertModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onSubmit={() => setShowDetailsModal(false)}
        title={t("service_details")}
      >
        {selectedService && (
          <div className="text-end">
            <div className="mb-3">
              <strong>{t("service_title")}:</strong>
              <p className="m-1">{selectedService.title}</p>
            </div>

            <div className="mb-3">
              <strong>{t("service_price")}:</strong>
              <p className="m-1">
                {selectedService.price} {t("currency")}
              </p>
            </div>

            <div className="mb-3">
              <strong>{t("service_description")}:</strong>
              <p className="m-1">
                {selectedService.description || t("no_description")}
              </p>
            </div>

            {selectedService.apply_link && (
              <div className="mb-3">
                <strong>{t("apply_link")}:</strong>
                <p className="m-1">
                  <a
                    href={selectedService.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedService.apply_link}
                  </a>
                </p>
              </div>
            )}

            {selectedService.review_link && (
              <div className="mb-3">
                <strong>{t("review_link")}:</strong>
                <p className="m-1">
                  <a
                    href={selectedService.review_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedService.review_link}
                  </a>
                </p>
              </div>
            )}

            <div className="mb-3">
              <strong>{t("service_status")}:</strong>
              <p className="m-1">
                {selectedService.status === "active"
                  ? t("active")
                  : t("inactive")}
              </p>
            </div>

            <div className="mb-3">
              <strong>{t("service_creator")}:</strong>
              <p className="m-1">
                {selectedService.created_by?.full_name || "Admin"}
              </p>
            </div>

            <div className="mb-3">
              <strong>{t("service_creation_date")}:</strong>
              <p className="m-1">
                {new Date(selectedService.created_at).toLocaleString("ar-SA")}
              </p>
            </div>

            <div className="mb-3">
              <strong>{t("service_last_update")}:</strong>
              <p className="m-1">
                {new Date(selectedService.updated_at).toLocaleString("ar-SA")}
              </p>
            </div>
          </div>
        )}
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

      {/* Rejection Reason Modal */}
      <AlertModal
        show={showRejectionModal}
        onClose={() => {
          setShowRejectionModal(false);
          setRejectionReason("");
          setSelectedRequestId(null);
        }}
        onSubmit={handleRejectionSubmit}
        title={t("reject_request")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRejectionSubmit();
          }}
        >
          <div className="mb-3">
            <label htmlFor="rejection-reason" className="form-label">
              {t("rejection_reason")} <span className="text-danger">*</span>
            </label>
            <textarea
              id="rejection-reason"
              className="form-control"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              placeholder={t("enter_rejection_reason")}
              required
            />
          </div>
        </form>
      </AlertModal>
    </>
  );
}
