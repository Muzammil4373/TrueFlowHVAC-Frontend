import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { adminLogin } from '../../lib/api';

export default function AdminLogin() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [show, setShow]     = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only run on client
  useEffect(() => {
    setMounted(true);
    // If already logged in, go to dashboard
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('truflow_token');
      if (token) {
        window.location.replace('/admin/dashboard');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await adminLogin(form);
      const { token, admin } = res.data;

      // Save to localStorage
      localStorage.setItem('truflow_token', token);
      localStorage.setItem('truflow_admin', JSON.stringify(admin));

      toast.success('Login successful! Redirecting...');

      // Hard redirect to dashboard — avoids all Next.js router issues
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 500);

    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      toast.error(msg);
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 flex items-center justify-center p-4">
      <Toaster position="top-center" />

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/images/truflow-logo.jpeg"
              alt="TruFlow Logo"
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to manage service tickets</p>
        </div>

        {/* Form card */}
        <div className="glass-white p-8 rounded-3xl shadow-glass-lg">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="admin@truflowhvac.com"
                required
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="form-input pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg"
                >
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-display font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2 hover:from-orange-600 hover:to-orange-700"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing In…
                </>
              ) : '🔐 Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-slate-100 text-center">
            <a href="/" className="text-sm text-slate-400 hover:text-orange-500 transition-colors">
              ← Back to Website
            </a>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-4">
          Secured with JWT authentication.
        </p>
      </motion.div>
    </div>
  );
}
