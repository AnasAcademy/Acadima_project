import React from "react";
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
          <span className="text-danger">{t("not-found")}</span>
        )}
      </td>
    ),
    text: (col, key) => {
      let textClass = "text-dark";
      let textVal = col.value;

      if (col.value === "active") {textClass = "text-success"; textVal=t("active")}// Green
      else if (col.value === "pending") {textClass = "text-warning"; textVal=t("pending")} // Yellow
      else if (col.value === "inactive") {textClass = "text-danger"; textVal=t("inactive")} // Red

      return (
        <td key={key} className={`text-wrap ${textClass}`}>
          {textVal}
        </td>
      );
    },
    buttons: (col, key) => (
      <td
        key={key}
        className="d-flex gap-1 align-items-center px-1 py-5 justify-content-center"
      >
        {col.buttons?.map((btn, index) => (
          <button
            key={index}
            className="tit-12-400 btncolor text-center m-0 cursor-pointer rounded-2 p-2 px-3 text-nowrap d-flex align-items-center gap-2 justify-content-center"
            style={{
              backgroundColor: btn.color || "#007bff",
              color: btn.textColor || "#fff",
              textDecoration: btn.decoration || "none",
              width: btn.width || "40%",
            }}
            onClick={btn.action}
          >
            {btn.icon && (
              <span
                className="iconSize"
                style={{ color: btn.textColor || "#fff" }}
              >
                {btn.icon}
              </span>
            )}
            {btn.label}
          </button>
        ))}
      </td>
    ),
    progress: (col, key) => (
      <td key={key} className="  ">
        <div className="d-flex align-items-center  flex-row-reverse  gap-2 ">
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
        <div className="d-flex align-items-center justify-content-center gap-2">
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
            <h4 className="fw-semibold m-0 ">{col.id}</h4>
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
  };

  return (
    <>
      <div className=" table-responsive     ">
        <table className="table  no-flag-style   align-middle     ">
          <thead className="  w-100">
            <tr className="text-nowrap text-center  ">
              {TableHead.map((head, index) => {
                return (
                  <th key={index} className="   text-center   ">
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {trainingData.map((item, index) => (
              <tr key={index} className="text-center  ">
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
