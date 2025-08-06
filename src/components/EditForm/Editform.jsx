"use client";
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
}) {
  const t = useTranslations("tables");

  // Validation schema with custom rules
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      const { name, type, required } = field;
  // Initialize form with data when component mounts or data changes
//   useEffect(() => {
//   if (formState !== "edit") return; 
//   const initialState = {};
//   fields.forEach(({ name }) => {
//     initialState[name] = data?.[name] || "";
//   });
//   setForm(initialState);
// }, [data, fields, formState]);


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
        case "date":
          rule = Yup.string(); // يمكنك تعديله ليكون Yup.date()
          break;
        default:
          rule = Yup.string();
      }

      if (required) {
        rule = rule.required(`${t(name)} ${t("is_required")}`);
      }

      // مثال إضافي للتفصيل (مثل وصف لا يقل عن 10 حروف)
      if (name === "description") {
        rule = rule.min(10, `${t("desc")} يجب أن لا يقل عن 10 أحرف`);
      }

      acc[name] = rule;
      return acc;
    }, {})
  );

  // Set initial values from incoming `data` object
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = data?.[field.name] || "";
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
          {fields.map(({ label, type, options, name }, index) => (
            <div key={index} className="col-6 p-2">
              <div>
                <h3 className="Tit-12-700">{label}</h3>

                {type === "select" ? (
                  <select
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={loading}
                    className="d-flex justify-content-center align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                    style={{ border: "1px solid #E3E3E3" }}
                  />
                )}

                {formik.touched[name] && formik.errors[name] && (
                  <div className="text-danger mt-1">{formik.errors[name]}</div>
                )}
              </div>
            </div>
          ))}

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
