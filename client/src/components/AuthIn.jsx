import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import '../App.css';

function AuthIn() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleClick = async () => {
    if (activeTab === 'signup' && password !== confirmPassword) {
      setPasswordMismatch(true);
      setIsLoading(false);
      return;
    }

    setPasswordMismatch(false);

    const preurl = 'http://localhost:5050';
    const url = activeTab === 'login' ? preurl + '/login' : preurl + '/signup';
    const payload = { name, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      alert(data.message);
    } catch (err) {
      alert('Client error: ' + err.message);
      console.error('FETCH ERROR:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-center text-2xl font-bold">Welcome</h2>
          <p className="text-center text-gray-500 mt-3">
            Sign in to your account or create a new one
          </p>
          <div className="grid grid-cols-2 mt-2 border-4 border-gray-100 rounded-md overflow-hidden">
            <button
              onClick={() => { setActiveTab('login'); setIsLoading(false); }}
              className={`py-2 text-sm font-medium cursor-pointer ${
                activeTab === 'login' ? 'bg-white text-black' : 'bg-gray-100 text-gray-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setIsLoading(false); }}
              className={`py-2 text-sm font-medium cursor-pointer ${
                activeTab === 'signup' ? 'bg-white text-black' : 'bg-gray-100 text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="px-6 space-y-4">
          {activeTab === 'login' && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  className="w-full mt-1 px-3 py-2 border rounded-md border-gray-200 outline-gray-300"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full mt-1 px-3 py-2 border rounded-md border-gray-200 outline-gray-300"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 cursor-pointer" /> : <Eye className="w-4 h-4 cursor-pointer" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-gray-500 cursor-pointer hover:text-black">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white py-2 rounded-md bg-black cursor-pointer hover:bg-gray-900"
                onClick={(e) => { e.preventDefault(); setIsLoading(true); handleClick(); }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          )}

          {activeTab === 'signup' && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full mt-1 px-3 py-2 border rounded-md border-gray-200 outline-gray-300"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  className="w-full mt-1 px-3 py-2 border rounded-md border-gray-200 outline-gray-300"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full mt-1 px-3 py-2 border rounded-md border-gray-200 outline-gray-300"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 cursor-pointer" /> : <Eye className="w-4 h-4 cursor-pointer" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full mt-1 px-3 py-2 border rounded-md border-gray-200 outline-gray-300"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 cursor-pointer" /> : <Eye className="w-4 h-4 cursor-pointer" />}
                  </button>
                </div>
                {passwordMismatch && (
                  <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-2 rounded-md cursor-pointer hover:bg-gray-900"
                onClick={(e) => { e.preventDefault(); if(!passwordMismatch) {setIsLoading(true); handleClick();} }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="w-full border py-2 rounded-md transition duration-300 cursor-pointer ease-in-out hover:bg-black hover:text-white">Google</button>
            <button className="w-full border py-2 rounded-md transition duration-300 cursor-pointer ease-in-out hover:bg-black hover:text-white">GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthIn;
