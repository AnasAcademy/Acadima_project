"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import { useUserData } from "@/context/UserDataContext";
import { useApiClient } from "@/hooks/useApiClient";

export default function GroupsTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
  const { getStatusOptions, getStudentOptions } = useUserData();
  const { request } = useApiClient();

  const [dataa, setDataa] = useState(initialData);
  const [filter, setFilter] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const [showEditForm, setShowEditForm] = useState(false);
  const [formState, setFormState] = useState(""); // "add" | "edit"
  const [selectedId, setSelectedId] = useState(null);
  const [editFormLoading, setEditFormLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const [confirmOpen, setConfirmOpen] = useState(false); // delete confirm

  // ---------- Fetch ----------
  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await request({
        method: "GET",
        urlPath: `/users/groups`,
        query: { page: pageNumber },
      });

      const data = response?.groups?.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(response?.groups?.current_page || 1);
      setTotalPages(response?.groups?.last_page || 1);
      setPage(response?.groups?.current_page || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ---------- Table ----------
  const TableHead = [
    "#",
    t("name") || "Name",
    t("capacity"),
    t("number_of_users") || "Number of Users",
    t("commission") || "Commission",
    t("coupon_discount") || "Coupon Discount",
    t("status") || "Status",
    t("actions") || "Actions",
  ];

  const trainingData = useMemo(
    () =>
      filter.map((item, index) => ({
        key: item.id || index,
        columns: [
          { type: "text", value: item.id ?? "-" },
          { type: "text", value: item.name ?? "-" },
          { type: "text", value: item.capacity ?? "-" },
          {
            type: "text",
            value: Array.isArray(item.group_users)
              ? item.group_users.length
              : "0",
          },
          {
            type: "text",
            value: item.commission != null ? `${item.commission}%` : "0%",
          },
          {
            type: "text",
            value: item.discount != null ? `${item.discount}%` : "0%",
          },
          { type: "label", value: item.status ?? "-" },
          {
            type: "actionbutton",
            label: t("actions"),
            action: () => {},
            icon: Arrowdown,
            id: item.id,
            lists: [
              {
                label: t("edit") || "Edit",
                icon: Pen,
                action: () => {
                  const ids = Array.isArray(item.users)
                    ? item.users.map((n) => Number(n)).filter(Number.isFinite)
                    : Array.isArray(item.group_users)
                    ? item.group_users
                        .map((u) => Number(u.user_id ?? u.id ?? u))
                        .filter(Number.isFinite)
                    : [];
                  setSelectedId(item.id);
                  setFormState("edit");
                  setEditFormData({
                    id: item.id,
                    name: item.name,
                    group_users: ids,
                    users: ids,
                    commission: item.commission || 0,
                    discount: item.discount || 0,
                    status: item.status,
                  });
                  setShowEditForm(true);
                },
              },
              {
                label: t("delete") || "Delete",
                icon: X,
                action: () => {
                  setSelectedId(item.id);
                  setConfirmOpen(true);
                },
              },
            ],
          },
        ],
      })),
    [filter, t]
  );


  const statusOptions = useMemo(() => {
    const raw = getStatusOptions?.() ?? [
      { value: "active", label_en: "Active", label_ar: "نشط" },
      { value: "inactive", label_en: "Inactive", label_ar: "غير نشط" },
    ];
    return raw.map((o) => ({ value: o.value, label: o.label_en || o.value }));
  }, [getStatusOptions]);

  const formTitles = [
    {
      label: (formState === "add" ? t("add") : t("edit")) + " " + t("group"),
      type: "text",
    },
    { label: formState === "add" ? t("add") : t("edit"), type: "text" },
  ];

  const fields = [
    { name: "name", label: t("name") || "Name", type: "text", required: true },
    {
      name: "users",
      label: t("group_users"),
      type: "multiselectsearch",
      options: (getStudentOptions?.() ?? []).map((s) => ({
        label:
          s.full_name ??
          s.label ??
          s.name ??
          String(s.user_id ?? s.id ?? s.value),
        value: s.user_id ?? s.id ?? s.value,
      })),
      required: false,
    },
    {
      name: "commission",
      label: (t("commission") || "Commission") + " %",
      // placeholder:
      //   t("comission_placeholder") ||
      //   "Leave empty for default percentage (Specified in settings)",
      type: "number",
      min: 0,
      max: 100,
      step: 1,
      required: false,
    },
    {
      name: "discount",
      label: t("discount") + " %",
      // placeholder: t("coupon_placeholder"),
      type: "number",
      min: 0,
      max: 100,
      step: 1,
      required: false,
    },
    {
      name: "status",
      label: t("status") || "Status",
      type: "select",
      options: statusOptions.filter((opt) => opt.value !== "pending"),
    },
  ];

  const toIds = (input) => {
    if (!input) return [];
    if (Array.isArray(input)) {
      // supports arrays of numbers, strings, or option objects
      return input
        .map((x) =>
          typeof x === "object" && x !== null ? x.value ?? x.id ?? x.user_id : x
        )
        .map(Number)
        .filter(Number.isFinite);
    }
    if (typeof input === "string") {
      return input
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map(Number)
        .filter(Number.isFinite);
    }
    return [];
  };

  const buildPayload = (formData) => {
    return {
      name: (formData.name || "").trim(),
      // prefer `users`, fall back to `group_users` if your edit form still uses it
      users: toIds(formData.users ?? formData.group_users),
      commission: Number(formData.commission ?? 0),
      // read from coupon_discount (fallback to discount)
      discount: Number(formData.coupon_discount ?? formData.discount ?? 0),
      status: formData.status || "active",
    };
  };

  const handleSubmitAdd = async (formData) => {
    setEditFormLoading(true);
    try {
      const payload = buildPayload(formData);
      await request({
        method: "POST",
        urlPath: `/users/groups`,
        body: payload,
      });
      setShowEditForm(false);
      setResultMessage(t("added_successfully") || "Added successfully");
      setShowResultModal(true);
      fetchData(currentPage);
    } catch (e) {
      setResultMessage(e?.message || "Failed to add group");
      setShowResultModal(true);
    } finally {
      setEditFormLoading(false);
    }
  };

  const handleSubmitEdit = async (formData) => {
    if (!selectedId) return;
    setEditFormLoading(true);
    try {
      const payload = buildPayload(formData);
      await request({
        method: "PUT",
        urlPath: `/users/groups/${selectedId}`,
        body: payload,
      });
      setShowEditForm(false);
      setResultMessage(t("updated_successfully") || "Updated successfully");
      setShowResultModal(true);
      fetchData(currentPage);
    } catch (e) {
      setResultMessage(e?.message || "Failed to update group");
      setShowResultModal(true);
    } finally {
      setEditFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await request({
        method: "DELETE",
        urlPath: `/users/groups/${selectedId}`,
      });
      setConfirmOpen(false);
      setResultMessage(t("deleted_successfully") || "Deleted successfully");
      setShowResultModal(true);
      fetchData(Math.max(currentPage, 1));
    } catch (e) {
      setResultMessage(e?.message || "Failed to delete group");
      setShowResultModal(true);
    }
  };

  return (
    <>
      <div className="row g-3">
        <div className="col-12">
          <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
            {/* when editing/adding, show the form INSTEAD of the table */}
            {showEditForm ? (
              <>
                {/* <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">
                  {formState === "edit" ? (ts("edit") || "Edit") : (t("add") || "Add")} {t("group") || "Group"}
                </h5>
                <button
                  className="btn custfontbtn"
                  onClick={() => setShowEditForm(false)}
                >
                  {t("back") || "Back"}
                </button>
              </div> */}

                <Editform
                  fields={fields}
                  formTitles={formTitles}
                  handleSubmitAdd={handleSubmitAdd}
                  handleSubmitEdit={handleSubmitEdit}
                  setShowModal={() => setShowEditForm(false)}
                  formState={formState}
                  loading={editFormLoading}
                  data={editFormData}
                />
              </>
            ) : (
              <>
                {/* Add group button (only when table is visible) */}
                <div className="d-flex justify-content-end mb-3">
                  <button
                    className="btn custfontbtn"
                    onClick={() => {
                      setSelectedId(null);
                      setFormState("add");
                      setEditFormData({
                        name: "",
                        users: [],
                        commission: "",
                        discount: "",
                        status: "",
                      });
                      setShowEditForm(true);
                    }}
                  >
                    {t("add") || "Add"} {t("group") || "Group"}
                  </button>
                </div>

                <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
                  button={false}
                />

                {/* pagination */}
                <div className="row justify-content-center align-items-center mt-3">
                  <button
                    disabled={currentPage === 1 || loading}
                    className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
                    onClick={() => setPage(Math.max(currentPage - 1, 1))}
                  >
                    {t("previous-page") || "Previous Page"}
                  </button>
                  <span className="mx-2 align-self-center col-md-2 col-4 text-center p-0 my-2">
                    {t("page") || "Page"} {currentPage}
                  </span>
                  <button
                    disabled={currentPage >= totalPages || loading}
                    className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
                    onClick={() => setPage(currentPage + 1)}
                  >
                    {t("next-page") || "Next Page"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirm */}
      <AlertModal
        show={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onSubmit={handleDelete}
        title={t("are_you_sure") || "Are you sure?"}
      >
        <p className="m-0 text-center">
          {t("delete_confirm") || "This will permanently delete the group."}
        </p>
      </AlertModal>

      {/* Result toast/modal */}
      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_completed") || "Operation Completed"}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </>
  );
}
