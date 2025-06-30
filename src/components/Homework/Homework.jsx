 import React ,{useState} from 'react'
  import Atch from "@/assets/lessons/Ellipse 22.svg";
  import { useTranslations } from "next-intl";
  import Line from "@/assets/lessons/Line 58.svg";
  import Calend from "@/assets/lessons/Group 213.svg";
   import Quiz from "@/assets/lessons/Group 216.svg";
    import Marks from "@/assets/lessons/Group 214.svg";
    import Marksuc from "@/assets/lessons/Group 217.svg";
 import Submit from "@/assets/lessons/Group 215.svg";
import Miss from "@/assets/lessons/Group 218.svg"
import Deadline from "@/assets/lessons/Clip path group.svg"


 export default function Homework() {
    
      const t = useTranslations();
      const info = t.raw("homework");
      const [file , setFile] = useState(false)
      const [deadline, setDeadline] = useState(false);
      

   return (
     <>
       <div className="d-flex justify-content-between flex-column rounded-4 cardbg vh-100 ">
         <div className=" mt-3 m-5">
           <h2 className=" mt-4"> {info.titlev1}</h2>
           <div className="  mt-5 d-flex justify-content-center ">
             <div className=" d-flex justify-content-around w-100  prevcard p-4">
               <div className=" d-flex  flex-column justify-content-center align-items-center gap-2">
                 <div>
                   <Calend className="iconSize2" />
                 </div>
                 <div>
                   <h3 className="custcalendartit text-center">
                     {info.deadline}
                   </h3>
                   <h3 className="custsubtitle2"> {info.submission_limit} </h3>
                 </div>
               </div>

               <div className=" d-flex  flex-column justify-content-center align-items-center gap-2">
                 <Quiz className="iconSize2" />

                 <div>
                   <h3 className="custcalendartit text-center">
                     {info.submissions}
                   </h3>
                   <h3 className="custsubtitle2"> {info.submission_limit} </h3>
                 </div>
               </div>

               <div className=" d-flex  flex-column justify-content-center align-items-center gap-2">
                 <Marks className="iconSize2" />

                 <div>
                   <h3 className="custcalendartit text-center">
                     {info.students_submitted}
                   </h3>
                   <h3 className="custsubtitle2"> {info.submission_limit} </h3>
                 </div>
               </div>

               <div className=" d-flex  flex-column justify-content-center align-items-center gap-2">
                 <Marksuc className="iconSize2" />

                 <div>
                   <h3 className="custcalendartit text-center">
                     {info.students_submitted}
                   </h3>
                   <h3 className="custsubtitle2"> {info.submission_limit} </h3>
                 </div>
               </div>

               <div className=" d-flex  flex-column justify-content-center align-items-center gap-2">
                 <Submit className="iconSize2" />

                 <div>
                   <h3 className="custcalendartit text-center">
                     {info.deadline}
                   </h3>
                   <h3 className="custsubtitle2"> {info.submission_limit} </h3>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div className="mt-1 m-5  ">
           <h2 className=" mt-4"> {info.titlev2}</h2>

           <div className=" prevcard p-3 w-50">
             <h2 className=" mt-2"> {info.additional_content}</h2>
             <h4 className=" mt-3 custcalendarti"> {info.lecture_title}</h4>

             <p className=" hv ">{info.note_text}</p>

             <h4 className=" mt-3 custcalendarti"> {info.attachments}</h4>
             <div className=" d-flex mt-3 align-items-center gap-2">
               <div className=" circbg  rounded-circle m-1 p-1 ">
                 <Atch className="iconSize1 " />
               </div>
               <div className=" d-flex flex-column gap-0">
                 <p className=" hv  p-0 m-0">{info.file_name}</p>
                 <h4 className="hv"> File size MG</h4>
               </div>
             </div>
           </div>
         </div>

         <div className="mt-1 m-5">
           <h2 className=" mt-4"> {info.titlev3}</h2>

           <div className=" row prevcard d-flex ">
             {deadline  ? (
               <>
                 <div className=" col-5  m-3 rounded-3  p-3">
                   <div>
                     <h2 className=" mt-4"> {info.titlev3}</h2>
                     <h4 className="hv"> {info.instructions}</h4>
                     <textarea
                       className=" bg-transparent prevcard mt-2 rounded-1 w-100"
                       name=""
                       id=""
                     >
                       fgfg
                     </textarea>
                     <h4 className="hv mt-2"> {info.file_title}</h4>
                     <textarea
                       className=" bg-transparent prevcard mt-2 rounded-1 w-100"
                       name=""
                       id=""
                     >
                       fgfg
                     </textarea>

                     <h4 className="hv mt-2"> {info.upload}</h4>
                     <div className=" d-flex justify-content-center align-items-center gap-2">
                       <input
                         type="file"
                         className=" bg-transparent prevcard w-100"
                       />
                       <button className=" btn custfontbtn">{info.send}</button>
                     </div>
                   </div>
                 </div>
                 <div className="col-1 d-flex justify-content-center align-items-center">
                   <div>
                     <Line width={2} height={316} />
                   </div>
                 </div>
                 <div className=" col-5 mt-5">
                   {file ? (
                     <>
                       <div className=" prevcard p-3  ">
                         <h2 className=" mt-2"> {info.additional_content}</h2>
                         <h4 className=" mt-3 custcalendarti">
                           {" "}
                           {info.lecture_title}
                         </h4>

                         <p className=" hv ">{info.note_text}</p>

                         <h4 className=" mt-3 custcalendarti">
                           {" "}
                           {info.attachments}
                         </h4>
                         <div className=" d-flex mt-3 align-items-center gap-2">
                           <div className=" circbg  rounded-circle m-1 p-1 ">
                             <h2 className=" mt-2 p-2 pt-0 pb-0"> أد</h2>
                           </div>
                           <div className=" d-flex flex-column gap-0">
                             <p className=" hv  p-0 m-0">
                               {info.teacher_instruction}
                             </p>
                             <h4 className="hv"> {info.student_grade}</h4>
                           </div>
                         </div>
                       </div>
                     </>
                   ) : (
                     <>
                       <div className="  d-flex justify-content-center align-items-center   rounded-3 p-3 h-100 flex-column">
                         <Miss className="iconSize4 m-3 " />
                         <h4>{info.no_files_uploaded}</h4>
                         <h4>{info.upload_urgency}</h4>
                       </div>
                     </>
                   )}
                 </div>
               </>
             ) : (
               <>
                 <div className=" col-12  rounded-3  p-3 ">
                   <div className="  d-flex justify-content-center align-items-center   rounded-3 p-3 h-100 flex-column">
                     <Deadline className="iconSize4  m-3" />
                     <h4>{info.deadline_reached}</h4>
                     <h4>{info.no_more_uploads}</h4>
                   </div>
                 </div>
               </>
             )}
           </div>
         </div>
       </div>
     </>
   );
 }
 