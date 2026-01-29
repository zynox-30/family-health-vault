import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000";

export default function App() {
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

  async function fetchMembers() {
    const res = await fetch(`${API}/members`);
    const data = await res.json();
    setMembers(data);
  }

  async function addMember() {
    if (!form.name || !form.age) return;

    await fetch(`${API}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", age: "", bloodGroup: "", allergies: "" });
    fetchMembers();
  }

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>Family Health Vault</h1>
          <p>Private, organized medical records for your family.</p>
        </header>

        <section className="card">
          <h2>Add Family Member</h2>

          <div className="form-grid">
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <input
              placeholder="Blood group"
              value={form.bloodGroup}
              onChange={(e) =>
                setForm({ ...form, bloodGroup: e.target.value })
              }
            />
            <input
              placeholder="Allergies / conditions"
              value={form.allergies}
              onChange={(e) =>
                setForm({ ...form, allergies: e.target.value })
              }
            />
          </div>

          <button onClick={addMember}>Add Member</button>
        </section>

        <section className="card">
          <h2>Members</h2>

          {members.length === 0 && (
            <p className="muted">No family members added yet.</p>
          )}

          <div className="member-list">
            {members.map((m) => (
              <div className="member" key={m._id}>
                <strong>{m.name}</strong>
                <span>Age: {m.age}</span>
                <span>Blood Group: {m.bloodGroup || "—"}</span>
                <span>{m.allergies || "No known conditions"}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
