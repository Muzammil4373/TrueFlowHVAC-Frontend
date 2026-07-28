// Redirect /admin → /admin/dashboard
import { useEffect } from 'react';

export default function AdminIndex() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('truflow_token');
      if (token) {
        window.location.replace('/admin/dashboard');
      } else {
        window.location.replace('/admin/login');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl animate-spin mb-3">⚙️</div>
        <p className="text-slate-400 text-sm">Redirecting…</p>
      </div>
    </div>
  );
}
