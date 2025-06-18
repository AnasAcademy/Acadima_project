"use client";
import React, { useEffect, useState } from "react";
import Circle from "@/assets/payments icons/Group 233.svg";
import Up from "@/assets/payments icons/up.svg";
import Down from "@/assets/payments icons/down.svg";
import Paid from "@/assets/payments icons/paid.svg";
import Rs from "@/assets/payments icons/rs.svg";

export default function InstallSmallCard({ headers, installments }) {
  const [expanded, setExpanded] = useState(new Set());

  useEffect(() => {
    const unpaidIndexes = new Set(
      installments
        .map((installment, idx) =>
          installment.flagColor === "red" ? idx : null
        )
        .filter((i) => i !== null)
    );
    setExpanded(unpaidIndexes);
  }, [installments]);

  function toggle(key) {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  }

  return (
    <div className="d-flex flex-column-reverse w-100">
      {installments.map((course, key) => {
        const isOpen = expanded.has(key);
        const { flagColor, data } = course;

        const renderCell = (value) =>
          Array.isArray(value) ? (
            <>
              {value[0]}
              {value[1]?.type === "image" && value[1].src === "rs" && (
                <Rs className="iconcolor ms-1" />
              )}
            </>
          ) : (
            value
          );

        return (
          <div key={key} className="d-flex flex-column mt-3">
            <div
              onClick={() => toggle(key)}
              style={{ cursor: "pointer" }}
              className="bg-white-color rounded-4 d-flex justify-content-around align-items-center p-3"
            >
              {flagColor === "green" ? <Paid /> : <Circle />}
              <h4 className="h8">{data[1]}</h4>
              <div>{isOpen ? <Up /> : <Down />}</div>
            </div>

            {isOpen && (
              <div className="mt-3">
                <div className="d-flex gap-4 justify-content-around flex-column pt-3 pb-3">
                  {[2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="d-flex text-start justify-content-around p-2 bg-prim-color"
                    >
                      <h3 className="custsubtitle3">{headers[i]}</h3>
                      <h3 className="custsubtitle3">{renderCell(data[i])}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
