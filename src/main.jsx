// Entry point for Mag7 Last Man Standing Web App
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Admin } from "./pages/Admin";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

// Home Page Component
export function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-bold mb-4">Mag7 Last Man Standing</h1>
      <p className="text-lg text-gray-600 mb-6">
        Join the ultimate Premier League challenge. Pick a winning team each week — get it wrong and you're out!
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-gray-200 text-black rounded-2xl shadow hover:bg-gray-300 transition"
        >
          Register
        </a>
      </div>
    </div>
  );
}
