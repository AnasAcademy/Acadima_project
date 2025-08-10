"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
// import anasAcadlogo from "@/assets/Registration/acadima-logo.webp";
import LockIcon from "@/assets/Registration/Lock.svg";
import MailIcon from "@/assets/Registration/Mail.svg";
import HideIcon from "@/assets/Registration/Hide.svg";
import ShowIcon from "@/assets/Registration/Show.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import axios from "axios";
import logo from "@/assets/admin/logo2.png";
import { routing } from "../../../i18n/routing";
import { usePathname, useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_Login_URL;
export default function Login() {


  const t = useTranslations("Login");

  const [toggle, setToggle] = useState("");

  function togglePassvis() {
    if (toggle === "hide") {
      setToggle("view");
    } else {
      setToggle("hide");
    }
  }
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const locale = routing.locales.includes(segments[0])
    ? segments[0]
    : routing.defaultLocale;

  useEffect(() => {
    setToggle("hide");

    return () => {
      window.location.reload(); // This reloads the page on unmount
    };
  }, []);

  const validationSchema = yup.object({
    email: yup.string().email(t("errEmail")).required(t("errEmail2")),
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
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setErrMsg(null);
        setSucMsg(null);
        const payload = {
          email: values.email,
          password: values.password,
        };

        const { data } = await axios.post(`${BASE_URL}`, payload, {
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
          },
        });

        if (data.success === false) {
          console.log("error");
          console.log(data);
          setErrMsg(data.message || "Something went wrong.");
          // setTimeout(() => {
          //   nav("/user");
          //   setToken(data.token);
          //   localStorage.setItem("tkn", data.token);
          // }, 1000);
        } else {
          const token = data.data.token;

          try {
            const response = await fetch("/api/set-token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Token API error:", errorData); 
              return;
            }

            // console.log("Token set successfully");
            // console.log("welcome Back");

            // console.log("Router object:", router);
            // console.log("Navigating to /ar/dashboard");

            setTimeout(() => {
            
              router.push(`/${locale}/paymentplans`);
            }, 20);
          } catch (error) {
            console.error("Error in fetch to /api/set-token:", error);
          }
        }
      } catch (err) {}
    },
  });

  return (
    <>
      <div className="  container d-flex   justify-content-center align-items-center  vh-100">
        <form
          className="col-12 d-flex flex-column  bg-white col-lg-5 col-md-8 m-5 p-5 gap-4  rounded-5 shadow    border border-1  "
          onSubmit={formik.handleSubmit}
        >
          <LanguageSwitcher />

          <Link
            className="text-white text-decoration-none  m-lg-auto  d-flex justify-content-center "
            role="button"
            href="/"
          >
            <Image src={logo} alt="" width={190} height={56} priority />
          </Link>

          <div className="d-flex justify-content-center  gap-2">
            <h3 className="textcolor  fw-bold h5"> {t("login")}</h3>
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
              <LockIcon className="iconSize1 mt-1" />
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
                  <ShowIcon className="icon2 iconSize" />
                ) : (
                  <HideIcon className="icon2 iconSize" />
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
              className="alert alertFont  d-flex justify-content-center bg-danger-subtle mt-2 mb-0 p-2"
              style={{ color: "white" }}
            >
              {errMsg}
            </div>
          )}
          {sucMsg && (
            <div className="alert d-flex justify-content-center alert-success mt-2 mb-0 p-2">
              {sucMsg}
            </div>
          )}

          <div className="d-flex  justify-content-between">
            <div className="text-right forgetpw d-flex justify-content-end text-center ">
              <Link
                href="/forget-password"
                target="_blank"
                className=" mb-30 text-decoration-none textcolor"
              >
                {t("forgetpass")}
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group d-flex justify-content-end">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className="btn  text-white rounded-5 ps-4  pe-4 pt-3 pb-3 h2 w-100 w-md-auto circbg"
              style={{ border: "none" }}
            >
              {t("login")}
            </button>
          </div>

          <div className="mt-20 text-center registertext textcolor">
            <span className=" ps-1">{t("donthaveacc")}</span>

            <Link
              href="/register?"
              className="fw-bold text-decoration-none textcolor"
            >
              {t("register")}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
