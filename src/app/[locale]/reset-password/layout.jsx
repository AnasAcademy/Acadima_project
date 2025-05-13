 import React from 'react'
 

 export default function ResetLayout({ children }) {
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
 