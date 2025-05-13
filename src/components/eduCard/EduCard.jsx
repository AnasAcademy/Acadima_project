import React from "react";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as yup from "yup";

export default function EduCard({ save }) {
  const t = useTranslations();
  const info = t.raw("eduction");
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
            {info.uni_edu} <span className=" custsubtitle3 text-danger">*</span>{" "}
            :{" "}
          </h3>
          <div className="container">
            <div className=" row g-5">
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont  ">
                  {" "}
                  {info.last_uni_cert}{" "}
                  <h5 className=" custfont text-danger">*</h5>{" "}
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
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.ent_bach_cert_sor}{" "}
                  <h5 className=" custfont text-danger">*</h5>{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.cert_country}{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.uni} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.college} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.major} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.grad_year} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.gpa} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.grad_cert_img}{" "}
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
            {info.high_edu}{" "}
            <span className=" custsubtitle3 text-danger">*</span> :{" "}
          </h3>
          <div className="container">
            <div className=" row g-5">
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont  ">
                  {" "}
                  {info.high_cert_country}{" "}
                  <h5 className=" custfont text-danger">*</h5>{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.edu_area} <h5 className=" custfont text-danger">*</h5>{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.high_grad_year}{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.school} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont"> {info.high_gpa} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.high_cert_img}{" "}
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
            {info.exp} <span className=" custsubtitle3 text-danger">*</span> :{" "}
          </h3>
          <div className="container">
            <div className=" row g-5">
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont  ">
                  {" "}
                  {info.exp_field} <h5 className=" custfont text-danger">*</h5>{" "}
                </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {" "}
                  {info.years_exp} <h5 className=" custfont text-danger">*</h5>{" "}
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
