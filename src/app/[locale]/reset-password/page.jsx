"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import anasAcadlogo from "@/assets/Registration/acadima-logo.webp";
import LockIcon from "@/assets/Registration/Lock.svg";
import MailIcon from "@/assets/Registration/Mail.svg";
import HideIcon from "@/assets/Registration/Hide.svg";
import ShowIcon from "@/assets/Registration/Show.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ResetPassword() {
  const t = useTranslations("Login");
  const ts = useTranslations("ForgetPassword");

  const [toggle, setToggle] = useState("");

  function togglePassvis() {
    if (toggle === "hide") {
      setToggle("view");
    } else {
      setToggle("hide");
    }
  }

  useEffect(() => {
    setToggle("hide");
  }, []);

  const validationSchema = yup.object({
    email: yup.string().email(t("errEmail")).required(t("errEmail2")),
    password: yup
      .string()
      .min(6, t("errPassword")) // example: password min length 6
      .required(t("errPassword2")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], ts("passwordsMustMatch"))
      .required(ts("confirmPasswordRequired")),
  });

  const [errMsg, setErrMsg] = useState(null);
  const [sucMsg, setSucMsg] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.post("https://e.ggg.com/", {
          email: values.email,
          password: values.password,
        });
        if (data.message === "success") {
          setSucMsg(ts("PasswordUpdatedSuccessfully"));
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
            <h3 className="textpink  fw-bold h5"> {ts("resetPassword")}</h3>
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
              <MailIcon className="iconSize1 mt-1" />

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

          {/* Password Field */}
          <div className="form-group">
            <div
              className={`border-radius-lg input-size form-control input-flex d-flex p-3 rounded-4 gap-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-2 border-danger"
                  : ""
              }`}
            >
              <LockIcon className="iconSize1 mt-1" />
              <input
                id="password"
                name="password"
                type={toggle === "hide" ? "password" : "text"}
                className="form-control h7 border-0 shadow-none p-0 m-0"
                placeholder={t("password")}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="icon2" onClick={togglePassvis}>
                {toggle === "hide" ? (
                  <ShowIcon className="icon2 iconSize" />
                ) : (
                  <HideIcon className="icon2 iconSize" />
                )}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div
                className="alert alertFont mt-2 mb-0 p-2 rounded-3"
                style={{ color: "red" }}
              >
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <div
              className={`border-radius-lg input-size form-control input-flex d-flex p-3 rounded-4 gap-2 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-2 border-danger"
                  : ""
              }`}
            >
              <LockIcon className="iconSize1 mt-1" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={toggle === "hide" ? "password" : "text"}
                className="form-control h7 border-0 shadow-none p-0 m-0"
                placeholder={ts("confirmPassword")}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div
                  className="alert alertFont mt-2 mb-0 p-2 rounded-3"
                  style={{ color: "red" }}
                >
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          {/* Error or Success */}
          {errMsg && (
            <div
              className="alert alertFont bg-danger-subtle mt-2 mb-0 p-2"
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
              className="btn text-white rounded-5 ps-4 pe-4 pt-3 pb-3 h2 w-100 w-md-auto"
              style={{ backgroundColor: "#C14B93", border: "none" }}
            >
              {ts("resetPassword")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
