import React from "react";
import { BsLinkedin } from "react-icons/bs";
import Image from "next/image";
import Cert_image from "../../assets/cerfti.svg";

export default function CertificateCard({ certs, t }) {
  if (!certs || certs.length < 2) return null;

  return (
    <div className="row gy-4 d-flex flex-column flex-md-row flex-lg-column">
      {certs.map((cert, index) => (
        <div key={index} className="col-12 col-md-11  col-xl-8">
          <div className="cardbg rounded-3 p-4 h-100 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3 min-certf-ht">
            {/* Right: Text */}
            <div className="d-flex align-items-center gap-3 text-end flex-column flex-lg-row">
              <Cert_image width={50} height={50} className="iconcolor" />

              <div className="d-flex flex-column gap-1 justify-content-start align-items-lg-start align-items-center border-bottom-sm-md">
                <p className="custfont mb-1">{t("message")}</p>
                <p className="h6v fw-bold mb-1">{cert.title}</p>
                <p className="custsmfont m-0">
                  {t("certificateId", { id: cert.id })}
                </p>
              </div>
            </div>

            {/* Left: Buttons */} 
            <div className="d-flex gap-2">
              <button className="btn btn-light custfontbtn px-3">
                {t("downloadPDF")}
              </button>
              <button className="btn btn-light custfontbtn px-3">
                {t("downloadJPG")}
              </button>
              <button className="btn btn-outline-light d-flex align-items-center justify-content-center px-1 py-1  priBack">
                <BsLinkedin size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
