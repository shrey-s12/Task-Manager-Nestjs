import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { fetchUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.data.access_token);
            await fetchUser();
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Login</h2>
                <input
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <p className="text-center text-sm mt-4">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
