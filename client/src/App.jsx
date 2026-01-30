import { useState } from "react";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    allergies: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMember = async () => {
    if (!form.name || !form.age) {
      alert("Name and Age required");
      return;
    }

    try {
      const res = await fetch(`${API}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert("Member added successfully");
      setForm({ name: "", age: "", bloodGroup: "", allergies: "" });
      console.log(data);
    } catch (err) {
      alert("API error");
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>Family Health Vault</h1>

      <div className="form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} />
        <input name="allergies" placeholder="Allergies" value={form.allergies} onChange={handleChange} />
        <button onClick={addMember}>Add Member</button>
      </div>
    </div>
  );
}

export default App;
