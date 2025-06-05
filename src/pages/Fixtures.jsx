import React, { useEffect, useState } from "react";

export function Fixtures() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    fetch("https://your-backend-url.com/fixtures/")
      .then((res) => res.json())
      .then((data) => setFixtures(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Fixtures</h2>
      <ul>
        {fixtures.map((f, idx) => (
          <li key={idx} className="mb-2">
            {f.home} vs {f.away} @ {f.kickoff}
          </li>
        ))}
      </ul>
    </div>
  );
}
