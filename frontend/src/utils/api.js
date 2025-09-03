import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://notes-app-backend1-ucg9.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// ========================
// Auth API
// ========================
export const registerUser = (data) => api.post('/api/auth/register', data);
export const verifyOTP = (data) => api.post('/api/auth/verify-otp', data);
export const googleLogin = (data) => api.post('/api/auth/google', data);
export const logoutUser = () => api.post('/api/auth/logout');
export const getMe = () => api.get('/api/auth/me').then(res => res.data.data || null);

// ========================
// Notes API
// ========================
export const getNotes = () => api.get('/api/notes').then(res => res.data.data || []);
export const createNote = (data) => api.post('/api/notes', data).then(res => res.data.data);
export const updateNote = (id, data) => api.put(`/api/notes/${id}`, data).then(res => res.data.data);
export const deleteNote = (id) => api.delete(`/api/notes/${id}`).then(res => res.data.data || null);
