import React, { useState } from "react";
import circle from "@/assets/settings/9.webp";
import x from "@/assets/settings/x.svg";
import linked from "@/assets/settings/in.svg";
import insta from "@/assets/settings/insta.svg";
import pen from "@/assets/settings/pen.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useFormik } from "formik";
import * as yup from "yup";

export default function BasicData({ setTab, setPro }) {
  const t = useTranslations();
  const info = t.raw("settings");
  const tr = useTranslations("register");

  const [preview, setPreview] = useState(circle);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

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

  function tog() {
    setTab("personal");
    setPro("20%");
  }

  return (
    <>
      <div className="  bg-prim-color position-relative settCardBorder">
        <div className="settingCard">
          <Image
            src={preview}
            alt="black circle"
            class="rounded-circle"
            width={111}
            height={111}
          />
        </div>

        <div className=" bg-black pt-5 pb-5"></div>

        <div className=" d-flex justify-content-between">
          <div className=" d-flex">
            <div className="custPadding">
              <h3 className="custsubtitle3">{info.full_name}</h3>
              <h4 className="custfont">000000000</h4>
              <div className=" d-flex gap-2">
                <Image
                  src={x}
                  alt="  x"
                  className=" bg-white  p-1   rounded-circle"
                  width={25}
                />
                <Image
                  src={linked}
                  alt=" linkedin"
                  className=" bg-white  p-1   rounded-circle"
                  width={25}
                />
                <Image
                  src={insta}
                  alt=" insta"
                  className=" bg-white  p-1   rounded-circle"
                  width={25}
                />
              </div>
            </div>
          </div>

          <div>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label
              htmlFor="file-upload"
              className="btn btn-light pt-0 pb-0 d-flex gap-1 justify-content-center align-items-center fw-bold cursor-pointer m-3"
              style={{ cursor: "pointer" }}
            >
              {info.edit}
              <Image src={pen} alt="pen icon" />
            </label>
          </div>
        </div>
      </div>

      <form
        onSubmit={() => {
          formik.handleSubmit();
          tog();
        }}
      >
        <div className=" mt-5">
          <h3 className=" d-flex gap-1 custsubtitle3">
            {info.academic_info}
            <span className=" custsubtitle3 text-danger">*</span> :{" "}
          </h3>
          <div className="container">
            <div className=" row g-5">
              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {info.academic_code}
                  <span className="custfont text-danger">*</span>{" "}
                </h3>
                <input
                  id="acadimcCode"
                  name="acadimcCode"
                  type="text"
                  className="input-group bg-transparent settCardBorder"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
                {formik.values.acadimcCode &&
                  formik.touched.acadimcCode &&
                  formik.errors.acadimcCode && (
                    <div
                      className="alert alertFont  mt-2 mb-0 p-2 rounded-3"
                      style={{ color: "red" }}
                    >
                      {formik.errors.acadimcCode}
                    </div>
                  )}
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">
                  {info.full_name}
                  <span className="custfont text-danger">*</span>{" "}
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
                <h3 className=" d-flex gap-1 custfont">{info.email}</h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">{info.mobile} </h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">{info.birthdate}</h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">{info.password}</h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">{info.language}</h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>

              <div className=" col-lg-6">
                <h3 className=" d-flex gap-1 custfont">{info.region_unit}</h3>
                <input
                  type="text"
                  className="  input-group bg-transparent settCardBorder"
                />
              </div>
            </div>

            <div className=" mt-4 d-flex flex-column col-lg-3 col-md-4 col-6 gap-2 ">
              <div className="form-check form-switch  d-flex justify-content-between gap-3   m-0 p-0 ">
                <label
                  className="d-flex  custfont text-nowrap"
                  for="flexSwitchCheckDefault"
                >
                  {info.toggle_language}{" "}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>

              <div className="form-check form-switch  d-flex justify-content-between   gap-3  m-0 p-0">
                <label
                  className="d-flex custfont  text-nowrap"
                  for="flexSwitchCheckDefault"
                >
                  {info.toggle_profile}{" "}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
          </div>

          <div className=" d-flex justify-content-end mt-5">
            <button className=" btn btn-light custfontbtn" type="submit">
              {info.save}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
