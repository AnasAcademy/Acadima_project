"use client"

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styling
import '../../styles/calendar-dark.css'
import { useTranslations } from 'next-intl';
import line from '@/assets/calendar/Line 50.svg'
import blucircle from '@/assets/calendar/Ellipse 18.svg'
import redcircle from '@/assets/calendar/Ellipse 19.svg'
import Image from "next/image";


export default function CalendarCard() {


    const t = useTranslations('todaySchedule')
    const [value, setValue] = useState(new Date());
    


  return<>
  
  
      <div className="p-3 rounded-2  d-flex justify-content-center flex-column   cardbg text-white">

        
          <h3 className="mb-3 custcalendar"> {t('month')} </h3>
          <Calendar
              onChange={setValue}
              value={value}
              className="dark-calendar  w-100"
          />
        
          <div  className=' d-flex justify-content-center align-items-center m-3 ' >
              <Image src={line} alt='line' width={250} />
          </div>



          <div className=' d-flex flex-column  mb-2   justify-content-center align-items-start '>
 

              
                           <h3 className='custcalendartit' > {t('title')}</h3>
             
                    <div className=' d-flex gap-3'>

                  <div className=' d-flex flex-column   custsmfont '> 
                      <p className=' m-0'>    {t('event1.times')}  </p>   <p>   {t('event1.timef')}  </p>
                   </div>

                  <div>    <Image src={blucircle} alt='bluecircle' />  </div>

                  <div className=' h6v'>  <p className=' mb-1'>  {t('event1.lecture')}</p>  <p> {t('event1.action')}  </p>    </div>
                       
                         </div>

              <div className=' d-flex gap-3'>

                  <div className=' d-flex flex-column  custsmfont '>

                      <p className=' m-0'>     {t('event2.times')} </p>   <p>   {t('event2.timef')}  </p>

                  </div>

                  <div>

                      <Image src={redcircle} alt='redcircle' />

                  </div>

                  <div className=' h6v'>

                      <p className=' mb-1'>{t('event2.lecture')}   </p>
                      <p> {t('event2.action')} </p>


                  </div>


              </div>
           
      
             


          </div>
          <div className=' d-flex justify-content-end' >
          <button className="btn btn-light custfontbtn mb-3 px-3"> {t('action')}  </button>
          </div>
      </div>
  
   
  </>
}
