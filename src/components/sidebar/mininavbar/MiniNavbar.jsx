import React from 'react';
import Image from 'next/image';
import mainlogo from "@/assets/navbar assets/mainlogo.png";

export default function InstallmentsNavbar() {
  return (
    <nav className="w-100 d-flex justify-content-between align-items-center px-4 py-3" style={{ backgroundColor: '#0C0C0C' }}>
      <Image src={mainlogo} alt="Logo" height={28} />
    </nav>
  );
}
