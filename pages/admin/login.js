import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { adminLogin } from '../../lib/api';

export default function AdminLogin() {
  const [form, setForm]   = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [show, setShow]   = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('truflow_token')) {
      router.replace('/admin');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(form);
      localStorage.setItem('truflow_token', res.data.token);
      localStorage.setItem('truflow_admin', JSON.stringify(res.data.admin));
      toast.success('Login successful!');
      router.push('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-xl text-white shadow-glow-orange">T</div>
            <div>
              <div className="font-display font-extrabold text-xl text-white leading-none">TruFlow</div>
              <div className="text-[10px] text-orange-400 tracking-widest uppercase">Admin Portal</div>
            </div>
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Sign In to Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Enter your admin credentials to continue</p>
        </div>

        {/* Card */}
        <div className="glass-white p-8 rounded-3xl shadow-glass-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))}
                placeholder="admin@truflowhvac.com" required
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input type={show ? 'text':'password'} value={form.password} onChange={e => setForm(f => ({...f, password:e.target.value}))}
                  placeholder="••••••••" required
                  className="form-input pr-12"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg">
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={{scale:1.01}} whileTap={{scale:0.99}}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-display font-bold py-3.5 rounded-xl shadow-lg hover:shadow-glow-orange transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Signing In…</>
              ) : '🔐 Sign In to Dashboard'}
            </motion.button>
          </form>

          <div className="mt-5 pt-5 border-t border-slate-100 text-center">
            <a href="/" className="text-sm text-slate-400 hover:text-orange-500 transition-colors">← Back to Website</a>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-4">
          Secured with JWT authentication. Session expires in 7 days.
        </p>
      </motion.div>
    </div>
  );
}
