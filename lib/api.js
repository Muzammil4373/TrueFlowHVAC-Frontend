import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30s for Vercel cold starts
});

// Attach JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('truflow_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Only redirect on 401 if token is clearly invalid (not just a cold start timeout)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response?.status === 401 &&
      typeof window !== 'undefined' &&
      window.location.pathname.startsWith('/admin') &&
      window.location.pathname !== '/admin/login'
    ) {
      // Only clear and redirect if the server explicitly says unauthorized
      // Don't redirect on network errors or timeouts
      const msg = err.response?.data?.message || '';
      if (msg.includes('token') || msg.includes('authorized') || msg.includes('expired')) {
        localStorage.removeItem('truflow_token');
        localStorage.removeItem('truflow_admin');
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
export const getAdminStats     = ()           => api.get('/admin/stats');
export const getAdminTickets   = (params)     => api.get('/admin/tickets', { params });
export const updateAdminTicket = (id, data)   => api.patch(`/admin/tickets/${id}`, data);

export default api;
