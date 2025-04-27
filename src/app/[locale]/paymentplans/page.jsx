import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image';
import icon from '@/assets/payments icons/Layer_1.svg'
import PaymentsCard from '@/components/PaymentsCard/PaymentsCard'


export default function Paymentplans() {




  const t = useTranslations();
  const info = t.raw('payments');
  
  const early_title = info.early_reg.title
  const install_reg = info.install_reg.title

  return <>
  
    <div className='   container p-3  mt-5 '>
    <div  className=' d-flex gap-2'>
      <Image src={icon} alt="payments_icon"/>
        <h2 className='htitle'>{info.title}</h2>
      </div> 
      <h2 className='htitle mt-5'>{info.program}</h2> 

    <div className=' d-flex row '> 


             <div className=' mt-4 d-flex gap-3  col-6'>

          <PaymentsCard info={info} title={early_title}/>
    
        </div>

        <div className=' mt-4 d-flex gap-3 col-6'>

          <PaymentsCard info={info} title={install_reg} />

        </div>
       
        </div>

          <div className=' mt-5'>
        <h4> {info.or_contact}</h4>
        <button className="btn btn-light custfontbtn px-3 text-nowrap srv-btn-width mt-2" >
          <a className='d-xl-flex d-lg-flex d-sm-none d-none  '> {info.book_call}</a>
        </button>

          </div>

          </div>
  
  
  </>
}
