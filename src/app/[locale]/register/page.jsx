"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import anasAcadlogo from "@/assets/Registration/acadima-logo.webp";
import LockIcon from "@/assets/Registration/Lock.svg";
import MailIcon from "@/assets/Registration/Mail.svg";
import HideIcon from "@/assets/Registration/Hide.svg";
import ShowIcon from "@/assets/Registration/Show.svg";
import User from "@/assets/Registration/User_01.svg";
import Mobile from "@/assets/Registration/Mobile.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import logo from "@/assets/admin/logo2.png";

export default function Register() {
  const searchParams = useSearchParams();
  const bundleIdFromUrl = searchParams.get("bundle_id");
  const [phone, setPhone] = useState("");
  const t = useTranslations("register");
  const ts = useTranslations("Login");
  const [toggle, setToggle] = useState("");
  const [open, setOpen] = useState(false);
  const [prodata, setProdata] = useState([]);

  function togglePassvis() {
    if (toggle === "hide") {
      setToggle("view");
    } else {
      setToggle("hide");
    }
  }

  useEffect(() => {
    setToggle("hide");

    async function getData() {
      try {
        const { data } = await axios.get(
          "https://lms.acadimacollege.com/api/development/consultation/bundles",
          {
            headers: {
              "x-api-key": "1234",
              "Content-Type": "application/json",
            },
          }
        );

        setProdata(data?.bundles);
        return data;
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Something went wrong.");
      }
    }
    getData();

   
  }, []);

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, t("errFullName"))
      .min(3, t("errFullNameMin"))
      .required(t("errFullNameRiq")),

    phoneNumber: yup
      .string()
      .trim()
      .matches(/^\+?\d{10,15}$/, t("errphoneNumber")) // allows optional '+' and 10–15 digits
      .required(t("errphoneNumReq")),
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
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },

    validationSchema,
    onSubmit: async (values) => {
  
      try {
         
        setErrMsg(null)
        setSucMsg(null);
        const payload = {
          full_name: values.fullName,
          email: values.email,
          password: values.password,
          mobile: values.phoneNumber,
          bundle_id: "72",
        };
        console.log("Submitting payload:", payload);
    
        const { data } = await axios.post(
          "https://lms.acadimacollege.com/api/development/register",
          payload,
          {
            headers: {
              "x-api-key": "1234",
              "Content-Type": "application/json",
            },
          }
        );

        if (data.success) {
           setSucMsg("registered successfully.");
           console.log("User registered successfully.");
          // setTimeout(() => {
          //   nav("/login");

          //   // localStorage.setItem("tkn", data.token);
          // }, 1000);
        }
      } catch (err) {
        const errors = err.response?.data?.errors || {};
      
      
           
            const errorMessages = Object.entries(errors).forEach(([key, messages]) => {
              messages.forEach((message, index) => {
                console.log(`${key} [${index}]: ${message}`);
                setErrMsg( message);
              });
            
            });

            console.log(errorMessages);
        
      }

    }})
    
  return (
    <>
      <div className="  container d-flex  justify-content-center align-items-center ">
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
            <h3 className="textcolor  fw-bold h5"> {t("reg")}</h3>
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
              <User className="iconSize1 mt-1" />
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

          <div className="form-group phonegroup d-flex align-items-center ">
            <Mobile className="iconSize1 m-3 " />

            <PhoneInput
              country={"sa"}
              value={formik.values.phoneNumber}
              onChange={(value) => {
                formik.setFieldValue("phoneNumber", value);
                formik.setFieldTouched("phoneNumber", false);
                setErrMsg(null);
              }}
              enableSearch
              disableSearchIcon
              inputProps={{
                name: "phoneNumber",
                required: true,
                autoFocus: true,
              }}
            />
          </div>

          {!bundleIdFromUrl && (
            <div className="dropdown" onClick={() => setOpen(!open)}>
              <button
                className="btn btn-light dropdown-toggle w-100 d-flex justify-content-between align-items-center  border-radius-lg input-size form-control input-flex d-flex p-3 rounded-4   gap-2 border border-dark"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded={open ? "true" : "false"}
              >
                البرامج
              </button>
              <ul
                className={`dropdown-menu w-100 ${open ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                {prodata?.map((dat, index) => (
                  <li key={index}>
                    {dat?.translations.map((trans, index) => (
                      <a
                        className="dropdown-item text-wrap"
                        href="#"
                        key={index}
                      >
                        {trans.title}
                      </a>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
                  <ShowIcon className="iconSize1 mt-1" />
                ) : (
                  <HideIcon className="iconSize1 mt-1" />
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
              className="alert alertFont d-flex   justify-content-center flex-column  align-items-end  bg-danger-subtle mt-2 mb-0 p-2"
              style={{ color: "white" }}
            >
              {errMsg}
            </div>
          )}

          {sucMsg && (
            <div className="alert alert-success d-flex justify-content-center mt-2 mb-0 p-2">
              {sucMsg}
            </div>
          )}

          {/* Submit Button */}
          <div className="form-group d-flex justify-content-end">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className="btn  text-white rounded-5 ps-4  pe-4 pt-3 pb-3 h2 w-100 w-md-auto circbg"
              style={{ border: "none" }}
            >
              {t("reg")}
            </button>
          </div>

          <div className="mt-20 text-center registertext textcolor">
            <span className=" ps-1">{t("donthaveacc")}</span>

            <a href="/login" className="fw-bold text-decoration-none textcolor">
              {ts("login")}
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
