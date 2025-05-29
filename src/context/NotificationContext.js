'use client'

import React, { createContext, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {


  const [key, setKey] = useState(null)

  const t = useTranslations();
  const info = t.raw('notifications');
  const [notFound ,setNotfound] =  useState(null);

  
  const [flag, setFlag] = useState([]);

useEffect(()=>{
  const initialFlags = info.map((notifi) => notifi.flag);
  setFlag(initialFlags);
},[])



  return (
    <NotificationContext.Provider value={{ info, key, setKey , setNotfound , notFound  , flag , setFlag }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
