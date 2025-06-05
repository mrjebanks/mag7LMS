import React from "react";

export function Register() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6">Register</h2>
        <form>
          <input type="text" placeholder="Name" className="w-full mb-4 p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
