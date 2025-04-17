import React from 'react'

export default function CoursesTable({ CourseNum, courseNam, startDate, numOfTasks, numSubmission, actions }) {





  return <>
   

      <div class="table-responsive">
  
                              <table className="table table-bordered bg-danger">
                                  <thead className="table-light ">
                                      <tr>
                                            <th> {CourseNum} </th>
                                            
                                      </tr>
                                  </thead>
                                  <tbody className=' bg-danger'>
                                    
                                          <tr >
                                              <td>cousre number</td>
                                              <td>coursename</td>
                                              <td>course.startDate</td>
                                              <td>course.tasks</td>
                                              <td>course.submissions</td>
                                              <td>
                                                  <button className="btn btn-outline-dark btn-sm">المحاضرات</button>
                                              </td>
                                          </tr>
                               
                                  </tbody>
                              </table>
                         
                   </div>
  
  
  </>
}
