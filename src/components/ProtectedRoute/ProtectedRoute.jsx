"use client";

import { PayContext } from "@/context/PayContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function ProtectedRoute({ children }) {

    const { userCode } = useContext(PayContext);
    const router = useRouter();

    useEffect(() => {
      if (userCode === null) {
        router.push("/not-found"); // Redirect to login if not authenticated
      }
    }, [userCode]);

  


  return <>{ userCode ?  children : " "}</>;
}
