import React from 'react'
import { useTranslations } from 'next-intl'



export default function Regproaca({ cousretyp, coursenam , progress }) {


    const t = useTranslations('RegisteredProgramss')

  return <>
  
  
      <div className=' d-flex flex-column gap-4  '>

          <div className='p-4 rounded-2 d-xl-flex  d-sm-flex-column   cardbg'>
              <div className=' d-flex flex-column '>
                  <h4 className='     ' > {cousretyp} </h4>
                  <h2 className='  '> {coursenam}  </h2>
                
            <div className=' d-flex flex-row  align-items-baseline gap-2'>

                  <div className="progress w-75" style={{ height: '8px' }} >
                      <div className="progress-bar custButton" role="progressbar" style={{width: progress}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     
                  </div>

                   <div>
                  <h4>{progress}</h4>
                      </div>
                 
                  </div>
              
              </div>

              


          </div>


      </div>
  
  
  
  </>
}
