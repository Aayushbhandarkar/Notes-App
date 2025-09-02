import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Auth API
export const registerUser = (data) => api.post('/auth/register', data);
export const verifyOTP = (data) => api.post('/auth/verify-otp', data);
export const googleLogin = (data) => api.post('/auth/google', data);
export const logoutUser = () => api.post('/auth/logout');
export const getMe = () => api.get('/auth/me').then(res => res.data.data);

// Notes API
export const getNotes = () => api.get('/notes').then(res => res.data);
export const createNote = (data) => api.post('/notes', data).then(res => res.data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data).then(res => res.data);
export const deleteNote = (id) => api.delete(`/notes/${id}`).then(res => res.data);

export default api;
