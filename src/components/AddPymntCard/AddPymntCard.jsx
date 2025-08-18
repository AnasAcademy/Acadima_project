"use client"
import React, { useState } from 'react'
 import Master from "@/assets/admin/MastercardIcon.svg";
 import Edit from "@/assets/admin/penedit.svg";
 import { useTranslations } from "next-intl";
 import AlertModal from "@/components/AlertModal/AlertModal";
 import ApplePay from "@/assets/admin/ApplePay.svg";
 import Visa from "@/assets/admin/Visa.svg";
import Tabby from "@/assets/admin/Tabby.svg";

 export default function AddPymntCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

   const t = useTranslations("SubMan");

   const handleSubmit = () => {
     // Handle form submission here
     console.log('Payment method data:', { selectedPaymentMethod, ...formData });
     setShowModal(false);
     // Reset form
     setFormData({
       cardName: '',
       cardNumber: '',
       expiryDate: '',
       cvv: ''
     });
   };

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData(prev => ({
       ...prev,
       [name]: value
     }));
   };

   return (
     <>
       <div className=" d-flex  flex-column  gap-4  justify-content-center h-100 p-4 cardbg rounded-4">
         <div className=" d-flex align-items-start w-100 justify-content-between">

           <h3 className="Tit-14-700 ">{t("payment_methods")}</h3>
           <button 
             className="btn custfontbtn tit-10-700"
             onClick={() => setShowModal(true)}
           >
             {t("add_payment_method")}
           </button>
         </div>

         <div className=" d-flex flex-column  gap-3">
           <div className=" d-flex w-100  justify-content-between align-items-center border-2 bordcolor border p-2 rounded-3  ">
             <Edit className="iconSize12 m-2 " />

             <div className=" d-flex align-items-center gap-3 ">
               <h6 className=" m-0 text-center tit-14-400 ">
                 7812 2139 0823 XXXX
               </h6>
               <Visa className="iconSize2  " />
             </div>
           </div>

           <div className="  d-flex w-100  justify-content-between align-items-center border-2 bordcolor border p-2 rounded-3 ">
             <Edit className="iconSize12 m-2" />
             <div className=" d-flex align-items-center gap-3  ">
               <h6 className=" m-0  text-center  tit-14-400">
                 7812 2139 0823 XXXX
               </h6>
               <Master className="iconSize2  " />
             </div>
           </div>
         </div>
       </div>

       {/* Payment Method Modal */}
       <AlertModal
         show={showModal}
         onClose={() => setShowModal(false)}
         onSubmit={handleSubmit}
         title={t("add_new_payment_method")}
         btn={t("save_payment_method")}
       >
         <div className="d-flex flex-column gap-3">
           {/* Payment Method Selection */}
           <div className="mb-3">
             <div className="form-check mb-2">
               
               <label className={`form-check-label d-flex align-items-center justify-content-start border rounded-2 p-2 gap-2 w-100 ${selectedPaymentMethod === 'visa' ? 'shadow-sm border-primary' : ''}`} htmlFor="visa">
                <input
                 className="form-check-input"
                 type="radio"
                 name="paymentMethod"
                 id="visa"
                 value="visa"
                 checked={selectedPaymentMethod === 'visa'}
                 onChange={(e) => setSelectedPaymentMethod(e.target.value)}
               />
                <Visa className="iconSize2" />
                 <span>{t("additional_card")}</span>
                 
               </label>
             </div>

             <div className="form-check mb-2">
               
               <label className={`form-check-label d-flex align-items-center justify-content-start border rounded-2 p-2 gap-2 w-100 ${selectedPaymentMethod === 'tabby' ? 'shadow-sm border-primary' : ''}`} htmlFor="tabby">
                 <input
                 className="form-check-input"
                 type="radio"
                 name="paymentMethod"
                 id="tabby"
                 value="tabby"
                 checked={selectedPaymentMethod === 'tabby'}
                 onChange={(e) => setSelectedPaymentMethod(e.target.value)}
               />
                 <Tabby className="iconSize2" />
                 <span>{t("buy_now_pay_later")}</span>
                  
               </label>
             </div>

             <div className="form-check mb-3">
               
               <label className={`form-check-label d-flex align-items-center justify-content-start border rounded-2 p-2 gap-2 w-100 ${selectedPaymentMethod === 'applepay' ? 'shadow-sm border-primary' : ''}`} htmlFor="applepay">
                 <input
                 className="form-check-input"
                 type="radio"
                 name="paymentMethod"
                 id="applepay"
                 value="applepay"
                 checked={selectedPaymentMethod === 'applepay'}
                 onChange={(e) => setSelectedPaymentMethod(e.target.value)}
               />
                 <ApplePay className="iconSize2" />
                 <span>{t("apple_pay")}</span>
                 
               </label>
             </div>
           </div>

           {/* Card Details Form (only show if visa/card is selected) */}
           {selectedPaymentMethod === 'visa' && (
             <>
               <div className="mb-3">
                 <label htmlFor="cardName" className="form-label">{t("card_holder_name")}</label>
                 <input
                   type="text"
                   className="form-control"
                   id="cardName"
                   name="cardName"
                   value={formData.cardName}
                   onChange={handleInputChange}
                   placeholder={t("enter_card_holder_name")}
                   required
                 />
               </div>

               <div className="mb-3">
                 <label htmlFor="cardNumber" className="form-label">{t("card_number")}</label>
                 <input
                   type="text"
                   className="form-control"
                   id="cardNumber"
                   name="cardNumber"
                   value={formData.cardNumber}
                   onChange={handleInputChange}
                   placeholder="0000 0000 0000 0000"
                   maxLength="19"
                   required
                 />
               </div>

               <div className="row">
                 <div className="col-md-6 mb-3">
                   <label htmlFor="expiryDate" className="form-label">{t("expiry_date")}</label>
                   <input
                     type="text"
                     className="form-control"
                     id="expiryDate"
                     name="expiryDate"
                     value={formData.expiryDate}
                     onChange={handleInputChange}
                     placeholder="MM/YY"
                     maxLength="5"
                     required
                   />
                 </div>
                 <div className="col-md-6 mb-3">
                   <label htmlFor="cvv" className="form-label">{t("cvv_code")}</label>
                   <input
                     type="text"
                     className="form-control"
                     id="cvv"
                     name="cvv"
                     value={formData.cvv}
                     onChange={handleInputChange}
                     placeholder="***"
                     maxLength="4"
                     required
                   />
                 </div>
               </div>
             </>
           )}
         </div>
       </AlertModal>
     </>
   );
 }
