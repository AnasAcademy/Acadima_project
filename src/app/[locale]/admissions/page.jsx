import React from 'react'
import Regpro from '@/components/regpro/Regpro'
import EnrollProgram from '@/components/EnrollProgram/EnrollProgram'
import { useTranslations } from 'next-intl'

export default function Admissions() {


  const t = useTranslations('RegisteredPrograms')
  const ts = useTranslations('EnrollProgram')
  return <>
  
    <div className='  container p-3  mt-5 '>


<div>
      <h2 className=' hvvv'> {t('title')}</h2>

          <div className=' row g-3 mt-4'>

                     <div className=' d-flex flex-column gap-3 col-sm-12 col-xl-6'>
      
                                    <Regpro/>
                            
                              
                     </div>

        <div className=' d-flex flex-column gap-3 col-sm-12 col-xl-6'>

          <Regpro />

        </div>





          </div>
           
      </div>


      <div className=' mt-5'>             
      <h2 className=' hvvv'> {ts('title')}</h2>

        <div className=' row g-3 mt-4'>   
        <div className=' col-xl-8 mt-4  col-12  '>

            <EnrollProgram/>



           </div>

        </div>
 






      </div>  





      </div>
  
  
  
  
  
  
  </>
}
