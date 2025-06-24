"use client";
import React, { useState } from "react";

export default function Essay({ data, index, total }) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="text-end" dir="rtl">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-end">
          <p className="text-muted mb-1">درجة السؤال : {data.grade}</p>
          <h5 className="fw-bold custcolor">{data.question}</h5>
        </div>
        <span className="badge secColor text-white p-2 rounded">
          {index + 1}/{total}
        </span>
      </div>

      <textarea
        rows={6}
        className="form-control"
        placeholder="اكتب إجابتك هنا..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
    </div>
  );
}
