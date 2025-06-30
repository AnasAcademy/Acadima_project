'use client'

import React, { createContext, useEffect, useState } from 'react';
export const PayContext = createContext();




export default  function PayProvider({ children }) {

const [userCode ,setUserCode] =  useState(null);
    
             
useEffect(() => {
    async function getdata(){
const data = await fetch(
    "https://lms.acadimacollege.com/api/development/panel",
    {
      method: "GET",
      headers: {
        "x-api-key": "1234",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xtcy5hY2FkaW1hY29sbGVnZS5jb20vYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzQ4MjUxNzUzLCJuYmYiOjE3NDgyNTE3NTMsImp0aSI6Inc3NGh4dEc0U2ZFTHRQNjkiLCJzdWIiOiIxOTUxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.LvUqo0WvFYUz3ZJBD-T503sxzkPtFeT8FYQrOw4TOXM`, // if needed
      },
    }
  );
  const respond = await data.json()

  setUserCode(respond.user.user_code)
    }



    getdata()

} ,[])

    return <>
     <PayContext.Provider value={{ userCode , setUserCode }}
    >
      {children}
    </PayContext.Provider>
    
    </>

 }
  