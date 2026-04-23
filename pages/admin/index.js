import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [admin, setAdmin]         = useState(null);
  const [stats, setStats]         = useState(null);
  const [tickets, setTickets]     = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [statusFilter, setStatus] = useState('');
  const [search, setSearch]       = useState('');
  const [selected, setSelected]   = useState(null);
  const [updatingId, setUpdId]    = useState(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' && localStorage.getItem('truflow_token');
    if (!token) { router.replace('/admin/login'); return; }
    const a = JSON.parse(localStorage.getItem('truflow_admin') || '{}');
    setAdmin(a);
    fetchAll();
  }, []);

  useEffect(() => { fetchTickets(); }, [statusFilter, search]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [sRes, tRes] = await Promise.all([getAdminStats(), getAdminTickets()]);
      setStats(sRes.data.stats);
      setTickets(tRes.data.tickets);
      setTotal(tRes.data.total);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  };

  const fetchTickets = async () => {
    try {
      const res = await getAdminTickets({ status: statusFilter || undefined, search: search || undefined });
      setTickets(res.data.tickets);
      setTotal(res.data.total);
    } catch {}
  };

  const handleUpdate = async (id, newStatus) => {
    setUpdId(id);
    try {
      await updateAdminTicket(id, { status: newStatus });
      toast.success(`Status → ${newStatus}`);
      fetchAll();
      setSelected(s => s && s._id === id ? { ...s, status: newStatus } : s);
    } catch { toast.error('Update failed'); }
    finally { setUpdId(null); }
  };

  const logout = () => {
    localStorage.removeItem('truflow_token');
    localStorage.removeItem('truflow_admin');
    router.push('/admin/login');
  };

  const statCards = stats ? [
    { label:'Total Tickets',  val: stats.total,      icon:'🎫', color:'from-blue-500 to-cyan-400'   },
    { label:'Pending',        val: stats.pending,    icon:'⏳', color:'from-yellow-500 to-amber-400' },
    { label:'In Progress',    val: stats.inProgress, icon:'🔧', color:'from-orange-500 to-red-400'   },
    { label:'Completed',      val: stats.completed,  icon:'✅', color:'from-green-500 to-emerald-400'},
    { label:'Emergency',      val: stats.emergency,  icon:'🚨', color:'from-red-600 to-red-500'      },
    { label:'This Week',      val: stats.weeklyNew,  icon:'📈', color:'from-violet-500 to-purple-400'},
  ] : [];

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Toaster position="top-right" />

      {/* Top Nav */}
      <header className="bg-brand-950 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-sm">T</div>
          <div>
            <div className="font-display font-bold text-sm uppercase tracking-wide">TruFlow HVAC</div>
            <div className="text-[10px] text-slate-400">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {admin && <span className="text-slate-400 text-sm hidden md:block">👤 {admin.email}</span>}
          <a href="/" className="text-slate-400 hover:text-white text-sm transition-colors">← Site</a>
          <button onClick={logout} className="text-slate-400 hover:text-red-400 text-sm transition-colors">Logout</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-extrabold text-2xl text-brand-950">Service Tickets</h1>
          <button onClick={fetchAll} className="flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 bg-white border border-slate-200 px-4 py-2 rounded-xl transition-all hover:border-orange-300">
            ↻ Refresh
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {statCards.map(s => (
              <motion.div key={s.label} whileHover={{y:-2}} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${s.color}`} />
                <div className="p-4 text-center">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="font-display font-extrabold text-2xl text-brand-950">{s.val}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <input type="text" placeholder="🔍 Search by name, email, ticket ID…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-400"
          />
          <div className="flex gap-2 flex-wrap">
            {['', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map(s => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === s ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s || 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-50 flex justify-between items-center">
            <span className="text-sm text-slate-500">{total} ticket{total !== 1 ? 's' : ''} found</span>
          </div>
          {loading ? (
            <div className="text-center py-16 text-slate-400">
              <div className="animate-spin text-3xl mb-3">⚙️</div>
              <p className="text-sm">Loading tickets…</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <div className="text-4xl mb-3">🎫</div>
              <p className="text-sm">No tickets found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Ticket ID','Customer','Service','City','Priority','Status','Date','Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(t => {
                    const sc = STATUS_STYLES[t.status] || STATUS_STYLES['Pending'];
                    return (
                      <tr key={t._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs font-bold text-brand-950">{t.ticketId}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-sm text-brand-950">{t.name}</div>
                          <div className="text-xs text-slate-400">{t.email}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">{t.serviceType}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{t.city || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs ${PRIORITY_COLORS[t.priority] || 'text-slate-400'}`}>{t.priority}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                          {new Date(t.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'2-digit'})}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            {['Pending','In Progress','Completed'].filter(s => s !== t.status).map(s => (
                              <button key={s} onClick={() => handleUpdate(t._id, s)} disabled={updatingId===t._id}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-600 rounded-lg text-xs transition-colors disabled:opacity-50 whitespace-nowrap"
                              >
                                {s === 'Completed' ? '✓' : s === 'In Progress' ? '▶' : '⏸'} {s.split(' ')[0]}
                              </button>
                            ))}
                            <button onClick={() => setSelected(t)} className="px-2.5 py-1 bg-brand-900 text-white rounded-lg text-xs hover:bg-brand-800 transition-colors">View</button>
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

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95}}
              className="bg-white rounded-3xl shadow-glass-lg max-w-lg w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-brand-950 px-6 py-4 flex justify-between items-center">
                <div>
                  <div className="font-mono font-bold text-xl text-white">{selected.ticketId}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{new Date(selected.createdAt).toLocaleString('en-US')}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white text-xl transition-colors">✕</button>
              </div>
              <div className="p-6 space-y-3">
                {[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone], ['Service', selected.serviceType], ['City', selected.city || '—'], ['Priority', selected.priority], ['Status', selected.status]].map(([k,v]) => (
                  <div key={k} className="flex gap-3 py-2 border-b border-slate-50">
                    <span className="w-20 text-xs text-slate-400 uppercase tracking-wider font-semibold pt-0.5 flex-shrink-0">{k}</span>
                    <span className="text-sm font-medium text-brand-950">{v}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Message</div>
                  <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700 leading-relaxed italic">"{selected.message}"</div>
                </div>
                <div className="flex gap-2 pt-2">
                  {['Pending','In Progress','Completed'].map(s => (
                    <button key={s} onClick={() => handleUpdate(selected._id, s)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${selected.status === s ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-500'}`}
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
