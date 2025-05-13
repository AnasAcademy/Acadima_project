  import React from 'react'
  import Exambg from '@/assets/lessons/exambg.svg'
import { useTranslations } from "next-intl";



  export default function ExamsComp() {



      const t = useTranslations();
      const info = t.raw("lessons");


    return (
      <>
        <div className="d-flex justify-content-between flex-column  cardbg ">
          <div className=" mt-3 m-5  p-4 d-flex justify-content-center align-items-center pt-5  flex-column gap-3 ">
            <div className=" d-flex justify-content-center align-items-center pt-5  flex-column gap-3 p-5">
              <Exambg className="iconSize6 mt-5" />
              <h2 className=" mt-2"> {info.additional_content}</h2>
              <p className=" hv ">{info.note_text}</p>
              <button className="  custfontbtn" type="button">
                start exam{" "}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  