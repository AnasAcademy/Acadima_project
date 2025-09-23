"use client";

import React, { createContext, useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [key, setKey] = useState(null);
  const [adminnotifi, setNotifications] = useState([]);
  const [notFound, setNotfound] = useState(null);
  const [flag, setFlag] = useState([]);
  const t = useTranslations();
  const info = t.raw("notifications");

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/proxy/notifications?limit=10&page=1");
      const json = await res.json();

      // Support both { notifications: [...] } and { data: { notifications: [...] } }
      const list =
        (Array.isArray(json?.notifications) && json.notifications) ||
        (Array.isArray(json?.data?.notifications) && json.data.notifications) ||
        [];


         console.log(list)
      setNotifications(list);

      // keep a parallel status array for quick read/unread UI state
      const initialFlags = list.map((n) => n.status);
      setFlag(initialFlags);
      setNotfound(false);
    } catch (error) {
      console.error("Notification fetch error:", error);
      setNotfound(true);
      setNotifications([]);
      setFlag([]);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  async function editStatus(idx, id) {
    // optimistic UI update
    setFlag((prev) => {
      const next = [...prev];
      next[idx] = "read";
      return next;
    });
    setNotifications((prev) =>
      prev.map((n, i) => (i === idx ? { ...n, status: "read" } : n))
    );

    try {
      const res = await fetch(`/api/proxy/notifications/${id}/seen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // If backend signals failure, rollback by refetching
      if (!res.ok) {
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Mark-as-seen error:", error);
      // rollback by refetching the authoritative list
      await fetchNotifications();
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        info,
        key,
        setKey,
        setNotfound,
        notFound,
        flag,
        setFlag,
        adminnotifi,
        editStatus,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
