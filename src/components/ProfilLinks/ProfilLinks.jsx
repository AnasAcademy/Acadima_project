import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PenIcon from "@/assets/settings/penwhite.svg";
import Bin from "@/assets/settings/bin.svg";

export default function ProfilLinks({ save }) {
  const t = useTranslations();
  const info = t.raw("ProfilLinks");
  const [edit, setEdit] = useState("");

  function editing() {
    if (edit === "edit") setEdit("");
    else {
      setEdit("edit");
    }
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
              <div className="d-flex justify-content-between  flex-lg-row flex-sm-column gap-3 align-items-center flex-column bg-prim-color mt-5 p-2">
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
                  <PenIcon className="iconcolor" onClick={editing} />
                  <Bin className="iconcolor" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" d-flex justify-content-end mt-5">
          <button className=" btn btn-light custfontbtn">{save}</button>
        </div>
      </div>
    </>
  );
}
