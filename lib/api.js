import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://trueflowhvac.onrender.com/api',
  timeout: 15000,
});

// Attach JWT token from localStorage for admin requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('truflow_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('truflow_token');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

// Public
export const submitContact = (data) => api.post('/contact', data);
export const trackTicket   = (id)   => api.get(`/tickets/track/${id}`);

// Auth
export const adminLogin = (creds) => api.post('/auth/login', creds);
export const getAdminMe = ()       => api.get('/auth/me');

// Admin
export const getAdminStats   = ()          => api.get('/admin/stats');
export const getAdminTickets = (params)    => api.get('/admin/tickets', { params });
export const updateAdminTicket = (id, data)=> api.patch(`/admin/tickets/${id}`, data);

export default api;
