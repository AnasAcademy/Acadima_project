import Link from "next/link";
import React from "react";

export default function CoursesTable({ headers, courses, btn, join, reg }) {
  return (
    <>
      <div className="w-100">
        <div className="table-responsive mt-3">
          <table className="table ">
            <thead className="  ">
              <tr className=" ">
                {headers.map((head, key) => {
                  return (
                    <th key={key} className=" text-nowrap text-center">
                      {" "}
                      {head}{" "}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className=" ">
              {courses.map((course, key) => {
               const { flagColor, data } = course;
                return (
                  <tr key={key} className="   p-3  ">
                    {data.map((td, key) => {
                      const isLast = key === data.length - 1;
                      return (
                        
                          <td
                            key={key}
                            className=" text-nowrap text-center "
                            style={{ "--flag": flagColor }}
                          >
                            {isLast ? (
                                    <Link href="/bundles/4/course/learning/4" >
                              <button className="btn btn-outline-light   custfontbtn">
                                {td}
                              </button>
                                 </Link>
                            ) : (
                              td
                            )}
                          </td>
                       
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
  
        {btn ? (
          <button className=" btn  mt-xl-0 mt-sm-3 mt-3  m-auto btn-light custButton border-0 px-5 py-2 text-nowrap">
            {btn}
          </button>
        ) : (
          ""
        )}
       
        <h4 className=" mt-3">
          {join} {reg}
        </h4>
      </div>
    </>
  );
}
