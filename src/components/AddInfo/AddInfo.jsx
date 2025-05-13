import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslations } from "next-intl";

export default function AddInfo({ save }) {
  const t = useTranslations();
  const info = t.raw("addInfo");
  const tr = useTranslations("register");

  const validationSchema = yup.object({
    acadimcCode: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, tr("errFullName"))
      .min(3, tr("errFullNameMin"))
      .required(tr("errFullNameRiq")),

    fullName: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, tr("errFullName"))
      .min(3, tr("errFullNameMin"))
      .required(tr("errFullNameRiq")),

    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, tr("errphoneNumber"))
      .required(tr("errphoneNumReq")),
    email: yup.string().email(tr("errEmail")).required(tr("errEmail2")),
    password: yup
      .string()
      .min(6, tr("errPassword"))
      .max(12, tr("errPass"))
      .required(tr("errPassword2")),
  });

  const formik = useFormik({
    initialValues: {
      acadimcCode: "",
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("https://e.ggg.com/", values);
        if (data.message === "success") {
          setSucMsg("Welcome back!");
          setTimeout(() => {
            nav("/login");
            setToken(data.token);
            localStorage.setItem("tkn", data.token);
          }, 1000);
        }
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Something went wrong.");
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className=" mt-5">
          <h3 className=" d-flex gap-1 custsubtitle3">
            {" "}
            {info.job_info}{" "}
            <span className=" custsubtitle3 text-danger">*</span> :{" "}
          </h3>
          <div className="container">
            <div className=" row g-5">
              <div className="col-lg-6">
                <h3 className="d-flex gap-1 custfont">
                  {" "}
                  {info.current_job_status}{" "}
                </h3>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />

                {formik.values.fullName &&
                  formik.touched.fullName &&
                  formik.errors.fullName && (
                    <div
                      className="alert alertFont  mt-2 mb-0 p-2 rounded-3"
                      style={{ color: "red" }}
                    >
                      {formik.errors.fullName}
                    </div>
                  )}
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.job_title} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.employer} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
            </div>
          </div>

          <h3 className=" d-flex gap-1 custsubtitle3 mt-5 mb-3">
            {" "}
            {info.emergency_info} :{" "}
          </h3>
          <div className="container">
            <div className=" row g-5">
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont  ">
                  {" "}
                  {info.emergency_contact_name}{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.relation} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.emergency_phone}{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.emergency_email}{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
            </div>
          </div>

          <h3 className=" d-flex gap-1 custsubtitle3 mt-5 mb-3">
            {" "}
            {info.health_status}{" "}
            <span className=" custsubtitle3 text-danger">*</span> :{" "}
          </h3>
          <div className="container">
            <div className=" row g-5">
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont  ">
                  {" "}
                  {info.hearing_disability}{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.disability} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont  ">
                  {" "}
                  {info.health_issue}{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.health_issue_detail}{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
            </div>
          </div>

          <div className=" d-flex justify-content-end mt-5">
            <button className=" btn btn-light custfontbtn" type="submit">
              {save}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
