"use client";
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useUserData } from "@/context/UserDataContext";

/** Lightweight searchable select with optional async loader (no extra deps) */
function SearchSelect({
  name,
  value,
  options = [],
  placeholder = "Search",
  disabled = false,
  minChars = 3,
  onChange, // expects number or "" to clear
  loadOptions, // async (term) => Promise<{label,value}[]>
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
  value = [], // array of numbers
  options = [], // baseline local options
  placeholder = "Search",
  disabled = false,
  minChars = 3,
  onChange, // expects number[] (new array)
  loadOptions, // async (term) => Promise<{label,value}[]>
}) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [remote, setRemote] = useState([]);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const boxRef = useRef(null);

  // allow options as [[label,value]] too
  const normalize = (arr) =>
    (arr || []).map((o) =>
      Array.isArray(o) ? { label: o[0], value: o[1] } : o
    );

  const baseOptions = normalize(options);

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

  // filter local when no loader OR to merge
  const filteredLocal = React.useMemo(() => {
    const s = term.trim().toLowerCase();
    if (s.length < minChars) return [];
    return baseOptions.filter((o) => String(o.label).toLowerCase().includes(s));
  }, [term, baseOptions, minChars]);

  // merge + de-dup by value, and exclude already selected
  const merged = React.useMemo(() => {
    const seen = new Set();
    const selectedSet = new Set((value || []).map((v) => String(v)));
    const arr = (loadOptions ? remote : filteredLocal).filter(
      (o) => !selectedSet.has(String(o.value))
    );
    return arr.filter((o) => {
      if (seen.has(String(o.value))) return false;
      seen.add(String(o.value));
      return true;
    });
  }, [baseOptions, remote, filteredLocal, loadOptions, value]);

  // for selected chips, we want labels for current values
  const allKnown = React.useMemo(
    () => [...baseOptions, ...remote],
    [baseOptions, remote]
  );
  const labelFor = (val) =>
    allKnown.find((o) => String(o.value) === String(val))?.label ?? String(val);

  const addValue = (opt) => {
    const num = Number(opt.value);
    if (!Number.isNaN(num)) onChange([...(value || []), num]);
    setTerm("");
  };
  const removeValue = (val) => {
    onChange((value || []).filter((v) => Number(v) !== Number(val)));
  };
  const clearAll = () => onChange([]);

  return (
    <div
      ref={boxRef}
      className="rounded-3"
      style={{
        border: "1px solid #E3E3E3",
        background: "#fff",
        position: "relative",
      }}
    >
      {/* header with chips */}
      <div
        onClick={() => !disabled && setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px",
          cursor: disabled ? "not-allowed" : "pointer",
          flexWrap: "wrap",
          minHeight: 40,
        }}
      >
        {(value || []).length === 0 ? (
          <div style={{ color: "#9aa0a6" }}>{placeholder}</div>
        ) : (
          (value || []).map((v) => (
            <span
              key={v}
              className="badge text-bg-light"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              onClick={(e) => e.stopPropagation()}
            >
              {labelFor(v)}
              <button
                type="button"
                className="btn btn-sm btn-link p-0"
                onClick={() => removeValue(v)}
              >
                ×
              </button>
            </span>
          ))
        )}
        <div style={{ marginLeft: "auto", fontSize: 10, opacity: 0.7 }}>
          {open ? "▲" : "▼"}
        </div>
      </div>

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
            ) : merged.length === 0 ? (
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
                  onMouseDown={(e) => e.preventDefault()}
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
            <button
              type="button"
              className="btn btn-light"
              onClick={clearAll}
              disabled={disabled}
            >
              مسح
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setOpen(false)}
            >
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
  setSub
}) {

  const t = useTranslations("tables");
  const { loadStudentOptions } = useUserData();

  const addField = () => {
  const updated = [...reqtble, { title: "", description: "" }];
  setReqTable(updated);
   

      formik.setFieldValue("requirements", updated);
  };

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

    const removesubField = () => {
      if (sub.length > 1) {
        setSub(sub.slice(0, -1));
      } else if (sub.length === 1) {
        setSub([]);
      }
      formik.setFieldValue("sub_categories", sub);
    };

  // Build validation schema
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      const { name, type, required } = field;
      let rule;

      switch (type) {
        case "text":
          rule = Yup.string();
          break;

        case "number":
          rule = Yup.number()
            .transform((val, orig) => (orig === "" ? undefined : val))
            .typeError(`${t(name)} يجب أن يكون رقمًا`);
          break;

        case "select":
          rule = Yup.string();
          break;

        case "selectsearch":
          rule = Yup.number()
            .transform((val, orig) => (orig === "" ? undefined : val))
            .typeError(`${t(name)} يجب أن يكون رقمًا`);
          break;

        case "multiselect":
          rule = Yup.array().of(Yup.number());
          break;

        case "date":
          rule = Yup.string();
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
          acc[name] = Yup.boolean(); // boolean for radio yes/no

          const childName = field.child?.name;
          if (childName) {
            acc[childName] = Yup.number()
              .transform((val, orig) => (orig === "" ? undefined : val))
              .typeError(`${t(childName)} يجب أن يكون رقمًا`)
              .when(name, {
                is: true,
                then: (s) => s.required(`${t(childName)} ${t("is_required")}`),
                otherwise: (s) => s.notRequired(),
              });
          }
          return acc; // skip generic handling below
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
        rule = rule.min(10, `${t("desc")} يجب أن لا يقل عن 10 أحرف`);
      }

      acc[name] = rule;
      return acc;
    }, {})
  );

  // Initial values
  const initialValues = fields.reduce((acc, field) => {
    const rawValue = data?.[field.name];

    if (field.type === "multiselect" || field.type === "multiselectsearch") {
      acc[field.name] = rawValue || [];
    } else if (field.type === "date" && typeof rawValue === "string") {
      acc[field.name] = rawValue.split("T")[0]?.split(" ")[0] || "";
    } else if (field.type === "toggleSelectSearch") {
      acc[field.name] = Boolean(rawValue); // radio boolean
      const childName = field.child?.name;
      if (childName) {
        const childVal = data?.[childName];
        acc[childName] = childVal ?? "";
      }
    } else if (field.type === "checkbox01") {
      acc[field.name] =
        typeof rawValue === "number" ? rawValue : rawValue ? 1 : 0;
    } else {
      acc[field.name] = rawValue ?? "";
    }
    return acc;
  }, {});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      sub_categories: sub || [],
      requirements: reqtble || [],
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
    if (field.onChange) field.onChange(value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <h4>{formTitles?.[0]?.label}</h4>
      <div className="container-fluid p-0">
        <div className="p-4 row g-3 d-flex justify-content-start">
          {fields.map((field, index) => {
            if (field.hidden) return null;

            const { label, type, options, name } = field;

            return (
              <div key={index} className="col-6 p-2">
                <div>
                  <h3 className="Tit-12-700">{label}</h3>

                  {type === "select" ? (
                    <select
                      name={name}
                      value={formik.values[name]}
                      onChange={(e) => handleFieldChange(e, field)}
                      onBlur={formik.handleBlur}
                      disabled={loading}
                      className="d-flex justify-content-center align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100 "
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
                      className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
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
                      const checked = Boolean(formik.values[name]);
                      const child = field.child || {};
                      const childName = child.name;

                      return (
                        <>
                          {/* Radio group */}
                          <div className="d-flex align-items-center gap-3">
                            <label className="d-flex align-items-center gap-1">
                              <input
                                type="radio"
                                name={name}
                                value="true"
                                checked={checked === true}
                                onChange={() =>
                                  formik.setFieldValue(name, true)
                                }
                                disabled={loading}
                              />
                              <span>{t("yes")}</span>
                            </label>
                            <label className="d-flex align-items-center gap-1">
                              <input
                                type="radio"
                                name={name}
                                value="false"
                                checked={checked === false}
                                onChange={() => {
                                  formik.setFieldValue(name, false);
                                  if (childName)
                                    formik.setFieldValue(childName, "");
                                }}
                                disabled={loading}
                              />
                              <span>{t("no")}</span>
                            </label>
                          </div>

                          {/* Conditional selectsearch */}
                          {checked && childName && (
                            <div className="mt-2">
                              <h3 className="Tit-12-700">{child.label}</h3>
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
                        <label className="align-items-center">
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
                          <span>{field.checkboxLabel || label}</span>
                        </label>
                      );
                    })()
                  ) : type === "" ? (
                    <></>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={formik.values[name]}
                      onChange={(e) => handleFieldChange(e, field)}
                      onBlur={formik.handleBlur}
                      disabled={loading}
                      className="d-flex justify-content-end align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                      style={{ border: "1px solid #E3E3E3" }}
                    />
                  )}

                  {formik.touched[name] && formik.errors[name] && (
                    <div className="text-danger mt-1">
                      {formik.errors[name]}
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
                      className="d-flex flex-column gap-3 border-dark-subtle border-1 border p-2"
                    >
                      <div className=" d-flex justify-content-between align-items-center gap-3">
                        <input
                          type="text"
                          className="w-100 p-1 border-dark-subtle border-1"
                          placeholder="sub"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...sub];
                            updated[index].title = e.target.value;
                            setSub(updated);
                            formik.setFieldValue("sub_categories", updated);
                          }}
                        />
 
                        <button
                          className=" btn btn-danger "
                          type="button"
                          onClick={removesubField}
                        >
                          {" "}
                          x{" "}
                        </button>
                      </div>
                      <input
                        type="text"
                        className="w-100 p-1 border-dark-subtle border-1"
                        placeholder="admin/subcat"
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
                        className="w-100 p-1 border-dark-subtle border-1"
                        placeholder="admin/subcat"
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
                      className="d-flex flex-column gap-3   border-dark-subtle border-1 border p-2"
                    >
                      <div className=" d-flex justify-content-between align-items-center gap-3">
                        <input
                          type="text"
                          className="w-100 p-1 border-dark-subtle border-1"
                          placeholder="title"
                          value={item.title}
                        />
 
                        <button
                          className=" btn btn-danger "
                          type="button"
                          onClick={removeField}
                        >
                          {" "}
                          x{" "}
                        </button>
                      </div>
                      <input
                        type="text"
                        className="w-100 p-1 border-dark-subtle border-1"
                        placeholder="admin/main.description"
                        value={item.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
 
          <div className="d-flex col-7 mt-4 ">
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
