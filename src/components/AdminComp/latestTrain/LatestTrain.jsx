"use client";

import React, { useContext, useMemo } from "react";
import { useTranslations } from "next-intl";
import { NotificationContext } from "@/context/NotificationContext"; // <-- adjust path if different
import Notif from "../../../assets/admin/notif.svg";
import Line from "../../../assets/admin/Line.svg";

export default function LatestTrain({ h }) {
  const t = useTranslations("HomePageA");
  const { adminnotifi } = useContext(NotificationContext);

  // Keep only the latest 4 notifications
  const items = useMemo(() => {
    const list = Array.isArray(adminnotifi) ? adminnotifi : [];
    return list.slice(0, 4);
  }, [adminnotifi]);

  return (
    <div
      className={`rounded-3 shadow-sm container-fluid p-4 rounded-4 cardbg ${
        h ? h : "min-train-ht"
      }`}
    >
      <h3 className="tit-18-700">{t("updat")}</h3>

      {/* Content */}
      {!items.length ? (
        <div className="text-muted mt-4">
          {t("no_updates")}
        </div>
      ) : (
        <div className="d-flex mt-5 flex-column gap-4">
          {items.map((n, idx) => (
            <div key={n.id ?? idx} className="d-flex gap-3 py-2">
              {/* Left rail: Notif + vertical Line (except after last item) */}
              <div className="d-flex flex-column align-items-center justify-content-md-between gap-1" style={{ width: 24 }}>
                <Notif />
                <Line style={{ height: "100%" }} />
              </div>

              {/* Right: title + date only */}
              <div className="flex-grow-1">
                <h3 className="h3v m-0">{n.title ?? ""}</h3>
                <h6 className="m-0 text-muted">{n.created_at ?? ""}</h6>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
