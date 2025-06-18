import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleRegister = async () => {
        try {
            await register(form);
            alert('Registered! Please login');
            navigate('/login');
        } catch (err) {
            alert('Error registering');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-green-600">Register</h2>
                <input
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />
                <input
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                    onClick={handleRegister}
                >
                    Register
                </button>
                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
