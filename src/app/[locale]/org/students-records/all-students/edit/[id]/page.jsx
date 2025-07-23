import { getTranslations } from "next-intl/server";
import EditStudentForm from "@/components/EditStudentForm/EditStudentForm";
import Editform from "@/components/Editform/Editform";
export default async function EditStudentPage({ params }) {
  const t = await getTranslations("settings");
  const { id } = params;

  const res = await fetch(
    `https://api.lxera.net/api/development/organization/vodafone/students/${id}`,
    {
      method: "GET",
      headers: {
        "x-api-key": "1234",
        "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
      },
      cache: "no-store",
    }
  );

  const json = await res.json();
  const student = json?.[0]?.[0] ?? {}; 

  const response2 = await fetch(
    `https://api.lxera.net/api/development/organization/vodafone/users/roles`,
    {
      method: "GET",
      headers: {
        "x-api-key": "1234",
        "Content-Type": "application/json",
        "Authorization" : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
      },
      cache: "no-store",
    }
  );

  const response = await response2.json();
  const roles = Array.isArray(response?.roles) ? response.roles : [];

    const fields = [
    { label: "full_name", type: "text" },
    { label: "en_name", type: "text" },

    { label: "email", type: "email" },
    { label: "mobile", type: "text" },
    { label: "password", type: "password" },
    { label: "bio", type: "text" },
    { label: "status", type: "text" },
  ];

  return  <Editform
      fields={fields}
      data={student}
      
      submitUrl={`https://api.lxera.net/api/development/organization/vodafone/students/edit/${student.id}`}
    />;
}
