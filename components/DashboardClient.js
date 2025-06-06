'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardClient({ initialData }) {
    const { fixtures: initialFixtures, picks: initialPicks, standings: initialStandings, token } = initialData;
    const router = useRouter();

    const [fixtures, setFixtures] = useState(initialFixtures);
    const [previousPicks, setPreviousPicks] = useState(initialPicks);
    const [standings, setStandings] = useState(initialStandings);
    const [selectedPick, setSelectedPick] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const currentWeek = 37;
    const currentWeekPick = previousPicks.find(p => p.game_week === currentWeek);

    useEffect(() => {
        if(currentWeekPick) {
            const fixture = fixtures.find(f => f.home_team_name === currentWeekPick.selected_team_name || f.away_team_name === currentWeekPick.selected_team_name);
            if(fixture) {
                 setSelectedPick({ 
                    fixtureId: fixture.fixture_id, 
                    teamName: currentWeekPick.selected_team_name 
                });
            }
        }
    }, [currentWeekPick, fixtures]);

    const handlePickChange = (fixtureId, teamName) => {
        setSelectedPick({ fixtureId, teamName });
        setMessage('');
    };
    
    const handleSubmitPick = async () => {
        if (!selectedPick) {
            setMessage({ type: 'error', text: 'Please select a team before submitting.' });
            return;
        }
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/picks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ fixtureId: selectedPick.fixtureId, selectedTeamName: selectedPick.teamName }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg);
            
            setMessage({ type: 'success', text: data.msg });
            
            // Refresh picks from server to ensure UI is in sync
            const updatedPicksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/picks/user`, { headers: {'x-auth-token': token} });
            const updatedPicks = await updatedPicksRes.json();
            setPreviousPicks(updatedPicks);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };
    
    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/login');
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-lg">
                    Logout
                </button>
            </header>
            
            {message && (
              <div className={`p-4 mb-4 rounded-md text-white text-center ${message.type === 'success' ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold mb-4 text-green-400">Week {currentWeek} Fixtures</h2>
                    <div className="space-y-3">
                        {fixtures.map((fixture) => (
                            <div 
                                key={fixture.fixture_id} 
                                className={`fixture-card ${selectedPick?.fixtureId === fixture.fixture_id ? 'fixture-card-selected' : ''}`}
                            >
                                <div className="flex-1 flex items-center justify-between text-lg">
                                    <label className="flex-1 flex items-center space-x-4 cursor-pointer p-2 rounded-md hover:bg-white/10" onClick={() => handlePickChange(fixture.fixture_id, fixture.home_team_name)}>
                                        <input type="radio" name="pick" readOnly checked={selectedPick?.teamName === fixture.home_team_name} className="h-5 w-5 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500" />
                                        <span className="font-semibold">{fixture.home_team_name}</span>
                                    </label>
                                    <span className="text-gray-400 mx-4">vs</span>
                                    <label className="flex-1 flex items-center justify-end space-x-4 cursor-pointer p-2 rounded-md hover:bg-white/10" onClick={() => handlePickChange(fixture.fixture_id, fixture.away_team_name)}>
                                        <span className="font-semibold">{fixture.away_team_name}</span>
                                        <input type="radio" name="pick" readOnly checked={selectedPick?.teamName === fixture.away_team_name} className="h-5 w-5 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500" />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                     <button onClick={handleSubmitPick} className="form-button mt-6 text-lg" disabled={loading}>
                        {loading ? 'Submitting...' : (currentWeekPick ? 'Update Pick' : 'Submit Pick')}
                     </button>
                </div>

                <div>
                    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-6 border border-gray-700">
                        <h3 className="text-xl font-semibold mb-3 text-green-400 border-b border-gray-600 pb-2">Your Picks</h3>
                        {previousPicks.length > 0 ? (
                            <ul className="space-y-2">
                                {previousPicks.map(pick => (
                                     <li key={pick.game_week} className="text-gray-300">
                                         Week {pick.game_week}: <span className="font-bold text-white">{pick.selected_team_name}</span>
                                     </li>
                                ))}
                            </ul>
                        ) : (<p className="text-gray-400">No picks made yet.</p>)}
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700">
                        <h3 className="text-xl font-semibold mb-3 text-green-400 border-b border-gray-600 pb-2">Still Standing</h3>
                         <ul className="space-y-2">
                            {standings.map(user => (
                                <li key={user.user_id} className="text-gray-300">{user.first_name} {user.last_name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
