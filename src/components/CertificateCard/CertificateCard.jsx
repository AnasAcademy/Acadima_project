import React from 'react';
import { useTranslations } from 'next-intl';
import { BsLinkedin } from 'react-icons/bs';

export default function CertificateCard() {
  const t = useTranslations('certificates');
  const certs = t.raw('items'); // array from JSON

  if (!certs || certs.length < 2) return null; // render only if 2+

  return (
    <div className="container py-5">
      <h3 className="custsubtitle mb-4">{t('title')}</h3>

      <div className="w-75 d-flex flex-column gap-3">
        {certs.map((cert, index) => (
          <div
            key={index}
            className="cardbg rounded-3 p-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3"
          >
            {/* Right: Text */}
            <div className="d-flex align-items-center gap-2 text-end flex-row-reverse">
              <div className="bg-dark p-3 rounded-3 d-flex align-items-center justify-content-center">
                <i className="bi bi-award text-white" style={{ fontSize: '32px' }}></i>
              </div>
              <div className='d-flex flex-column gap-1 justify-content-start align-items-start'>
                <p className="custfont mb-1">{t('message')}</p>
                <p className="h6v fw-bold mb-1">{cert.title}</p>
                <p className="custsmfont m-0">{t('certificateId', { id: cert.id })}</p>
              </div>
            </div>

            {/* Left: Buttons */}
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-light custfontbtn px-3">
                {t('downloadPDF')}
              </button>
              <button className="btn btn-light custfontbtn px-3">
                {t('downloadJPG')}
              </button>
              <button className="btn btn-outline-light d-flex align-items-center justify-content-center px-2 py-2">
                <BsLinkedin size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
