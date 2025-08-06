"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import Eye from "@/assets/admin/eye.svg";
import { useApiClient } from "@/hooks/useApiClient";
import AlertModal from "@/components/AlertModal/AlertModal";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload"; // Import the new component
import { useUserData } from "@/context/UserDataContext";

export default function ElectronicServiceTable({
  dat,
  current_page,
  last_page,
}) {
  const [currentPage, setCurrentPage] = useState(current_page);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Add this new state
  const [selectedService, setSelectedService] = useState(null); // Add this for service details
  const [Alertmssg, setAlertmssg] = useState("");
  const [Itemid, setId] = useState(null);
  const t = useTranslations("tables");
  const ts = useTranslations("SidebarA");
  const [data, setData] = useState(dat);
  const [formState, setFormState] = useState("");
  const [reqtble, setReqtble] = useState(false);
  const [reqtbledata, setReqtbledata] = useState([]);
  const {
    statuses,
    roles,
    categories,
    loading: contextLoading,
    getRoleOptions,
    getStatusOptions,
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
      const data = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/services?page=${newPage}`,
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

      const respond = await data.json();
      console.log("go", respond.data.data);
      dat = respond.data.data;
      setData(dat);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

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
    } catch (error) {
      console.error("Status update failed:", error);
      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
    }
  };

  const handleSubmitEdit = async (dataa) => {
    console.log(dataa.title);
    try {
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/services/${Itemid}`,
        {
          method: "PUT",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
          body: JSON.stringify({
            title: dataa.title || "null",
            description: dataa.description,
            price: dataa.price,
          }),
        }
      );

      const result = await response.json();

      if (result.errors) {
        const messages = Object.values(result.errors).map((error) => error.ar);
        console.log("help");
        setAlertmssg(messages.join("\n"));
        setShowAlertModal(true);
      } else {
        const updatedItem = {
          ...data.find((item) => item.id === Itemid),
          ...dataa,
        };
        setData((prev) =>
          prev.map(
            (item) => (item.id === Itemid ? updatedItem : item) // replace only the edited item
          )
        );

        setShowModal(false);
      }
    } catch (error) {
      console.error("Status update failed:", error);
      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
    }
  };

  const handleSubmitAdd = async (dataa) => {
    console.log(dataa.description);
    try {
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/services`,
        {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
          body: JSON.stringify({
            title: dataa.title,
            description: dataa.description,
            price: dataa.price,
            start_date: dataa.start_date,
            end_date: dataa.end_date,
            status: dataa.status,
            target: dataa.target,
          }),
        }
      );

      const result = await response.json();

      if (result.service) {
        console.log(result.service);
        const newItem = result.service;
        setData((prev) => [...prev, newItem]);
        // ✅ Success Alert

        alert("تمت الإضافة بنجاح ✅");
        setShowModal(false);
      } else {
        alert("فشل في الإضافة، يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      console.error("Status update failed:", err);
      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
    }
  };

  const getReqData = async (id) => {
    try {
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/services/${id}/requests`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
        }
      );

      const result = await response.json();
      console.log(result.service_users.data);
      setReqtbledata(result.service_users.data);
    } catch (error) {}
  };

  const getServiceDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/services/${id}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
        }
      );

      const result = await response.json();
      setSelectedService(result.service?.[0]);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Failed to fetch service details:", error);
      alert("فشل في جلب بيانات الخدمة");
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
    // t("admin"),
    // t("actions"),
  ];

  const reqDat = reqtbledata.map((item, index) => ({
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.id },
      { type: "text", value: item.user.full_name },
      { type: "text", value: item.status },
      { type: "text", value: item.content },
      { type: "text", value: item.created_at },
      // { type: "text", value: item.content },
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
      { type: "text", value: item.created_at },
      { type: "text", value: item.start_date },
      { type: "text", value: item.end_date },
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
            label: t("details"), // Add details button
            action: () => {
              getServiceDetails(item.id);
            },
            icon: Eye, // Use eye icon for details
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

  const formTitles = [
    {
      label:
        (formState === "add" ? t("add") + " " : t("edit") + " ") +
        ts("electronic-services"),
      type: "text",
    },
    { label: formState === "add" ? t("add") + " " : t("edit"), type: "text" },
  ];

  const fields = [
    { name: "title", label: t("title"), type: "text" },
    { name: "description", label: t("desc"), type: "text" },
    { name: "price", label: t("price"), type: "number" },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: getStatusOptions(),
    },
    { name: "target", label: t("creator"), type: "text" },
    { name: "start_date", label: t("start_date"), type: "date" },
    { name: "end_date", label: t("end_date"), type: "date" },
  ];

  return (
    <>
      {showModal ? (
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
          <Editform
            fields={fields}
            data={data.find((item) => item.id === Itemid) || {}}
            formTitles={formTitles}
            handleSubmitEdit={handleSubmitEdit}
            setShowModal={toogle}
            handleSubmitAdd={handleSubmitAdd}
            formState={formState}
          />

          <AlertModal
            show={showAlertModal}
            onClose={() => setShowAlertModal(false)}
            onSubmit={() => console.log("submitted")}
            title="? Are you sure you want to delete this user"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                DeleteUser();
              }}
            >
              <div className="mb-3">
                <p className="m-0 text-center">{Alertmssg}</p>
              </div>
            </form>
          </AlertModal>
        </div>
      ) : (
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
          <div className=" d-flex justify-content-end  ">
            {reqtble ? (
              <div className=" d-flex justify-content-between align-items-start w-100">
                <div className=" d-flex flex-column justify-content-start align-items-center gap-2">
                  <h4 className="m-0">
                    {t("service")} {data.find(item => item.id === Itemid)?.title || ""}{" "}
                  </h4>
                  {/* Use the new ExcelDownload component */}
                  <ExcelDownload
                    endpoint={`https://api.lxera.net/api/development/organization/vodafone/services/requests/${Itemid}/export`}
                    filename={`${data.find(item => item.id === Itemid)?.title || "service"}_requests`}
                    className="btn custfontbtn rounded-2"
                    disabled={!Itemid}
                    onSuccess={(message) => {
                      console.log("Download successful:", message);
                    }}
                    onError={(error) => {
                      console.error("Download error:", error);
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

          <div className="row justify-content-center align-items-center gap-3 mt-3">
            <button
              disabled={currentPage === 1}
              className="btn custfontbtn col-1"
              onClick={() => {
                fetchy("down");
              }}
            >
              {t("previous-page")}
            </button>
            <span className="px-2 align-self-center col-1 text-center">
              {t("page")} {currentPage}
            </span>
            <button
              disabled={currentPage === last_page}
              className="btn custfontbtn col-1"
              onClick={() => {
                fetchy("up");
              }}
            >
              {t("next-page")}
            </button>
          </div>
        </div>
      )}

      {/* Add the Details Modal */}
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
    </>
  );
}
