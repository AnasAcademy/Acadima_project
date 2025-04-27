 import React from 'react'
import { useTranslations } from 'next-intl';


 export default function EduCard({save}) {



     const t = useTranslations();

     const info = t.raw('eduction');


   return <>
   
       <div className=' mt-5'>

           <h3 className=' d-flex gap-1 custsubtitle3'> {info.uni_edu}  <span className=' custsubtitle3 text-danger'>*</span>  :  </h3>
           <div className="container">

               <div className=' row g-5'>


                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.last_uni_cert}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.ent_bach_cert_sor}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.cert_country}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.uni}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.college}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.major}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.grad_year}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.gpa}    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.grad_cert_img}    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



               </div>

           </div>

          
           <h3 className=' d-flex gap-1 custsubtitle3 mt-5 mb-3'> {info.high_edu}  <span className=' custsubtitle3 text-danger'>*</span>  :  </h3>
           <div className="container">

               <div className=' row g-5'>


                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.high_cert_country}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.edu_area}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.high_grad_year}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.school}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.high_gpa}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.high_cert_img}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

            

               </div>

           </div>





           <h3 className=' d-flex gap-1 custsubtitle3 mt-5 mb-3'> {info.exp}  <span className=' custsubtitle3 text-danger'>*</span>  :  </h3>
           <div className="container">

               <div className=' row g-5'>


                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.exp_field}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.years_exp}  <h5 className=' custfont text-danger'>*</h5>    </h3>
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
 