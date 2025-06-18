import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// Auth
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const logoutUser = () => API.post('/auth/logout');
export const getUserProfile = () => API.get('/auth/profile');

// Task-related
export const getTasks = () => API.get('/tasks');
export const updateTaskStatus = (id, status) => API.patch(`/tasks/update-status/${id}`, { status });
export const assignTask = (data) => API.post('/tasks/assign', data);

// User-related
export const getAllEmployees = () => API.get('/users?role=employee');
