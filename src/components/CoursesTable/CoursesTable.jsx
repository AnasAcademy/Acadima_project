import React from 'react'

export default function CoursesTable({ headers, courses }) {





  return <>
   
<div>
      <div class="table-responsive mt-3">
  
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
                                                return <td key={key} className=' text-nowrap text-center '>{td}</td>

                                            })
                                            }
                                            <td className=' d-flex justify-content-center'>
                                              <button className="btn btn-outline-light  custfontbtn">المحاضرات</button>
                                            </td>
                                        </tr>

                                    })
                                         
                                             }
                                  </tbody>
                              </table>
                         
                   </div>
          <button className=' btn  mt-xl-0 mt-sm-3 mt-3  m-auto btn-light custButton border-0 px-5 py-2 text-nowrap'>تحميل جدول المحاضرات</button>
          <h4 className=' mt-3'>ترغب بالانضمام إلى برنامج أخر ؟  طلب تسجيل جديد</h4>
      </div>
  </>
}
