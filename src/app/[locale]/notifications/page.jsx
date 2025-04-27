import React from 'react'
import { useTranslations } from 'next-intl'
import NotifCard from '@/components/notifCard/NotifCard'
import PrevCard from '@/components/prevCard/PrevCard'

export default function Notifications() {

  


const t = useTranslations();
                const info = t.raw('notifications');

  return <>
  

      <div className='   container p-3  mt-5 '>

      <h2 className='hvvv'>{info[0].tit}</h2>

             <div className=' d-flex row '>  
           <div className=' mt-4 d-flex gap-3 flex-column w-100 '>
          <NotifCard />

      </div>
     

        


      </div>
        </div>
  
  
  </>
}
