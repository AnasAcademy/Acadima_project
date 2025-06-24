"use client";

import { BarChart, Bar, YAxis, ResponsiveContainer } from "recharts";
import { LiaCertificateSolid } from "react-icons/lia";
import { IoIosRocket } from "react-icons/io";
import { RiBarChart2Fill } from "react-icons/ri";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const data = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 22 },
    { name: 'Apr', value: 60 },
    { name: 'May', value: 100 },
    { name: 'Jun', value: 85 },
    { name: 'Jul', value: 98 },
    { name: 'Aug', value: 60 },
    { name: 'Sep', value: 30 },
];

const ActiveUsersAnalysis = ({dat}) => {

    // Get the current locale (language)
    const locale = useLocale();
    const isRTL = locale === "ar"; // Correct detection of Arabic
    const t = useTranslations("DashboardA");

    return (
      <div className="card  border-0 shadow-sm rounded-3 p-3 text-white">
        {/* Chart */}
        <div
          className="p-3 mb-4 rounded-3"
          style={{
            background: "linear-gradient(90deg, #1e2a47, #0f111d)",
            height: 250,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              {/* Keep YAxis only */}
              <YAxis
                stroke="#fff"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#fff",
                  fontSize: 14,
                  dx: -10, // moves the labels more to the left
                }}
                tickMargin={8} // space between tick and axis line
                padding={{ top: 10, bottom: 0 }} // allow space for 0 at bottom
              />

              {/* Remove these for clean look */}
              {/* <CartesianGrid /> */}
              {/* <XAxis /> */}
              {/* <Tooltip /> */}

              <Bar
                dataKey="value"
                fill="#ffffff"
                radius={[10, 10, 0, 0]}
                barSize={10}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h3>{t("active_users_analysis_title")}</h3>
          <p>{t("active_users_analysis_desc")}</p>
        </div>

        {/* Stats Row */}
        <div className="row g-3 px-3">
          <div
            className={`col-6 col-md-3 ${isRTL ? "text-start" : "text-end"}`}
          >
            <div className="d-flex flex-row align-items-center">
              <div className="secColor text-white rounded-3 p-1">
                <RiBarChart2Fill size={16} />
              </div>
              <h6 className="mx-1">{t("total_courses")}</h6>
            </div>
            <h3 className="my-2">{dat.total_webinars}</h3>
            <div
              className="progress"
              style={{ height: "5px", direction: isRTL ? "rtl" : "ltr" }}
            >
              <div
                className="progress-bar secColor"
                role="progressbar"
                style={{ width: "75%" }} // adjust this as needed
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>

          <div
            className={`col-6 col-md-3 ${isRTL ? "text-start" : "text-end"}`}
          >
            <div className="d-flex flex-row align-items-center">
              <div className="secColor text-white rounded-3 p-1">
                <RiBarChart2Fill size={16} />
              </div>
              <h6 className="mx-1">{t("completed_courses")}</h6>
            </div>
            <h3 className="my-2">-</h3>
            <div
              className="progress"
              style={{ height: "5px", direction: isRTL ? "rtl" : "ltr" }}
            >
              <div
                className="progress-bar secColor"
                role="progressbar"
                style={{ width: "75%" }} // adjust this as needed
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>

          <div
            className={`col-6 col-md-3 ${isRTL ? "text-start" : "text-end"}`}
          >
            <div className="d-flex flex-row align-items-center">
              <div className="secColor text-white rounded-3 p-1">
                <IoIosRocket size={16} />
              </div>
              <h6 className="mx-1">{t("ongoing_courses")}</h6>
            </div>
            <h3 className="my-2">{dat.total_active_webinars}</h3>
            <div
              className="progress"
              style={{ height: "5px", direction: isRTL ? "rtl" : "ltr" }}
            >
              <div
                className="progress-bar secColor"
                role="progressbar"
                style={{ width: "75%" }} // adjust this as needed
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>

          <div
            className={`col-6 col-md-3 ${
              isRTL ? "text-start" : "text-end"
            } pb-4`}
          >
            <div className="d-flex flex-row align-items-center">
              <div className="secColor text-white rounded-3 p-1">
                <LiaCertificateSolid size={16} />
              </div>
              <h6 className="mx-1">{t("issued_certificates")}</h6>
            </div>
            <h3 className="my-2">{dat.total_certificates}</h3>
            <div
              className="progress"
              style={{ height: "5px", direction: isRTL ? "rtl" : "ltr" }}
            >
              <div
                className="progress-bar secColor"
                role="progressbar"
                style={{ width: "75%" }} // adjust this as needed
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ActiveUsersAnalysis;