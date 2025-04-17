'use client';
import React from 'react';

export default function InstallmentsPage() {
  return (
    <div className="container text-center text-white py-5">
      <h3 className="custsubtitle mb-4">مراجعة وتأكيد الأقساط</h3>

      {/* Summary Box */}
      <div className="border p-4 rounded-3 mb-4" style={{ borderColor: '#ccc' }}>
        <h5 className="mb-3 fw-bold text-white">نظرة عامة على القسط</h5>
        <p className="custfont">اسم البرنامج: دبلوم التصميم UX/UI بدفعات أقساط</p>
        <p className="custfont">القسط: (6633.1 ريال سعودي) &nbsp; • &nbsp; تاريخ الاستحقاق: الاثنين، 1 نوفمبر 2024</p>
      </div>

      {/* Terms Box */}
      <div className="border p-4 rounded-3 text-start" style={{ borderColor: '#ccc' }}>
        <h5 className="mb-3 fw-bold text-white text-center">شروط وأحكام القسط</h5>
        <ul className="custfont" style={{ lineHeight: '1.9' }}>
          <li>يجب سداد جميع الأقساط قبل نهاية البرنامج الدراسية وإلا سيتم تعليق الحساب.</li>
          <li>لا يمكن استرداد أي مبلغ بعد البدء في البرنامج.</li>
          <li>في حال التأخير عن السداد، يحق لـ acadima اتخاذ الإجراءات المناسبة.</li>
          <li>قد يتم تعليق الشهادة في حال عدم الالتزام الكامل بالأقساط.</li>
        </ul>

        <div className="alert alert-dark text-white mt-4" style={{ backgroundColor: '#1C1C1C', border: 'none' }}>
          هام جدًا: من خلال متابعة عملية الدفع، فإنك توافق على جميع الشروط والأحكام، وتلتزم بالقيام بسداد جميع الأقساط في موعدها.
        </div>

        <div className="d-flex justify-content-center mt-4 gap-3 flex-wrap">
          <button className="btn btn-secondary">الرجوع</button>
          <button className="btn btn-primary">موافق</button>
        </div>
      </div>
    </div>
  );
}
