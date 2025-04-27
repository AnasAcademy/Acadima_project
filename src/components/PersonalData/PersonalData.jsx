 import React from 'react'

import { useTranslations } from 'next-intl';
import Image from 'next/image'
 export default function PersonalData({tit , save}) {


      const t = useTranslations();

     const info = t.raw('personalData');

        

    
   return <>
   
       <div className=' mt-5'>

           <h3 className=' d-flex gap-1 custsubtitle3'> {tit}  <h5 className=' custsubtitle3 text-danger'>*</h5>  :  </h3>
           <div className="container">

               <div className=' row g-5'>


                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.full_name_arabic}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.full_name_english}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.birth_date}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.id_or_passport_number}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.nationality}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.gender}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.country_of_residence}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.city_of_residence}    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.upload_id_or_passport}    </h3>
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
 