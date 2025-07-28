"use client";
import { useState, useEffect } from "react";
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
}) {
  const t = useTranslations("tables");
  const [form, setForm] = useState({});

  // Initialize form with data when component mounts or data changes
  useEffect(() => {
    const initialState = {};
    fields.forEach(({ name }) => {
      initialState[name] = data[name] || "";
    });
    setForm(initialState);
  }, [data, fields]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    console.log("Form state:", formState);

    if (formState === "edit") {
      handleSubmitEdit(form);
    } else if (formState === "add") {
      handleSubmitAdd && handleSubmitAdd(form);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h4>{formTitles[0].label}</h4>
      <div className="container-fluid p-0">
        <div className="p-4   row  g-3  d-flex justify-content-start ">
          {fields.map(({ label, type, options, name }, index) => (
            <div key={index} className="col-6   p-2 ">
              <div className="">
                <h3 className="Tit-12-700">{label}</h3>
                {type === "select" ? (
                  <select
                    name={name}
                    value={form[name] || ""}
                    onChange={handleChange}
                    disabled={loading}
                    className="d-flex justify-content-center align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
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
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={form[name] || ""}
                    onChange={handleChange}
                    disabled={loading}
                    className="d-flex justify-content-center align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                    style={{ border: "1px solid #E3E3E3" }}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="d-flex   col-7 mt-3 ">
            <button
              className="btn btn-light custfontbtn  w-25   "
              type="submit"
              disabled={loading}
            >
              {loading ? "جاري الحفظ..." : formTitles[1].label}
            </button>

            <button
              className="btn btn-light custfontbtn  w-25  "
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
