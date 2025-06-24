'use client'

import React, { createContext, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const NotificationContext = createContext();

export default   function NotificationProvider({ children }) {


  const [key, setKey] = useState(null)
  const [adminnotifi, setNotifications] = useState([]);
  const t = useTranslations();
  const info = t.raw('notifications');
  const [notFound ,setNotfound] =  useState(null);
  const [flag, setFlag] = useState([]);



  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/development/organization/vodafone/notifications",
          {
            method: "GET",
            headers: {
              "x-api-key": "1234",
              "Content-Type": "application/json",
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUwNzU4MDM0LCJuYmYiOjE3NTA3NTgwMzQsImp0aSI6IjBFcXFPelMyaEM0emNpbzEiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.ePv9YP_D3xu_-RenxiLmeRdw-gSBDzsfvKZb4CTpwE0`,
            },
          }
        );
  
        const json = await res.json();
        console.log(json.data)
        setNotifications(json.data.notifications || []);

       
        
      } catch (error) {
        console.error("Notification fetch error:", error);
        setNotfound(true); // Or set some error flag
      }
    }
  


    fetchNotifications();



    const initialFlags = adminnotifi.map((notifi) => notifi.status);

    setFlag(initialFlags);
    console.log(flag)

  }, []);


  async function editStatus(id){

     console.log(id)

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/development/organization/vodafone/notifications/${id}/seen`,
        {
          method: "post",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUwNzU4MDM0LCJuYmYiOjE3NTA3NTgwMzQsImp0aSI6IjBFcXFPelMyaEM0emNpbzEiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.ePv9YP_D3xu_-RenxiLmeRdw-gSBDzsfvKZb4CTpwE0`,
          },
        }
      );

      const json = await res.json();
      console.log(json.success)

      

    } catch (error) {
      console.error("Notification fetch error:", error);
      setNotfound(true); // Or set some error flag
    }
  
    
  }


  return (
    <NotificationContext.Provider value={{ info, key, setKey , setNotfound , notFound  , flag , setFlag , adminnotifi ,editStatus }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
