import { useState } from "react";

export default function Dashboard() {
  const fixtures = [
    { home: "Arsenal", away: "Chelsea" },
    { home: "Liverpool", away: "Man City" },
    { home: "Tottenham", away: "Newcastle" },
    { home: "Man United", away: "Brighton" },
    { home: "Leeds", away: "Aston Villa" }
  ];
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handlePick = (team) => {
    if (!selectedTeam) setSelectedTeam(team);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-4">This Week's Fixtures</h2>
      <div className="grid gap-4">
        {fixtures.map((match, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <span className="font-medium">{match.home}</span>
            <span className="text-gray-400">vs</span>
            <span className="font-medium">{match.away}</span>
            <div className="flex gap-2 ml-4">
              {[match.home, match.away].map((team) => (
                <button
                  key={team}
                  onClick={() => handlePick(team)}
                  disabled={selectedTeam === team || selectedTeam !== null}
                  className={`px-4 py-1 rounded-xl font-medium ${
                    selectedTeam === team
                      ? "bg-green-600 text-white"
                      : selectedTeam
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {selectedTeam === team ? "Picked" : `Pick ${team}`}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedTeam && (
        <p className="mt-6 text-lg text-green-700 font-semibold">You picked: {selectedTeam}</p>
      )}
    </div>
  );
}
