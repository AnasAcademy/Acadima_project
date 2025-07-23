"use client";
import { useState } from "react";
 export default  function Editform({ fields, data, t, submitUrl }) {

 const [form, setForm] = useState(() => {
    const initialState = {};
    fields.forEach(({ label }) => {
      initialState[label] = data[label] || "";
    });
    return initialState;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: "Bearer <your-token>",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid p-0">
        <div className="p-lg-4 d-flex flex-column gap-4">
          {fields.map(({ label, type, options }) => (
            <div key={label} className="col-11 col-lg-6">
              <h3 className="Tit-12-700">fhfdh</h3>

              {type === "select" ? (
                <select
                  name={label}
                  value={form[label]}
                  onChange={handleChange}
                  className="d-flex justify-content-center align-items-center rounded-3 p-2 gap-2 Tit-14-700 w-100"
                  style={{ border: "1px solid #E3E3E3" }}
                >
                  <option value="" disabled>
                    {t(label)}
                  </option>
                  {options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
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
           fdh
            </button>
          </div>
        </div>
      </div>
    </form>
  );
 }
 