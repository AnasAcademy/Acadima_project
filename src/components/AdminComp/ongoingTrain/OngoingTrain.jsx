import React from 'react'
import { useTranslations } from "next-intl";
import Image from 'next/image'
import Circle from "../../../assets/admin/circle.svg";

export default function OngoingTrain() {

    const t = useTranslations("HomePageA");
    const trainingData = [
        { program: t("tablerow"), employees: 6, completion: 60 },
        { program: t("tablerow"), employees: 2, completion: 10 },
        { program: t("tablerow"), employees: 3, completion: 100 },
        { program: t("tablerow"), employees: 5, completion: 100 },
        { program: t("tablerow"), employees: 7, completion: 25 },
        { program: t("tablerow"), employees: 3, completion: 40 },
      ];
  return (
    <>
      <div className="   rounded-3 shadow-sm   p-md-5  p-2 container-fluid  cardbg   ">
        <h3> {t("trainpro")} </h3>
        <div className=" d-flex gap-2">
          <Circle />
          <h6 className=" h6v"> {t("subtrainpro")} </h6>
        </div>
        <div className="container mt-4">
          <table className="table   align-middle">
            <thead>
              <tr className="  ">
                <th className="  ">{t("tableHead3")} </th>
                <th className=" ">{t("tableHead2")}</th>
                <th className=" ">{t("tableHead1")} </th>
              </tr>
            </thead>
            <tbody>
              {trainingData.map((item, index) => (
                <tr key={index}>
                  <td className=" p-3 text-dark">{item.program}</td>
                  <td>
                    <div className="d-flex">
                      {[...Array(item.employees)].map((_, i) => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/30?img=${i + 1}`}
                          className="rounded-circle  "
                          width="15"
                          height="15"
                          alt="Employee"
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center  flex-row-reverse  gap-2">
                      <strong className="sectextcolor">
                        {item.completion}%
                      </strong>

                      <div
                        className="progress flex-grow-1"
                        style={{ height: "8px" }}
                      >
                        <div
                          className="progress-bar secColor"
                          style={{ width: `${item.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
