 import React from 'react'
import { useTranslations } from 'next-intl';

 export default function AddInfo({save}) {


 const t = useTranslations();
     const info = t.raw('addInfo');


   return <>
   
       <div className=' mt-5'>

           <h3 className=' d-flex gap-1 custsubtitle3'> {info.job_info}  <span className=' custsubtitle3 text-danger'>*</span>  :  </h3>
           <div className="container">

               <div className=' row g-5'>


                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.current_job_status}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.job_title}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.employer}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

           




               </div>

           </div>


           <h3 className=' d-flex gap-1 custsubtitle3 mt-5 mb-3'> {info.emergency_info}  :  </h3>
           <div className="container">

               <div className=' row g-5'>


                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.emergency_contact_name}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.relation}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.emergency_phone}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.emergency_email}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



               </div>

           </div>





           <h3 className=' d-flex gap-1 custsubtitle3 mt-5 mb-3'> {info.health_status}  <span className=' custsubtitle3 text-danger'>*</span>  :  </h3>
           <div className="container">

               <div className=' row g-5'>


                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.hearing_disability}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.disability}    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.health_issue}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.health_issue_detail}    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

               </div>

           </div>
















           <div className=' d-flex justify-content-end mt-5'>

               <button className=' btn btn-light custfontbtn'>{save}</button>
           </div>

       </div>

   
   </>

 }
 