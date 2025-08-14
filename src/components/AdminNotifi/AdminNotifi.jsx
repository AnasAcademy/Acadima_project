"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Circle from "@/assets/notifCard/Ellipse 26.svg";
import AdminPrevCard from "@/components/AdminPrevCard/AdminPrevCard";
import { NotificationContext } from "@/context/NotificationContext";
import Filterr from "@/assets/admin/filterr.svg";
import Search from "@/assets/admin/search.svg";
import { useTranslations } from "next-intl";

export default function AdminNotifi() {
  const { info, key, setKey, flag, setFlag, adminnotifi, editStatus } =
    useContext(NotificationContext);

  const [show, setShow] = useState("");
  const [index, setIndex] = useState(null);
  const [MsgData, setmsgData] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [tab, setTab] = useState("all"); // 'all' | 'read' | 'unread'

  const t = useTranslations("adminNotfi");

  function extractCleanMessage(html) {
    if (!html) return "";
    // Strip HTML tags
    const text = html.replace(/<[^>]+>/g, "");
    // Only the part before the second " on "
    const parts = text.split(" on ");
    if (parts.length >= 2) {
      return parts[0];
    }
    return text;
  }

  function showMessage(keyIdx, id) {
    setShow("show");
    setmsgData(extractCleanMessage(adminnotifi[keyIdx].message));
    setTitle(adminnotifi[keyIdx].title);
    setDate(adminnotifi[keyIdx].created_at);

    if (index === keyIdx) {
      setIndex(null);
    } else {
      setIndex(keyIdx);
      setmsgData(extractCleanMessage(adminnotifi[keyIdx].message));
      setTitle(adminnotifi[keyIdx].title);
      setDate(adminnotifi[keyIdx].created_at);
      setFlag((prevFlags) => {
        const newFlags = [...prevFlags];
        newFlags[keyIdx] = "read";
        return newFlags;
      });
      editStatus(keyIdx, id);
    }
  }

  useEffect(() => {
    if (key !== null) {
      setShow("show");
      setmsgData(extractCleanMessage(adminnotifi[key].message));
      setTitle(adminnotifi[key].title);
      setDate(adminnotifi[key].created_at);
      setFlag((prevFlags) => {
        const newFlags = [...prevFlags];
        newFlags[key] = "read";
        return newFlags;
      });
    } else {
      setShow("hide");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Reset preview when switching tabs (optional UX)
  useEffect(() => {
    setIndex(null);
    setShow("hide");
  }, [tab]);

  // Build filtered list while preserving original index for each item
  const filtered = useMemo(() => {
    const list = Array.isArray(adminnotifi) ? adminnotifi : [];
    return list
      .map((n, i) => ({ n, i }))
      .filter(({ n, i }) => {
        const st = (flag?.[i] ?? n.status ?? "").toLowerCase();
        if (tab === "all") return true;
        if (tab === "read") return st === "read";
        return st !== "read"; // 'unread'
      })
      .slice(0, 12);
  }, [adminnotifi, flag, tab]);

  return (
    <>
      <div className="w-100">
        <div className="row d-flex flex-column-reverse flex-lg-row gy-4">
          {/* Left column: list */}
          <div className="col-lg-4 col-xl-3 col-sm-12 d-flex justify-content-start align-items-center flex-column gap-4">
            <div className="d-flex justify-content-between align-items-center gap-5 w-100">
              <h2 className="hvvv m-3">{info[0].tit}</h2>
              {/* <Filterr className="iconSize1" /> */}
            </div>

            {/* Tabs */}
            <div className="d-flex gap-3 col-12 rounded-5 border-1 p-1 ps-3 pe-3 justify-content-center align-items-center prevcarda">
              <h4
                className="tit-10-700 m-0 p-2 rounded-3 cursor-pointer"
                style={
                  tab === "all" ? { backgroundColor: "#E2E8F0" } : undefined
                }
                onClick={() => setTab("all")}
              >
                {t("all")}
              </h4>
              <h4
                className="tit-10-700 m-0 p-2 rounded-3 cursor-pointer"
                style={
                  tab === "read" ? { backgroundColor: "#E2E8F0" } : undefined
                }
                onClick={() => setTab("read")}
              >
                {t("read")}
              </h4>
              <h4
                className="tit-10-700 m-0 p-2 rounded-3 cursor-pointer"
                style={
                  tab === "unread" ? { backgroundColor: "#E2E8F0" } : undefined
                }
                onClick={() => setTab("unread")}
              >
                {t("unread")}
              </h4>
            </div>

            {/* List */}
            <div className="d-flex flex-column gap-2 w-100 max-notf-ht overflow-y-auto">
              {filtered.map(({ n: dat, i: orig }) => (
                <div
                  key={dat.id ?? orig}
                  className={` " rounded-4 shadow-sm w-100 d-flex flex-column prevcardta p-3 max-notfi-ht ${
                    index === orig ? " cardbg swap" : " cardbg "
                  }    "  `}
                >
                  <div
                    className="d-flex gap-1"
                    onClick={() => {
                      showMessage(orig, dat.id);
                    }}
                  >
                    <div className="">
                      <Circle
                        width={10}
                        height={10}
                        className={`${
                          (flag?.[orig] ?? dat.status) === "read"
                            ? "flg"
                            : " iconcol"
                        }`}
                      />
                    </div>

                    <div className="d-flex flex-column w-100">
                      <div className="d-flex flex-column w-100">
                        <div className="d-flex flex-column gap-2 w-100">
                          <div className="d-flex justify-content-between g-4 w-100">
                            <h4
                              className={`custsubtitle3 p-0 m-0 ${
                                index === orig ? " swap" : "  "
                              }  `}
                            >
                              {dat.title}
                            </h4>

                            <p
                              className={`ft p-0 m-0  ${
                                index === orig ? " swap" : "  "
                              } `}
                            >
                              {dat.created_at}
                            </p>
                          </div>
                          <p className={`ft p-0 m-0 namcolr`}>
                            {t("senderName")}
                          </p>
                        </div>

                        <p
                          className={`ft d-xl-flex mt-3 d-sm-none d-none ${
                            index === orig ? " swap" : "  "
                          }`}
                        >
                          {extractCleanMessage(dat.message || "").slice(0, 45)}
                          .....
                        </p>

                        {index === orig ? (
                          <p className="d-xl-none d-lg-none d-sm-flex d-flex">
                            <div className="h6v mt-3 p-3">
                              {MsgData}
                            </div>
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: preview */}
          <div className="mt-4 col-lg-8 col-xl-9 col-sm-12 col-12 rounded-4 prevcarda">
            <form className="form-inline my-2 my-lg-0 d-flex p-3 prevcardta ">
              <div className="form-control mr-sm-2 w-50 d-flex gap-2 rounded-4 cardbg p-2 ">
                <Search className="iconSize" />
                <input
                  className="tit-12-400 border-0"
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  aria-label="Search"
                />
              </div>
            </form>

            <AdminPrevCard
              date={date}
              title={title}
              show={show}
              MsgData={MsgData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
