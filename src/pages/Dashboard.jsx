import React, { useEffect, useState } from "react";

export function Dashboard() {
  const [name, setName] = useState("");

  useEffect(() => {
    const userFirstName = localStorage.getItem("first_name");
    setName(userFirstName || "User");
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Welcome, {name}!</h2>
    </div>
  );
}
