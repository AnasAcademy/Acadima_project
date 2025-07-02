"use client"
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Arrow from "@/assets/admin/arrow down.svg";
import RightArrow from "@/assets/admin/rightArrow.svg";

export default function FrequentlyAskedQues({ qestions }) {
  const t = useTranslations("techSupport");
  const faqs = qestions.data;

  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <div className="cardbg p-3 pt-lg-4 rounded-4 h-100">
      <h2 className="fw-bold mb-3">{t("faq-title")}</h2>

      <div className="d-flex flex-column gap-2">
        {visibleFaqs.map((faq, index) => {
          const actualIndex = showAll ? index : index; // maintain proper index for q/a keys
          const isOpen = openIndex === actualIndex;

          return (
            <div key={actualIndex} className="bg-white rounded border-bottom">
              <button
                onClick={() => handleToggle(actualIndex)}
                className="w-100 d-flex justify-content-start gap-2 align-items-center py-3 border-0 bg-white"
                style={{ fontWeight: 500 }}
              >
                <div
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <RightArrow width={18} height={18} />
                </div>
                <span className="width-fit">{faq.question}</span>
              </button>

              {isOpen && (
                <div
                  className="px-3 pb-3 text-secondary"
                  style={{ fontSize: 14 }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {faqs.length > 4 && (
        <div className="mt-3">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-primary fw-bold d-inline-flex align-items-end gap-2 border-0 bg-transparent"
          >
            <Arrow width={16} height={16} />
            {showAll ? t("view-less-faq") : t("view-all-faq")}
          </button>
        </div>
      )}
    </div>
  );
}
