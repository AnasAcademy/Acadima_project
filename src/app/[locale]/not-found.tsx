'use client'
import React, { useEffect, useContext } from "react";
import "@/styles/globals.css";
import BrokenCable from "@/assets/broken-cable.svg";
import { NotificationContext } from "@/context/NotificationContext";


export default function NotFound() {


  const { setNotfound } = useContext(NotificationContext);
  

   useEffect(()=>{

   
    setNotfound(true);

    return () => {
      setNotfound(false); //unmount
    };

   },[])




  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center bg-white text-center p-4">
   
      <div className="w-100 d-flex justify-content-center">
        <BrokenCable style={{ width: "400px", height: "auto" }} />
      </div>


      <h1 className="fw-bold mb-3" style={{ fontSize: "32px", color: "black" }}>
        Page Not Found
      </h1>

      <h5 className="fw-normal" style={{ color: "black" }}>
        Something Went Wrong!
      </h5>

      <p
        className="fw-normal mb-4"
        style={{ maxWidth: "400px", color: "#aaaaaa" }}
      >
        Check your internet connection, or try refreshing your browser.
      </p>
    </div>
  );
}
