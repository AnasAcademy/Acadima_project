"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocale } from "next-intl";

const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const locale = useLocale(); // e.g., "en", "ar", "ar-SA"

  const [statuses, setStatuses] = useState([]);     // [{ value, label_en, label_ar }]
  const [roles, setRoles] = useState([]);           // [{ value, label_en, label_ar }]
  const [categories, setCategories] = useState([]);
  const [targetOptions, setTargetOptions] = useState([]); // [{ value, label_en, label_ar }]
  const [bundles, setBundles] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [studentsList, setStudentsList] = useState([]);   // [{ user_id, full_name }]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ------- API helpers -------
  const API_BASE =
    "https://api.lxera.net/api/development/organization/vodafone";
  const commonHeaders = {
    "x-api-key": "1234",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
  };

  const fetchStudentsPage = async (page = 1, term = "") => {
    const url = new URL(`${API_BASE}/students/all`);
    url.searchParams.set("page", String(page));
    if (term) url.searchParams.set("full_name", term); // adjust if API differs
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: commonHeaders,
    });
    if (!res.ok) throw new Error(`Students page ${page} failed: ${res.status}`);
    return res.json();
  };

  const fetchAllStudents = async (term = "") => {
    let page = 1;
    let all = [];
    let lastPage = 1;
    do {
      const json = await fetchStudentsPage(page, term);
      const bucket = json?.students?.data || [];
      all = all.concat(bucket);

      const meta = json?.students || json || {};
      lastPage = meta.last_page ?? json?.last_page ?? page;
      page += 1;
    } while (page <= lastPage);
    return all;
  };

  const normalizeStudents = (arr) =>
    (arr || [])
      .map((s) => ({
        user_id: s?.id ?? null,
        full_name: s?.full_name,
      }))
      .filter((x) => x.user_id && x.full_name);

  // Normalize bilingual arrays like:
  // [{ label_en: "Active", label_ar: "نشط", value?: "active" }, ...]
  const normalizeBilingual = (arr) =>
    (arr || [])
      .map((s) => {
        if (typeof s === "string") {
          return { value: s, label_en: s, label_ar: s };
        }
        return {
          value: s.value ?? s.label_en ?? s.label_ar ?? "",
          label_en: s.label_en ?? s.value ?? "",
          label_ar: s.label_ar ?? s.value ?? "",
        };
      })
      .filter((x) => x.value && (x.label_en || x.label_ar));

  // Roles can arrive as:
  // - [{ id, name }] (old)
  // - [{ value, label_en, label_ar }] (bilingual)
  // - ["Admin","Student"] (strings)
  const normalizeRoles = (arr) =>
    (arr || [])
      .map((r) => {
        if (typeof r === "string") {
          const name = r;
          return {
            value: String(name).toLowerCase(),
            label_en: name,
            label_ar: name,
          };
        }
        // bilingual case
        if (r.label_en || r.label_ar || r.value) {
          const nameForLabel = r.label_en ?? r.label_ar ?? r.value ?? "";
          return {
            value: String(r.value ?? nameForLabel).toLowerCase(),
            label_en: r.label_en ?? nameForLabel,
            label_ar: r.label_ar ?? nameForLabel,
          };
        }
        // id/name legacy case
        const name = r.name ?? r.id ?? "";
        return {
          value: String(r.value ?? name).toLowerCase(),
          label_en: r.name ?? String(name),
          label_ar: r.name ?? String(name),
        };
      })
      .filter((x) => x.value && (x.label_en || x.label_ar));

  // Exposed async loader for SearchSelect (fetches ALL pages for typed term)
  const loadStudentOptions = async (term) => {
    const all = await fetchAllStudents(term || "");
    const normalized = normalizeStudents(all);
    return normalized.map((s) => ({ value: s.user_id, label: s.full_name }));
  };
  // ----------------------------------

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const studentsResponse = await fetch(`${API_BASE}/students/all?page=1`, {
        method: "GET",
        headers: commonHeaders,
      });
      const rolesResponse = await fetch(`${API_BASE}/users/roles`, {
        method: "GET",
        headers: commonHeaders,
      });
      const targetOptionsResponse = await fetch(
        `${API_BASE}/classes/targetOptions`,
        { method: "GET", headers: commonHeaders }
      );
      const bundlesResponse = await fetch(`${API_BASE}/bundles?type=program`, {
        method: "GET",
        headers: commonHeaders,
      });
      const webinarsResponse = await fetch(
        `${API_BASE}/webinars?type=webinar`,
        { method: "GET", headers: commonHeaders }
      );

      if (!studentsResponse.ok)
        throw new Error(
          `Students API error! status: ${studentsResponse.status}`
        );
      if (!rolesResponse.ok)
        throw new Error(`Roles API error! status: ${rolesResponse.status}`);
      if (!targetOptionsResponse.ok)
        throw new Error(
          `Target Options API error! status: ${targetOptionsResponse.status}`
        );
      if (!bundlesResponse.ok)
        throw new Error(`Bundles API error! status: ${bundlesResponse.status}`);
      if (!webinarsResponse.ok)
        throw new Error(
          `Webinars API error! status: ${webinarsResponse.status}`
        );

      const studentsData = await studentsResponse.json();
      const rolesData = await rolesResponse.json();
      const targetOptionsData = await targetOptionsResponse.json();
      const bundlesData = await bundlesResponse.json();
      const webinarsData = await webinarsResponse.json();

      // statuses + categories
      const statusSrc =
        studentsData.statusOptions || studentsData.statuses || [];
      setStatuses(normalizeBilingual(statusSrc)); // bilingual normalize
      setCategories(studentsData.category || studentsData.categories || []);

      // roles (bilingual-aware)
      const rolesSrc = rolesData.roles || rolesData || [];
      setRoles(normalizeRoles(rolesSrc));

      // target options (bilingual)
      const targetSrc = targetOptionsData.targetOptions || [];
      setTargetOptions(normalizeBilingual(targetSrc));

      // students (only page 1 here; async loader handles search across all pages)
      const normalizedStudents = normalizeStudents(
        studentsData?.students?.data || []
      );
      setStudentsList(normalizedStudents);

      // bundles
      const formattedBundles = bundlesData.bundles
        ? bundlesData.bundles.map((bundle) => ({
            id: bundle.id,
            title:
              bundle.translations?.[0]?.title ??
              bundle.translations?.title ??
              bundle.bundle_name_certificate ??
              `Bundle ${bundle.id}`,
            slug: bundle.slug,
            category_id: bundle.category_id,
            teacher_id: bundle.teacher_id,
            creator_id: bundle.creator_id,
            price: bundle.price,
            discount_rate: bundle.discount_rate,
          }))
        : [];
      setBundles(formattedBundles);

      // webinars
      const formattedWebinars =
        webinarsData.webinars && webinarsData.webinars.data
          ? webinarsData.webinars.data.map((webinar) => ({
              id: webinar.id,
              title:
                webinar.translations?.[0]?.title ||
                webinar.title ||
                `Webinar ${webinar.id}`,
              teacher: webinar.teacher,
              category_id: webinar.category_id,
              status: webinar.status,
            }))
          : [];
      setWebinars(formattedWebinars);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => {
    fetchUserData();
  };

  const value = {
    statuses,      // [{ value, label_en, label_ar }]
    roles,         // [{ value, label_en, label_ar }]
    categories,
    targetOptions, // [{ value, label_en, label_ar }]
    bundles,
    webinars,
    studentsList,  // [{ user_id, full_name }]
    loading,
    error,
    refetch,

    // Locale-aware getters
    getStatusOptions: () =>
      statuses.map((s) => ({
        value: (s.value || s.label_en || s.label_ar || "").toLowerCase(),
        label: locale?.startsWith("ar")
          ? s.label_ar || s.label_en
          : s.label_en || s.label_ar,
      })),

    getRoleOptions: () =>
      roles.map((r) => ({
        value: (r.value || r.label_en || r.label_ar || "").toLowerCase(),
        label: locale?.startsWith("ar")
          ? r.label_ar || r.label_en
          : r.label_en || r.label_ar,
      })),

    getTargetOptions: () =>
      targetOptions.map((t) => ({
        value: t.value,
        label: locale?.startsWith("ar")
          ? t.label_ar || t.label_en
          : t.label_en || t.label_ar,
      })),

    getCategoryOptions: () =>
      categories.map((category) => ({
        value: category.value || category,
        label: category.label || category,
      })),
    getBundleOptions: () =>
      bundles.map((bundle) => ({
        value: bundle.id,
        label: bundle.title,
      })),
    getWebinarOptions: () =>
      webinars.map((webinar) => ({
        value: webinar.id,
        label: webinar.title,
      })),

    // Students helpers
    getStudentOptions: () =>
      studentsList.map((s) => ({ value: s.user_id, label: s.full_name })),
    getStudentPairs: () => studentsList.map((s) => [s.full_name, s.user_id]),
    loadStudentOptions, // async all-pages loader for SearchSelect
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
