"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function OngoingTrain({
  ContainerTop,
  TableHead,
  trainingData,
  Icon,
  Icon2,
  isUserImg,
}) {
  const [openId, setOpenId] = useState(null);
  const t = useTranslations("tables");

  const renderCell = {
    image: (col, key) => (
      <td key={key}>
        {col.value ? (
          <Image
            src={`/store/${col.value}`}
            className="rounded-circle p-0"
            alt="col-val"
            width={50}
            height={50}
          />
        ) : (
          <span className="text-bg-danger p-2 rounded-2 tit-12-400">
            {t("not-found")}
          </span>
        )}
      </td>
    ),
    text: (col, key) => {
      let textClass = "text-dark";
      let textVal = col.value;

      return (
        <td key={key} className={`text-wrap ${textClass}`}>
          {textVal}
        </td>
      );
    },
    label: (col, key) => {
      let textClass = "text-dark";
      let textVal = col.value;

      if (
        col.value === "active" ||
        col.value === "approved" ||
        col.value === "success" ||
        col.value === "publish"
      ) {
        textClass = "text-bg-success p-2 rounded-2 tit-12-400";
        textVal = t(col.value);
      } // Green
      else if (
        col.value === "pending" ||
        col.value === "refund" ||
        col.value === "draft"
      ) {
        textClass = "text-bg-warning p-2 rounded-2 tit-12-400";
        textVal = t(col.value);
      } // Yellow
      else if (col.value === t("manual")) {
        textClass = "text-warning ";
        textVal = col.value;
      } else if (
        col.value === "inactive" ||
        col.value === "rejected" ||
        col.value === "blocked"
      ) {
        textClass = "text-bg-danger p-2 rounded-2 tit-12-400";
        textVal = t(col.value);
      } // Red
      else if (col.value === "is_draft") {
        textClass = "text-bg-dark p-2 rounded-2 tit-12-400";
        textVal = t(col.value);
      }

      return (
        <td key={key}>
          <span className={`d-inline-block w-75 text-center ${textClass}`}>
            {textVal}
          </span>
          {col.value === "rejected" && (
            <p
              className="text-danger cursor-pointer"
              onClick={col.rejection_action}
            >
              {t("rejection_reason")}
            </p>
          )}
        </td>
      );
    },
    buttons: (col, key) => (
      <td
        key={key}
        className="d-flex gap-1 align-items-center px-1 justify-content-center"
      >
        {col.buttons?.map((btn, index) => (
          <button
            key={index}
            className="w-50 tit-12-400 btncolor text-center m-0 cursor-pointer rounded-2 p-2 px-3 text-nowrap d-flex align-items-center gap-2 justify-content-center"
            style={{
              backgroundColor: btn.color || "#007bff",
              color: btn.textColor || "#fff",
              textDecoration: btn.decoration || "none",
              width: btn.width || "40%",
            }}
            onClick={btn.action}
          >
            {btn.icon && (
              <btn.icon
                className="iconSize"
                style={{ color: btn.textColor || "#fff" }}
              />
            )}
            {btn.label}
          </button>
        ))}
      </td>
    ),
    progress: (col, key) => (
      <td key={key} className="  ">
        <div className="d-flex  flex-column">
          <strong className="textcolor">{col.value}%</strong>

          <div className="progress flex-grow-1" style={{ height: "8px" }}>
            <div
              className="progress-bar btncolor"
              style={{ width: `${col.value}%` }}
            ></div>
          </div>
        </div>
      </td>
    ),
    icon: (col, key) => (
      <td key={key}>
        <col.value className="iconSize2" />
      </td>
    ),
    user: (col, key) => (
      <td key={key} className="col-2" style={{ maxWidth: "150px" }}>
        <div className="d-flex align-items-center justify-content-start gap-2">
          {isUserImg && (
            <Image
              src={col.img}
              alt="user"
              width={40}
              height={40}
              className="rounded-circle"
            />
          )}

          <div className="d-flex flex-column justify-content-start align-items-start">
            <h4 className="fw-semibold m-0 ">{col.name}</h4>
            {col.id && <h4 className="fw-semibold m-0 ">ID:{col.id}</h4>}
            <h4 className="text-muted small m-0 ">{col.phone}</h4>
            <h4 className="text-muted small m-0 ">{col.email}</h4>
          </div>
        </div>
      </td>
    ),
    toggleAccess: (col, key) => (
      <td key={key}>
        <div className="d-flex justify-content-center align-items-center">
          <label className="form-check form-switch d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={col.value === 1}
              onChange={() => col.onToggle?.(col.id, col.value)}
            />
          </label>
          <span>Access</span>
        </div>
      </td>
    ),
    actionbutton: (col, key) => (
      <td key={key}>
        <div className=" justify-content-center  align-items-center  position-relative  ">
          <button
            className={`tit-12-400 btncolor text-center cursor-pointer text-nowrap d-flex align-items-center gap-2 justify-content-center actionButton w-100 ${
              openId === col.id ? "actionButton-borderradius" : " rounded-2"
            }`}
            onClick={() => {
              setOpenId((prev) => (prev === col.id ? null : col.id));
            }}
          >
            {col.icon && <col.icon style={{ color: "#fff" }} />}
            {col.label}
          </button>

          {openId === col.id && (
            <div className="  bg-white d-flex  flex-column justify-content-center align-items-center  position-absolute    z-3  w-100  border-1 border">
              {col.lists.map((list, index) => (
                <h6
                  className=" text-dark d-flex  justify-content-center align-items-center gap-2 p-1 cursor-pointer"
                  key={`${col.id}-${index}`}
                  onClick={list.action}
                >
                  {list.icon && (
                    <list.icon style={{ color: "#fff" }}>{col.icon}</list.icon>
                  )}
                  {list.label}
                </h6>
              ))}
            </div>
          )}
        </div>
      </td>
    ),
  };

  return (
    <>
      <div className=" table-responsive     ">
        <table className="table  no-flag-style   align-middle   position-relative   ">
          <thead className="  w-100">
            <tr className="text-nowrap text-center  ">
              {TableHead.map((head, index) => {
                return (
                  <th key={index} className="tableTextdir">
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {trainingData.map((item, index) => (
              <tr key={index} className="tableTextdir ">
                {item.columns.map((col, colindex) => {
                  return renderCell[col.type] ? (
                    renderCell[col.type](col, `${index}-${colindex}`)
                  ) : (
                    <td key={`${index}-${colindex}`}></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
