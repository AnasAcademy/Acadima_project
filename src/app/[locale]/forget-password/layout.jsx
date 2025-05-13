 import React from 'react'
 



 export default function ForgetLayout({ children }) {
   return (
     <html lang="ar" dir="rtl">
       <body
         style={{ backgroundColor: "#fff", color: "#000", minHeight: "100vh" }}
       >
         {children}
       </body>
     </html>
   );
 }
 