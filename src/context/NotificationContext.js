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




  async function fetchNotifications() {
    try {
      const res = await fetch(
        "https://api.lxera.net/api/development/organization/vodafone/notifications",
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUwODQxODg1LCJuYmYiOjE3NTA4NDE4ODUsImp0aSI6IjltV2lHYngyQ2RzTEZ2anQiLCJzdWIiOiIxMTkyIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9._JykCIXVh7czjOgQqLYFFIt7p5-r2oaSdlaB9re06t4`,
          },
        }
      );

      const json = await res.json();
      console.log(json.data)
      setNotifications(json.data.notifications || []);

      const initialFlags = json.data.notifications.map((notifi) => notifi.status);

      setFlag(initialFlags);
      console.log(flag)
  
      
    } catch (error) {
      console.error("Notification fetch error:", error);
      setNotfound(true); // Or set some error flag
    }
  }




  useEffect(() => {
   


    fetchNotifications();



    
  }, []);


  async function editStatus(key, id){

     console.log(id)

     setFlag((prevFlags) => {
      const newFlags = [...prevFlags];
      newFlags[key] = "read";
      return newFlags;
    });
        
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
      fetchNotifications();


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
