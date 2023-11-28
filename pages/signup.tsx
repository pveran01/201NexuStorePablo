// pages/signup.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import Link from 'next/link';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log('User registered successfully');
        router.push('/');
      } else {
        const errorData = await response.json();
        console.error('Sign up error:', errorData.message);
      }
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="login-link">
          <p>Aleady have an account? <Link href="/login" passHref><span style={{ color: '#0056b3', textDecoration: 'underline', cursor: 'pointer' }}>Login</span></Link></p>
        </div>
      </div>
      <style jsx>{`
        .signup-page {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .signup-page h1 {
          text-align: center;
          color: #333;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        form label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        form input[type="text"],
        form input[type="email"],
        form input[type="password"] {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        form button {
          background-color: #0056b3;
          color: white;
          padding: 0.7rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        form button:hover {
          background-color: #004494;
        }
      `}</style>
    </>
  );
};

export default SignUp;