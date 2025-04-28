import React from "react";
import { BsLinkedin } from "react-icons/bs";
import Image from "next/image";
import cert_image from '../../assets/cert-icon.png';

export default function CertificateCard({ certs, t }) {
  if (!certs || certs.length < 2) return null;

  return (
    <div className="row gy-4 d-flex flex-column flex-md-row flex-lg-column">
      {certs.map((cert, index) => (
        <div key={index} className="col-12 col-md-8">
          <div className="cardbg rounded-3 p-4 h-100 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
            {/* Right: Text */}
            <div className="d-flex align-items-center gap-3 text-end flex-column flex-lg-row">
              <Image src={cert_image} alt="certtitle" width={50} height={50} />

              <div className="d-flex flex-column gap-1 justify-content-start align-items-lg-start align-items-center border-bottom-sm-md">
                <p className="custfont mb-1">{t("message")}</p>
                <p className="h6v fw-bold mb-1">{cert.title}</p>
                <p className="custsmfont m-0">
                  {t("certificateId", { id: cert.id })}
                </p>
              </div>
            </div>

            {/* Left: Buttons */}
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-light custfontbtn px-3">
                {t("downloadPDF")}
              </button>
              <button className="btn btn-light custfontbtn px-3">
                {t("downloadJPG")}
              </button>
              <button className="btn btn-outline-light d-flex align-items-center justify-content-center px-1 py-1 bg-cyan">
                <BsLinkedin size={18} color="black"/>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
