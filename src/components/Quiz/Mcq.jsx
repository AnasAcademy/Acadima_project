"use client";
import React, { useState } from "react";

export default function MCQ({ data, index, total }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="text-end" dir="rtl">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-end">
          <p className="text-muted mb-1">درجة السؤال : {data.grade}</p>
          <h5 className="fw-bold custcolor">{data.question}</h5>
        </div>
        <span className="badge secColor text-white  p-2 rounded">
          {index + 1}/{total}
        </span>
      </div>

      <div className="row gy-3">
        {data.answers.map((ans, i) => (
          <div className="col-md-6" key={i}>
            <button
              type="button"
              className={`w-100 rounded-3 p-3 border text-center ${
                selected === i
                  ? "bg-light text-primary border-primary"
                  : "bg-white"
              }`}
              onClick={() => setSelected(i)}
            >
              {ans.text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
