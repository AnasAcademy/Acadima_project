import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PenIcon from "@/assets/settings/penwhite.svg";
import Bin from "@/assets/settings/bin.svg";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Connections({ save }) {
  const [edit, setEdit] = useState("");
  const [name, setName] = useState("ramiz");
  const [link , setLink] = useState("")
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

  function addLink(){


        if(link === "link"){
                        setLink("");
        }
        else{

                 setLink("link");

        }
   




  }

  return (
    <>
      <div className=" mt-3 position-relative rounded-4 cardbg p-3 pt-2">

        <div className=" d-flex  justify-content-between align-items-center">
          <h3 className=" tit-18-700  textcolor mb-0">
            {info.workLinks}
            <span className=" custsubtitle3 text-danger">*</span> :{" "}
          </h3>

          <button className=" btn btn-light custfontbtn 5rem" onClick={addLink}>
            {link ? save : info.addLink}
          </button>
        </div>

        {link && (
          <div className=" mt-3 position-absolute  w-100 z-3 rounded-4 cardbg pb-5">
            <div className=" container-fluid cardbg">
              <div className="row d-flex justify-content-start ">
                <div className=" d-flex  col-lg-9 col-11 flex-lg-column flex-sm-column   m-4 gap-4 flex-column bg-prim-color mt-5 p-2">
                  <div className=" row d-flex  gap-3">
                    <div className="d-flex   col-12 justify-content-between">
                      <h4 className=" w-50">{name}</h4>
                      <div className="  w-100 d-flex ">
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          className=" input-group bg-transparent border-light rounded-3  text-light w-75   "
                        />
                      </div>
                    </div>

                    <div className=" d-flex  col-12   justify-content-between">
                      <h4 className=" m-0 p-0 text-nowrap w-50">
                        {info.linkTitle}
                      </h4>
                      <div className="  w-100 d-flex ">
                        <input
                          type="text"
                          className=" input-group bg-transparent border-light rounded-3 text-light w-75   "
                        />
                      </div>
                    </div>

                    <div className=" d-flex  col-12   justify-content-between ">
                      <h4 className=" w-50">{info.linkTitle}</h4>
                      <div className="  w-100 d-flex ">
                        <input
                          type="text"
                          className=" input-group bg-transparent border-light rounded-3 text-light w-75   "
                        />
                      </div>
                    </div>

                    <div className=" d-flex   justify-content-between">
                      <h4 className="w-50">{info.linkTitle}</h4>
                      <div className="  w-100 d-flex ">
                        <input
                          type="text"
                          className=" input-group bg-transparent border-light rounded-3 text-light w-75  "
                        />
                      </div>
                    </div>
                    <div className=" d-flex   justify-content-between">
                      <h4 className=" w-50">www.xfgfdhfdh</h4>
                      <div className="  w-100 d-flex ">
                        <input
                          type="text"
                          className=" input-group bg-transparent border-light rounded-3  text-light w-75 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className=" mt-3">
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
                      className=" input-group bg-transparent  rounded-3  text-light "
                    />
                  ) : (
                    <h4>{name}</h4>
                  )}

                  {edit === "edit" ? (
                    <input
                      type="text"
                      style={{ width: "100px" }}
                      className=" input-group bg-transparent  rounded-3 text-light  "
                    />
                  ) : (
                    <h4>{info.linkTitle}</h4>
                  )}

                  {edit === "edit" ? (
                    <input
                      type="text"
                      style={{ width: "100px" }}
                      className=" input-group bg-transparent  rounded-3 text-light "
                    />
                  ) : (
                    <h4>{info.linkTitle}</h4>
                  )}
                  {edit === "edit" ? (
                    <input
                      type="text"
                      style={{ width: "100px" }}
                      className=" input-group bg-transparent  rounded-3 text-light "
                    />
                  ) : (
                    <h4>{info.linkTitle}</h4>
                  )}
                  {edit === "edit" ? (
                    <input
                      type="text"
                      style={{ width: "100px" }}
                      className=" input-group bg-transparent  rounded-3  text-light"
                    />
                  ) : (
                    <h4>www.xfgfdhfdh</h4>
                  )}
                  <div className=" d-flex gap-3">
                    <PenIcon className="iconcolor" onClick={editing} />
                    <Bin className="iconcolor text-danger" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" d-lg-flex justify-content-end mt-5  d-none">
            <button
              className=" btn btn-light custfontbtn"
              type="submit"
              onClick={setNamee}
            >
              {save}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
