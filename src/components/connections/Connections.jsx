  import React from 'react'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import pen from '@/assets/settings/penwhite.svg'
  export default function Connections({save}) {



      const t = useTranslations();
      const info = t.raw('ProfilLinks');

    return <>
        <div className=' mt-5'>


            <div className=' d-flex  justify-content-between align-items-center'>
                <h3 className=' d-flex gap-1 custsubtitle3'> {info.workLinks}  <span className=' custsubtitle3 text-danger'>*</span>  :  </h3>
                <button className=' btn btn-light custfontbtn 5rem'> {info.addLink}</button>
            </div>
            <div className="container">

                <div className=' row g-5'>


                    <div className=' col-lg-12 '>

                        <div className='  d-flex    justify-content-between bg-prim-color mt-5 p-2'>

                            <h4>{info.linkTitle}</h4>
                            <h4>{info.linkTitle}</h4>
                            <h4>{info.linkTitle}</h4>
                            <h4>{info.linkTitle}</h4>
                            <h4>www.xfgfdhfdh</h4>
                            <div>
                                <Image src={pen} alt="pen" className="invert" />
                            </div>
                        </div>

                    </div>









                </div>

            </div>

            <div className=' d-flex justify-content-end mt-5'>

                <button className=' btn btn-light custfontbtn'>{save}</button>
            </div>
        </div>
    
    
    </>
  }
  