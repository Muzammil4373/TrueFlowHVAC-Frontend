import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { getAdminStats, getAdminTickets, updateAdminTicket } from '../../lib/api';

const STATUS_STYLES = {
  'Pending':     { bg:'bg-yellow-50',  text:'text-yellow-700',  dot:'bg-yellow-500',  border:'border-yellow-200' },
  'In Progress': { bg:'bg-blue-50',    text:'text-blue-700',    dot:'bg-blue-500',    border:'border-blue-200'   },
  'Completed':   { bg:'bg-green-50',   text:'text-green-700',   dot:'bg-green-500',   border:'border-green-200'  },
  'Cancelled':   { bg:'bg-red-50',     text:'text-red-700',     dot:'bg-red-500',     border:'border-red-200'    },
};

const PRIORITY_COLORS = {
  'Emergency': 'text-red-600 font-bold',
  'High':      'text-orange-600 font-semibold',
  'Medium':    'text-yellow-600',
  'Low':       'text-slate-400',
};

export default function AdminDashboard() {
  const [mounted, setMounted]     = useState(false);
  const [admin, setAdmin]         = useState(null);
  const [stats, setStats]         = useState(null);
  const [tickets, setTickets]     = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [statusFilter, setStatus] = useState('');
  const [searchText, setSearch]   = useState('');
  const [selected, setSelected]   = useState(null);
  const [updatingId, setUpdId]    = useState(null);
  const [error, setError]         = useState('');

  // ── Auth check — client only ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('truflow_token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    try {
      const a = JSON.parse(localStorage.getItem('truflow_admin') || '{}');
      setAdmin(a);
    } catch {
      window.location.href = '/admin/login';
      return;
    }
    setMounted(true);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [sRes, tRes] = await Promise.all([
        getAdminStats(),
        getAdminTickets({
          status: statusFilter || undefined,
          search: searchText  || undefined,
        }),
      ]);
      setStats(sRes.data.stats || {});
      setTickets(tRes.data.tickets || []);
      setTotal(tRes.data.total || 0);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('truflow_token');
        localStorage.removeItem('truflow_admin');
        window.location.href = '/admin/login';
        return;
      }
      const msg = err.response?.data?.message || err.message || 'Failed to load data';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchText]);

  // Fetch when mounted or filters change
  useEffect(() => {
    if (mounted) fetchData();
  }, [mounted, fetchData]);

  const handleUpdate = async (id, newStatus) => {
    setUpdId(id);
    try {
      await updateAdminTicket(id, { status: newStatus });
      toast.success(`Updated to ${newStatus}`);
      setSelected(s => s && s._id === id ? { ...s, status: newStatus } : s);
      await fetchData();
    } catch {
      toast.error('Update failed. Please try again.');
    } finally {
      setUpdId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('truflow_token');
    localStorage.removeItem('truflow_admin');
    window.location.href = '/admin/login';
  };

  // Show spinner while mounting / auth check
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-spin">⚙️</div>
          <p className="text-slate-500 text-sm font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label:'Total',      val: stats?.total      ?? 0, icon:'🎫', color:'from-blue-500 to-cyan-400'    },
    { label:'Pending',    val: stats?.pending    ?? 0, icon:'⏳', color:'from-yellow-500 to-amber-400'  },
    { label:'In Progress',val: stats?.inProgress ?? 0, icon:'🔧', color:'from-orange-500 to-red-400'    },
    { label:'Completed',  val: stats?.completed  ?? 0, icon:'✅', color:'from-green-500 to-emerald-400' },
    { label:'Emergency',  val: stats?.emergency  ?? 0, icon:'🚨', color:'from-red-600 to-red-500'       },
    { label:'This Week',  val: stats?.weeklyNew  ?? 0, icon:'📈', color:'from-violet-500 to-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Toaster position="top-right" />

      {/* ── HEADER ── */}
      <header className="bg-brand-950 text-white px-4 md:px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src="/images/truFlow.logo.jpeg" alt="TruFlow" className="h-10 w-auto object-contain rounded-lg" />
          <div>
            <div className="font-display font-bold text-sm uppercase tracking-wide">TruFlow HVAC</div>
            <div className="text-[10px] text-slate-400">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          {admin?.email && (
            <span className="text-slate-400 text-xs hidden md:block">👤 {admin.email}</span>
          )}
          <a href="/" className="text-slate-400 hover:text-white text-sm transition-colors">← Site</a>
          <button
            onClick={logout}
            className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── TITLE + REFRESH ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-brand-950">Customer Queries</h1>
            <p className="text-slate-400 text-sm mt-0.5">All service requests from truflowhvac.com</p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-300 px-4 py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            <span className={loading ? 'animate-spin' : ''}>↻</span> Refresh
          </button>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${s.color}`} />
              <div className="p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-display font-extrabold text-2xl text-brand-950">{s.val}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-5 flex items-center justify-between">
            <span className="text-sm font-medium">❌ {error}</span>
            <button onClick={fetchData} className="text-sm font-semibold underline hover:no-underline ml-4">Retry</button>
          </div>
        )}

        {/* ── FILTERS ── */}
        <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <input
            type="text"
            placeholder="🔍 Search by name, email or ticket ID…"
            value={searchText}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
          <div className="flex gap-2 flex-wrap">
            {['', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  statusFilter === s
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s || 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-50 bg-slate-50/50">
            <span className="text-sm text-slate-500 font-medium">
              {loading ? 'Loading…' : `${total} ticket${total !== 1 ? 's' : ''} found`}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-4xl animate-spin mb-3">⚙️</div>
              <p className="text-slate-400 text-sm">Loading tickets…</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🎫</div>
              <p className="text-slate-600 font-semibold">No tickets found</p>
              <p className="text-slate-400 text-sm mt-1">
                {statusFilter
                  ? `No "${statusFilter}" tickets yet`
                  : 'Submit a form on the website to see tickets here'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Ticket ID','Customer','Service','City','Priority','Status','Date','Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {tickets.map(t => {
                    const sc = STATUS_STYLES[t.status] || STATUS_STYLES['Pending'];
                    return (
                      <tr key={t._id} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs font-bold text-brand-950 bg-slate-100 px-2 py-1 rounded-lg">
                            {t.ticketId}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-sm text-brand-950">{t.name}</div>
                          <div className="text-xs text-slate-400">{t.email}</div>
                          <div className="text-xs text-slate-400">{t.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-slate-700 max-w-[140px] block truncate">{t.serviceType}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{t.city || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${PRIORITY_COLORS[t.priority] || 'text-slate-400'}`}>
                            {t.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                            {t.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                          {new Date(t.createdAt).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'2-digit' })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            {['Pending','In Progress','Completed'].filter(s => s !== t.status).map(s => (
                              <button
                                key={s}
                                onClick={() => handleUpdate(t._id, s)}
                                disabled={updatingId === t._id}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-600 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 whitespace-nowrap"
                              >
                                {s === 'Completed' ? '✓' : s === 'In Progress' ? '▶' : '⏸'} {s.split(' ')[0]}
                              </button>
                            ))}
                            <button
                              onClick={() => setSelected(t)}
                              className="px-2.5 py-1 bg-brand-900 text-white rounded-lg text-xs font-medium hover:bg-brand-800 transition-colors"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-brand-950 px-6 py-4 flex justify-between items-center">
                <div>
                  <div className="font-mono font-bold text-xl text-white">{selected.ticketId}</div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {new Date(selected.createdAt).toLocaleString('en-US')}
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-slate-400 hover:text-white text-2xl transition-colors leading-none"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-1 mb-5">
                  {[
                    ['Name',     selected.name],
                    ['Email',    selected.email],
                    ['Phone',    selected.phone],
                    ['Service',  selected.serviceType],
                    ['City',     selected.city || '—'],
                    ['Priority', selected.priority],
                    ['Status',   selected.status],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3 py-2 border-b border-slate-50">
                      <span className="w-20 text-xs text-slate-400 uppercase tracking-wider font-semibold pt-0.5 flex-shrink-0">{k}</span>
                      <span className="text-sm font-medium text-brand-950">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Message</div>
                  <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed italic border border-slate-100">
                    "{selected.message}"
                  </div>
                </div>

                <div className="flex gap-2">
                  {['Pending', 'In Progress', 'Completed'].map(s => (
                    <button
                      key={s}
                      onClick={() => handleUpdate(selected._id, s)}
                      disabled={updatingId === selected._id}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 ${
                        selected.status === s
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 border border-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
