"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import anasAcadlogo from "@/assets/Registration/acadima-logo.webp";
import lock from "@/assets/Registration/Lock.svg";
import mail from "@/assets/Registration/Mail.svg";
import hide from "@/assets/Registration/Hide.svg";
import show from "@/assets/Registration/Show.svg";
import user from "@/assets/Registration/User_01.svg";
import mobile from "@/assets/Registration/Mobile.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Register() {
  const t = useTranslations("register");
  const ts = useTranslations("Login");

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
    fullName: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, t("errFullName"))
      .min(3, t("errFullNameMin"))
      .required(t("errFullNameRiq")),

    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, t("errphoneNumber"))
      .required(t("errphoneNumReq")),
    email: yup.string().email(t("errEmail")).required(t("errEmial2")),
    password: yup
      .string()
      .min(6, t("errPassword"))
      .max(12, t("errPass"))
      .required(t("errPassword2")),
  });

  const [errMsg, setErrMsg] = useState(null);
  const [sucMsg, setSucMsg] = useState(null);

  const formik = useFormik({
    initialValues: {
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
      <div className="  container d-flex  justify-content-center align-items-center vh-100">
        <form
          className=" d-flex flex-column  bg-white col-lg-5 m-5 p-5 gap-4  rounded-5 shadow    border border-1  "
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
            <h3 className="textpink  fw-bold h5"> {t("reg")}</h3>
          </div>

          {/*full name */}

          <div className="form-group">
            <div
              className={`border-radius-lg input-size form-control input-flex d-flex p-3 rounded-4   gap-2  ${
                formik.values.fullName &&
                formik.touched.fullName &&
                formik.errors.fullName
                  ? "border-2 border-danger "
                  : ""
              }    `}
            >
              <Image src={user} alt="fn" className="mb-1" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`form-control border-0 shadow-none p-0 m-0 `}
                placeholder={t("fullName")}
                value={formik.values.fullName}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldTouched("fullName", false);
                  setErrMsg(null);
                }}
                onBlur={formik.handleBlur}
              />
            </div>
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

          {/* phoneNumber Field */}
          <div className="form-group">
            <div
              className={`border-radius-lg input-size form-control input-flex d-flex p-3 rounded-4   gap-2  ${
                formik.values.phoneNumber &&
                formik.touched.phoneNumber &&
                formik.errors.phoneNumber
                  ? "border-2 border-danger "
                  : ""
              }    `}
            >
              <Image src={mobile} alt="fn" className="mb-1" />
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                className={`form-control border-0 shadow-none p-0 m-0 `}
                placeholder={t("phoneNumber")}
                value={formik.values.phoneNumber}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldTouched("phoneNumber", false);
                  setErrMsg(null);
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.values.phoneNumber &&
              formik.touched.phoneNumber &&
              formik.errors.phoneNumber && (
                <div
                  className="alert alertFont  mt-2 mb-0 p-2 rounded-3"
                  style={{ color: "red" }}
                >
                  {formik.errors.phoneNumber}
                </div>
              )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div
              className={`border-radius-lg input-size form-control input-flex d-flex p-3 rounded-4    gap-2    ${
                formik.values.password &&
                formik.touched.password &&
                formik.errors.password
                  ? "border-2 border-danger "
                  : ""
              }`}
            >
              <Image src={lock} alt="lock" className="mb-1" />
              <input
                id="password"
                name="password"
                type={toggle === "hide" ? "password" : "text"}
                className="form-control h7 border-0 shadow-none p-0 m-0"
                placeholder={t("password")}
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldTouched("password", false);
                  setErrMsg(null);
                }}
                onBlur={formik.handleBlur}
              />

              <span className="icon2" onClick={togglePassvis}>
                {toggle === "hide" ? (
                  <Image
                    id="toggleIcon1"
                    src={show}
                    alt="Show"
                    className="icon2"
                  />
                ) : (
                  <Image
                    id="toggleIcon2"
                    src={hide}
                    alt="hide"
                    className="icon2"
                  />
                )}
              </span>
            </div>
            {formik.values.password &&
              formik.touched.password &&
              formik.errors.password && (
                <div
                  className="alert alertFont  mt-2 mb-0 p-2 rounded-3"
                  style={{ color: "red" }}
                >
                  {formik.errors.password}
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

          <div className="d-flex  justify-content-between">
            <div className="text-right forgetpw d-flex justify-content-end text-center ">
              <a
                href="/forget-password"
                target="_blank"
                className=" textpink mb-30 text-decoration-none"
              >
                {" "}
                {t("forgetpass")}
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group d-flex justify-content-end">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className="btn  text-white rounded-5 ps-4  pe-4 pt-3 pb-3 h2"
              style={{ backgroundColor: "#C14B93", border: "none" }}
            >
              {t("reg")}
            </button>
          </div>

          <div className="mt-20 text-center registertext">
            <span className=" ps-1">{t("donthaveacc")}</span>

            <a
              href="/login"
              className="fw-bold text-decoration-none"
              style={{ color: "#C14B93" }}
            >
              {ts("login")}
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
