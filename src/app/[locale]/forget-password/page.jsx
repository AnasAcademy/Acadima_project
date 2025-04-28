"use client";
import React, { useState } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import anasAcadlogo from "@/assets/Registration/acadima-logo.webp";
import mail from "@/assets/Registration/Mail.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ForgetPassword() {
  const t = useTranslations("Login");
  const ts = useTranslations("ForgetPassword");

  const validationSchema = yup.object({
    email: yup.string().email(t("errEmail")).required(t("errEmail2")),
  });

  const [errMsg, setErrMsg] = useState(null);
  const [sucMsg, setSucMsg] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setErrMsg(null);
      setSucMsg(null);
      try {
        const { data } = await axios.post("https://e.ggg.com/", values);

        if (data.message === "success") {
          setSucMsg(ts("MailSentSuccessfully"));
          resetForm();
        }
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Something went wrong.");
      }
    },
  });

  return (
    <>
      <div className="  container d-flex   justify-content-center align-items-center vh-100">
        <form
          className="col-12 d-flex flex-column  bg-white col-lg-5 col-md-8 m-5 p-5 gap-4  rounded-5 shadow    border border-1  "
          onSubmit={formik.handleSubmit}
        >
          <LanguageSwitcher />

          <Link
            className="text-white text-decoration-none  m-lg-auto p-5 pb-3 pt-2  d-flex justify-content-center "
            role="button"
            href="/"
          >
            <Image
              alt="Your Company"
              src={anasAcadlogo}
              className="m-auto "
              width={260}
            />
          </Link>

          <div className="d-flex justify-content-center  gap-2">
            <h3 className="textpink  fw-bold h5"> {ts("forgetPassword")}</h3>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <div
              className={`border-radius-lg input-size form-control input-flex d-flex p-3 rounded-4   gap-2  ${
                formik.values.email &&
                formik.touched.email &&
                formik.errors.email
                  ? "border-2 border-danger "
                  : ""
              }    `}
            >
              <Image src={mail} alt="mail" className="mb-1" />

              <input
                id="email"
                name="email"
                type="email"
                className={`form-control h7 border-0 shadow-none p-0 m-0 `}
                placeholder={t("email")}
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldTouched("email", false);
                  setErrMsg(null);
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.values.email &&
              formik.touched.email &&
              formik.errors.email && (
                <div
                  className="alert alertFont  mt-2 mb-0 p-2 rounded-3"
                  style={{ color: "red" }}
                >
                  {formik.errors.email}
                </div>
              )}
          </div>

          {errMsg && (
            <div
              className="alert alertFont  bg-danger-subtle mt-2 mb-0 p-2"
              style={{ color: "white" }}
            >
              {errMsg}
            </div>
          )}
          {sucMsg && (
            <div className="alert alert-success mt-2 mb-0 p-2">{sucMsg}</div>
          )}

          {/* Submit Button */}
          <div className="form-group d-flex justify-content-end">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className="btn  text-white rounded-5 ps-4  pe-4 pt-3 pb-3 h2 w-100 w-md-auto"
              style={{ backgroundColor: "#C14B93", border: "none" }}
            >
              {ts("forgetPassword")}
            </button>
          </div>

          <div className="mt-20 text-center registertext d-flex flex-column">
            <span className=" ps-1">{ts("or")}</span>

            <a
              href="/login?"
              className="fw-bold text-decoration-none"
              style={{ color: "#C14B93" }}
            >
              {t("login")}
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
