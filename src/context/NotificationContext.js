'use client'

import React, { createContext, useState } from 'react';
import { useTranslations } from 'next-intl';

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {


  const [key, setKey] = useState(null)

  const t = useTranslations();
  const info = t.raw('notifications');



  return (
    <NotificationContext.Provider value={{ info, key, setKey }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
