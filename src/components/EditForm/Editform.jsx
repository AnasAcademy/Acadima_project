"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";

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

}) {
  const t = useTranslations("tables");
  const [req, setReq] = useState([]);

  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      const { name, type, required } = field;

      let rule;
      switch (type) {
        case "text":
          rule = Yup.string();
          break;
        case "number":
          rule = Yup.number().typeError(`${t(name)} يجب أن يكون رقمًا`);
          break;
        case "select":
          rule = Yup.string();
          break;
        case "multiselect":
          rule = Yup.array().of(Yup.number()); // Array of numbers for multiselect
          break;
        case "date":
          rule = Yup.string();
          break;
        default:
          rule = Yup.string();
      }

      if (required) {
        if (type === "multiselect") {
          rule = rule.min(1, `${t(name)} ${t("is_required")}`);
        } else {
          rule = rule.required(`${t(name)} ${t("is_required")}`);
        }
      }

      // Additional validation for description
      if (name === "description") {
        rule = rule.min(10, `${t("desc")} يجب أن لا يقل عن 10 أحرف`);
      }

      acc[name] = rule;
      return acc;
    }, {})
  );

  // Set initial values from incoming `data` object
  const initialValues = fields.reduce((acc, field) => {
    const rawValue = data?.[field.name];

    if (field.type === "multiselect") {
      acc[field.name] = rawValue || [];
    } else if (field.type === "date" && typeof rawValue === "string") {
      acc[field.name] = rawValue.split("T")[0]?.split(" ")[0] || "";
    } else {
      acc[field.name] = rawValue || "";
    }

    return acc;
  }, {});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (formState === "edit") {
        handleSubmitEdit(values);
      } else if (formState === "add") {
        handleSubmitAdd(values);
      }
    },
  });

  // Handle multiselect change
  const handleMultiSelectChange = (name, value) => {
    const currentValues = formik.values[name] || [];
    const numValue = parseInt(value);

    let newValues;
    if (currentValues.includes(numValue)) {
      // Remove if already selected
      newValues = currentValues.filter((v) => v !== numValue);
    } else {
      // Add if not selected
      newValues = [...currentValues, numValue];
    }

    formik.setFieldValue(name, newValues);
  };

  // Handle field changes with special handling for target field
  const handleFieldChange = (e, field) => {
    const { name, value } = e.target;

    // Call formik's handleChange first
    formik.handleChange(e);

    // Call field's onChange if it exists (for target field)
    if (field.onChange) {
      field.onChange(value);
    }
  };

  function toogle() {
    setReq(!req);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
        console.log("Errors:", formik.errors);
      }}
    >
      <h4>{formTitles[0].label}</h4>
      <div className="container-fluid p-0">
        <div className="p-4 row g-3 d-flex justify-content-start">
          {fields.map((field, index) => {
            // Skip rendering if field is hidden
            if (field.hidden) return null;

            const { label, type, options, name, multiple, onChange } = field;

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
                          parseInt(opt.value)
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
                              onChange={() => {}} // Handled by onClick
                              className="me-2"
                              style={{ pointerEvents: "none" }}
                            />
                            <span className="Tit-12-600">{opt.label}</span>
                          </div>
                        );
                      })}

                      {/* Show selected count */}
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
              <div className=" d-flex justify-content-between">
                <h3>اضافه متطلبات القبول في البرنامج</h3>
                <button
                  className="  btn btn-success "
                  type="button"
                  onClick={toogle}
                >
                  {" "}
                  + add requirements
                </button>
              </div>
              {req ? (
                <div className="  d-flex flex-column gap-3">
                  {" "}
                  <input
                    type="text"
                    className=" w-100  p-1"
                    placeholder="title"
                  />
                  <input
                    type="text"
                    className=" w-100  p-1"
                    placeholder="admin/main.decription"
                  />
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            " "
          )}

          <div className="d-flex col-7 mt-3">
            <button
              className="btn btn-light custfontbtn w-25"
              type="submit"
              disabled={loading}
            >
              {formTitles[1].label}
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
