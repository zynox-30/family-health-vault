import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "https://family-health-vault-apii.onrender.com";

function App() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    allergies: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await fetch(`${API_BASE}/members`);
    const data = await res.json();
    setMembers(data);
  };

  const addMember = async () => {
    if (!form.name || !form.age) return;

    await fetch(`${API_BASE}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", age: "", bloodGroup: "", allergies: "" });
    fetchMembers();
  };

  return (
    <div className="container">
      <h1>Family Health Vault</h1>

      <div className="card">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          placeholder="Blood Group"
          value={form.bloodGroup}
          onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
        />
        <input
          placeholder="Allergies"
          value={form.allergies}
          onChange={(e) => setForm({ ...form, allergies: e.target.value })}
        />
        <button onClick={addMember}>Add Member</button>
      </div>

      <div className="list">
        {members.map((m) => (
          <div key={m._id} className="item">
            <strong>{m.name}</strong> — {m.age} yrs | {m.bloodGroup} |{" "}
            {m.allergies}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
