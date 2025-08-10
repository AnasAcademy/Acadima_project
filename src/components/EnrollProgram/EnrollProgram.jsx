"use client";

import React, { useEffect, useState } from "react";
import Arrow from "@/assets/admin/arrow down.svg";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EnrollProgram({ token }) {
  const t = useTranslations("EnrollProgram");
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBundleId, setSelectedBundleId] = useState("");
  const [error, setError] = useState(null);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://lms.acadimacollege.com/api/development/programs",
          {
            headers: {
              "x-api-key": "1234",
            },
          }
        );

        if (res.data?.categories) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const category = categories.find(
        (cat) => cat.id === parseInt(selectedCategoryId)
      );
      setBundles(category?.activeBundles || []);
      setSelectedBundleId(""); // reset bundle selection
    } else {
      setBundles([]);
    }
  }, [selectedCategoryId, categories]);

  const handleSubmit = async () => {
    if (!selectedCategoryId || !selectedBundleId) {
      setError("الرجاء اختيار فئة البرنامج واسم الدورة.");
      return;
    }

    if (!checkbox1 || !checkbox2) {
      setError("يجب الموافقة على جميع الشروط قبل المتابعة.");
      return;
    }

    try {
      const res = await axios.post(
        "https://api.lxera.net/api/development/organization/vodafone/panel/programs/apply",
        {
          category_id: parseInt(selectedCategoryId),
          bundle_id: parseInt(selectedBundleId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": true,
            "x-api-key": "1234",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        router.push("/payment-plans");
      } else {
        const errors = res.data?.data?.errors;
        if (
          errors?.bundle_id?.includes(
            "User has already applied for this bundle."
          )
        ) {
          setError("لقد قمت بالتسجيل في هذا البرنامج بالفعل.");
        } else {
          setError("حدث خطأ أثناء التسجيل. يرجى المحاولة لاحقاً.");
        }
        console.error("Validation errors:", errors);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert(
        "فشل في الاتصال بالخادم. يرجى التأكد من الاتصال والمحاولة مرة أخرى."
      );
    }
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="p-4 rounded-4 cardbg min-enroll-ht d-flex flex-column gap-5 justify-content-start">
        <div className="row d-flex flex-column gap-4">
          {/* Program Category Select */}
          <div className="col-12">
            <h4 className="custcalendartit">{t("programTypeLabel")}</h4>
            <div className="d-flex justify-content-center align-items-center w-100 position-relative">
              <select
                className="form-select no-native-arrow"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">{t("programTypePlaceholder")}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <Arrow className="iconSize5 position-absolute selclass p-1" />
            </div>
          </div>

          {/* Bundle Select */}
          <div className="col-12">
            <h4 className="custcalendartit">{t("courseNameLabel")}</h4>
            <div className="d-flex justify-content-center align-items-center w-100 position-relative">
              <select
                className="form-select no-native-arrow"
                value={selectedBundleId}
                onChange={(e) => setSelectedBundleId(e.target.value)}
              >
                <option value="">{t("programTypePlaceholder")}</option>
                {bundles.map((bundle) => (
                  <option key={bundle.id} value={bundle.id}>
                    {bundle.title}
                  </option>
                ))}
              </select>
              <Arrow className="iconSize5 position-absolute selclass p-1" />
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="d-flex gap-2 flex-column">
          <div className="form-check d-flex gap-2">
            <input
              className="form-check-input custCheckbox"
              type="checkbox"
              id="flexCheck1"
              checked={checkbox1}
              onChange={(e) => setCheckbox1(e.target.checked)}
            />
            <label
              className="form-check-label custfont me-4"
              htmlFor="flexCheck1"
            >
              <h4>{t("checkbox1")}</h4>
            </label>
          </div>
          <div className="form-check d-flex gap-2">
            <input
              className="form-check-input custCheckbox"
              type="checkbox"
              id="flexCheck2"
              checked={checkbox2}
              onChange={(e) => setCheckbox2(e.target.checked)}
            />
            <label
              className="form-check-label custfont me-4"
              htmlFor="flexCheck2"
            >
              <h4>{t("checkbox2")}</h4>
            </label>
          </div>
        </div>

        {/* Error message */}
        {error && <div className="text-danger text-center">{error}</div>}

        {/* Submit Button */}
        <div>
          <button
            className="btn m-auto btn-light custButton border-0 px-5 py-2 text-nowrap"
            onClick={handleSubmit}
          >
            {t("submitButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
