import './App.css';
import { useState } from 'react';
function App() {
  require('dotenv').config();
  // signup & login page
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  // login / signup
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(name, email, password, isLogin);
    const preurl = process.env.BACKEND_URL || 'http://localhost:5050';
    const url = isLogin ? preurl + '/login' : preurl + '/signup';
    const payload = { name, email, password };

    try {
      console.log(url, payload);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
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
    <div className="App text-center mt-10">
      <form onSubmit={handleClick} className="w-1/4 mx-auto">
        <h1>{isLogin ? 'Login' : 'Signup'}</h1>
        {!isLogin &&
          <input
            required
            className="topinput"
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="on"
          />
        }
        <input
          required
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
        />
        <input
          required
          className="bottominput"
          type="password"
          placeholder="Password *"
          value={password}
          style={{marginBottom: `${isLogin ? '0px' : '30px'}`}}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
        />
        {isLogin &&
          <button className='underlineButton forgotPassword' style={{marginTop: '0px'}} onClick={(e) => {e.preventDefault();}} >forgot password</button>}
        <button type="submit">Submit</button> 
        <button className='switchForm underlineButton' style={{marginTop: '10px', fontSize: '14px'}} onClick={(e) => {setIsLogin(!isLogin); e.preventDefault();}}>{isLogin ? 'Create an account!' : 'Already have an account?'}</button>
      </form>
    </div>
  );
}

export default App;
