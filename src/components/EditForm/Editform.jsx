"use client";
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations, useLocale } from "next-intl";
import { useUserData } from "@/context/UserDataContext";
import { set } from "date-fns";
import Drag from "@/assets/admin/drag.svg";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import OngoingTrain from "../AdminComp/ongoingTrain/OngoingTrain";
// import { GripVertical } from "lucide-react"; // optional icon
/** Lightweight searchable select with optional async loader (no extra deps) */
function SearchSelect({
  name,
  value,
  options = [],
  placeholder = "Search",
  disabled = false,
  minChars = 3,
  onChange, // expects number or "" to clear
  loadOptions,
  // async (term) => Promise<{label,value}[]>
}) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [remote, setRemote] = useState([]);
  const [loadingRemote, setLoadingRemote] = useState(false);

  const boxRef = useRef(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Async search with debounce (if loader provided)
  React.useEffect(() => {
    if (!loadOptions) return;
    const s = term.trim();
    if (s.length < minChars) {
      setRemote([]);
      return;
    }

    let cancelled = false;
    setLoadingRemote(true);
    const id = setTimeout(async () => {
      try {
        const res = await loadOptions(s);
        if (!cancelled) setRemote(Array.isArray(res) ? res : []);
      } catch {
        if (!cancelled) setRemote([]);
      } finally {
        if (!cancelled) setLoadingRemote(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [term, minChars, loadOptions]);

  const filteredLocal = React.useMemo(() => {
    const s = term.trim().toLowerCase();
    if (s.length < minChars) return [];
    return options.filter((opt) => String(opt.label).toLowerCase().includes(s));
  }, [term, options, minChars]);

  const list = loadOptions ? remote : filteredLocal;

  // Prefer showing label from union of local + remote lists
  const allKnown = React.useMemo(
    () => (loadOptions ? [...options, ...remote] : options),
    [options, remote, loadOptions]
  );
  const selectedLabel =
    allKnown.find((o) => String(o.value) === String(value))?.label || "";

  const handlePick = (opt) => {
    onChange(opt?.value ?? "");
    setOpen(false);
    setTerm("");
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange("");
    setTerm("");
  };

  return (
    <div
      ref={boxRef}
      className="rounded-3"
      style={{
        border: "1px solid #E3E3E3",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        onClick={() => !disabled && setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "8px 10px",
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            color: selectedLabel ? "#111" : "#9aa0a6",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
          }}
          title={selectedLabel || placeholder}
        >
          {selectedLabel || placeholder}
        </div>
        <div style={{ fontSize: 10, opacity: 0.7 }}>{open ? "▲" : "▼"}</div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 20,
            borderTop: "1px solid #E3E3E3",
            background: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,.06)",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          {/* Search input */}
          <div style={{ padding: 8 }}>
            <input
              placeholder={placeholder}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              disabled={disabled}
              autoFocus
              style={{
                width: "100%",
                border: "1px solid #E3E3E3",
                borderRadius: 4,
                padding: "8px 10px",
                outline: "none",
              }}
            />
          </div>

          {/* Results */}
          <div
            style={{ maxHeight: 220, overflowY: "auto", padding: "0 8px 8px" }}
          >
            {term.trim().length < minChars ? (
              <div
                style={{
                  padding: "8px 10px",
                  color: "#6b7280",
                  fontSize: 12,
                  textAlign: "right",
                }}
              >
                Please enter {minChars} or more characters
              </div>
            ) : loadOptions && loadingRemote ? (
              <div
                style={{
                  padding: "8px 10px",
                  color: "#6b7280",
                  fontSize: 12,
                  textAlign: "right",
                }}
              >
                جارٍ البحث...
              </div>
            ) : list.length === 0 ? (
              <div
                style={{
                  padding: "8px 10px",
                  color: "#6b7280",
                  fontSize: 12,
                  textAlign: "right",
                }}
              >
                لا توجد نتائج
              </div>
            ) : (
              list.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => handlePick(opt)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 6,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              padding: "8px 10px",
              borderTop: "1px solid #F1F1F1",
            }}
          >
            <button
              type="button"
              onClick={clearSelection}
              disabled={disabled}
              className="btn btn-light"
              style={{ padding: "4px 10px" }}
            >
              مسح
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn btn-light"
              style={{ padding: "4px 10px" }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MultiSearchSelect({
  name,
  value = [],          // array of {label, value}
  options = [],        // local options
  placeholder = "Search",
  disabled = false,
  minChars = 3,
  onChange,            // expects array of {label, value}
  loadOptions,         // async (term) => Promise<{label, value}[]>
}) {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [remote, setRemote] = React.useState([]);
  const [loadingRemote, setLoadingRemote] = React.useState(false);
  const boxRef = React.useRef(null);

  // --- NEW: normalize `value` into an array of numbers ---
  const selected = React.useMemo(() => {
    if (Array.isArray(value)) {
      return value
        .map(v => (typeof v === "object" && v !== null ? v.value ?? v.id ?? v.user_id : v))
        .map(Number)
        .filter(Number.isFinite);
    }
    if (typeof value === "string") {
      return value
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map(Number)
        .filter(Number.isFinite);
    }
    if (value && typeof value === "object" && "value" in value) {
      const n = Number(value.value);
      return Number.isFinite(n) ? [n] : [];
    }
    return [];
  }, [value]);
  // -------------------------------------------------------










  
  // normalize local options
  const normalize = (arr) =>
    (arr || []).map(o => (Array.isArray(o) ? { label: o[0], value: o[1] } : o));

  const baseOptions = normalize(options);

  // close dropdown on outside click
  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // async search
  React.useEffect(() => {
    if (!loadOptions) return;
    const s = term.trim();
    if (s.length < minChars) {
      setRemote([]);
      return;
    }
    let cancelled = false;
    setLoadingRemote(true);
    const id = setTimeout(async () => {
      try {
        const res = await loadOptions(s);
        if (!cancelled) setRemote(normalize(Array.isArray(res) ? res : [])); // normalize remote too
      } catch {
        if (!cancelled) setRemote([]);
      } finally {
        if (!cancelled) setLoadingRemote(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [term, minChars, loadOptions]);

  // local filter
  const filteredLocal = React.useMemo(() => {
    const s = term.trim().toLowerCase();
    if (s.length < minChars) return [];
    return baseOptions.filter(o => String(o.label).toLowerCase().includes(s));
  }, [term, baseOptions, minChars]);

  // merged results
  const merged = React.useMemo(() => {
    const seen = new Set();
    const selectedSet = new Set(selected.map(v => String(v)));
    const source = loadOptions ? remote : filteredLocal;

    const arr = source.filter(o => !selectedSet.has(String(o.value)));
    return arr.filter(o => {
      const k = String(o.value);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [remote, filteredLocal, loadOptions, selected]);

  // handlers
  const addValue = (opt) => {
    onChange([...(value || []), opt]);
    setTerm("");
  };
  const removeValue = (val) => {
    onChange(value.filter((v) => v.value !== val.value));
  };
  const clearAll = () => onChange([]);

  return (
    <div
      ref={boxRef}
      className="rounded-3"
      style={{ border: "1px solid #E3E3E3", background: "#fff", position: "relative" }}
    >
      {/* chips */}
      <div
        onClick={() => !disabled && setOpen(v => !v)}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", cursor: disabled ? "not-allowed" : "pointer", flexWrap: "wrap", minHeight: 40 }}
      >
        {value.length === 0 ? (
          <div style={{ color: "#9aa0a6" }}>{placeholder}</div>
        ) : (
          value.map((opt) => (
            <span
              key={opt.value}
              className="badge text-bg-light"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              onClick={(e) => e.stopPropagation()}
            >
              {opt.label}
              <button
                type="button"
                className="btn btn-sm btn-link p-0"
                onClick={() => removeValue(opt)}
              >
                ×
              </button>
            </span>
          ))
        )}
        <div style={{ marginLeft: "auto", fontSize: 10, opacity: 0.7 }}>{open ? "▲" : "▼"}</div>
      </div>

      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20, borderTop: "1px solid #E3E3E3", background: "#fff", boxShadow: "0 6px 18px rgba(0,0,0,.06)", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
          <div style={{ padding: 8 }}>
            <input
              placeholder={placeholder}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              disabled={disabled}
              autoFocus
              style={{ width: "100%", border: "1px solid #E3E3E3", borderRadius: 4, padding: "8px 10px", outline: "none" }}
            />
          </div>

          <div style={{ maxHeight: 220, overflowY: "auto", padding: "0 8px 8px" }}>
            {term.trim().length < minChars ? (
              <div style={{ padding: "8px 10px", color: "#6b7280", fontSize: 12, textAlign: "right" }}>
                Please enter {minChars} or more characters
              </div>
            ) : loadOptions && loadingRemote ? (
              <div style={{ padding: "8px 10px", color: "#6b7280", fontSize: 12, textAlign: "right" }}>
                جارٍ البحث...
              </div>
            ) : merged.length === 0 ? (
              <div style={{ padding: "8px 10px", color: "#6b7280", fontSize: 12, textAlign: "right" }}>
                لا توجد نتائج
              </div>
            ) : (
              merged.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => addValue(opt)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 6,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              padding: "8px 10px",
              borderTop: "1px solid #F1F1F1",
            }}
          >
            <button type="button" className="btn btn-light" onClick={clearAll} disabled={disabled}>
              مسح
            </button>
            <button type="button" className="btn btn-light" onClick={() => setOpen(false)}>
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default function Editform({
  fields,
  data,
  formTitles,
  handleSubmitEdit,
  setShowModal,
  handleSubmitAdd,
  formState,
  loading = false,
  extraForm,
  setId,
  reqtble,
  setReqTable,
  sub,
  setSub,
  extraformquiz,
  questions,
  deleteQuetion,
  question,
  setQuestion,
  updateQuetion,
  controlByType = false,
  setQuestions,
  AddQuetion,
  setQType,
  reArrangeQuestions,
  qId,
  course,
  chapters,
  EditChapter,
  chapter,
  setChapter,
  AddChapter,
  DelteChapters,
  setChapters,
  reArrangeChapters,
}) {
  const [addquestion, setAddquestion] = useState(false);
  const [multiqes, setMultiqes] = useState(false);
  const [add, setAdd] = useState(false);
  const [chapterId, setChapterId] = useState("");
  const t = useTranslations("tables");
  const { loadStudentOptions } = useUserData();

  const [imagePreview, setImagePreview] = React.useState(null);

  const onImageFileChange = (e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    formik.setFieldValue("image_file", file); // keep file separately
    setImagePreview(URL.createObjectURL(file)); // local preview
  };

  const clearImageFile = () => {
    formik.setFieldValue("image_file", null);
    setImagePreview(null);
  };

  // cleanup object URL
  React.useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const addField = () => {
    const updated = [...reqtble, { title: "", description: "" }];
    setReqTable(updated);

    formik.setFieldValue("requirements", updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    console.log("here", result);
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items); // update the state with reordered array
    reArrangeQuestions(items);
  };

  const handleDragEndchapter = (result) => {
    if (!result.destination) return;

    console.log("chapter", result);
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setChapters(items); // update the state with reordered array
    reArrangeChapters(items, result.draggableId, result.destination.index);
  };

  const handleDragEn = (result, chapterId) => {
    if (!result.destination) return;
    console.log("here3", result);
    console.log(chapterId, "herer009");
    // const items = Array.from(chapters.items);

    // const [reorderedItem] = items.splice(result.source.index, 1);

    // items.splice(result.destination.index, 0, reorderedItem);

    // setChapters(items); // update the state with reordered array
    reArrangeChapters(chapterId, result.draggableId, result.destination.index);
  };






const QuestionSchema = Yup.object().shape({
  translations: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
      correct: Yup.string().when([], {
        is: () => true,
        then: (schema) => schema.required("Correct answer is required"),
      }),
    })
  ),
  grade: Yup.number()
    .typeError("Grade must be a number")
    .required("Grade is required"),
  quizzes_questions_answers: Yup.array().of(
    Yup.object().shape({
      translations: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required("Answer title is required"),
        })
      ),
      correct: Yup.boolean(),
    })
  ),
});

  const removeField = () => {
    if (reqtble.length > 1) {
      setReqTable(reqtble.slice(0, -1));
    } else if (reqtble.length === 1) {
      setReqTable([]);
    }
    formik.setFieldValue("requirements", reqtble);
  };
  const addsubField = () => {
    const updated = [...sub, { title: "", slug: "", icon: "" }];
    setSub(updated);

    formik.setFieldValue("sub_categories", updated);
  };

  const removesubField = (id) => {
    console.log(id);
    if (sub.length > 1) {
      setSub(sub.filter((it) => it.id !== id));
    } else if (sub.length === 1) {
      setSub([]);
    }
    formik.setFieldValue("sub_categories", sub);
  };

  // Validation schema for sub-categories
  const subCategoryValidation = Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("عنوان التصنيف الفرعي مطلوب"),

    })
  );

  // Build validation schema----------------------------------------------->
  const validationSchema = Yup.object({
    ...fields.reduce((acc, field) => {
      const { name, type, required } = field;
      let rule;

      switch (type) {
        case "text":
          rule = Yup.string()
          // .required(`${t(name)} ${t("is_required")}`);
          break;

        case "number":
          rule = Yup.number()
          // .required(`${t(name)} ${t("is_required")}`)
            .transform((val, orig) => (orig === "" ? undefined : val))
            .typeError(`${t(name)} يجب أن يكون رقمًا`);
          break;

        case "select":
          rule = Yup.string()
          // .required(`${t(name)} ${t("is_required")}`);
          break;

        case "selectsearch":
          rule = Yup.number()
            .transform((val, orig) => (orig === "" ? undefined : val))
            .typeError(`${t(name)} يجب أن يكون رقمًا`);
          break;

        case "multiselect":
          rule = Yup.array().of(Yup.number())
          // .required(`${t(name)} ${t("is_required")}`);;
          break;

        case "date":
          rule = Yup.string()
          // .required(`${t(name)} ${t("is_required")}`);;
          break;

        case "multiselectsearch":
          rule = Yup.array().of(Yup.number());
          break;

        case "checkbox01":
          rule = Yup.number().oneOf([0, 1]);
          if (required)
            rule = rule.oneOf([1], `${t(name)} ${t("is_required")}`);
          break;

        // Toggle (boolean) with conditional child selectsearch (rendered as radios)
        case "toggleSelectSearch": {
          acc[name] = Yup.boolean(); // the checkbox

          const child = field.child || {};
          const childName = child.name;

          if (childName) {
            const childRule = child.multiple
              ? Yup.array().of(Yup.number())
              : Yup.number()
                  .transform((val, orig) => (orig === "" ? undefined : val))
                  .typeError(`${t(childName)} يجب أن يكون رقمًا`);

            acc[childName] = childRule.when(name, {
              is: true,
              then: (s) =>
                child.multiple
                  ? s.min(1, `${t(childName)} ${t("is_required")}`)
                  : s.required(`${t(childName)} ${t("is_required")}`),
              otherwise: (s) => s.notRequired(),
            });
          }
          return acc; // skip generic handling
        }
        default:
          rule = Yup.string();
      }

      if (required) {
        if (type === "multiselect" || type === "multiselectsearch") {
          rule = rule.min(1, `${t(name)} ${t("is_required")}`);
        } else if (type !== "checkbox01") {
          rule = rule.required(`${t(name)} ${t("is_required")}`);
        }
      }

      if (name === "description") {
        rule = rule.min(10, `${t("desc")} ${t("min_10_chars")} `);
      }

      acc[name] = rule;
      return acc;
    }, {}),
    sub_categories: subCategoryValidation,
    requirements: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("عنوان المتطلب مطلوب"),
        description: Yup.string().required("وصف المتطلب مطلوب"),
      })
    ),

  });

  const locale = useLocale();

  // Initial values
  const initialValues = fields.reduce((acc, field) => {
    const rawValue = data?.[field.name];

    if (field.type === "multiselect" || field.type === "multiselectsearch") {
      acc[field.name] = rawValue || [];
    } else if (field.type === "date" && typeof rawValue === "string") {
      acc[field.name] = rawValue.split("T")[0]?.split(" ")[0] || "";
    } else if (field.type === "toggleSelectSearch") {
      acc[field.name] = Boolean(rawValue); // checkbox
      const childName = field.child?.name;
      if (childName) {
        const childVal = data?.[childName];
        acc[childName] = field.child?.multiple
          ? Array.isArray(childVal)
            ? childVal
            : []
          : childVal ?? "";
      }
    } else if (field.type === "checkbox01") {
      acc[field.name] =
        typeof rawValue === "number" ? rawValue : rawValue ? 1 : 0;
    } else {
      acc[field.name] = rawValue ?? "";
    }
    return acc;
  }, {});

  initialValues.image_file = null;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      ...(sub ? { sub_categories: sub } : {}),
      ...(reqtble ? { requirements: reqtble } : {}),
    },
    validationSchema,
    onSubmit: (values) => {
      if (formState === "edit") {
        handleSubmitEdit?.(values);
      } else if (formState === "add") {
        handleSubmitAdd?.(values);
      }
    },
  });

  const handleMultiSelectChange = (name, value) => {
    const currentValues = formik.values[name] || [];
    const numValue = parseInt(value, 10);

    const newValues = currentValues.includes(numValue)
      ? currentValues.filter((v) => v !== numValue)
      : [...currentValues, numValue];

    formik.setFieldValue(name, newValues);
  };

  const handleFieldChange = (e, field) => {
    const { name, value } = e.target;
    formik.handleChange(e);
    field.onChange?.(value);

    if (!controlByType) return;

    if (name === "type") {
      if (value === "course") {
        formik.setFieldValue("bundle", []);
      } else if (value === "bundle" || value === "attendance") {
        formik.setFieldValue("webinar", []);
      } else {
        // quiz or empty → hide both
        formik.setFieldValue("webinar", []);
        formik.setFieldValue("bundle", []);
      }
    }
  };

  const selectedType = formik.values.type;

  const shouldShowField = (field) => {
    if (!controlByType) return true;

    // Hide dependents until a type is selected
    if (!selectedType) {
      return field.name !== "webinar" && field.name !== "bundle";
    }

    if (field.name === "webinar") {
      return selectedType === "course";
    }
    if (field.name === "bundle") {
      return selectedType === "bundle" || selectedType === "attendance";
    }
    return true;
  };

  return (
    <form
      encType="multipart/form-data "
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className="  p-4"
    >
      <h4>{formTitles?.[0]?.label}</h4>

      {course ? (
        <>
          <div className=" d-flex align-items-center gap-3 ">
            <div
              className=" bg-dark  rounded-4"
              style={{ width: "40px", height: "10px" }}
            >
              {" "}
            </div>{" "}
            <h3>{formTitles?.[2]?.label}</h3>{" "}
          </div>
        </>
      ) : (
        ""
      )}
      <div className="container-fluid p-0">
        <div className="p-1 row g-3 d-flex justify-content-start">
          {fields.map((field, index) => {
            if (field.hidden) return null;
            if (!shouldShowField(field)) return null;

            const { label, type, options, name } = field;

            return (
              <div key={index} className="col-lg-6 col-12 p-2">
                <div>
                  <h3 className="Tit-12-700">{label}</h3>

                  {type === "select" ? (
                    <select
                      name={name}
                      value={formik.values[name]}
                      onChange={(e) => handleFieldChange(e, field)}
                      onBlur={formik.handleBlur}
                      disabled={loading}
                      className={`d-flex justify-content-center align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100 ${
                        formik.touched[name] && formik.errors[name]
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ border: "1px solid #E3E3E3" }}
                    >
                      <option value="" disabled>
                        {t(name)}
                      </option>
                      {options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : type === "selectsearch" ? (
                    <SearchSelect
                      name={name}
                      value={formik.values[name]}
                      options={options || []} // local baseline
                      disabled={loading}
                      placeholder={field.placeholder || "Search"}
                      minChars={field.minChars || 3}
                      onChange={(v) =>
                        formik.setFieldValue(name, v === "" ? "" : Number(v))
                      }
                      loadOptions={
                        field.loadOptions ||
                        (name === "user_id" ? loadStudentOptions : undefined)
                      }
                    />
                  ) : type === "multiselect" ? (
                    <div
                      className="multiselect-container rounded-3 p-2"
                      style={{
                        border: "1px solid #E3E3E3",
                        maxHeight: "200px",
                        overflowY: "auto",
                        backgroundColor: "#fff",
                      }}
                    >
                      {options?.map((opt) => {
                        const isSelected = (formik.values[name] || []).includes(
                          parseInt(opt.value, 10)
                        );

                        return (
                          <div
                            key={opt.value}
                            className="d-flex align-items-center p-1 cursor-pointer hover-bg-light gap-1"
                            onClick={() =>
                              handleMultiSelectChange(name, opt.value)
                            }
                            style={{
                              backgroundColor: isSelected
                                ? "#e3f2fd"
                                : "transparent",
                              borderRadius: "4px",
                              margin: "2px 0",
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                              className="me-2"
                              style={{ pointerEvents: "none" }}
                            />
                            <span className="Tit-12-600">{opt.label}</span>
                          </div>
                        );
                      })}

                      {formik.values[name] &&
                        formik.values[name].length > 0 && (
                          <div className="mt-2 p-1">
                            <small className="text-muted">
                              {formik.values[name].length} {t("selected")}
                            </small>
                          </div>
                        )}
                    </div>
                  ) : type === "date" ? (
                    <input
                      type="date"
                      name={name}
                      value={formik.values[name] || ""}
                      onChange={(e) => handleFieldChange(e, field)}
                      onBlur={formik.handleBlur}
                      disabled={loading}
                      className={`d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100 ${
                        formik.touched[name] && formik.errors[name]
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ border: "1px solid #E3E3E3" }}
                    />
                  ) : type === "multiselectsearch" ? (
                    <MultiSearchSelect
                      name={name}
                      value={formik.values[name] || []}
                      options={options || []}
                      disabled={loading}
                      placeholder={field.placeholder || "Search"}
                      minChars={field.minChars || 3}
                      onChange={(arr) =>
                        formik.setFieldValue(
                          name,
                          arr.map((n) => Number(n))
                        )
                      }
                      loadOptions={
                        field.loadOptions ||
                        (name === "user_id" ? loadStudentOptions : undefined)
                      }
                    />
                  ) : type === "toggleSelectSearch" ? (
                    (() => {
                      const on = Boolean(formik.values[name]);
                      const child = field.child || {};
                      const childName = child.name;
                      const multiple = !!child.multiple; // if true -> MultiSearchSelect

                      return (
                        <>
                          {/* Checkbox toggle */}
                          <label className=" align-items-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={on}
                              onChange={(e) => {
                                const v = e.target.checked;
                                formik.setFieldValue(name, v);
                                if (!v && childName) {
                                  // clear child when turned off
                                  formik.setFieldValue(
                                    childName,
                                    multiple ? [] : ""
                                  );
                                }
                              }}
                              disabled={loading}
                            />
                            <span>{field.toggleLabel || label}</span>
                          </label>

                          {/* Conditional child select */}
                          {on && childName && (
                            <div className="mt-2">
                              <h3 className="Tit-12-700">{child.label}</h3>

                              {multiple ? (
                                <MultiSearchSelect
                                  name={childName}
                                  value={formik.values[childName] || []}
                                  options={child.options || []}
                                  disabled={loading}
                                  placeholder={child.placeholder || "Search"}
                                  minChars={child.minChars || 3}
                                  onChange={(arr) =>
                                    formik.setFieldValue(
                                      childName,
                                      arr.map(Number)
                                    )
                                  }
                                  loadOptions={
                                    child.loadOptions ||
                                    (childName === "user_id"
                                      ? loadStudentOptions
                                      : undefined)
                                  }
                                />
                              ) : (
                                <SearchSelect
                                  name={childName}
                                  value={formik.values[childName]}
                                  options={child.options || []}
                                  disabled={loading}
                                  placeholder={child.placeholder || "Search"}
                                  minChars={child.minChars || 3}
                                  onChange={(v) =>
                                    formik.setFieldValue(
                                      childName,
                                      v === "" ? "" : Number(v)
                                    )
                                  }
                                  loadOptions={
                                    child.loadOptions ||
                                    (childName === "user_id"
                                      ? loadStudentOptions
                                      : undefined)
                                  }
                                />
                              )}

                              {formik.touched[childName] &&
                                formik.errors[childName] && (
                                  <div className="text-danger mt-1">
                                    {formik.errors[childName]}
                                  </div>
                                )}
                            </div>
                          )}
                        </>
                      );
                    })()
                  ) : type === "checkbox01" ? (
                    (() => {
                      const checked = Number(formik.values[name]) === 1;
                      return (
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={checked}
                            onChange={(e) =>
                              formik.setFieldValue(
                                name,
                                e.target.checked ? 1 : 0
                              )
                            }
                            disabled={loading}
                          />
                          <label className="align-items-center">
                            <span>{field.checkboxLabel || label}</span>
                          </label>
                        </div>
                      );
                    })()
                  ) : type === "number" ? (
                    <div className="d-flex flex-column w-100">
                      <input
                        type="number"
                        className={`form-control ${
                          formik.touched[name] && formik.errors[name]
                            ? "is-invalid"
                            : ""
                        }`}
                        name={name}
                        value={
                          formik.values[name]
                        }
                        placeholder={field.placeholder || ""}
                        min={field.min ?? 1}
                        max={field.max}
                        step={field.step ?? 1}
                        disabled={loading || field.disabled}
                        onChange={(e) => {
                          const val = e.target.value;
                          // allow empty string while typing
                          if (val === "") return formik.setFieldValue(name, "");
                          const num = Number(val);
                          formik.setFieldValue(
                            name,
                            Number.isNaN(num) ? "" : num
                          );
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  ) : type === "" ? (
                    <></>
                  ) : name === "image" ? (
                    <div className="d-flex flex-column gap-2">
                      {/* Preview (file takes precedence; otherwise show URL if present) */}
                      {/* {(imagePreview || formik.values.image) && (
                        <div style={{ maxWidth: 50, maxHeight: 40 }}>
                          <img
                            src={imagePreview || String(formik.values.image)}
                            alt="preview"
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: 8,
                              border: "1px solid #E3E3E3",
                            }}
                          />
                        </div>
                      )} */}

                      {/* URL input (optional, keeps backward compatibility) */}
                      {/* <input
                        type="text"
                        name={name}
                        value={formik.values[name]}
                        onChange={(e) => handleFieldChange(e, field)}
                        onBlur={formik.handleBlur}
                        disabled={loading}
                        placeholder="https://example.com/image.jpg"
                        className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                        style={{ border: "1px solid #E3E3E3" }}
                      /> */}

                      {/* File input */}
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onImageFileChange}
                          disabled={loading}
                          className="form-control"
                          style={{ maxWidth: 320 }}
                        />
                        {/* {formik.values.image_file && (
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={clearImageFile}
                            disabled={loading}
                          >
                            {t?.("clear") || "Clear"}
                          </button>
                        )} */}
                      </div>

                      <small className="text-muted">
                        You can paste an image URL **or** upload a file. If a
                        file is selected, it will be used.
                      </small>
                    </div>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={formik.values[name]}
                      onChange={(e) => handleFieldChange(e, field)}
                      onBlur={formik.handleBlur}
                      disabled={loading}
                      className={`d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100 ${
                        formik.touched[name] && formik.errors[name]
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ border: "1px solid #E3E3E3" }}
                    />
                  )}

                  {formik.touched[name] && formik.errors[name] && (
                    <div className=" mt-1">
                      <h6 className=" text-danger">{formik.errors[name]}</h6>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {extraForm ? (
            <>
              <div className=" d-flex flex-column row g-3">
                <div className=" d-flex  flex-column gap-3 col-12  col-lg-7  col-xl-6">
                  <div className="d-flex justify-content-between ">
                    <h3> {t("addSubCategory")} </h3>
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={addsubField}
                    >
                      {t("add")}
                    </button>
                  </div>

                  {sub.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column gap-3  p-3  rounded-3"
                      style={{ border: "1px solid #E3E3E3" }}
                    >
                      <div className=" d-flex justify-content-between align-items-center gap-3">
                        <div className=" d-flex flex-column">
                          <input
                            type="text"
                            className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                            style={{ border: "1px solid #E3E3E3" }}
                            placeholder="Title"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...sub];
                              updated[index].title = e.target.value;
                              setSub(updated);
                              formik.setFieldValue("sub_categories", updated);
                            }}
                          />
                          {formik.errors.sub_categories?.[index]?.title && (
                            <div className="text-danger mt-1">
                              {formik.errors.sub_categories[index].title}
                            </div>
                          )}
                        </div>
                        <button
                          className=" btn btn-danger "
                          type="button"
                          onClick={() => {
                            removesubField(item.id);
                          }}
                        >
                          {" "}
                          x{" "}
                        </button>
                      </div>
                      <input
                        type="text"
                        className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                        style={{ border: "1px solid #E3E3E3" }}
                        placeholder="Add URL"
                        value={item.slug}
                        onChange={(e) => {
                          const updated = [...sub];
                          updated[index].slug = e.target.value;
                          setSub(updated);
                          formik.setFieldValue("sub_categories", updated);
                        }}
                      />

                      <input
                        type="text"
                        className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                        style={{ border: "1px solid #E3E3E3" }}
                        placeholder="Icon"
                        value={item.icon}
                        onChange={(e) => {
                          const updated = [...sub];
                          updated[index].icon = e.target.value;
                          setSub(updated);
                          formik.setFieldValue("sub_categories", updated);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className=" d-flex  flex-column gap-3 col-12  col-lg-7 col-xl-6">
                  <div className="d-flex justify-content-between">
                    <h3> {t("addRequirements")} </h3>
                    <button
                      className="btn btn-success  "
                      type="button"
                      onClick={addField}
                    >
                      {t("addReqButton")}
                    </button>
                  </div>

                  {reqtble.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column gap-3 p-3  rounded-3 "
                      style={{ border: "1px solid #E3E3E3" }}
                    >
                      <div className=" d-flex justify-content-between align-items-center gap-3">
                        <div className=" d-flex flex-column">
                          <input
                            type="text"
                            className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                            style={{ border: "1px solid #E3E3E3" }}
                            placeholder="title"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...reqtble];
                              updated[index].title = e.target.value;
                              setReqTable(updated);
                              formik.setFieldValue("requirements", updated);
                            }}
                          />

                          {formik.errors.requirements?.[index]?.title && (
                            <div className="text-danger mt-1">
                              {formik.errors.requirements[index].title}
                            </div>
                          )}
                        </div>
                        <button
                          className=" btn btn-danger "
                          type="button"
                          onClick={removeField}
                        >
                          {" "}
                          x{" "}
                        </button>
                      </div>
                      <div className=" d-flex flex-column">
                        <input
                          type="text"
                          className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                          style={{ border: "1px solid #E3E3E3" }}
                          placeholder="admin/main.description"
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...reqtble];
                            updated[index].description = e.target.value;
                            setReqTable(updated);
                            formik.setFieldValue("requirements", updated);
                          }}
                        />
                        {formik.errors.requirements?.[index]?.description && (
                          <div className="text-danger ">
                            {formik.errors.requirements[index].description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {extraformquiz ? (
            <>
              <div className=" d-flex justify-content-between w-100">
                <h3>{t("questions")}</h3>

                <div className=" d-flex ">
                  <button
                    className="btn btn-light custfontbtn"
                    type="button"
                    onClick={() => {
                      setQType("multiple");
                      setQuestion([]);
                      setMultiqes(true);
                      setAdd(true);
                      setAddquestion(!addquestion);
                    }}
                  >
                    {t("multiple_choice")}
                  </button>
                  <button
                    className="btn btn-light custfontbtn"
                    type="button"
                    onClick={() => {
                      setQType("descriptive");
                      setQuestion([]);
                      setAdd(true);
                      setMultiqes(false);
                      setAddquestion(!addquestion);
                    }}
                  >
                    {t("add_essay")}
                  </button>
                </div>
              </div>
              <div className=" d-flex flex-column gap-5 mb-5  ">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="questions-list" direction="vertical">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="questions-container"
                      >
                        {questions.map((itm, index) => (
                          <Draggable
                            key={itm.id ?? `temp-${index}`} // fallback key if id missing
                            draggableId={(itm.id ?? `temp-${index}`).toString()}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              // lock movement to Y-axis only
                              const style = {
                                ...provided.draggableProps.style,
                                transform:
                                  provided.draggableProps.style?.transform?.replace(
                                    /translate\(([^,]+),/,
                                    "translate(0,"
                                  ),
                              };

                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={style} // apply locked Y-axis style
                                  className="d-flex flex-column flex-md-row justify-content-between shadow-lg border-3 p-4 gap-3 mb-3"
                                >
                                  <div>
                                    <div className="d-flex align-items-center gap-3">
                                      <h2 className="bg-dark p-2 text-white rounded-2">
                                        {index + 1}
                                      </h2>
                                      <h2>
                                        {itm.translations?.[0]?.title ||
                                          "⚠️ No title"}
                                      </h2>
                                    </div>
                                    <h5>
                                      {itm.type === "multiple"
                                        ? t("multiple_choice")
                                        : itm.type === "descriptive"
                                        ? t("essay_question")
                                        : "⚠️ No type"}
                                      {" | "} {t("grade")}:{" "}
                                      {itm.grade ?? "⚠️ No grade"}
                                    </h5>
                                  </div>

                                  <div className="d-flex align-items-center gap-3">
                                    <h2 className="btn btn-light d-flex align-items-center">
                                      <Drag className="iconSize" />
                                    </h2>

                                    <button
                                      className="btn btn-success"
                                      type="button"
                                      onClick={() => {
                                        setAdd(false);
                                        setQuestion(itm);
                                        if (itm.type === "multiple") {
                                          setMultiqes(true);
                                        } else {
                                          setMultiqes(false);
                                        }
                                        setAddquestion(true);
                                      }}
                                    >
                                      {t("edit")}
                                    </button>

                                    <button
                                      className="btn btn-danger"
                                      type="button"
                                      onClick={() => {
                                        setAdd(false);
                                        console.log(
                                          "Deleting question id:",
                                          itm.id || qId
                                        );
                                        deleteQuetion(itm.id || qId);
                                      }}
                                    >
                                      {t("delete")}
                                    </button>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>

              {addquestion ? (
                <div className=" position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center  p-3">
                  <div className="bg-white w-50 h-75 rounded shadow p-4   ">
                    <h2 className=" mb-4"> {t("new_descriptive_question")} </h2>
                    <div className=" row g-4  h-100  ">
                    {/* question.type === "multiple" ?----------------------------------------------------------------- ( */}
                      <div className=" col-12 col-md-7 bg-danger">
                        <h5> {t("question_title")} </h5>
                        <input
                          type="text"
                          name=""
                          value={question.translations?.[0]?.title || ""}
                          onChange={(e) => {
                            const updated = {
                              ...question,
                              translations: [
                                {
                                  ...question.translations?.[0],
                                  title: e.target.value,
                                },
                              ],
                            };
                            setQuestion(updated);
                          }}
                          id=""
                          className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100  border-1"
                        />
                      </div>
    {/* question.type === "multiple" ?----------------------------------------------------------------- ( */}
                      <div className="col-12 col-md-5">
                        <h5> {t("grade")}</h5>
                        <input
                          type="text"
                          name=""
                          value={question.grade || ""}
                          onChange={(e) => {
                            const updated = {
                              ...question,
                              grade: e.target.value,
                            };
                            setQuestion(updated);
                          }}
                          id=""
                          className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700  w-100  border-1"
                        />
                      </div>

                      <div className=" col-12 col-md-6">
                        <h5> {t("image_optional")}</h5>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700  w-100  border-1"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <h5> {t("video_optional")}</h5>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700  w-100  border-1"
                        />
                      </div>

                      {multiqes ? (
                        <div className=" col-12 gap-4 d-flex flex-column ">
                          <div>
                            <h2> {t("answers")}</h2>
                            <button
                              className=" btn btn-dark"
                              type="button"
                              onClick={() => {
                                setQuestion((prev) => ({
                                  ...prev,
                                  quizzes_questions_answers: [
                                    ...(prev.quizzes_questions_answers || []),
                                    {
                                      translations: [{ title: "" }],
                                      correct: false,
                                      image: "",
                                    },
                                  ],
                                }));
                              }}
                            >
                              {t("add_answer")}
                            </button>
                          </div>
                          <div
                            className="overflow-auto"
                            style={{ maxHeight: "200px" }}
                          >
                            {question.quizzes_questions_answers?.map(
                              (itm, index) => (
                                <div className=" row border-1 p-3 border border-dark-subtle m-3  g-3">
                                  <div className=" col-12">
                                    <h5> {t("answer_title")}</h5>
                                    <input
                                      type="text"
                                      name=""
                                      value={itm.translations[0]?.title}
                                      onChange={(e) => {
                                        const updatedAnswers =
                                          question.quizzes_questions_answers.map(
                                            (ans, i) =>
                                              i === index
                                                ? {
                                                    ...ans,
                                                    translations: [
                                                      {
                                                        ...ans.translations[0],
                                                        title: e.target.value,
                                                      },
                                                    ],
                                                  }
                                                : ans
                                          );

                                        setQuestion({
                                          ...question,
                                          quizzes_questions_answers:
                                            updatedAnswers,
                                        });
                                      }}
                                      id=""
                                      className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700  w-100  border-1"
                                    />
                                  </div>
                                  <div className=" col-6">
                                    <h5> {t("answer_image_optional")} </h5>
                                    <input
                                      type="text"
                                      name=""
                                      id=""
                                      className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700  w-100  border-1"
                                    />
                                  </div>
                                  <div className=" col-6 d-flex justify-content-center align-items-center">
                                    <div class="form-check form-switch d-flex gap-4">
                                      <h5> {t("correct_answer")}</h5>
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        checked={itm.correct}
                                        onChange={(e) => {
                                          const updatedAnswers =
                                            question.quizzes_questions_answers.map(
                                              (ans, i) =>
                                                i === index
                                                  ? {
                                                      ...ans,
                                                      correct: e.target.checked,
                                                    }
                                                  : ans
                                            );

                                          setQuestion({
                                            ...question,
                                            quizzes_questions_answers:
                                              updatedAnswers,
                                          });
                                        }}
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className=" col-12 ">
                          <h5> {t("correct_answer")} </h5>
                          <textarea
                            value={question.translations?.[0]?.correct || ""}
                            onChange={(e) => {
                              const updated = {
                                ...question,
                                translations: question.translations.map(
                                  (tr, i) =>
                                    i === 0
                                      ? { ...tr, correct: e.target.value }
                                      : tr
                                ),
                              };
                              setQuestion(updated);
                              console.log("update ", updated);
                            }}
                            name=""
                            className="d-flex justify-content-end align-items-center rounded-3  gap-2 Tit-14-700  w-100  p-5"
                          />
                        </div>
                      )}

                      <div className=" d-flex   justify-content-end gap-2  align-items-center">
                        <button
                          className=" btn btn-success  "
                          type="button"
                          onClick={() => {
                            {
                              add
                                ? AddQuetion(question)
                                : updateQuetion(question);
                            }
                            setAddquestion(false);
                          }}
                        >
                          {" "}
                          {t("save")}{" "}
                        </button>
                        <button
                          className=" btn btn-danger  "
                          onClick={() => {
                            setAddquestion(!addquestion);
                          }}
                        >
                          {" "}
                          {t("close")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}

          {course ? (
            <>
              <div className="d-flex align-items-center gap-3 justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="bg-dark rounded-4"
                    style={{ width: "40px", height: "10px" }}
                  ></div>
                  <h3>{t("sections_optional")}</h3>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    console.log("clicked");
                    setAdd(true);
                    setChapter([]);
                    setAddquestion(!AddQuetion);
                  }}
                  type="button"
                >
                  {" "}
                  {t("new_section")}{" "}
                </button>
              </div>

              {addquestion ? (
                <div className=" position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center  p-3 z-3 ">
                  <div className="bg-white w-50 h-50 rounded shadow p-4   ">
                    <h2 className=" mb-4"> {t("new_section")} </h2>
                    <div className=" row g-4  h-100  ">
                      <div className=" col-12 col-md-7">
                        <h5> {t("section_title")} </h5>
                        <input
                          type="text"
                          name=""
                          value={chapter.chapter?.title}
                          onChange={(e) => {
                            const updated = {
                              ...chapter,
                              chapter: {
                                ...chapter.chapter,
                                title: e.target.value, // ✅ update nested title
                              },
                            };

                            setChapter(updated);
                          }}
                          id=""
                          className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100  border-1"
                        />
                        <div className="form-check form-switch mt-4">
                          <input
                            className="form-check-input "
                            type="checkbox"
                            checked={chapter.status === "active"}
                            onChange={(e) => {
                              const updated = {
                                ...chapter,
                                status: e.target.checked
                                  ? "active"
                                  : "inactive",
                              };
                              setChapter(updated);
                            }}
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexSwitchCheckDefault"
                          >
                            {t("active")}
                          </label>
                        </div>
                        <div className="form-check form-switch mt-4">
                          <input
                            className="form-check-input "
                            type="checkbox"
                            checked={chapter.check_all_contents_pass === "on"}
                            onChange={(e) => {
                              const updated = {
                                ...chapter,
                                message: e.target.checked ? "on" : "off",
                              };
                              setChapter(updated);
                            }}
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexSwitchCheckDefault"
                          >
                            {t("message")}
                          </label>
                        </div>
                      </div>
                      <div className=" d-flex justify-content-end gap-2 align-items-center">
                        <button
                          className=" btn btn-success  "
                          type="button"
                          onClick={() => {
                            {
                              add
                                ? AddChapter(chapter)
                                : EditChapter(chapter, locale);
                            }
                            setAddquestion(false);
                          }}
                        >
                          {" "}
                          {t("save")}
                        </button>
                        <button
                          className=" btn btn-danger  "
                          onClick={() => {
                            setAddquestion(!addquestion);
                          }}
                        >
                          {" "}
                          {t("close")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}

              {chapters.length > 0 ? (
                <div className="d-flex flex-column gap-5 mb-5">
                  <DragDropContext onDragEnd={handleDragEndchapter}>
                    <Droppable
                      droppableId="questions-list"
                      direction="vertical"
                    >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="questions-container"
                        >
                          {chapters.map((itm, index) => (
                            <Draggable
                              key={itm.id ?? `temp-${index}`}
                              draggableId={(
                                itm.id ?? `temp-${index}`
                              ).toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                // lock movement to Y-axis only
                                const style = {
                                  ...provided.draggableProps.style,
                                  transform:
                                    provided.draggableProps.style?.transform?.replace(
                                      /translate\(([^,]+),/,
                                      "translate(0,"
                                    ),
                                };

                                return (
                                  <>
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={style}
                                      className="d-flex flex-column justify-content-between shadow-lg border-3 p-4 gap-3 mb-3"
                                    >
                                      <div className="d-flex flex-column flex-md-row justify-content-between shadow-lg border-3 p-4 gap-3 mb-3    ">
                                        <div>
                                          <div className="d-flex align-items-center gap-3 ">
                                            <h2 className="bg-dark p-2 text-white rounded-2">
                                              {index + 1}
                                            </h2>
                                            <h2>
                                              {itm.chapter?.title ||
                                                "⚠️ No title"}
                                            </h2>
                                          </div>
                                          {/* <h5>
                                        {itm.type === "multiple"
                                          ? "اختيار من متعدد"
                                          : itm.type === "descriptive"
                                          ? "سؤال مقالي"
                                          : "⚠️ No type"}
                                        {" | "} الدرجة:{" "}
                                        {itm.grade ?? "⚠️ No grade"}
                                      </h5> */}
                                        </div>

                                        <div className="d-flex align-items-center gap-3  justify-content-between ">
                                          <h2 className="btn btn-light d-flex align-items-center">
                                            <Drag className="iconSize" />
                                          </h2>

                                          <div className=" d-flex gap-1">
                                            <button
                                              className="btn   custfontbtnnew   bg-success "
                                              type="button"
                                              onClick={() => {
                                                setAdd(false);
                                                setChapter(itm);
                                                setAddquestion(true);
                                              }}
                                            >
                                              {t("edit")}
                                            </button>

                                            <button
                                              className="btn custfontbtnnew   bg-danger "
                                              type="button"
                                              onClick={() => {
                                                setAdd(false);
                                                DelteChapters(itm.chapter.id);
                                              }}
                                            >
                                              {t("delete")}
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className=" ">
                                        {itm.items?.length > 0 ? (
                                          <div className="d-flex flex-column gap-5 mb-5 ">
                                            <DragDropContext
                                              onDragEnd={(result) => {
                                                handleDragEn(
                                                  result,
                                                  itm.chapter.id
                                                );
                                              }}
                                            >
                                              <Droppable
                                                droppableId="questions-list"
                                                direction="vertical"
                                              >
                                                {(provided) => (
                                                  <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="questions-container  bg-light"
                                                  >
                                                    {itm.items.map(
                                                      (item, index) => (
                                                        <Draggable
                                                          key={
                                                            item.details.id ??
                                                            `temp-${index}`
                                                          }
                                                          draggableId={(
                                                            item.details.id ??
                                                            `temp-${index}`
                                                          ).toString()}
                                                          index={index}
                                                        >
                                                          {(
                                                            provided,
                                                            snapshot
                                                          ) => {
                                                            // lock movement to Y-axis only
                                                            const style = {
                                                              ...provided
                                                                .draggableProps
                                                                .style,
                                                              transform:
                                                                provided.draggableProps.style?.transform?.replace(
                                                                  /translate\(([^,]+),/,
                                                                  "translate(0,"
                                                                ),
                                                            };

                                                            return (
                                                              <>
                                                                <div
                                                                  ref={
                                                                    provided.innerRef
                                                                  }
                                                                  {...provided.draggableProps}
                                                                  {...provided.dragHandleProps}
                                                                  style={style}
                                                                >
                                                                  <div className="d-flex flex-column flex-md-row justify-content-between  border-1 p-2 p-md-4  border-dark-subtle  border  rounded-3 gap-3 m-4 bg-light">
                                                                    <div>
                                                                      <div className="d-flex align-items-center gap-3 bg-light">
                                                                        <h2 className="bg-dark p-2 text-white rounded-2">
                                                                          {index +
                                                                            1}
                                                                        </h2>
                                                                        <h2>
                                                                          {item
                                                                            .details
                                                                            ?.translations[0]
                                                                            ?.title ||
                                                                            "⚠️ No title"}
                                                                        </h2>
                                                                      </div>
                                                                      {/* <h5>
                                        {itm.type === "multiple"
                                          ? "اختيار من متعدد"
                                          : itm.type === "descriptive"
                                          ? "سؤال مقالي"
                                          : "⚠️ No type"}
                                        {" | "} الدرجة:{" "}
                                        {itm.grade ?? "⚠️ No grade"}
                                      </h5> */}
                                                                    </div>

                                                                    <div className="d-flex align-items-center justify-content-between  gap-1">
                                                                      <h2 className="btn  d-flex align-items-center">
                                                                        <Drag className="iconSize" />
                                                                      </h2>

                                                                      <div className=" d-flex gap-1">
                                                                        <button
                                                                          className="btn custfontbtnnew   bg-success"
                                                                          type="button"
                                                                          onClick={() => {
                                                                            setAdd(
                                                                              false
                                                                            );
                                                                            setQuestion(
                                                                              itm
                                                                            );
                                                                            setMultiqes(
                                                                              itm.type ===
                                                                                "multiple"
                                                                            );
                                                                            setAddquestion(
                                                                              true
                                                                            );
                                                                          }}
                                                                        >
                                                                          {t(
                                                                            "edit"
                                                                          )}
                                                                        </button>

                                                                        <button
                                                                          className="btn custfontbtnnew   bg-danger"
                                                                          type="button"
                                                                          onClick={() => {
                                                                            setAdd(
                                                                              false
                                                                            );
                                                                            deleteQuetion(
                                                                              itm.id ||
                                                                                qId
                                                                            );
                                                                          }}
                                                                        >
                                                                          {t(
                                                                            "delete"
                                                                          )}
                                                                        </button>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </>
                                                            );
                                                          }}
                                                        </Draggable>
                                                      )
                                                    )}
                                                    {provided.placeholder}
                                                  </div>
                                                )}
                                              </Droppable>
                                            </DragDropContext>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </>
                                );
                              }}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <p className="d-flex flex-column justify-content-center align-items-center text-center gap-2">
                    <span>لا أقسام!</span> من خلال إنشاء أقسام ، يمكنك تنظيم
                    محتوى المقرر في فصول مختلفة.
                  </p>
                </div>
              )}
            </>
          ) : (
            ""
          )}
          {course ? (
            <>
              <div className="d-flex align-items-center gap-3 justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="bg-dark rounded-4"
                    style={{ width: "40px", height: "10px" }}
                  ></div>
                  <h3>{t("prerequisites")}</h3>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    console.log("clicked");
                    setAdd(true);
                    setChapter([]);
                    setAddquestion(!AddQuetion);
                  }}
                  type="button"
                >
                  {" "}
                  {t("new_prerequisite")}{" "}
                </button>
              </div>

              {/* 
               <OngoingTrain /> */}
            </>
          ) : (
            ""
          )}

          {course ? (
            <>
              <div className="d-flex align-items-center gap-3 justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="bg-dark rounded-4"
                    style={{ width: "40px", height: "10px" }}
                  ></div>
                  <h3>{t("instructions")}</h3>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    console.log("clicked");
                    setAdd(true);
                    setChapter([]);
                    setAddquestion(!AddQuetion);
                  }}
                  type="button"
                >
                  {" "}
                  {t("new_instructions")}{" "}
                </button>
              </div>

              {/* 
               <OngoingTrain /> */}
            </>
          ) : (
            ""
          )}

          <div className="d-flex col-7 mt-4  gap-2">
            <button
              className="btn btn-light custfontbtn w-25"
              type="submit"
              disabled={loading}
            >
              {formTitles?.[1]?.label}
            </button>

            <button
              className="btn btn-light custfontbtn w-25"
              type="button"
              onClick={setShowModal}
              disabled={loading}
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
