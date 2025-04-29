import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import pen from "@/assets/settings/penwhite.svg";
import bin from "@/assets/settings/bin.svg";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Connections({ save }) {
  const [edit, setEdit] = useState("");
  const [name, setName] = useState("ramiz");
  const t = useTranslations();
  const info = t.raw("ProfilLinks");

  function editing() {
    if (edit === "edit") setEdit("");
    else {
      setEdit("edit");
    }
  }

  const tr = useTranslations("register");

  function setNamee() {
    let full_name = document.getElementById("fullName").value;
    setEdit("");
    console.log("enter");
    setName(full_name);
  }

  return (
    <>
      <div className=" mt-5">
        <div className=" d-flex  justify-content-between align-items-center">
          <h3 className=" d-flex gap-1 custsubtitle3">
            {" "}
            {info.workLinks}{" "}
            <span className=" custsubtitle3 text-danger">*</span> :{" "}
          </h3>
          <button className=" btn btn-light custfontbtn 5rem">
            {" "}
            {info.addLink}
          </button>
        </div>
        <div className="container">
          <div className=" row g-5">
            <div className=" col-lg-12 ">
              <div className=" d-flex justify-content-between  flex-lg-row flex-sm-column gap-3 align-items-center flex-column bg-prim-color mt-5 p-2">
                {edit === "edit" ? (
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    style={{ width: "100px" }}
                    className=" input-group bg-transparent border-light rounded-3  text-light"
                  />
                ) : (
                  <h4>{name}</h4>
                )}

                {edit === "edit" ? (
                  <input
                    type="text"
                    style={{ width: "100px" }}
                    className=" input-group bg-transparent border-light rounded-3 text-light "
                  />
                ) : (
                  <h4>{info.linkTitle}</h4>
                )}

                {edit === "edit" ? (
                  <input
                    type="text"
                    style={{ width: "100px" }}
                    className=" input-group bg-transparent border-light rounded-3 text-light "
                  />
                ) : (
                  <h4>{info.linkTitle}</h4>
                )}
                {edit === "edit" ? (
                  <input
                    type="text"
                    style={{ width: "100px" }}
                    className=" input-group bg-transparent border-light rounded-3 text-light "
                  />
                ) : (
                  <h4>{info.linkTitle}</h4>
                )}
                {edit === "edit" ? (
                  <input
                    type="text"
                    style={{ width: "100px" }}
                    className=" input-group bg-transparent border-light rounded-3  text-light"
                  />
                ) : (
                  <h4>www.xfgfdhfdh</h4>
                )}
                <div className=" d-flex gap-3">
                  <Image
                    src={pen}
                    alt="pen"
                    className="edit"
                    onClick={editing}
                  />
                  <Image src={bin} alt="bin" className="remove" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" d-flex justify-content-end mt-5">
          <button
            className=" btn btn-light custfontbtn"
            type="submit"
            onClick={setNamee}
          >
            {save}
          </button>
        </div>
      </div>
    </>
  );
}
