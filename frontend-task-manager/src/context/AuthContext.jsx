import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile, logoutUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log("user", user);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await getUserProfile();
            setUser(res.data);
        } catch (err) {
            setUser(null);
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
