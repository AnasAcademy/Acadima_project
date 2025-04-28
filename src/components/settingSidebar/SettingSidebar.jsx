'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import card from '@/assets/settings/cards.svg'
import link from '@/assets/settings/link.svg'
import object from '@/assets/settings/OBJECTS.svg'
import user from '@/assets/settings/user.svg' 
import BasicData from '@/components/BasicData/BasicData'
import PersonalData from '@/components/PersonalData/PersonalData'
import EduCard from '@/components/eduCard/EduCard'
import AddInfo from '@/components/AddInfo/AddInfo'
import ProfilLinks from '@/components/ProfilLinks/ProfilLinks'
import Connections from '@/components/connections/Connections'

 export default function SettingSidebar() {


     const t = useTranslations();
     const info = t.raw('settings');
     
     const [tabinfo , setTabinfo] = useState("");


     const components = {
         basic: <BasicData />,
         personal: <PersonalData tit={info.academic_info} save={info.save} />,
         edu: <EduCard  save={info.save} />,
         addinfo: <AddInfo save={info.save} />,
         profil: <ProfilLinks save={info.save} />,
         conn: <Connections save={info.save} />

         
     };
    

      function setToggle(valu){

                if(valu === "basic"){
                                   
                    setTabinfo("basic")


                } 
                else if (valu === "personal"){

                    setTabinfo("personal")

                } else if (valu === "edu")
                {
                           
                    setTabinfo("edu")


                } else if (valu === "addinfo") {

                    setTabinfo("addinfo")


                }

                  else if (valu === "profil") {

         setTabinfo("profil")


     } else{

                    setTabinfo("conn")
     }




      } 


    useEffect(()=>{

            
            setTabinfo("basic")
                  




    },[])

   return <>
   
      <div className="row flex-column flex-lg-row ">
            <div className='col-lg-4 col-12'>
   
       <div className=' w-100'>
           <h2 className='htitle'> {info.settings_header} </h2>

           <div className=' d-flex flex-row mt-4  align-items-baseline gap-2'>

               <div className="progress w-50" style={{ height: '8px' }} >
                   <div className="progress-bar custButton" role="progressbar" style={{ width: info.progress }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>

               <div>
                   <h4>{info.progress}</h4>
               </div>

           </div>
           <p className=' ad2  text-white  w-75'>{info.completion_note}</p>

       </div>
 

       <div className=' d-flex   justify-content-lg-start justify-content-center'>

           <ul className=' w-100 d-flex flex-column gap-1'>

               <div className=' d-flex flex-lg-column flex-row  align-items-center  justify-content-center '>
                   <li className={`nav-item d-flex text-white  align-items-center     w-100 `} >
                       <button className=' btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 '  onClick={()=>{
                                                                      setToggle("basic");
                       }}>
                           <div className=' d-flex gap-2 align-items-center' >
                               <Image src={user} alt="basic data" />
                               <Link
                                   className="nav-link hvv text-black"
                                   aria-current="page"
                                   href="/settings"
                               >
                                   {info.basic_data}
                               </Link>
                           </div>
                       </button>
                   </li>

                   <li className={`nav-item d-flex text-white  align-items-center  px-3   py-2 w-100  `} >
                   <button className=' btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 ' onClick={() => {
                                   setToggle("personal");
                               }}>
                       <div className=' d-flex gap-2 align-items-center' >
                           <Image src={card} alt="basic data" />
                           <Link
                               className="nav-link hvv  text-nowrap"
                               aria-current="page"
                               href="/settings"
                           >
                               {info.personal_data}
                           </Link>
                       </div>
                           </button>
                   </li>
               </div>

               <div className=' d-flex flex-lg-column flex-row  align-items-center  justify-content-center '>
                   <li className={`nav-item d-flex text-white  align-items-center  px-3  py-2 w-100  `} >
                               <button className=' btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 ' onClick={() => {
                                   setToggle("edu");
                               }}>
                       <div className=' d-flex gap-2 align-items-center' >
                           <Image src={card} alt="basic data" />
                           <Link
                               className="nav-link hvv text-nowrap "
                               aria-current="page"
                               href="/settings"
                           >
                               {info.education}
                           </Link>
                    
                       </div>
                               </button>
                   </li>
                   <li className={`nav-item d-flex text-white  align-items-center  px-3  py-2 w-100  `} >
                               <button className=' btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 ' onClick={() => {
                                   setToggle("addinfo");
                               }}>
                       <div className=' d-flex gap-2 align-items-center' >
                           <Image src={object} alt="settings" />
                           <Link
                               className="nav-link hvv  text-nowrap"
                               aria-current="page"
                               href="/settings"
                           >
                               {info.extra_info}
                           </Link>
                       </div>
                               </button>
                   </li>
               </div>

               <div className=' d-flex flex-lg-column flex-row align-items-center  justify-content-center ' >

                   <li className={`nav-item d-flex text-white  align-items-center  px-3  py-2  w-100 `} >
                               <button className=' btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 ' onClick={() => {
                                   setToggle("profil");
                               }}>
                       <div className=' d-flex gap-2 align-items-center' >
                           <Image src={link} alt="portfolio_links" />
                           <Link
                               className="nav-link hvv text-nowrap "
                               aria-current="page"
                               href="/settings"
                           >
                               {info.portfolio_links}
                           </Link>
                       </div>
                               </button>
                   </li>
                   <li className={`nav-item d-flex text-white   align-items-center  px-3  py-2  w-100 `} >
                               <button className=' btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 ' onClick={() => {
                                   setToggle("conn");
                               }}>
                       <div className=' d-flex gap-2 align-items-center' >
                           <Image src={card} alt="basic data" />
                           <Link
                               className="nav-link hvv text-nowrap "
                               aria-current="page"
                               href="/settings"
                           >
                               {info.connections}
                           </Link>
                       </div>
                               </button>
                   </li>

               </div>

           </ul>



       </div>

           </div>

           
           <div className=' col-lg-8 col-12 '>

               {components[tabinfo]}
   

           </div>



           





       </div>
   
   
   
   </>
 }
 