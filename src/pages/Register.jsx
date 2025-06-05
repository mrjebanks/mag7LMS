import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [first_name, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("https://your-backend-url.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, surname, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert(data.detail || "Registration failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full p-2 border rounded" />
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" className="w-full p-2 border rounded" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
