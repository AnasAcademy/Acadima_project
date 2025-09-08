"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
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
  const isAr = locale?.startsWith("ar");

  const [statuses, setStatuses] = useState([]); // [{ value, label_en, label_ar }]
  const [roles, setRoles] = useState([]); // [{ value, label_en, label_ar }]
  const [categories, setCategories] = useState([]);
  const [targetOptions, setTargetOptions] = useState([]); // [{ value, label_en, label_ar }]
  const [bundles, setBundles] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [studentsList, setStudentsList] = useState([]); // page-1 snapshot [{ user_id, full_name }]
  const [instructors, setInstructors] = useState([]); // [{ value:id, label:full_name }]

  // From /programs_statistics/bundles -> data.batches
  const [studyClasses, setStudyClasses] = useState([]); // array of batches

  // From /webinars
  const [classesType, setClassesType] = useState(""); // e.g. "webinar"
  const [classTypeOptions, setClassTypeOptions] = useState([]); // normalized typeOptions

  // From /financial/documents
  const [financialAmountTypeOptions, setFinancialAmountTypeOptions] = useState([]); // normalized bilingual
  const [financialDocumentTypeOptions, setFinancialDocumentTypeOptions] = useState([]); // normalized bilingual

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // prevent duplicate fetch in React 18 dev StrictMode
  const hasFetchedRef = useRef(false);

  // ------- API helpers -------
  const API_BASE =
    "https://api.lxera.net/api/development/organization/vodafone";
  const commonHeaders = {
    "x-api-key": "1234",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
  };

  // safe fetch that handles 429 + non-JSON responses (HTML error pages)
  const fetchJson = async (url, opts, { retries = 1 } = {}) => {
    let attempt = 0;
    while (true) {
      const res = await fetch(url, opts);
      const ct = res.headers.get("content-type") || "";

      if (!res.ok) {
        if (res.status === 429 && attempt < retries) {
          await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
          attempt++;
          continue;
        }
        let body = "";
        try {
          body = ct.includes("application/json")
            ? JSON.stringify(await res.json()).slice(0, 300)
            : (await res.text()).slice(0, 300);
        } catch {}
        throw new Error(
          `${url} failed: ${res.status} ${res.statusText} ${body}`
        );
      }

      if (ct.includes("application/json")) return res.json();
      const txt = await res.text();
      try {
        return JSON.parse(txt);
      } catch {
        return txt;
      }
    }
  };

  const fetchStudentsPage = async (page = 1, term = "") => {
    const url = new URL(`${API_BASE}/students/all`);
    url.searchParams.set("page", String(page));
    if (term) url.searchParams.set("full_name", term);
    const json = await fetchJson(url.toString(), {
      method: "GET",
      headers: commonHeaders,
    });
    return json;
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

  // ---- Cached "all students" ----
  const allStudentsCacheRef = useRef({
    list: /** @type {{value:number,label:string}[]} */ ([]),
    map: /** @type {Map<string,string>} */ (new Map()),
    loaded: false,
    loadingPromise: null,
  });

  const ensureAllStudentsLoaded = async () => {
    const cache = allStudentsCacheRef.current;
    if (cache.loaded && cache.list.length) return cache;
    if (cache.loadingPromise) {
      await cache.loadingPromise;
      return allStudentsCacheRef.current;
    }
    cache.loadingPromise = (async () => {
      const all = await fetchAllStudents("");
      const normalized = normalizeStudents(all);
      cache.list = normalized.map((s) => ({
        value: s.user_id,
        label: s.full_name,
      }));
      cache.map = new Map(cache.list.map((x) => [String(x.value), x.label]));
      cache.loaded = true;
      cache.loadingPromise = null;
    })();
    await cache.loadingPromise;
    return allStudentsCacheRef.current;
  };

  // Resolve labels for specific IDs (used by MultiSearchSelect to show chips)
  const resolveStudentLabels = async (ids = []) => {
    if (!ids?.length) return [];
    const cache = await ensureAllStudentsLoaded();
    return ids
      .map((id) => ({
        value: id,
        label: cache.map.get(String(id)) || String(id),
      }))
      .filter((x) => x.label);
  };

  // Normalize bilingual arrays like [{ label_en, label_ar, value? }]
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

  // Roles can arrive in various shapes
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
        if (r.label_en || r.label_ar || r.value) {
          const nameForLabel = r.label_en ?? r.label_ar ?? r.value ?? "";
          return {
            value: String(r.value ?? nameForLabel).toLowerCase(),
            label_en: r.label_en ?? nameForLabel,
            label_ar: r.label_ar ?? nameForLabel,
          };
        }
        const name = r.name ?? r.id ?? "";
        return {
          value: String(r.value ?? name).toLowerCase(),
          label_en: r.name ?? String(name),
          label_ar: r.name ?? String(name),
        };
      })
      .filter((x) => x.value && (x.label_en || x.label_ar));

  // Async loader for search (fetches ALL pages)
  const loadStudentOptions = async (term) => {
    const all = await fetchAllStudents(term || "");
    const normalized = normalizeStudents(all);
    return normalized.map((s) => ({ value: s.user_id, label: s.full_name }));
  };

  const pickTransTitle = (obj = {}) => {
    const tr = Array.isArray(obj.translations) ? obj.translations : [];
    const ar = tr.find((x) => String(x.locale || "").startsWith("ar"))?.title;
    const en = tr.find((x) => String(x.locale || "").startsWith("en"))?.title;
    return isAr ? ar ?? en : en ?? ar;
  };

  const catLabel = (c = {}) =>
    pickTransTitle(c) ||
    c.label ||
    c.name ||
    c.title ||
    c.slug ||
    `#${c.id ?? ""}`;

  const fetchUserData = async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    setLoading(true);
    setError(null);

    try {
      const [
        studentsData,
        rolesData,
        targetOptionsData,
        bundlesData,
        webinarsData,
        instructorsData,
        programsStatsData,     // for batches
        financialDocsData,     // for amount_types_options + types_options
      ] = await Promise.all([
        fetchJson(
          `${API_BASE}/students/all?page=1`,
          { method: "GET", headers: commonHeaders },
          { retries: 1 }
        ),
        fetchJson(
          `${API_BASE}/users/roles`,
          { method: "GET", headers: commonHeaders },
          { retries: 1 }
        ),
        fetchJson(
          `${API_BASE}/classes/targetOptions`,
          { method: "GET", headers: commonHeaders },
          { retries: 1 }
        ),
        fetchJson(
          `${API_BASE}/bundles?type=program`,
          { method: "GET", headers: commonHeaders },
          { retries: 1 }
        ),
        fetchJson(
          `${API_BASE}/webinars`,
          { method: "GET", headers: commonHeaders },
          { retries: 1 }
        ),
        fetchJson(
          `${API_BASE}/instructors`,
          { method: "GET", headers: commonHeaders },
          { retries: 1 }
        ),
        fetchJson(
          `${API_BASE}/programs_statistics/bundles?page=1`,
          { method: "GET", headers: commonHeaders },
          { retries: 1 }
        ),
        fetchJson(
          `${API_BASE}/financial/documents?page=1`,
          { method: "GET", headers: commonHeaders },
          { retries: 1 }
        ),
      ]);

      // ---- Instructors ----
      const instructorsSrc = Array.isArray(instructorsData)
        ? instructorsData
        : instructorsData?.instructors?.data ??
          instructorsData?.instructors ??
          instructorsData?.data ??
          [];
      const formattedInstructors = (instructorsSrc || [])
        .map((ins) => ({ value: ins.id, label: ins.full_name }))
        .filter((i) => i.value && i.label);
      setInstructors(formattedInstructors);

      // ---- statuses + categories (students response) ----
      const statusSrc =
        studentsData.statusOptions || studentsData.statuses || [];
      setStatuses(normalizeBilingual(statusSrc));
      setCategories(studentsData.category || studentsData.categories || []);

      // ---- roles ----
      const rolesSrc = rolesData.roles || rolesData || [];
      setRoles(normalizeRoles(rolesSrc));

      // ---- target options ----
      const targetSrc = targetOptionsData.targetOptions || [];
      setTargetOptions(normalizeBilingual(targetSrc));

      // ---- students (page 1 snapshot) ----
      const normalizedStudents = normalizeStudents(
        studentsData?.students?.data || []
      );
      setStudentsList(normalizedStudents);

      // ---- bundles ----
      const bundlesSrc = Array.isArray(bundlesData?.bundles?.data)
        ? bundlesData.bundles.data
        : Array.isArray(bundlesData?.bundles)
        ? bundlesData.bundles
        : Array.isArray(bundlesData?.data)
        ? bundlesData.data
        : Array.isArray(bundlesData)
        ? bundlesData
        : [];
      const formattedBundles = bundlesSrc.map((bundle) => ({
        id: bundle.id,
        title: bundle?.bundle_name_certificate ?? `Bundle ${bundle.id}`,
        slug: bundle.slug,
        category_id: bundle.category_id,
        teacher_id: bundle.teacher_id,
        creator_id: bundle.creator_id,
        price: bundle.price,
        discount_rate: bundle.discount_rate,
      }));
      setBundles(formattedBundles);

      // ---- webinars + metadata ----
      const w = webinarsData || {};
      const list = w.webinars && w.webinars.data ? w.webinars.data : [];

      const formattedWebinars = list.map((webinar) => ({
        id: webinar.id,
        title:
          webinar?.translations?.[0]?.title ||
          webinar?.title ||
          `Webinar ${webinar.id}`,
        teacher: webinar?.teacher,
        category_id: webinar?.category_id,
        status: webinar?.status,
      }));
      setWebinars(formattedWebinars);

      if (typeof w.classesType === "string") {
        setClassesType(w.classesType);
      } else if (typeof w.classType === "string") {
        setClassesType(w.classType);
      }

      const typeOpts = w.typeOptions || w.types || [];
      setClassTypeOptions(normalizeBilingual(typeOpts));

      const categoryFromWebinars =
        w.categoryOptions || w.categories || w.category_list || [];
      if (Array.isArray(categoryFromWebinars) && categoryFromWebinars.length) {
        setCategories(categoryFromWebinars);
      }

      // ---- study classes (from /programs_statistics/bundles -> data.batches) ----
      const batches = programsStatsData?.data?.batches ?? [];
      setStudyClasses(Array.isArray(batches) ? batches : []);

      // ---- financial option lists (from /financial/documents) ----
      const fin = financialDocsData || {};
      const finAmount = fin.amount_types_options || fin.data?.amount_types_options || [];
      const finTypes  = fin.types_options || fin.data?.types_options || [];

      setFinancialAmountTypeOptions(normalizeBilingual(finAmount));
      setFinancialDocumentTypeOptions(normalizeBilingual(finTypes));
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
    hasFetchedRef.current = false; // allow manual refetch
    fetchUserData();
  };

  // --- STATIC: Program Attachment Options ---
  const programAttachmentOptions = [
    {
      label_en: "attached to program",
      label_ar: "دورة خاصة ببرنامج",
      value: 1,
    },
    { label_en: "unattached", label_ar: "دورة مستقلة", value: 0 },
  ];

  const value = {
    // raw data
    statuses,
    roles,
    categories,
    targetOptions,
    bundles,
    webinars,
    studentsList,
    instructors,
    studyClasses, // batches from programs_statistics/bundles

    // metadata from /webinars
    classesType, // e.g. "webinar"
    classTypeOptions, // normalized bilingual array

    // financial option lists (normalized bilingual)
    financialAmountTypeOptions,
    financialDocumentTypeOptions,

    // state
    loading,
    error,
    refetch,

    // Locale-aware getters
    getStatusOptions: () =>
      statuses.map((s) => ({
        value: (s.value || s.label_en || s.label_ar || "").toLowerCase(),
        label: isAr ? s.label_ar || s.label_en : s.label_en || s.label_ar,
      })),

    getRoleOptions: () =>
      roles.map((r) => ({
        value: (r.value || r.label_en || r.label_ar || "").toLowerCase(),
        label: isAr ? r.label_ar || r.label_en : r.label_en || r.label_ar,
      })),

    getTargetOptions: () =>
      targetOptions.map((t) => ({
        value: t.value,
        label: isAr ? t.label_ar || t.label_en : t.label_en || t.label_ar,
      })),

    getCategoryOptions: () =>
      categories.map((category) => ({
        value: category.value ?? category.id ?? category,
        label:
          category.label ??
          category.name ??
          category.title ??
          String(category.value ?? category.id ?? category),
      })),

    // GROUPED — parents are disabled, subcategories selectable
    getCategoryGroupedOptions: () => {
      const out = [];
      (categories || []).forEach((parent) => {
        const subs =
          parent?.sub_categories ||
          parent?.subcategories ||
          parent?.children ||
          [];
        const parentLbl = catLabel(parent);

        out.push({
          value: `__cat_${parent.id ?? parentLbl}`,
          label: parentLbl,
          disabled: true,
          className: "option-header",
          __isHeader: true,
        });

        if (Array.isArray(subs) && subs.length) {
          subs.forEach((child) => {
            out.push({
              value: child.id,
              label: `\u00A0\u00A0\u00A0${catLabel(child)}`,
            });
          });
        } else {
          out.push({
            value: parent.id,
            label: `\u00A0\u00A0\u00A0${parentLbl}`,
          });
        }
      });
      return out;
    },

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

    // class types — value always English key
    getClassTypeOptions: () =>
      classTypeOptions.map((o) => ({
        value: (o.label_en || "").toLowerCase(),
        label: isAr ? o.label_ar || o.label_en : o.label_en || o.label_ar,
      })),

    // Program attachment (static)
    getProgramAttachmentOptions: () =>
      programAttachmentOptions.map((o) => ({
        value: o.value,
        label: isAr ? o.label_ar || o.label_en : o.label_en || o.label_ar,
      })),

    // Instructors
    getInstructorOptions: () => instructors,

    // Students helpers
    getStudentOptions: () =>
      studentsList.map((s) => ({ value: s.user_id, label: s.full_name })),
    getStudentPairs: () => studentsList.map((s) => [s.full_name, s.user_id]),
    loadStudentOptions, // all-pages async search
    getStudentOptionsAll: async () => {
      const cache = await ensureAllStudentsLoaded();
      return cache.list;
    },
    resolveStudentLabels, // async (ids:number[]) => [{value,label}]

    // Batches as select options (title shown, id sent)
    getStudyClassOptions: () =>
      (studyClasses || []).map((b) => ({
        value: b.id,
        label: b.title || `#${b.id}`,
      })),

    // Financial option getters (value uses English key lowercase)
    getFinancialAmountTypeOptions: () =>
      (financialAmountTypeOptions || []).map((o) => ({
        value: (o.label_en || o.value || "").toLowerCase(),
        label: isAr ? o.label_ar || o.label_en : o.label_en || o.label_ar,
      })),
    getFinancialDocumentTypeOptions: () =>
      (financialDocumentTypeOptions || []).map((o) => ({
        value: (o.label_en || o.value || "").toLowerCase(),
        label: isAr ? o.label_ar || o.label_en : o.label_en || o.label_ar,
      })),
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
