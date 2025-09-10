"use client";
import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Editform from "@/components/Editform/Editform";
import AlertModal from "@/components/AlertModal/AlertModal";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import Eye from "@/assets/admin/eye.svg";
import Swap from "@/assets/admin/swap.svg";
import { useUserData } from "@/context/UserDataContext";
import { useApiClient } from "@/hooks/useApiClient";
import { useLocale } from "next-intl";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload";
import { formatDate } from "@/functions/formatDate";


export default function CourseRegTable({
  data = [],
  current_page = 1,
  last_page = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("SidebarA");
  const td = useTranslations("settings");

  const { getStatusOptions, getRoleOptions } = useUserData();
  const { request } = useApiClient();

  // Views: list (courses) | groups (of a course) | students (of a group)
  const [view, setView] = useState("list");
  const [courseId, setCourseId] = useState(null);
  const [groupId, setGroupId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(current_page);
  const [totalPages, setTotalPages] = useState(last_page);
  const [loading, setLoading] = useState(false);

  // Data
  const [courses, setCourses] = useState(data);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);

  // Filters
  const [currentFilters, setCurrentFilters] = useState({});

  // Generic alert & result modals
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  // --- Confirmation modal (before any mutation) ---
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => () => {});

  // --- Result modal (after mutation) ---
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultTitle, setResultTitle] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  // Helper to open a confirmation modal
  const openConfirm = (title, message, onConfirm) => {
    setConfirmTitle(title || t("are_you_sure_you_want_to_delete"));
    setConfirmMessage(message || t("confirm_action"));
    setConfirmAction(() => onConfirm);
    setShowConfirmModal(true);
  };

  // -------- Only TWO Editforms --------
  // Group edit
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  // Student edit
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Delete group
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false); // (kept for compatibility; not used now)
  const [deletingGroupId, setDeletingGroupId] = useState(null);

  // Swap student between groups
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapStudent, setSwapStudent] = useState(null); // { user_id, from }
  const [swapToGroupId, setSwapToGroupId] = useState("");

  const locale = useLocale();
  const localeKey = locale?.startsWith("ar") ? "ar" : "en";

  // put this near the top of the component (replace the old extractor)
  const extractApiError = (err) => {
    const locale = localeKey; // from useLocale() above

    // Normalize to a plain object (avoid circulars)
    const safe = (() => {
      try {
        // Sometimes 'err' is already a plain object with response/data
        return JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
      } catch {
        return err;
      }
    })();

    // Gather all plausible containers to scan
    const containers = [
      safe,
      safe?.response,
      safe?.response?.data,
      safe?.data,
      safe?.body,
      safe?.errors,
      safe?.error?.data,
    ].filter(Boolean);

    // ---- Deep scan for an { errors: {...} } object anywhere ----
    const seen = new Set();
    const queue = [...containers];

    let foundErrors = null;

    while (queue.length) {
      const node = queue.shift();
      if (!node || typeof node !== "object") continue;
      if (seen.has(node)) continue;
      seen.add(node);

      // found an errors map?
      if (
        node.errors &&
        typeof node.errors === "object" &&
        !Array.isArray(node.errors) &&
        Object.keys(node.errors).length
      ) {
        foundErrors = node.errors;
        break;
      }

      // keep walking the object
      for (const k of Object.keys(node)) {
        const v = node[k];
        if (v && typeof v === "object") queue.push(v);
      }
    }

    // Build a human string from the errors map
    const buildLines = (errorsObj) => {
      const lines = Object.entries(errorsObj).map(([field, val]) => {
        // array of strings
        if (Array.isArray(val)) return `${field}: ${val.join(", ")}`;

        // localized object { ar, en } (or variants)
        if (val && typeof val === "object") {
          const ar = val.ar ?? val["ar-SA"];
          const en = val.en ?? val["en-US"];
          return `${field}: ${
            locale === "ar" ? ar ?? en : en ?? ar ?? JSON.stringify(val)
          }`;
        }

        if (typeof val === "string") return `${field}: ${val}`;
        return `${field}: ${JSON.stringify(val)}`;
      });

      return lines.join("\n");
    };

    // Top message if present anywhere
    const topMsg =
      containers.find((c) => typeof c?.message === "string")?.message || "";

    if (foundErrors) {
      const details = buildLines(foundErrors);
      return [topMsg, details].filter(Boolean).join("\n");
    }

    // ---- Final fallback: show *something* useful ----
    if (topMsg) return topMsg;

    // Show a compact raw snapshot so you can see where the data actually is
    try {
      return JSON.stringify(safe, null, 2);
    } catch {
      return t("something_wrong");
    }
  };

  // ---------------- Fetchers (GET; no confirmation needed) ----------------
  const fetchCourses = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const resp = await request({
        method: "GET",
        urlPath: `/courses/list`,
        query: { page, ...filters },
      });
      setCourses(resp?.data || []);
      setCurrentPage(resp?.current_page ?? page);
      setTotalPages(resp?.last_page ?? 1);
      setView("list");
    } catch (e) {
      console.error("Courses fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroups = async (cid, page = 1) => {
    setLoading(true);
    try {
      const resp = await request({
        method: "GET",
        urlPath: `/courses/${cid}`,
        query: { page },
      });
      setGroups(resp?.groups?.data || []);
      setCurrentPage(resp?.groups?.current_page ?? page);
      setTotalPages(resp?.groups?.last_page ?? 1);
      setCourseId(cid);
      setView("groups");
    } catch (e) {
      console.error("Groups fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (gid, page = 1) => {
    setLoading(true);
    try {
      const resp = await request({
        method: "GET",
        urlPath: `/courses/groups/${gid}/show`,
        query: { page },
      });
      setStudents(resp?.enrollments?.data || []);
      setCurrentPage(resp?.enrollments?.current_page ?? page);
      setTotalPages(resp?.enrollments?.last_page ?? 1);
      setGroupId(gid);
      setView("students");
    } catch (e) {
      console.error("Students fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Filters ----------------
  const selectCardData = useMemo(
    () => ({
      inputs: [
        {
          title: t("title"),
          type: "search",
          placeholder: t("title-search"),
          filter: "title",
          apiKey: "title",
        },
      ],
    }),
    [t]
  );

  const handleSearch = async (filters, page = 1) => {
    setCurrentFilters(filters);
    await fetchCourses(page, filters);
  };

  // ---------------- Group Edit / Delete ----------------
  const groupFields = [
    { name: "name", label: t("name"), type: "text" },
    { name: "capacity", label: t("capacity"), type: "number" },
    { name: "start_date", label: t("start_date"), type: "date" },
    { name: "end_date", label: t("end_date"), type: "date" },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: getStatusOptions(),
    },
  ];

  const openEditGroup = (g) => {
    setEditingGroup({
      id: g.id,
      name: g?.name ?? "",
      capacity: g?.capacity ?? "",
      start_date: g?.start_date ?? "",
      end_date: g?.end_date ?? "",
      status: g?.status ?? "active",
    });
    setShowGroupModal(true); // hide tables
  };

  // Now this function only prepares payload and asks for confirmation
  const handleSubmitEditGroup = async (formData) => {
    if (!editingGroup?.id) return;
    const payload = {
      name: formData.name,
      capacity: String(formData.capacity),
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: formData.status,
    };
    openConfirm(
      t("operation_completed"),
      t("do_you_want_to_proceed"),
      async () => {
        try {
          await request({
            method: "PUT",
            urlPath: `/courses/groups/${editingGroup.id}/update`,
            body: payload,
          });
          setGroups((prev) =>
            prev.map((g) =>
              g.id === editingGroup.id ? { ...g, ...payload } : g
            )
          );
          setShowGroupModal(false);
          setEditingGroup(null);
          setResultTitle(t("operation_completed"));
          setResultMessage(t("update_success"));
          setShowResultModal(true);
        } catch (e) {
          setAlertMsg(extractApiError(e));
          setShowAlertModal(true);
        } finally {
          setShowConfirmModal(false);
        }
      }
    );
  };

  const openDeleteGroup = (id) => {
    setDeletingGroupId(id);
    openConfirm(
      t("are_you_sure_you_want_to_delete"),
      t("delete_validation"),
      async () => {
        try {
          await request({
            method: "DELETE",
            urlPath: `/courses/groups/${id}/delete`,
          });
          setGroups((prev) => prev.filter((g) => g.id !== id));
          setResultTitle(t("operation_completed"));
          setResultMessage(t("delete_success"));
          setShowResultModal(true);
        } catch (e) {
          setAlertMsg(extractApiError(e));
          setShowAlertModal(true);
        } finally {
          setShowConfirmModal(false);
          setDeletingGroupId(null);
        }
      }
    );
  };

  // ---------------- Student Edit / Delete ----------------
  const studentFields = [
    { name: "full_name", label: td("full_name"), type: "text" },
    { name: "en_name", label: td("en_name"), type: "text" },
    {
      name: "role_name",
      label: td("user_role"),
      type: "select",
      options: getRoleOptions(),
    },
    { name: "email", label: td("email"), type: "text" },
    { name: "mobile", label: td("mobile"), type: "text" },
    { name: "password", label: td("password"), type: "text" },
    { name: "bio", label: td("bio"), type: "text" },
    { name: "about", label: td("about"), type: "text" },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: getStatusOptions(),
    },
  ];

  const openEditStudent = (enrollment) => {
    const user = enrollment?.user || {};
    setEditingStudent({
      id: user?.id || enrollment?.user_id,
      full_name: user?.full_name ?? "",
      email: user?.email ?? "",
      mobile: user?.mobile ?? "",
      status: user?.status ?? "",
    });
    setShowStudentModal(true); // hide tables
  };

  const handleSubmitEditStudent = async (formData) => {
    if (!editingStudent?.id) return;
    const payload = {
      full_name: formData.full_name,
      email: formData.email,
      mobile: String(formData.mobile || "").replace(/\s+/g, ""),
      status: String(formData.status || "").toLowerCase(),
    };
    openConfirm(t("confirm_update"), t("do_you_want_to_proceed"), async () => {
      try {
        await request({
          method: "PUT",
          urlPath: `/students/${editingStudent.id}`,
          body: payload,
        });
        setStudents((prev) =>
          prev.map((en) =>
            en?.user?.id === editingStudent.id ||
            en?.user_id === editingStudent.id
              ? { ...en, user: { ...(en.user || {}), ...payload } }
              : en
          )
        );
        setShowStudentModal(false);
        setEditingStudent(null);
        setResultTitle(t("operation_completed"));
        setResultMessage(t("update_success"));
        setShowResultModal(true);
      } catch (e) {
        setAlertMsg(extractApiError(e));
        setShowAlertModal(true);
      } finally {
        setShowConfirmModal(false);
      }
    });
  };

  // Delete student
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false); // (kept; not used now)
  const [deletingStudentId, setDeletingStudentId] = useState(null);

  const openDeleteStudent = (id) => {
    setDeletingStudentId(id);
    openConfirm(
      t("are_you_sure_you_want_to_delete"),
      t("delete_validation"),
      async () => {
        try {
          await request({
            method: "DELETE",
            urlPath: `/students/${id}`,
          });
          setStudents((prev) =>
            prev.filter((en) => (en?.user?.id || en?.user_id) !== id)
          );
          setResultTitle(t("operation_completed"));
          setResultMessage(t("delete_success"));
          setShowResultModal(true);
        } catch (e) {
          setAlertMsg(extractApiError(e));
          setShowAlertModal(true);
        } finally {
          setShowConfirmModal(false);
          setDeletingStudentId(null);
        }
      }
    );
  };

  // Swap student between groups
  const openSwapStudent = (enrollment) => {
    const uid = enrollment?.user?.id || enrollment?.user_id;
    setSwapStudent({ user_id: uid, from: groupId });
    const firstOther = groups.find((g) => g.id !== groupId);
    setSwapToGroupId(firstOther ? String(firstOther.id) : "");
    setShowSwapModal(true);
  };

  const confirmSwapStudent = async () => {
    if (!swapStudent?.user_id || !swapStudent?.from || !swapToGroupId) return;
    try {
      await request({
        method: "POST",
        urlPath: `/courses/groups/change`,
        body: {
          from: Number(swapStudent.from),
          to: Number(swapToGroupId),
          user_id: Number(swapStudent.user_id),
        },
      });
      setStudents((prev) =>
        prev.filter(
          (en) => (en?.user?.id || en?.user_id) !== Number(swapStudent.user_id)
        )
      );
      setShowSwapModal(false);
      setSwapStudent(null);
      setSwapToGroupId("");
      setResultTitle(t("operation_completed"));
      setResultMessage(t("update_success"));
      setShowResultModal(true);
    } catch (e) {
      setAlertMsg(extractApiError(e));
      setShowAlertModal(true);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const submitSwapStudent = (e) => {
    e?.preventDefault?.();
    openConfirm(
      t("confirm_update"),
      t("do_you_want_to_proceed"),
      confirmSwapStudent
    );
  };

  // ---------------- Pagination ----------------
  const goPrev = () => {
    if (currentPage <= 1 || loading) return;
    const next = currentPage - 1;
    if (view === "list") fetchCourses(next, currentFilters);
    if (view === "groups" && courseId) fetchGroups(courseId, next);
    if (view === "students" && groupId) fetchStudents(groupId, next);
  };

  const goNext = () => {
    if (currentPage >= totalPages || loading) return;
    const next = currentPage + 1;
    if (view === "list") fetchCourses(next, currentFilters);
    if (view === "groups" && courseId) fetchGroups(courseId, next);
    if (view === "students" && groupId) fetchStudents(groupId, next);
  };

  // ---------------- Render ----------------
  const showTables = !showGroupModal && !showStudentModal; // single switch
  const currentGroupName =
    groups.find((g) => g.id === groupId)?.name || t("unknown");

  return (
    <>
      <div className="rounded-4 p-2 container-fluid min-train-ht">
        {/* EDIT FORMS */}
        {showGroupModal && (
          <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
            <Editform
              fields={groupFields}
              data={editingGroup || {}}
              formTitles={[
                { label: t("edit") + " " + t("group"), type: "text" },
                { label: t("edit"), type: "text" },
              ]}
              handleSubmitEdit={handleSubmitEditGroup}
              setShowModal={() => {
                setShowGroupModal(false);
                setEditingGroup(null);
              }}
              formState="edit"
              loading={false}
            />
          </div>
        )}

        {showStudentModal && (
          <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
            <Editform
              fields={studentFields}
              data={editingStudent || {}}
              formTitles={[
                { label: t("edit") + " " + t("user"), type: "text" },
                { label: t("edit"), type: "text" },
              ]}
              handleSubmitEdit={handleSubmitEditStudent}
              setShowModal={() => {
                setShowStudentModal(false);
                setEditingStudent(null);
              }}
              formState="edit"
              loading={false}
            />
          </div>
        )}

        {/* TABLES */}
        {showTables && (
          <>
            {view === "list" && (
              <div className="row g-3">
                <div className="col-12">
                  <SelectCard
                    selectCardData={selectCardData}
                    dataa={courses}
                    setFilter={() => {}}
                    handleSearch={handleSearch}
                  />
                </div>

                <div className="col-12">
                  <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
                    <OngoingTrain
                      TableHead={[
                        "ID",
                        t("title"),
                        t("users"),
                        t("group"),
                        t("start_date"),
                        t("actions"),
                      ]}
                      trainingData={courses.map((item, i) => ({
                        key: item.id || i,
                        columns: [
                          { type: "text", value: item.id || "-" },
                          {
                            type: "text",
                            value: item?.translations?.[0]?.title || "-",
                          },
                          { type: "text", value: item?.sales_count || "-" },
                          { type: "text", value: item?.groups_count || "-" },
                          { type: "text", value: formatDate(item?.start_date) || "-" },
                          {
                            type: "buttons",
                            buttons: [
                              {
                                label: t("view_groups"),
                                action: () => fetchGroups(item.id, 1),
                              },
                            ],
                            id: item.id,
                          },
                        ],
                      }))}
                      button={false}
                    />
                  </div>
                </div>
              </div>
            )}

            {view === "groups" && (
              <>
                <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht ">
                  <button
                    className="btn btn-light custfontbtn"
                    onClick={() => {
                      if (view === "students" && courseId) {
                        fetchGroups(courseId, 1);
                      } else {
                        setView("list");
                        setCourseId(null);
                        setGroupId(null);
                      }
                    }}
                  >
                    {t("back")}
                  </button>
                  <OngoingTrain
                    TableHead={[
                      "#",
                      t("name"),
                      t("users"),
                      t("capacity"),
                      t("start_date"),
                      t("end_date"),
                      t("status"),
                      t("actions"),
                    ]}
                    trainingData={groups.map((g, i) => ({
                      key: g.id || i,
                      columns: [
                        { type: "text", value: i + 1 },
                        { type: "text", value: g?.name || "-" },
                        { type: "text", value: g?.enrollments_count || "-" },
                        { type: "text", value: g?.capacity || "-" },
                        { type: "label", value: formatDate(g?.start_date) || "-" },
                        { type: "text", value: formatDate(g?.end_date) || "-" },
                        { type: "label", value: g?.status || "-" },
                        {
                          type: "actionbutton",
                          label: t("actions"),
                          action: () => fetchStudents(g.id, 1),
                          icon: Arrowdown,
                          lists: [
                            {
                              label: t("view_students"),
                              action: () => fetchStudents(g.id, 1),
                              icon: Eye,
                            },
                            {
                              label: t("edit"),
                              action: () => openEditGroup(g),
                              icon: Pen,
                            },
                            {
                              label: t("delete"),
                              action: () => openDeleteGroup(g.id),
                              icon: X,
                            },
                          ],
                          id: g.id,
                        },
                      ],
                    }))}
                  />
                </div>
              </>
            )}

            {view === "students" && (
              <>
                <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
                  <div className="d-flex align-items-center justify-content-between gap-2 w-100">
                    <ExcelDownload
                      endpoint={`/api/proxy/courses/groups/${groupId}/exportExcel`}
                      filename={`webinar_${groupId}_students`}
                      className="btn custfontbtn"
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
                    <button
                      className="btn btn-light custfontbtn"
                      onClick={() => {
                        if (view === "students" && courseId) {
                          fetchGroups(courseId, 1);
                        } else {
                          setView("list");
                          setCourseId(null);
                          setGroupId(null);
                        }
                      }}
                    >
                      {t("back")}
                    </button>
                  </div>
                  <OngoingTrain
                    TableHead={[
                      "#",
                      t("user-code"),
                      t("student_name"),
                      t("registration_date"),
                      t("status"),
                      t("actions"),
                    ]}
                    trainingData={students.map((e, i) => ({
                      key: e.id || i,
                      columns: [
                        { type: "text", value: i + 1 },
                        { type: "text", value: e?.user?.user_code || "-" },
                        {
                          type: "user",
                          name: e?.user?.full_name || "-",
                          email: e?.user?.email || "-",
                          phone: e?.user?.phone || "-"  ,
                        },
                        { type: "text", value: formatDate(e?.created_at) || "-" },
                        { type: "label", value: e?.user?.status || "-" },
                        {
                          type: "actionbutton",
                          label: t("actions"),
                          action: () => openEditStudent(e),
                          icon: Arrowdown,
                          lists: [
                            {
                              label: t("swap_group"),
                              action: () => openSwapStudent(e),
                              icon: Swap,
                            },
                            {
                              label: t("edit"),
                              action: () => openEditStudent(e),
                              icon: Pen,
                            },
                            {
                              label: t("delete"),
                              action: () =>
                                openDeleteStudent(e?.user?.id || e?.user_id),
                              icon: X,
                            },
                          ],
                          id: e.id,
                        },
                      ],
                    }))}
                  />
                </div>
              </>
            )}

            <div className="row justify-content-center align-items-center gap-3 mt-3">
              <button
                disabled={currentPage === 1 || loading}
                className="btn custfontbtn col-1"
                onClick={goPrev}
              >
                {t("previous-page")}
              </button>
              <span className="px-2 align-self-center col-1 text-center">
                {t("page")} {currentPage}
              </span>
              <button
                disabled={currentPage >= totalPages || loading}
                className="btn custfontbtn col-1"
                onClick={goNext}
              >
                {t("next-page")}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Legacy delete modals kept (not used) */}
      <AlertModal
        show={showDeleteGroupModal}
        onClose={() => setShowDeleteGroupModal(false)}
        onSubmit={() => setShowDeleteGroupModal(false)}
        title={t("are_you_sure_you_want_to_delete")}
      >
        <div className="mb-3">
          <p className="m-0 text-center">{t("delete_validation")}</p>
        </div>
      </AlertModal>

      <AlertModal
        show={showDeleteStudentModal}
        onClose={() => setShowDeleteStudentModal(false)}
        onSubmit={() => setShowDeleteStudentModal(false)}
        title={t("are_you_sure_you_want_to_delete")}
      >
        <div className="mb-3">
          <p className="m-0 text-center">{t("delete_validation")}</p>
        </div>
      </AlertModal>

      {/* Swap Student Between Groups */}
      <AlertModal
        show={showSwapModal}
        onClose={() => {
          setShowSwapModal(false);
          setSwapStudent(null);
          setSwapToGroupId("");
        }}
        onSubmit={submitSwapStudent}
        title={t("swap_group") || "Swap Group"}
        btn={t("yes")}
      >
        <form onSubmit={submitSwapStudent}>
          <div className="mb-3">
            <label className="form-label">{t("current_group")}</label>
            <input
              type="text"
              className="form-control"
              value={currentGroupName}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("new_group")}</label>
            <select
              className="form-select"
              value={swapToGroupId}
              onChange={(e) => setSwapToGroupId(e.target.value)}
              required
            >
              <option value="" disabled>
                {t("choose")}
              </option>
              {groups.map((g) => (
                <option key={g.id} value={g.id} disabled={g.id === groupId}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </AlertModal>

      {/* Generic error modal */}
      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onSubmit={() => setShowAlertModal(false)}
        title={t("operation_failed")}
      >
        <div
          className="m-0 text-center"
          style={{ whiteSpace: "pre-wrap", direction: "auto" }}
        >
          {alertMsg}
        </div>
      </AlertModal>

      {/* Confirmation modal */}
      <AlertModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onSubmit={confirmAction}
        title={confirmTitle}
        btn={t("yes")}
      >
        <p className="m-0 text-center">{confirmMessage}</p>
      </AlertModal>

      {/* Result modal */}
      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={resultTitle || t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </>
  );
}
