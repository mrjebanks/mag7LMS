export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Mag7</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-xl">Login</button>
        </form>
      </div>
    </div>
  );
}
