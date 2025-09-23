"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import AIChat from "@/components/AIChat/AIChat";

import HelpIcon from "@/assets/admin/helpIcon.svg";
import QuestionMark from "@/assets/admin/question-mark.svg";
import LeftArrow from "@/assets/admin/ai-left-arrow.svg";

export default function AiAssistantClient() {
  const t = useTranslations("AiAssistant");
  const ts = useTranslations("techSupport");
  const questions = t.raw("questions");
  const [selectedQuestion, setSelectedQuestion] = useState("");

  return (
    <div className="   container p-3  mt-4 rounded-4">
      <h2 className="hvvv py-4">{t("AiAssistant")}</h2>
      <div className=" col-12">
        <div
          className="d-flex  flex-column-reverse flex-md-row w-100 h-100 cardbg rounded-4 shadow overflow-hidden "
          style={{ minHeight: "675px" }}
        >
          {/* === RIGHT CHAT PANEL === */}
          <div className="flex-grow-1 d-flex flex-column border-start border-end">
            <div className="gradient-bg d-flex align-items-center justify-content-between p-3">
              <h6 className="text-white m-0 d-flex gap-2 align-items-center">
                <HelpIcon className="iconSize2 iconcolor" />
                {ts("Your-AI-CAHT-Assistant")}
              </h6>
            </div>

            <AIChat
              maxHeight="520px"
              minHeight="400px"
              heightClass="h-100"
              externalMessage={selectedQuestion}
            />
          </div>

          {/* === LEFT PANEL === */}
          <div className="left-panel bg-white border">
            <h3 className="m-0 d-flex gap-3 align-items-center p-3 border-bottom Tit-14-700">
              <div
                className="text-white p-2 rounded-3"
                style={{
                  background: "linear-gradient(to bottom, #216ED7, #A300CC)",
                }}
              >
                <QuestionMark width="18px" height="18px" />
              </div>
              {t("frequent-questions")}
            </h3>
            <p className="m-0 p-3">{t("try-asking")}</p>
            <div className="questions-list d-flex flex-column gap-2 p-3 px-0">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="question d-flex align-items-center justify-content-between gap-2 p-3 mx-2 border rounded-2"
                  onClick={() => setSelectedQuestion(q)}
                >
                  <span className="text-dark small">{q}</span>
                  <LeftArrow className="ai-arrow" width="28px" height="28px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
