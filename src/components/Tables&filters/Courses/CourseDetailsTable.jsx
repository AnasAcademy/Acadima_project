"use client";
import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import check from "@/assets/admin/Check.svg";
import Eye from "@/assets/admin/eye.svg";
import Pen from "@/assets/admin/pen.svg";
import DashboardCards from "@/components/AdminComp/Home/DashboardCards";
import { FaUserTie, FaAward } from "react-icons/fa";
import { useApiClient } from "@/hooks/useApiClient";
import { useUserData } from "@/context/UserDataContext";
import { Placeholder } from "react-bootstrap";


export default function CourseDetailsTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
  info = {},
  type
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
  const { request } = useApiClient();
  const [course ,setCourse]= useState(false);
  const {
    getStatusOptions,
    getCategoryGroupedOptions,
    getRoleOptions,
    getClassTypeOptions,
    getProgramAttachmentOptions,
    studentOptions,
    getStudentPairs,
    getStudentOptions,
    instructors,
    getInstructorOptions,
  } = useUserData();

  // webinars data
  const [rows, setRows] = useState(initialData);
  const [filteredRows, setFilteredRows] = useState(initialData);

  // students data
  const [showStudents, setShowStudents] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsPage, setStudentsPage] = useState(1);
  const [studentsTotalPages, setStudentsTotalPages] = useState(1);
  const [currentWebinarId, setCurrentWebinarId] = useState(null);

  // student edit form state
  const [showStudentEditForm, setShowStudentEditForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentEditData, setStudentEditData] = useState({});
  const [studentEditLoading, setStudentEditLoading] = useState(false);

  // webinar edit form state
  const [showWebinarEditForm, setShowWebinarEditForm] = useState(false);
  const [selectedWebinarId, setSelectedWebinarId] = useState(null);
  const [webinarEditData, setWebinarEditData] = useState({});
  const [webinarEditLoading, setWebinarEditLoading] = useState(false);
  const [chapters, setChapters] = useState([]); 
  const [chapter, setChapter] = useState([]);
  const [itemId , setItemId] = useState(null);
  const [prereq, setPrereq] = useState([]);
    const [faqs, setFaqs] = useState([]);
  // ui
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // result modal
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const DEFAULT_QUERY = { type: type };

  // ---------- Fetch webinars ----------
  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const resp = await request({
        method: "GET",
        urlPath: "/webinars",
        query: { ...DEFAULT_QUERY, page: pageNumber },
      });

      const webinars = resp?.webinars ?? {};
      const data = Array.isArray(webinars?.data) ? webinars.data : [];

      setRows(data);
      setFilteredRows(data);
      setCurrentPage(webinars?.current_page ?? pageNumber ?? 1);
      setTotalPages(webinars?.last_page ?? 1);
      setPage(webinars?.current_page ?? pageNumber ?? 1);
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
    if (!showStudents && !showWebinarEditForm && !showStudentEditForm) {
      fetchData(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ---------- Filters + Search ----------
  const selectCardData = {
    inputs: [
      {
        title: t("categories"),
        type: "select",
        filter: "category_id",
        placeholder: t("categories-search"),
        apiKey: "category_id",
        options: getCategoryGroupedOptions(),
      },
      {
        title: t("title"),
        type: "search",
        filter: "title",
        placeholder: t("title-search"),
        apiKey: "title",
      },
      {
        title: t("teacher"),
        type: "search",
        filter: "teacher",
        placeholder: t("teacher-search"),
        apiKey: "teacher",
      },
      {
        title: t("status"),
        type: "select",
        filter: "status",
        apiKey: "status",
        options: [
          ...getStatusOptions(),
          { value: "is_draft", label: t("draft") },
        ],
      },
    ],


  };
 
   async function getChapters(id){
     console.log(id , "idddddd");
     try {
      const response = await request({
        method: "GET",
        urlPath: `/chapters/${id}`,
      });
      setChapters(response?.data.chapters || []);
      console.log(response?.data.chapters || [] , "chapters" );
    } catch (err) {
      console.log(err);
    }
        
       
   } 


      async function getPrerequisites(id) {
        console.log(id, "idddddd");
        try {
          const response = await request({
            method: "GET",
            urlPath: `/prerequisites/${id}/list`,
          });
          setPrereq(response?.prerequisites || []);
          console.log(response?.prerequisites || [], "prerequisites");
        } catch (err) {
          console.log(err);
        }
      } 



      async function getFaqs(id) {
        console.log(id, "idddddd");
        try {
          const response = await request({
            method: "GET",
            urlPath: `/faqs/${id}/list`,
          });
          setFaqs(response?.faqs || []);
          console.log(response?.faqs || [], "faqs");
        } catch (err) {
          console.log(err);
        }
      } 

    async function DelteChapters(id) {
      console.log(id, "iddddYd");
      try {
        const response = await request({
          method: "DELETE",
          urlPath: `/chapters/${id}`,
        });
        console.log(response.msg);
             setChapters((prevChapters) => {
                 prevChapters.filter((chapter) => chapter.id !== id);
             });
       
      } catch (err) {
        console.log(err);
      }
    } 






 async function reArrangeChapters(ch , id , des ,typ) {
   console.log(id, "iddddYd");
      console.log(ch, "chapterddYd");
        console.log(des, "destiontion");
   try {

     const response = await request({
       method: "POST",
       urlPath: `/chapters/change`,
       body: {
         item_id: id,
         item_type: "text_lesson",
         chapter_id: ch,
         webinar_id: itemId,
         order: des,
       },
     });

     console.log(response.message);
    //  setChapters((prevChapters) => {
    //    prevChapters.filter((chapter) => chapter.id !== id);
    //  });
   } catch (err) {
     console.log(err);
   }
 } 

 











  const handleSearch = async (filters, pageNumber = 1) => {
    setLoading(true);
    try {
      const query = { ...DEFAULT_QUERY, page: pageNumber };
      selectCardData.inputs.forEach((input) => {
        const v = filters?.[input.filter];
        if (v !== undefined && v !== null && String(v).trim() !== "") {
          query[input.apiKey || input.filter] = v;
        }
      });
      const x = filters?.category_id;
      if (x && !String(x).startsWith("__cat_")) {
        query.category_id = x;
      }
      console.log("Search query:", query);

      const resp = await request({
        method: "GET",
        urlPath: `/webinars`,
        query,
      });

      const webinars = resp?.webinars ?? {};
      const data = Array.isArray(webinars?.data) ? webinars.data : [];
      setRows(data);
      setFilteredRows(data);
      setCurrentPage(webinars?.current_page ?? pageNumber ?? 1);
      setTotalPages(webinars?.last_page ?? 1);
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setLoading(false);
    }
  };

  // ---- Webinar actions ----
  const remove = async (id) => {
    try {
      await request({ method: "DELETE", urlPath: `/webinars/${id}` });
      setRows((prev) => prev.filter((it) => it.id !== id));
      setFilteredRows((prev) => prev.filter((it) => it.id !== id));
      setResultMessage(t("service_deleted_successfully"));
    } catch (error) {
      console.error("Delete failed:", error);
      setResultMessage(t("service_delete_failed"));
    } finally {
      setShowResultModal(true);
    }
  };

  const Accept = async (id) => {
    const prevRows = rows;
    const prevFiltered = filteredRows;
    const nextRows = rows.map((it) =>
      it.id === id ? { ...it, status: "approved" } : it
    );
    const nextFiltered = filteredRows.map((it) =>
      it.id === id ? { ...it, status: "approved" } : it
    );
    setRows(nextRows);
    setFilteredRows(nextFiltered);

    try {
      const res = await request({
        method: "GET",
        urlPath: `/webinars/${id}/approve`,
      });
      if (res?.status !== "success" && res?.success !== true)
        throw new Error("Failed to approve");
      setResultMessage(t("operation_completed"));
    } catch (err) {
      console.error("Status update failed:", err);
      setRows(prevRows);
      setFilteredRows(prevFiltered);
      fetchData(page);
      setResultMessage(t("operation_failed"));
    } finally {
      setShowResultModal(true);
    }
  };

  const Decline = async (id) => {
    const prevRows = rows;
    const prevFiltered = filteredRows;
    const nextRows = rows.map((it) =>
      it.id === id ? { ...it, status: "inactive" } : it
    );
    const nextFiltered = filteredRows.map((it) =>
      it.id === id ? { ...it, status: "inactive" } : it
    );
    setRows(nextRows);
    setFilteredRows(nextFiltered);

    try {
      const res = await request({
        method: "GET",
        urlPath: `/webinars/${id}/reject`,
      });
      if (res?.status !== "success" && res?.success !== true)
        throw new Error("Failed to reject");
      setResultMessage(t("operation_completed"));
    } catch (err) {
      console.error("Rejection failed:", err);
      setRows(prevRows);
      setFilteredRows(prevFiltered);
      fetchData(page);
      setResultMessage(t("operation_failed"));
    } finally {
      setShowResultModal(true);
    }
  };

  // ---- Students: Edit (form) ----
  const openStudentEdit = (st) => {
    setSelectedStudentId(st?.id);
    setStudentEditData(st || {});
    setShowStudentEditForm(true);
  };

  const handleSubmitStudentEdit = async (formData) => {
    if (!selectedStudentId) return;

    try {
      setStudentEditLoading(true);

      // minimal diff
      const apiData = {};
      Object.entries(formData).forEach(([k, v]) => {
        const orig = studentEditData?.[k];
        const cleaned = typeof v === "string" ? v.trim() : v;
        const cleanedOrig = typeof orig === "string" ? orig.trim() : orig;
        if (
          cleaned !== cleanedOrig &&
          cleaned !== "" &&
          cleaned !== null &&
          cleaned !== undefined
        ) {
          if (k === "status") apiData[k] = String(cleaned).toLowerCase();
          else if (k === "mobile")
            apiData[k] = String(cleaned).replace(/\s+/g, "");
          else apiData[k] = cleaned;
        }
      });

      if (Object.keys(apiData).length === 0) {
        setResultMessage(t("no_changes_to_submit"));
        setShowResultModal(true);
        setStudentEditLoading(false);
        return;
      }

      await request({
        method: "PUT",
        // urlPath: `/webinars/${currentWebinarId}/students/${selectedStudentId}`,
        urlPath: `/students/${selectedStudentId}`,
        body: apiData,
      });

      // update local list
      setStudents((prev) =>
        prev.map((s) => (s.id === selectedStudentId ? { ...s, ...apiData } : s))
      );

      setResultMessage(t("operation_completed"));
      setShowStudentEditForm(false);
    } catch (e) {
      console.error("Student edit failed:", e);
      setResultMessage(t("update_failed"));
    } finally {
      setShowResultModal(true);
      setStudentEditLoading(false);
    }
  };

  // ---- Webinar: Edit (form) ----
  const openWebinarEdit = async (webinar) => {
    setCourse(true)
    setSelectedWebinarId(webinar?.id);
    setWebinarEditLoading(true);
    try {
      const res = await request({
        method: "GET",
        urlPath: `/webinars/${webinar.id}`,
      });
      // detail payload key may differ; adjust if your API wraps it:
      setWebinarEditData(res?.webinar || webinar);
    } finally {
      setWebinarEditLoading(false);
      setShowWebinarEditForm(true);
    }
  };

  // ---- Webinar: Edit (form) ----
  const handleSubmitWebinarEdit = async (formData) => {
    if (!selectedWebinarId) return;

    try {
      setWebinarEditLoading(true);

      const apiData = {};

      // 1) Arrays we care about — build them explicitly
      if (Array.isArray(formData.partners)) {
        apiData.partners = formData.partners
          .map(Number)
          .filter(Number.isFinite);
      }

      if (Array.isArray(formData.students_excluded)) {
        // If your API wants plain IDs:
        apiData.students_excluded = formData.students_excluded
          .map(Number)
          .filter(Number.isFinite);

        // If your API instead wants objects like {student_id: X}, use this line instead:
        // apiData.students_excluded = formData.students_excluded.map((id) => ({ student_id: Number(id) }));
      }

      // 2) Toggle as 0/1
      if (typeof formData.partner_instructor !== "undefined") {
        apiData.partner_instructor = Number(
          Boolean(formData.partner_instructor)
        );
      }

      // 3) Copy over changed scalars (skip the arrays we handled above)
      Object.entries(formData).forEach(([k, v]) => {
        if (["partners", "students_excluded", "partner_instructor"].includes(k))
          return;
        const orig = webinarEditData?.[k];
        const cleaned = typeof v === "string" ? v.trim() : v;
        const cleanedOrig = typeof orig === "string" ? orig.trim() : orig;
        if (
          cleaned !== cleanedOrig &&
          cleaned !== "" &&
          cleaned !== null &&
          cleaned !== undefined
        ) {
          apiData[k] = cleaned;
        }
      });

      // 4) Normalize a few numeric fields
      [
        "unattached",
        "hasGroup",
        "teacher_id",
        "category_id",
        "duration",
        "capacity",
        "price",
      ].forEach((k) => {
        if (apiData[k] !== undefined && apiData[k] !== "") {
          const n = Number(apiData[k]);
          if (!Number.isNaN(n)) apiData[k] = n;
        }
      });

      // 5) DEFENSIVE: nuke any legacy keys that might be injected upstream
      delete apiData.student_id;
      delete apiData.student_ids;
      delete apiData.student_ids_csv;

      console.log("PUT /webinars payload →", apiData); // verify in the console

      await request({
        method: "PUT",
        urlPath: `/webinars/${selectedWebinarId}`,
        body: apiData,
      });

      // optimistic update
      setRows((prev) =>
        prev.map((w) => (w.id === selectedWebinarId ? { ...w, ...apiData } : w))
      );
      setFilteredRows((prev) =>
        prev.map((w) => (w.id === selectedWebinarId ? { ...w, ...apiData } : w))
      );

      setResultMessage(t("operation_completed"));
      setShowWebinarEditForm(false);
    } catch (e) {
      console.error("Webinar edit failed:", e);
      setResultMessage(t("update_failed"));
    } finally {
      setShowResultModal(true);
      setWebinarEditLoading(false);
    }
  };
  const locale = useLocale();

 async function  EditChapter(chapter ,loc){
 
    
  console.log(chapter , "chapter to edit");

   const updatedChapter = {
     title: chapter.title,
     status: chapter.status === "active" ? "on" : "off",
     locale: locale,
     check_all_contents_pass: "on",
   };

   try {
       const response = await request({
         method: "PUT",
         urlPath: `/chapters/${chapter.id}`,
         body: updatedChapter,
       });

   console.log(response.chapter);

     setChapters((prevChapters) =>  
        prevChapters.map((ch) =>
          ch.id === chapter.id ? { ...ch, ...{
            title: chapter.title,
            status: chapter.status === "active" ? "active": "inactive",
            

          } } : ch

        )
      );
   

   } catch (error) {  
    console.log(error);
    }

  }

  async function AddChapter(chapter) {
    console.log(chapter, "chapter to edit");
     console.log(itemId , "itemidddddd");
    const updatedChapter = {
      webinar_id: itemId,
      title: chapter.title,
      status: chapter.status === "active" ? "on" : "off",
      locale: locale,
      check_all_contents_pass: "on",
    };

    try {
      const response = await request({
        method: "POST",
        urlPath: `/chapters`,
        body: updatedChapter,
      });

      console.log(response.chapter);
       console.log(response.code);

      setChapters((prevChapters) => [...prevChapters, response.chapter]);
    
    } catch (error) {
      console.log(error);
    }
  }

  // ---- Fetch students + switch table ----
  const fetchStudents = async (id, pageNum = 1) => {
    setLoading(true);
    try {
      setCurrentWebinarId(id);
      const resp = await request({
        method: "GET",
        urlPath: `/webinars/${id}/students`,
        query: { page: pageNum },
      });

      const container = resp?.students ?? resp?.data ?? {};
      const list = Array.isArray(container?.data)
        ? container.data
        : Array.isArray(resp?.students)
        ? resp.students
        : Array.isArray(resp?.data)
        ? resp.data
        : [];

      setStudents(list);
      setStudentsPage(container?.current_page ?? pageNum);
      setStudentsTotalPages(container?.last_page ?? 1);
      setShowStudents(true);
      setShowStudentEditForm(false);
    } catch (e) {
      console.error("Students fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  const backToWebinars = () => {
    setShowStudents(false);
    setCurrentWebinarId(null);
    setShowStudentEditForm(false);
    setSelectedStudentId(null);
    setShowWebinarEditForm(false);
    setSelectedWebinarId(null);
  };

  const handleToggle = async (studentId, currentValue) => {
    const isCurrentlyAllowed =
      currentValue === 1 || currentValue === "1" || currentValue === true;
    const newValue = isCurrentlyAllowed ? 0 : 1;

    const prevStudents = students;
    setStudents((list) =>
      (Array.isArray(list) ? list : []).map((s) =>
        s.id === studentId
          ? { ...s, access_to_purchased_item: String(newValue) }
          : s
      )
    );

    try {
      const resp = await request({
        method: "POST",
        urlPath: `/permission/toggle_access/${studentId}`,
        body: { value: newValue },
      });
      console.log("Toggle response:", resp);
      setResultMessage(t("access_toggled_success"));
    } catch (err) {
      console.error("Toggle failed:", err);
      setStudents(prevStudents); // rollback
      setResultMessage(t("operation_failed"));
    } finally {
      setShowResultModal(true);
    }
  };

  // ---------- Table mapping (webinars) ----------
  const trainingData = filteredRows.map((item, index) => ({
    key: item?.id ?? index,
    columns: [
      { type: "text", value: item?.id ?? "-" },
      {
        type: "user",
        name: item?.translations?.[0]?.title ?? "-",
        email: item?.category?.translations?.[0]?.title ?? "-",
      },
      { type: "text", value: item?.teacher?.full_name ?? "-" },
      {
        type: "text",
        value:
          String(item?.price ?? "") === "0" || item?.price === 0
            ? t("free")
            : item?.price ?? "-",
      },
      { type: "text", value: item?.sales ?? "-" },
      { type: "text", value: item?.capacity ?? "-" },
      { type: "text", value: item?.sales_amount ?? "-" },
      { type: "text", value: item?.created_at ?? "-" },
      { type: "label", value: item?.status ?? "-" },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {},
        icon: Arrowdown,
        lists: [
          ...(item?.status === "pending"
            ? [
                {
                  label: t("accept"),
                  action: () => Accept(item.id),
                  icon: check,
                },
                { label: t("reject"), action: () => Decline(item.id), icon: X },
              ]
            : []),
          {
            label: t("view_students"),
            action: () => fetchStudents(item.id, 1),
            icon: Eye,
          },
          { label: t("edit"), action: () => { 
            setItemId(item.id)
            getChapters(item.id)
            getPrerequisites(item.id)
            getFaqs(item.id)
            openWebinarEdit(item)}, icon: Pen },
            
          { label: t("delete"), action: () => remove(item.id), icon: X },
        ],
        id: item?.id,
      },
    ],
  }));

  const TableHead = [
    "ID",
    t("title"),
    t("teacher"),
    t("price"),
    t("revenue"),
    t("capacity"),
    t("users"),
    t("creation_date"),
    t("status"),
    t("actions"),
  ];

  // ---------- Table mapping (students) ----------
  const TableHeadStudents = [
    "ID",
    t("name"),
    `${t("rate")}(5)`,
    t("learning"),
    t("user_group"),
    t("registration_date"),
    t("status"),
    t("actions"),
  ];

  const trainingDataStudents = (Array.isArray(students) ? students : []).map(
    (st, idx) => ({
      key: st?.id ?? idx,
      columns: [
        { type: "text", value: st?.id ?? "-" },
        {
          type: "user",
          name: st?.full_name ?? st?.name ?? "-",
          email: st?.email ?? "-",
        },
        { type: "text", value: st?.rate ?? "-" },
        {
          type: "text",
          value:
            typeof st?.learning === "number"
              ? `${st.learning}%`
              : st?.learning
              ? `${st.learning}%`
              : "-%",
        },
        { type: "text", value: st?.user_group?.group_id ?? "-" },
        { type: "text", value: st?.created_at ?? "-" },
        { type: "label", value: st?.status ?? "-" },
        {
          type: "actionbutton",
          label: t("actions"),
          action: () => {},
          icon: Arrowdown,
          lists: [
            ...(st?.access_to_purchased_item === 1 ||
            st?.access_to_purchased_item === "1"
              ? [
                  {
                    label: t("block_access"),
                    action: () =>
                      handleToggle(st.id, st.access_to_purchased_item),
                    icon: X,
                  },
                ]
              : [
                  {
                    label: t("allow_access"),
                    action: () =>
                      handleToggle(st.id, st.access_to_purchased_item),
                    icon: check,
                  },
                ]),
            { label: t("edit"), action: () => openStudentEdit(st), icon: Pen },
          ],
          id: st?.id,
        },
      ],
    })
  );

  // ---------- Edit form config (students) ----------
  const studentFormTitles = [
    { label: `${t("edit")} ${t("user")}`, type: "text" },
    { label: t("edit"), type: "text" },
  ];

  const studentFields = [
    { name: "full_name", label: ts("full_name"), type: "text" },
    { name: "en_name", label: ts("en_name"), type: "text" },
    {
      name: "role_name",
      label: ts("user_role"),
      type: "select",
      options: getRoleOptions(),
    },
    { name: "email", label: ts("email"), type: "text" },
    { name: "mobile", label: ts("mobile"), type: "text" },
    { name: "password", label: ts("password"), type: "text" },
    { name: "bio", label: ts("bio"), type: "text" },
    { name: "about", label: ts("about"), type: "text" },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: getStatusOptions(),
    },
  ];

  // ---------- Edit form config (webinar) ----------
  const webinarFormTitles = [
    { label: `${t("edit")} ${t("webinar")}`, type: "text" },
    { label: t("edit"), type: "text" },
    { label: t("basic_information"), type: "text" },
    { label: t("additional_info"), type: "text" },
  ];











  const webinarFields = [
    {
      name: "type",
      label: t("type"),
      type: "select",
      options: getClassTypeOptions(),
    },
    {
      name: "unattached",
      label: t("unattached"),
      type: "select",
      options: getProgramAttachmentOptions(),
    },
    { name: "title", label: t("title"), type: "text" },
    {
      name: "course_name_certificate",
      label: t("course_name_certificate"),
      type: "text",
    },

    { name: "description", label: t("description"), type: "textarea" },
    { name: "requirements", label: t("requirements"), type: "textarea" },
    {
      type: "multiselectsearch",
      name: "students_excluded", // must match editData.students_excluded
      label: t("students_excluded"),
      placeholder: t("name-search"),
      options: getStudentPairs(), // or use loadOptions: loadStudentOptions
      // loadOptions: loadStudentOptions
    },
    {
      name: "teacher_id",
      label: t("choose_teacher"),
      type: "selectsearch",
      options: instructors,
      Placeholder: t("name-search"),
    },
    {
      type: "toggleSelectSearch",
      name: "partner_instructor",
      label: t("partner_instructor"),
      required: true, // child becomes required when checked
      toggleLabel: t("partner_instructor"),
      child: {
        name: "partners", // must match editData.partners
        label: t("teacher_id"),
        placeholder: t("name-search"),
        options: instructors, // [{value,label}] baseline; loader optional
        multiple: true, // renders MultiSearchSelect
      },
    },
    { type: "" },
    { name: "start_date", label: t("start_date"), type: "date" },
    { name: "duration", label: t("duration") + "(hrs)", type: "number" },
    {
      name: "hasGroup",
      label: t("hasGroup"),
      type: "checkbox01",
      required: false, // set true if you need it to be 1
      checkboxLabel: t("hasGroup"), // optional; otherwise falls back to `label`
    },
    { name: "capacity", label: t("capacity"), type: "number" },

    { name: "price", label: t("price"), type: "number" },
    { type: "" },
    {
      name: "category_id",
      label: t("category_id"),
      type: "select",
      options: getCategoryGroupedOptions(),
    },
    {
      name: "message_for_reviewer",
      label: t("message_for_reviewer"),
      type: "textarea",
    },
  ];

  const raw =
    (webinarEditData && webinarEditData.id === selectedWebinarId
      ? webinarEditData
      : null) ||
    rows.find((w) => w.id === selectedWebinarId) ||
    {};

  const partners = (raw?.webinar_partner_teacher || [])
    .map((p) => Number(p.teacher_id ?? p.teacher?.id))
    .filter((n) => Number.isFinite(n));

  const studentsExcluded = (raw?.students_excluded || [])
    .map((s) => Number(s.student_id ?? s.id ?? s))
    .filter(Number.isFinite);

  const editData = {
    ...raw,
    teacher_id: raw?.teacher?.id ?? raw?.teacher_id ?? "",
    partner_instructor: Boolean(raw?.partner_instructor) || partners.length > 0,
    partners,
    students_excluded: studentsExcluded,
  };

  const cards = [
    {
      title: t("totalWebinars"),
      value: info.totalWebinars,
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("totalPendingWebinars"),
      value: info.totalPendingWebinars,
      icon: <FaAward size={18} />,
    },
  ];

  return (
    <div className="row g-3">
      {/* 1) Webinar edit form view (exclusive) */}
      {showWebinarEditForm ? (
        <div className="col-12">
          <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
            <button
              type="button"
              className="btn custfontbtn mb-3"
              onClick={() => setShowWebinarEditForm(false)}
              disabled={webinarEditLoading}
            >
              {t("back")}
            </button>
            <Editform
              fields={webinarFields}
              data={editData}
              formTitles={webinarFormTitles}
              handleSubmitEdit={handleSubmitWebinarEdit}
              setShowModal={() => setShowWebinarEditForm(false)}
              formState="edit"
              loading={webinarEditLoading}
              course={course}
              chapters={chapters}
              EditChapter={EditChapter}
              setChapter={setChapter}
              chapter={chapter}
              AddChapter={AddChapter}
              DelteChapters={DelteChapters}
              setChapters={setChapters}
              reArrangeChapters={reArrangeChapters}
            />
          </div>
        </div>
      ) : /* 2) Student edit form view (exclusive when inside students list) */ showStudents &&
        showStudentEditForm ? (
        <div className="col-12">
          <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
            <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
              <span className="ms-1">
                {t("editing_student")} {selectedStudentId}
              </span>

              <button
                type="button"
                className="btn custfontbtn"
                onClick={() => setShowStudentEditForm(false)}
                disabled={studentEditLoading}
              >
                {t("back")}
              </button>
            </div>

            <Editform
              fields={studentFields}
              data={
                students.find((s) => s.id === selectedStudentId) ||
                studentEditData ||
                {}
              }
              formTitles={studentFormTitles}
              handleSubmitEdit={handleSubmitStudentEdit}
              setShowModal={() => setShowStudentEditForm(false)}
              formState="edit"
              loading={studentEditLoading}
            />
          </div>
        </div>
      ) : (
        /* 3) Tables/controls view */
        <>
          <div className="col-12">
            {!showStudents && (
              <div className="row g-3">
                <div className="col-lg-12">
                  <DashboardCards cards={cards} />
                </div>
                <SelectCard
                  selectCardData={selectCardData}
                  isTechSupport={true}
                  dataa={rows}
                  setFilter={setFilteredRows}
                  handleSearch={handleSearch}
                />
              </div>
            )}
          </div>

          <div className="col-12">
            <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
              {/* Top controls */}
              <div className="d-flex gap-2 justify-content-between align-items-center mb-3">
                {showStudents ? (
                  <div className="d-flex align-items-center justify-content-between gap-2 w-100">
                    <div className="d-flex align-items-center gap-2">
                      <ExcelDownload
                        endpoint={`/api/proxy/webinars/${currentWebinarId}/students/export`}
                        filename={`webinar_${currentWebinarId}_students`}
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

                      <span className="ms-2">{t("students_list")}</span>
                    </div>

                    <button
                      className="btn custfontbtn"
                      onClick={backToWebinars}
                      disabled={loading}
                    >
                      {t("back")}
                    </button>
                  </div>
                ) : (
                  <ExcelDownload
                    endpoint="/api/proxy/webinars/export"
                    filename="webinars_report"
                    className="gradient-btn"
                    onSuccess={() => {
                      setResultMessage(t("download_success"));
                      setShowResultModal(true);
                    }}
                    onError={() => {
                      setResultMessage(t("download_failed"));
                      setShowResultModal(true);
                    }}
                  >
                    {t("export_to_excel")}
                  </ExcelDownload>
                )}
              </div>

              {/* Table */}
              {!showStudents ? (
                <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
                  button={false}
                />
              ) : (
                <OngoingTrain
                  TableHead={TableHeadStudents}
                  trainingData={trainingDataStudents}
                  button={false}
                />
              )}

              {/* Pagination */}
              <div className="row justify-content-center align-items-center gap-3 mt-3">
                {!showStudents ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <button
                      disabled={studentsPage === 1 || loading}
                      className="btn custfontbtn col-1 "
                      onClick={() =>
                        fetchStudents(
                          currentWebinarId,
                          Math.max(studentsPage - 1, 1)
                        )
                      }
                    >
                      {loading ? "..." : t("previous-page")}
                    </button>
                    <span className="px-2 align-self-center col-1 text-center">
                      {t("page")} {studentsPage}
                    </span>
                    <button
                      disabled={studentsPage >= studentsTotalPages || loading}
                      className="btn custfontbtn col-1"
                      onClick={() =>
                        fetchStudents(currentWebinarId, studentsPage + 1)
                      }
                    >
                      {loading ? "..." : t("next-page")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Result Modal */}
      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </div>
  );
}
