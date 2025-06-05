import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AdminPanel } from "./pages/AdminPanel";
import { Fixtures } from "./pages/Fixtures";
import { MyPicks } from "./pages/MyPicks";
import { Leaderboard } from "./pages/Leaderboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4 flex space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/fixtures" className="hover:underline">Fixtures</Link>
        <Link to="/mypicks" className="hover:underline">My Picks</Link>
        <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
        <Link to="/register" className="hover:underline ml-auto">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </nav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/mypicks" element={<MyPicks />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
