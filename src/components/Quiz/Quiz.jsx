"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import Quiz1 from "@/assets/quizzes/quiz1.svg";
import Quiz2 from "@/assets/quizzes/quiz2.svg";
import Quiz3 from "@/assets/quizzes/quiz3.svg";
import Quiz4 from "@/assets/quizzes/quiz4.svg";
import Failed from "@/assets/quizzes/quiz-failed.svg";
import Link from "next/link";

import MCQ from "@/components/Quiz/Mcq";
import Essay from "@/components/Quiz/Essay";

export default function Quiz() {
  const t = useTranslations("Quizzes");

  const status = "failed";
  const [isFailed, setIsFailed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsFailed(status === "failed");
  }, [status]);

  const statusText = status === "passed" ? t("passed") : t("failed");
  const color = status === "passed" ? "success" : "danger";

  const questions = [
    {
      id: 1,
      type: "mcq",
      question: "ما هو عاصمة مصر؟",
      grade: 10,
      answers: [
        { text: "القاهرة", isCorrect: true },
        { text: "الإسكندرية", isCorrect: false },
        { text: "الجيزة", isCorrect: false },
        { text: "الأقصر", isCorrect: false },
      ],
    },
    {
      id: 2,
      type: "essay",
      question: "اشرح أهمية نهر النيل في الاقتصاد المصري.",
      grade: 15,
      answer: "", // User will fill this in a <textarea>
    },
    {
      id: 3,
      type: "mcq",
      question: "أي من التالي لغة برمجة؟",
      grade: 5,
      answers: [
        { text: "HTML", isCorrect: false },
        { text: "Python", isCorrect: true },
        { text: "CSS", isCorrect: false },
        { text: "Photoshop", isCorrect: false },
      ],
    },
    {
      id: 4,
      type: "essay",
      question: "ما الفرق بين البرمجة الكائنية والبرمجة الإجرائية؟",
      grade: 20,
      answer: "",
    },
  ];

  const question = questions[currentIndex];

  return (
    <>
      <div className="col-12 cardbg rounded-4 d-flex flex-row p-4 py-5 flex-wrap mt-lg-0 mt-5">
        <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center gap-1">
          <Quiz1 className="iconSize9" />
          <h2 className="fw-bold fs-2">{questions.length}</h2>
          <h3 className="text-muted">{t("Quizzes")}</h3>
        </div>

        <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center gap-1">
          <Quiz2 className="iconSize9" />
          <h2 className="fw-bold fs-2">1/2</h2>
          <h3 className="text-muted">{t("tries")}</h3>
        </div>

        <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center gap-1">
          <Quiz3 className="iconSize9" />
          <h2 className="fw-bold fs-2">5/10</h2>
          <h3 className="text-muted">{t("my-grade")}</h3>
        </div>

        <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center gap-1">
          <Quiz4 className="iconSize9" />
          <h2 className={`fw-bold fs-2 text-${color}`}>{statusText}</h2>
          <h3 className="text-muted">{t("status")}</h3>
        </div>
      </div>

      {!isFailed && (
        <div className="col-12 cardbg rounded-4 p-4 my-4">
          {question.type === "mcq" ? (
            <MCQ
              data={question}
              index={currentIndex}
              total={questions.length}
            />
          ) : (
            <Essay
              data={question}
              index={currentIndex}
              total={questions.length}
            />
          )}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="d-flex gap-2">
              <button
                className="btn custfontbtn rounded-2 px-4"
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0}
              >
                السؤال السابق
              </button>
              <button
                className="btn btn custfontbtn rounded-2 px-4"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, questions.length - 1)
                  )
                }
                disabled={currentIndex === questions.length - 1}
              >
                السؤال التالي
              </button>
            </div>
            <Link href="/quizzes"><button className="btn btn-danger px-4">إنهاء</button></Link>
          </div>
        </div>
      )}

      {isFailed && (
        <div className="col-12 cardbg rounded-4 d-flex flex-column justify-content-center align-items-center gap-3 p-5 flex-wrap mt-4">
          <Failed className="iconSize11 mt-5" />
          <h2>{t("failed-desc")}</h2>
          <div className="d-flex flex-row justify-content-center align-items-center gap-1">
            <Link href="/quizzes">
              <button
                className="btn custfontbtn btncolor white-c d-flex justify-content-center"
                type="button"
              >
                {t("ShowResults")}
              </button>
            </Link>

            <button
              className="btn custfontbtn btncolor white-c d-flex justify-content-center"
              type="button"
              onClick={() => setIsFailed(false)}
            >
              {t("try-again")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
