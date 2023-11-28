//Login page
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import clientPromise from '../lib/mongodb';
import { Navbar } from '../components/Navbar';


const LoginPage = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	/**const handleLogin = async () => {
		try {
			const client = await clientPromise;
			const db = client.db('NexuStore');

			//find user
			const user = await db.collection('Users').findOne({ username });
		    
			if (user && user.password === password) {
				router.push('/home');
			} else {
				setError('Invalid username or password');
			}
		} catch (error) {
			console.error('Login error:', error);
			setError('An unexpected error occurred');
		}
	};*/

	return (
		<>
			<Navbar />
			<div className="login-page">
				<h1>Login</h1>
				<form>
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
						<label>Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
			<style jsx>{`
        .login-page {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .login-page h1 {
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
        form input[type="password"] {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 7px;
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

export default LoginPage
