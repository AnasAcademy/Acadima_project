import React from "react";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as yup from "yup";
import Line from "@/assets/admin/Line18.svg";

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

        <div className=" cardbg rounded-4 p-4 mt-2">
          <div>
            <h3 className="  tit-18-700  textcolor mb-0">
              {" "}
              {info.uni_edu}{" "}
              <span className=" custsubtitle3 text-danger">*</span> :{" "}
            </h3>
            <Line className="w-75" />
          </div>

          <div className=" row  pt-4   g-4">
            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700  d-flex ">
                {" "}
                {info.last_uni_cert}{" "}
                {/* <h5 className=" custfont text-danger">*</h5>{" "} */}
              </h3>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
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

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700 "> {info.ent_bach_cert_sor} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.cert_country} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>
            <div className=" col-lg-6 col-xl-3"> </div>
            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.uni} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.college} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.major} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>
            <div className=" col-lg-6 col-xl-3"> </div>
            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.grad_year} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.gpa} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.grad_cert_img} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>
          </div>
        </div>

        <div className=" cardbg p-4 mt-2">
          <div>
            <h3 className="   tit-18-700  textcolor ">
              {" "}
              {info.high_edu}{" "}
              <span className=" custsubtitle3 text-danger">*</span> :{" "}
            </h3>
            <Line className="w-75" />
          </div>
          <div className=" row  pt-4   g-4">
            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700  ">
                {" "}
                {info.high_cert_country}{" "}
                <h5 className=" custfont text-danger">*</h5>{" "}
              </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700">
                {" "}
                {info.edu_area} <h5 className=" custfont text-danger">*</h5>{" "}
              </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.high_grad_year} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3"></div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.school} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.high_gpa} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.high_cert_img} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>
          </div>
        </div>

        <div className=" cardbg p-4 mt-2">
          <div>
            <h3 className=" tit-18-700  textcolor mb-0">
              {" "}
              {info.exp} <span className=" custsubtitle3 text-danger">*</span> :{" "}
            </h3>
            <Line className="w-75" />
          </div>
          <div className=" row  pt-4   g-4">
            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700  "> {info.exp_field} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
            </div>

            <div className=" col-lg-6 col-xl-3">
              <h3 className=" Tit-12-700"> {info.years_exp} </h3>
              <input
                type="text"
                className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                style={{ border: "1px  solid  #E3E3E3" }}
              />
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
