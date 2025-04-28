import React from "react";
import { Link } from "@/i18n/navigation";

export default function CoursesTable({ headers, courses , btn ,join ,reg}) {


  return <>
   
<div  className='w-100'>
      <div className="table-responsive mt-3">
  
                              <table className="table">
                                  <thead className=" table-light ">
                                      <tr className=' '> 
                                        
                      {headers.map(  (head , key )=>{
                           return  <th key={key} className=' text-nowrap text-center'> {head} </th> 
                      })
                                                  
                                        }
                                           
                                            
                                      </tr>
                                  </thead>
                                  <tbody className='  table-dark '>
                                    {  courses.map(( course , key)=>{

                                      return  <tr key={key} className='   '  >
                                            {course.map((td, key)=> {

                                              const isLast = key === course.length - 1;
                                              return <td key={key} className=' text-nowrap text-center '> {isLast ? <button className="btn btn-outline-light  w-50 custfontbtn">{td}</button> : td}</td>

                                            })
                                            }
                                          
                                        </tr>

                                    })
                                         
                                             }
                                  </tbody>
                              </table>
                         
                   </div>
              { btn ?    <button className=' btn  mt-xl-0 mt-sm-3 mt-3  m-auto btn-light custButton border-0 px-5 py-2 text-nowrap'>{btn}</button> : '' }
          <h4 className=' mt-3'>{join} {reg}</h4>
      </div>
    </>
  );
}
