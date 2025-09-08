"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Check from "@/assets/admin/Check.svg";
import Pen from "@/assets/admin/pen.svg";
import { useUserData } from "@/context/UserDataContext";
import { useApiClient } from "@/hooks/useApiClient";

export default function RolesTable({ initialData = [] }) {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
  const { getRoleOptions, getStatusOptions } = useUserData();
  const { request } = useApiClient();
  const [dataa, setDataa] = useState(initialData);
  const [filter, setFilter] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [currentFilters, setCurrentFilters] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [formState, setFormState] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editFormLoading, setEditFormLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await request({
        method: "GET",
        urlPath: `/users/roles`,
      });

      const data = response?.roles || [];
      setDataa(data);
      setFilter(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    } else {
      fetchData(page);
    }
  }, []);

  const TableHead = [
    "#",
    t("title"),
    t("number_of_users"),
    t("user-access"),
    t("creation_date"),
    t("actions"),
  ];

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: item.id || "-" },
      {
        type: "text",
        value: item.name || "-",
      },
      { type: "text", value: item.users_count },
      {
        type: "label",
        value:
          item.is_admin === 1 ? (
            <Check className="text-success" size={16} />
          ) : item.is_admin === 0 ? (
            <X className="text-danger" size={16} />
          ) : (
            "-" 
          ),
      },
      { type: "text", value: item.created_at },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);
          setSelectedId(item.id);
          setFormState("edit");
          setEditFormData(item);
        },
        icon: Arrowdown,
        lists: [
          {
            label: t("edit"),
            // action: () => {
            //   setSelectedId(item.id);
            //   setFormState("edit");
            //   setEditFormData(item);
            //   setShowEditForm(true);
            // },
            icon: Pen,
          },
          {
            label: t("delete"),
            // action: () => {
            //   setShowModal(!showModal);
            //   setSelectedId(item.id);
            //   setFormState("delete");
            // },
            icon: X,
          },
        ],
        id: item.id,
      },
    ],
  }));

  return (
    <>
      <div className="row g-3">
        <div className="col-12">
          <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
            <OngoingTrain
              TableHead={TableHead}
              trainingData={trainingData}
              button={false}
            />
          </div>
        </div>
      </div>

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </>
  );
}
