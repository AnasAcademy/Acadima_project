import React, { useEffect, useState } from "react";
import circle from "@/assets/settings/9.webp";
import PenIcon from "@/assets/settings/pen.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import backo from '@/assets/settings/Background.png'
import { useFormik } from "formik";
import * as yup from "yup";
import Upload from "@/assets/admin/uploadd.svg";
import Google from "@/assets/admin/google.svg";
import Linkedin from "@/assets/admin/linkedin.svg";
import Iphone from "@/assets/admin/iphone.svg";
import Laptop from "@/assets/admin/laptop.svg";
import Line from "@/assets/admin/Line18.svg";


export default function BasicData({ setTab, setPro }) {
        const t= useTranslations();
  const info = t.raw("settings");
  const tr = useTranslations("register");
 const tt = useTranslations("adminSettings");
  const [preview, setPreview] = useState(circle);


 useEffect(()=>{

    setPro("0%")

 },[])
                  

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



const handleSave = () => {
  const fields = [
    document.getElementById("acadimcCode")?.value,
    document.getElementById("fullName")?.value,
    document.getElementById("email")?.value,
    document.getElementById("phoneNumber")?.value,
    document.getElementById("password")?.value,
    document.getElementById("birthdate")?.value,
    document.getElementById("language")?.value,
    document.getElementById("region_unit")?.value,
  ];

  const filledCount = fields.filter(
    (value) => value && value.trim() !== ""
  ).length;
  const totalFields = fields.length;
  const percent = Math.round((filledCount / totalFields) * 20);

  setPro(`${percent}%`);
  setTab("personal");
};



  return (
    <>
     
      {/* dgfg$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}

      {/* <div className="  bg-prim-color position-relative settCardBorder mx-0 m-3">
        <div className="   position-relative  ">
          <div className="position-absolute z-2   coverimg">
            <label
              htmlFor="file-upload"
              className="btn btn-light pt-0 pb-0 d-flex  fw-bold cursor-pointer m-3  "
              style={{ cursor: "pointer" }}
            >
              <PenIcon />
            </label>
          </div>
          <div className="settingCard mt-2">
            <Image
              src={preview}
              alt="black circle"
              className="rounded-circle"
              width={111}
              height={111}
            />
          </div>
        </div>
        <div className="  priBack pt-5 pb-5"></div>

        <div className=" d-flex justify-content-between">
          <div className=" d-flex">
            <div className="custPadding">
              <h3 className="custsubtitle3">{info.full_name}</h3>
              <h4 className="custfont">000000000</h4>
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
          </div>
        </div>
      </div> */}

      <form
        onSubmit={() => {
          handleSave();
        }}
        className="cardbg rounded-4 p-3 pt-2"

      >
        <div>
          <h3 className=" tit-18-700  textcolor mb-0"> {info.academic_info}</h3>

          <Line className="w-75" />
        </div>

        <div className=" d-flex  align-items-center  gap-4 pt-2">
          <div
            className="  btncolor   rounded-circle  d-flex justify-content-center align-items-center  text-center text-white Tit-12-700 "
            style={{ width: "74px", height: "74px" }}
          >
            Upload Image
          </div>

          <div
            className=" d-flex  justify-content-center align-items-center rounded-3  px-3  py-1 gap-2   "
            style={{ border: "1px  solid  #E3E3E3" }}
          >
            <Upload className=" iconSize1   " />
            <h3 className=" Tit-14-700   mb-0  "> {tt("change")}</h3>
          </div>
        </div>
        <div className=" row  pt-4   g-4">
          <div className=" col-lg-6 col-xl-3">
            <h3 className=" Tit-12-700">
              {info.academic_code}
              <span className="custfont text-danger">*</span>{" "}
            </h3>
            <input
              id="acadimcCode"
              name="acadimcCode"
              type="text"
              className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
              style={{ border: "1px  solid  #E3E3E3" }}
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

          <div className=" col-lg-6 col-xl-3">
            <h3 className=" Tit-12-700">
              {info.full_name}
              <span className="custfont text-danger">*</span>{" "}
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

          <div className="col-lg-6 col-xl-3">
            <h3 className="Tit-12-700">{info.email}</h3>
            <input
              id="email"
              name="email"
              type="text"
              className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
              style={{ border: "1px  solid  #E3E3E3" }}
            />
          </div>

          <div className="col-lg-6 col-xl-3"></div>

          <div className="col-lg-6 col-xl-3">
            <h3 className="Tit-12-700">{info.mobile}</h3>
            <input
              id="mobile"
              name="mobile"
              type="text"
              className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
              style={{ border: "1px  solid  #E3E3E3" }}
            />
          </div>

          <div className="col-lg-6 col-xl-3">
            <h3 className="Tit-12-700">{info.birthdate}</h3>
            <input
              id="birthdate"
              name="birthdate"
              type="text"
              className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
              style={{ border: "1px  solid  #E3E3E3" }}
            />
          </div>

          <div className="col-lg-6 col-xl-3">
            <h3 className="Tit-12-700">{info.password}</h3>
            <input
              id="password"
              name="password"
              type="text"
              className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
              style={{ border: "1px  solid  #E3E3E3" }}
            />
          </div>

          <div className="col-lg-6 col-xl-3"></div>

          <div className="col-lg-6 col-xl-3">
            <h3 className="Tit-12-700">{info.language}</h3>
            <input
              id="language"
              name="language"
              type="text"
              className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
              style={{ border: "1px  solid  #E3E3E3" }}
            />
          </div>

          <div className="col-lg-6 col-xl-3">
            <h3 className="Tit-12-700">{info.region_unit}</h3>
            <input
              id="region_unit"
              name="region_unit"
              type="text"
              className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
              style={{ border: "1px  solid  #E3E3E3" }}
            />
          </div>
        </div>

        <div className=" mt-4 d-flex flex-column col-lg-3 col-md-4 col-6 gap-2 ">
          <div className="form-check form-switch  d-flex justify-content-between gap-3   m-0 p-0 ">
            <label
              className="d-flex  custfont text-nowrap"
              htmlFor="flexSwitchCheckDefault"
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
              htmlFor="flexSwitchCheckDefault"
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

        <div className=" d-flex justify-content-end mt-5">
          <button className=" btn btn-light custfontbtn" type="submit">
            {info.save}
          </button>
        </div>
      </form>
    </>
  );
}
