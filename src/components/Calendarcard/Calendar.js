'use client'
import React, { useState, useEffect } from "react";
import { useTranslations  , useLocale} from "next-intl";
import "@/styles/Calendar.css";

import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subMonths,
  addMonths,
} from "date-fns";
import { arSA } from "date-fns/locale"; 
import Previous from "@/assets/calendar/Previous.svg";
import Next from "@/assets/calendar/Next.svg";
import NoEvents from "@/assets/calendar/noEvents.svg";
import Line from "@/assets/calendar/Line 50.svg";
import Blucircle from "@/assets/calendar/Ellipse 18.svg";
import Redcircle from "@/assets/calendar/Ellipse 19.svg";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
    const [sel, setSel] = useState(false);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
const loc = useLocale();
 const t = useTranslations();
    const info = t.raw("calendar");
  const ts = useTranslations("todaySchedule");

 
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
    
      try {
        const data2 = [
          {
            date: "2025-05-05",
            time:"12:00",
            title: "محاضرة أساسيات تجربة المستخدم",
            type: "lecture", 
            link: "",
          },
          {
            date: "2025-05-10",
            time:"2:00",
            title: "تسليم مشروع تخرج الفترة الأولى",
            type: "assignment", 
            link: "",
          },
          {
            date: "2025-05-01",
            time:"4:00",
            title: "اجتماع مشروع التخرج",
            type: "meeting",
            link: "",
          },
          {
            date: "2025-05-19",
            time:"12:00",
            title: "تسليم مشروع تخرج الفترة الأولى",
            type: "assignment", 
            link: "",
          },
          {
            date: "2025-12-11",
            time:"12:00",
            title: "اجتماع مشروع التخرج",
            type: "meeting",
            link: "",
          },{
            date: "2024-12-27",
            time:"5:00",
            title: "اجتماع مشروع التخرج",
            type: "meeting",
            link: "",
          },
          {
            date: "2024-12-04",
            time:"10:00",
            title: "اجتماع مشروع التخرج",
            type: "meeting",
            link: "",
          },
        ];
        

        // Format data
        const formattedEvents = data2.reduce((acc, event) => {
          const eventDate = format(new Date(event.date), "yyyy-MM-dd");
          acc[eventDate] = acc[eventDate] || [];
          acc[eventDate].push({
            title: event.title,
            time: event.time,
            type: event.type,
            link: event.link,
            color: event.type === "assignment" ? "red" : event.type === "lecture" ? "blue" : "green",
          });
          return acc;
        }, {});
        

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
        console.log("enter")
      }
    };

    
     fetchEvents();

   


  }, [currentDate]);

  const handleDateClick = (date) => {
 
    setSelectedDate(date);
    setSel(true);
 
  };

  const renderEvents = () => {

    const selectedDateString = format(selectedDate, "yyyy-MM-dd");
    const selectedDayEvents = events[selectedDateString] || [];


    return (
      <div className=" cardbg  d-flex flex-column gap-3 ">
          <div className=" d-flex justify-content-center align-items-center ">
          <Line width={320} />
        </div>
        {  sel  ?  <h3 className=" custcalendartit  ms-3 me-3  ">{info.tasksTitle} </h3> :  <h3 className="custcalendartit ms-3 me-3"> {ts("title")}</h3>
        }
        <div className="">
          {loading ? (
            <p>جاري تحميل الأحداث...</p>
          ) : selectedDayEvents.length > 0 ? ( <>

     
  
                {selectedDayEvents.map((event, index) => (
            
            <div key={index} className=" ms-3 me-3 ">

                  <div className=" d-flex flex-column     justify-content-center  ">
     
          <div className=" d-flex gap-3">
            <div className=" d-flex flex-column   custsmfont ">
              <p className=" m-0"> {event.time} </p>{" "}
              <p> {event.time}  </p>
            </div>

            <div>
              {" "}
              <Blucircle width={10} height={10} />{" "}
            </div>

            <div className=" h6v">
              {" "}
              <p className=" mb-1"> {event.title}</p>{" "}
              <p className="ad4"> {ts("event1.action")} </p>{" "}
            </div>
          </div>
        </div>
   
              </div>
               ) )}
                    <div className=" d-flex justify-content-end">
          <button className="btn btn-light custfontbtn  m-3 px-3  mt-0">
            {" "}
            {ts("action")}{" "}
          </button>
        </div>
        </>  ) : (
            <>
              
            <div className="no-events">
              <p className="no-events-title mt-2">
                     {info.noTasks}
              </p>
              <div className="no-events-placeholder mt-0">
                <NoEvents className="noEvents-image" />
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
  
    return (
      <div className="calendar-header   d-flex flex-row-reverse cardbg p-4 w-100">
        <div className={`arrows-container m-0 p-0   ${ loc === "ar" ? "flex-row-reverse" :"" }  d-flex `}>
          <button
            className="arrow-button"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <Previous className="arrow" />
          </button>
          <button
            className="arrow-button"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <Next className="arrow" />
          </button>
        </div>
        <h2 className="  m-0  p-0 custcalendar">
          {format(currentDate, "MMMM yyyy", loc ==="ar" ? {locale: arSA} : null)}
        </h2>
      </div>
    );
  };

  const renderDaysOfWeek = () => (
    <div className="calendar-days text-white cardbg">
      {info.days.map(
        (day, index) => (
          <div key={index} className="no-events-title  ">
            {day}
          </div>
        )
      )}
    </div>
  );

  const renderDates = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const startDate = startOfWeek(monthStart, { locale: arSA });
    const endDate = endOfWeek(monthEnd, { locale: arSA });

    const rows = [];
    let days = [];
    let day = new Date(startDate.getTime()); // Clone startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isSelected =
          format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
        const isCurrentDay =
          format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
        const hasEvents = events[formattedDate]?.length > 0;

        const dayClass = `
          calendar-day   pt-1 w-50 m-2 pb-1
          ${isCurrentDay ? "current-day" : ""} 
          ${isSelected ? "selected" : ""} 
          ${hasEvents ? "has-events" : ""} 
          ${format(day, "MM") !== format(monthStart, "MM") ? "disabled" : ""}
        `;

        days.push(
          <div
            key={formattedDate}
            className={dayClass}
            onClick={() => handleDateClick(formattedDate)} // Clone the day properly
          >
            {format(day, "d")}
          </div>
        );

        // Increment day safely
        day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
      }
      rows.push(
        <div className="calendar-week text-white cardbg" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-dates text-white cardbg">{rows}</div>;
  };

  return (
    <div className="custom-calendar text-white cardbg w-100">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDates()}
      {renderEvents()}
    </div>
  );
}

export default Calendar;
