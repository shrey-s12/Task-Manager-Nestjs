import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import ManagerDashboard from './pages/ManagerDashboard';
// import EmployeeDashboard from './pages/EmployeeDashboard';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {user && <Route path="/dashboard" element={<Dashboard />} />}
    </Routes>
  );
}

export default App;
