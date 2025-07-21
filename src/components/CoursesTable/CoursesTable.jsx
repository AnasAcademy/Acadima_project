import Link from "next/link";
import React from "react";
import Rs from "@/assets/payments icons/rs.svg";

export default function CoursesTable({ headers, courses, btn, join, reg, isCourses }) {
  return (
    <div className="w-100">
      <div className="table-responsive mt-3">
        <table className="table">
          <thead>
            <tr>
              {headers.map((head, key) => (
                <th key={key} className="text-nowrap text-center">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, key) => {
              const { flagColor, data } = course;
              return (
                <tr key={key} className="p-3">
                  {data.map((td, tdIndex) => {
                    const isLast = tdIndex === data.length - 1;
                    const content =
                      Array.isArray(td) ? (
                        <>
                          {td[0]}
                          {td[1]?.type === "image" && td[1].src === "rs" && (
                            <Rs className="iconcolor ms-1" />
                          )}
                        </>
                      ) : (
                        td
                      );

                    return (
                      <td
                        key={tdIndex}
                        className="text-nowrap text-center"
                        style={{ "--flag": flagColor }}
                      >
                        {isLast ? (
                          flagColor === "green" ? (
                            <button
                              className="btn custfontbtn btn-secondary w-50"
                              style={{ cursor: "not-allowed" }}
                              disabled
                            >
                              {td}
                            </button>
                          ) : (
                            <Link href={` ${ isCourses ? "/bundles/4/course/learning/4" : "/checkout"} `}>
                              <button className="btn custfontbtn btn-outline-light w-50">
                                {td}
                              </button>
                            </Link>
                          )
                        ) : (
                          content
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

      {btn && (
        <button className="btn mt-xl-0 mt-sm-3 mt-3 m-auto btn-light custButton border-0 px-5 py-2 text-nowrap">
          {btn}
        </button>
      )}

      <h4 className="mt-3">
        {join}
        <Link href="/admissions" className="custcolor">
          {reg}
        </Link>
      </h4>
    </div>
  );
}
