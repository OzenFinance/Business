import { useState } from 'react';
import { Loader2 } from 'lucide-react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('http://localhost:5050/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your email and we’ll send you a reset link
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-3 py-2 border rounded-md border-gray-200 outline-gray-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Reset link sent! Check your inbox.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-md transition-colors cursor-pointer hover:bg-red-500"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="text-center">
          <a href="/userauth" className="text-sm text-gray-500 hover:text-black">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
