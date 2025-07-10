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
  const t = useTranslations("HomePageA");
  const t2 = useTranslations("techSupport");

  const renderCell = {
    image: (col, key) => (
      <td key={key}>
        <Image
          src={`/store/${col.value}`}
          className=" rounded-circle p-0"
          alt="col-val"
          width={50}
          height={50}
        />
      </td>
    ),
    text: (col, key) => (
      <td key={key} className=" text-dark   text-wrap   ">
        {col.value}
      </td>
    ),
    button: (col, key) => (
      <td
        key={key}
        className=" d-flex gap-3   align-items-center p-3  justify-content-center      "
      >
        <h4
          className={` tit-12-400 btncolor text-center m-0 cursor-pointer rounded-4 p-2  px-5 text-nowrap d-flex align-items-center gap-2 justify-content-center`}
          style={{
            backgroundColor: col.color,
            color: col.textColor || "#fff",
            textDecoration: col.decoration || "none",
            width: col.width || "40%",
          }}
        >
          {col.icon ? (
            Icon ? (
              <Icon
                className="iconSize"
                style={{ color: col.textColor || "#fff" }}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {col.value}
        </h4>
        {col.icon ? (
          Icon2 ? (
            <Icon2 className="iconSize2   text-white cursor-pointer" />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </td>
    ),
    buttons: (col, key) => (
      <td
        key={key}
        className=" d-flex gap-3   align-items-center p-3  justify-content-center      "
      >
        <button
          className={` tit-12-400 btncolor text-center m-0 cursor-pointer rounded-4 p-2  px-5 text-nowrap d-flex align-items-center gap-2 justify-content-center`}
          style={{
            backgroundColor: col.color1,
            color: col.textColor || "#fff",
            textDecoration: col.decoration || "none",
            width: col.width || "40%",
          }}
          onClick={col.action1}
        >
          {col.icon ? (
            Icon ? (
              <Icon
                className="iconSize"
                style={{ color: col.textColor || "#fff" }}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {col.value1}
        </button>
        <button
          className={` tit-12-400 btncolor text-center m-0 cursor-pointer rounded-4 p-2  px-5 text-nowrap d-flex align-items-center gap-2 justify-content-center`}
          style={{
            backgroundColor: col.color2,
            color: col.textColor || "#fff",
            textDecoration: col.decoration || "none",
            width: col.width || "40%",
          }}
          onClick={col.action2}
        >
          {col.icon ? (
            Icon ? (
              <Icon
                className="iconSize"
                style={{ color: col.textColor || "#fff" }}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {col.value2}
        </button>
        {col.icon ? (
          Icon2 ? (
            <Icon2 className="iconSize2   text-white cursor-pointer" />
          ) : (
            ""
          )
        ) : (
          ""
        )}
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
      <td key={key} className="" style={{ maxWidth: "150px" }}>
        <div className="d-flex align-items-center gap-2">
          {isUserImg && (
            <Image
              src={col.img}
              alt="user"
              width={40}
              height={40}
              className="rounded-circle"
            />
          )}

          <div className="d-flex flex-column justify-content-start align-items-center">
            <div className="fw-semibold">{col.name}</div>
            <div className="text-muted small">{col.phone}</div>
            <div className="text-muted small">{col.email}</div>
          </div>
        </div>
      </td>
    ),
    radio: (col, key) => (
      <td key={key}>
        <input
          type="radio"
          name="selectOption"
          value={col.value}
          onChange={() => console.log("Selected:", key)}
        />
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
