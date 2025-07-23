"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function EditStudentForm({ student, roles }) {
  const t = useTranslations("settings");
  const [form, setForm] = useState({
    full_name: student.full_name || "",
    en_name: student.en_name || "",
    user_role: student.role_name || "",
    email: student.email || "",
    mobile: student.mobile || "",
    password: "",
    bio: student.bio || "",
    status: student.status || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/students/edit/${student.id}`,
        {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      console.log("Success", data);
    } catch (err) {
      console.log("Submit error", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid p-0">
        <div className="p-lg-4 d-flex flex-column gap-4">
          {[
            { label: "full_name", type: "text" },
            { label: "en_name", type: "text" },
            { label: "user_role", type: "text" },
            { label: "email", type: "email" },
            { label: "mobile", type: "text" },
            { label: "password", type: "password" },
            { label: "bio", type: "text" },
            { label: "status", type: "text" },
          ].map(({ label, type }) => (
            <div key={label} className="col-11 col-lg-6">
              <h3 className="Tit-12-700">{t(label)}</h3>
              {label === "user_role" ? (
                <select
                  name="user_role"
                  value={form.user_role}
                  onChange={handleChange}
                  className="d-flex justify-content-center align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                  style={{ border: "1px solid #E3E3E3" }}
                >
                  <option value="" disabled>
                    {t("user_role")}
                  </option>
                  {Array.isArray(roles) &&
                    roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={label}
                  value={form[label]}
                  onChange={handleChange}
                  className="d-flex justify-content-center align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                  style={{ border: "1px solid #E3E3E3" }}
                />
              )}
            </div>
          ))}

          <div className="d-flex justify-content-start">
            <button className="btn btn-light custfontbtn" type="submit">
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
