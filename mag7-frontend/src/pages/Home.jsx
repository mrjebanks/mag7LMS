export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-bold mb-4">Mag7 Last Man Standing</h1>
      <p className="text-lg text-gray-600 mb-6">
        Join the ultimate Premier League challenge. Pick a winning team each week — get it wrong and you're out!
      </p>
      <div className="flex gap-4">
        <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition">Login</a>
        <a href="/register" className="px-6 py-3 bg-gray-200 text-black rounded-2xl shadow hover:bg-gray-300 transition">Register</a>
      </div>
    </div>
  );
}
