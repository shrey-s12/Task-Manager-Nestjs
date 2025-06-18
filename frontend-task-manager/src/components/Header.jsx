import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
                Welcome, {user?.name} <span className="text-sm text-gray-500">({user?.role})</span>
            </h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
        </header>
    );
};

export default Header;
