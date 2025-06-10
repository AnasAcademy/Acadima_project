import React from 'react'
import { useTranslations } from "next-intl";
import Image from 'next/image'
import Circle from "../../../assets/admin/circle.svg";


export default function OngoingTrain({ TableHead, trainingData,  Icon, Icon2 }) {
  const t = useTranslations("HomePageA");



 const renderCell = {
   image: (col) => (
    
       <td >
     <Image src={col.value} className=' rounded-circle p-0' />
     </td>
   ),
   text: (col) => (
     <td className=" text-dark   text-nowrap   ">{col.value}</td>
   ),
   button: (col) => (
     <td className=" d-flex gap-3  align-items-center  justify-content-center  ">
       <h4
         className={` Tit-14-700 btncolor  text-white text-center  rounded-4 p-2 w-50  text-nowrap d-flex align-items-center gap-2 justify-content-center`}
         style={{ backgroundColor: col.color }}
       >
         {col.icon ? (
           Icon ? (
             <Icon className="iconSize   text-white" />
           ) : (
             ""
           )
         ) : (
           ""
         )}
         {col.value}
       </h4>
       {col.icon ? (
         Icon2 ? (
           <Icon2 className="iconSize2   text-white" />
         ) : (
           ""
         )
       ) : (
         ""
       )}
     </td>
   ),
   progress: (col) => (
     <td className="  ">
       <div className="d-flex align-items-center  flex-row-reverse  gap-2 ">
         <strong className="textcolor">{col.value}%</strong>

         <div className="progress flex-grow-1" style={{ height: "8px" }}>
           <div
             className="progress-bar btncolor"
             style={{ width: `${col.value}%` }}
           ></div>
         </div>
       </div>
     </td>
   ),
   icon: (col) => (
     <td>
       <col.value className="iconSize2" />
     </td>
   ),
 };





  return (
    <>
      <div className="   rounded-3 shadow-sm   p-md-5  p-2 container-fluid  cardbg    min-train-ht ">
        <h3> {t("trainpro")} </h3>
        <div className=" d-flex gap-2">
          <Circle />
          <h6 className=" h6v  "> {t("subtrainpro")} </h6>
        </div>

        <div className=" table-responsive   mt-4 ">
          <table className="table  no-flag-style   align-middle   ">
            <thead className="  w-100">
              <tr className="text-nowrap   ">
                {TableHead.map((head, index) => {
                  return (
                    <th key={index} className="   text-center   ">
                      {head}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {trainingData.map((item, index) => (
                <tr key={index} className="text-center ">
                  {item.columns.map((col, colindex) => {
                    return renderCell[col.type] ? (
                      renderCell[col.type](col)
                    ) : (
                      <td key={colindex}></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
