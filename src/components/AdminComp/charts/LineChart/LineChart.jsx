"use client";
import React from 'react'
import { ResponsiveLine } from "@nivo/line";
import { useTranslations } from "next-intl";

export default function LineChart() {

      const t = useTranslations("HomePageA");
    const data = [
        {
            id: "Series 1",
            data: [
                { x: "Jan", y: 30 },
                { x: "Feb", y: 45 },
                { x: "Mar", y: 50 },
                { x: "Apr", y: 60 },
                { x: "May", y: 80 },
                { x: "Jun", y: 95 },
                { x: "Jul", y: 85 },
                { x: "Aug", y: 70 },
                { x: "Sep", y: 75 },
                { x: "Oct", y: 45 },
                { x: "Nov", y: 20},
                { x: "Dec", y: 10 },
            ],
        },
        {
            id: "Series 2",
            data: [
                { x: "Jan", y: 100 },
                { x: "Feb", y: 35 },
                { x: "Mar", y: 40 },
                { x: "Apr", y: 50 },
                { x: "May", y: 55 },
                { x: "Jun", y: 60 },
                { x: "Jul", y: 50 },
                { x: "Aug", y: 40 },
                { x: "Sep", y: 45 },
                { x: "Oct", y: 50 },
                { x: "Nov", y: 55 },
                { x: "Dec", y: 60 },
            ],
        },
    ];

    return (
      <div className=" container-fluid  rounded-3 shadow-sm    p-md-5  p-2 text-center    bg-white ">
        <h3>{t("linchart")}</h3>
        <h6> {t("linechart")} </h6>

        <div
          className="chart-container   "
          style={{ width: "88%", height: "360px" }}
        >
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }} // Reduced top margin
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: true }}
            axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
            axisLeft={{ tickSize: 5, tickPadding: 20, tickRotation: 0 }}
            curve="monotoneX"
            colors={["#14b8a6", "#0284c7"]}
            enableArea={true}
            areaOpacity={0.6}
            enableGridX={false}
            enableGridY={true}
            useMesh={true}
            // Added point properties for hover
            enablePoints={true}
            pointSize={0}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            enablePointLabel={false}
            // Custom tooltip
            tooltip={({ point }) => (
              <div
                style={{
                  background: "white",
                  padding: "5px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
              >
                <strong>{point.serieId}</strong>
                <br />
                Month: {point.data.x}
                <br />
                Value: {point.data.y}
              </div>
            )}
            defs={[
              {
                id: "gradient1",
                type: "linearGradient",
                colors: [
                  { offset: 0, color: "#14b8a6", opacity: 0.8 },
                  { offset: 100, color: "#14b8a6", opacity: 0 },
                ],
              },
              {
                id: "gradient2",
                type: "linearGradient",
                colors: [
                  { offset: 0, color: "#0284c7", opacity: 0.8 },
                  { offset: 100, color: "#0284c7", opacity: 0 },
                ],
              },
            ]}
            fill={[
              { match: { id: "Series 1" }, id: "gradient1" },
              { match: { id: "Series 2" }, id: "gradient2" },
            ]}
          />
        </div>
      </div>
    );
}