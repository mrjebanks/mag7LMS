import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from '../../components/DashboardClient';

async function getData(token) {
  try {
    const headers = { 'x-auth-token': token };
    const fixturesRes = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fixtures/current`, { headers, cache: 'no-store' });
    const picksRes = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/picks/user`, { headers, cache: 'no-store' });
    const standingRes = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/competition/status`, { headers, cache: 'no-store' });
  
    const [fixturesResult, picksResult, standingsResult] = await Promise.all([
      fixturesRes,
      picksRes,
      standingRes,
    ]);

    if (!fixturesResult.ok || !picksResult.ok || !standingsResult.ok) {
        // This could happen if token is expired, middleware should catch it, but as a fallback
        return { error: 'Failed to fetch data. Your session may have expired.' };
    }
  
    const fixtures = await fixturesResult.json();
    const picks = await picksResult.json();
    const standings = await standingsResult.json();
    
    return { fixtures, picks, standings };
  } catch (error) {
    console.error('Data fetching error:', error);
    return { error: 'Could not connect to the server.' };
  }
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
      redirect('/login');
  }

  const { fixtures, picks, standings, error } = await getData(token);

  if (error) {
      // A more robust error page could be implemented here
      return (
        <div className="min-h-screen flex items-center justify-center text-red-400 text-lg">
          <p>{error} Please try <a href="/login" className="underline">logging in</a> again.</p>
        </div>
      );
  }

  return <DashboardClient initialData={{ fixtures, picks, standings, token }} />;
}