 import React from 'react'
import circle from '@/assets/settings/Ellipse 23.svg'
import x from '@/assets/settings/x.svg'
import linked from '@/assets/settings/in.svg'
import insta from '@/assets/settings/insta.svg'
import pen from '@/assets/settings/pen.svg'
import { useTranslations } from 'next-intl';
import Image from 'next/image'



 export default function BasicData() {


     const t = useTranslations();
     const info = t.raw('settings');

   return <>
   
   
   
       <div className='  bg-prim-color position-relative settCardBorder'>

           <div className='settingCard  '>
               <Image src={circle} alt="black circle" />
           </div>

           <div className=' bg-black pt-5 pb-5'>

           </div>


           <div className=' d-flex justify-content-between'>
               <div className=' d-flex' >


                   <div className='custPadding'>

                       <h3 className='custsubtitle3'>{info.full_name}</h3>
                       <h4 className='custfont'>000000000</h4>

                       <div className=' d-flex gap-2' >
                           <Image src={x} alt='  x' className=' bg-white  p-1   rounded-circle' width={25} />
                           <Image src={linked} alt=' linkedin' className=' bg-white  p-1   rounded-circle' width={25} />
                           <Image src={insta} alt=' insta' className=' bg-white  p-1   rounded-circle' width={25} />
                       </div>


                   </div>

               </div>

               <div>
                   <button className='  btn btn-light m-3 pt-0 pb-0 d-flex gap-1  justify-content-center align-items-center  fw-bold'>{info.edit}
                       <Image src={pen} alt='pen icon' />
                   </button>

               </div>

           </div>



       </div>



       <div className=' mt-5'>

           <h3 className=' d-flex gap-1 custsubtitle3'> {info.academic_info}  <h5 className=' custsubtitle3 text-danger'>*</h5>  :  </h3>
           <div className="container">

               <div className=' row g-5'>


                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont  '> {info.academic_code}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>



                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.full_name}  <h5 className=' custfont text-danger'>*</h5>    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.email}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.mobile}      </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.birthdate}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.password}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.language}     </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>

                   <div className=' col-lg-6'>
                       <h3 className=' d-flex gap-1 custfont'> {info.region_unit}    </h3>
                       <input type="text" className='  input-group bg-transparent settCardBorder' />

                   </div>







               </div>

               <div className=' mt-4 d-flex flex-column col-lg-3 col-md-4 col-6 gap-2 '>

                   <div className="form-check form-switch  d-flex justify-content-between gap-3   m-0 p-0 ">
                       <label className="d-flex  custfont text-nowrap" for="flexSwitchCheckDefault">{info.toggle_language} </label>
                       <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                   </div>


                   <div className="form-check form-switch  d-flex justify-content-between   gap-3  m-0 p-0">
                       <label className="d-flex custfont  text-nowrap" for="flexSwitchCheckDefault">{info.toggle_profile} </label>
                       <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                   </div>

               </div>




           </div>


           <div className=' d-flex justify-content-end mt-5'>

               <button className=' btn btn-light custfontbtn'>{info.save}</button>
           </div>

       </div>




   
   
   
   
   
   </>
 }
 