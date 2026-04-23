import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { trackTicket } from '../lib/api';

const WA = process.env.NEXT_PUBLIC_WHATSAPP || '18475550100';

const STATUS_CONFIG = {
  'Pending':     { bg:'bg-yellow-50', border:'border-yellow-200', text:'text-yellow-700', icon:'⏳', bar: 25  },
  'In Progress': { bg:'bg-blue-50',   border:'border-blue-200',   text:'text-blue-700',   icon:'🔧', bar: 65  },
  'Completed':   { bg:'bg-green-50',  border:'border-green-200',  text:'text-green-700',  icon:'✅', bar: 100 },
  'Cancelled':   { bg:'bg-red-50',    border:'border-red-200',    text:'text-red-700',    icon:'❌', bar: 0   },
};

export default function TrackTicketPage() {
  const [id, setId]         = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!id.trim()) return;
    setLoading(true); setError(''); setTicket(null);
    try {
      const res = await trackTicket(id.trim().toUpperCase());
      setTicket(res.data.ticket);
    } catch {
      setError('Ticket not found. Please check your ticket ID and try again.');
    } finally { setLoading(false); }
  };

  const sc = ticket ? (STATUS_CONFIG[ticket.status] || STATUS_CONFIG['Pending']) : null;

  return (
    <Layout title="Track Your Service Ticket" description="Track the status of your TruFlow HVAC service request using your ticket ID.">
      {/* Hero */}
      <section className="relative bg-brand-950 py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 40% 60%, #3b82f6 0%, transparent 50%)'}} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h1 className="font-display font-extrabold text-5xl text-white mb-4">Track Your Ticket</h1>
          <p className="text-slate-300 mb-8">Enter your ticket ID from your confirmation email to check the status of your service request.</p>
          <form onSubmit={handleTrack} className="flex gap-3">
            <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="HVAC-XXXXXX"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-2xl px-5 py-4 font-mono text-sm focus:outline-none focus:border-orange-400 uppercase"
            />
            <button type="submit" disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-display font-bold px-6 py-4 rounded-2xl transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? '…' : 'Track →'}
            </button>
          </form>
        </div>
      </section>

      {/* Result */}
      <section className="py-16 px-4 bg-white min-h-[40vh]">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div key="error" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5 text-center font-medium"
              >{error}</motion.div>
            )}

            {ticket && sc && (
              <motion.div key="ticket" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-4">
                {/* Status card */}
                <div className={`${sc.bg} border-2 ${sc.border} rounded-3xl p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Ticket ID</div>
                      <div className="font-mono font-extrabold text-2xl text-brand-950">{ticket.ticketId}</div>
                    </div>
                    <div className="text-4xl">{sc.icon}</div>
                  </div>
                  {/* Progress bar */}
                  {ticket.status !== 'Cancelled' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                        <span>Submitted</span><span>In Progress</span><span>Completed</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div initial={{width:0}} animate={{width:`${sc.bar}%`}} transition={{duration:1, ease:'easeOut'}}
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                  <div className={`font-display font-extrabold text-xl ${sc.text}`}>{sc.icon} Status: {ticket.status}</div>
                </div>

                {/* Details */}
                <div className="bg-white border border-slate-100 rounded-3xl shadow-card overflow-hidden">
                  <div className="bg-brand-950 px-5 py-3">
                    <span className="text-white font-display font-bold text-sm uppercase tracking-wide">Request Details</span>
                  </div>
                  <div className="p-5 grid grid-cols-2 gap-3">
                    {[
                      ['Name', ticket.name], ['Service', ticket.serviceType],
                      ['City', ticket.city || '—'], ['Priority', ticket.priority],
                      ['Submitted', new Date(ticket.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})],
                      ['Resolved', ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleDateString('en-US') : '—'],
                    ].map(([k,v]) => (
                      <div key={k} className="bg-slate-50 rounded-xl p-3">
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{k}</div>
                        <div className="font-semibold text-sm text-brand-950">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1.5">Your Message</div>
                    <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700 italic">"{ticket.message}"</div>
                  </div>
                  <div className="px-5 pb-5">
                    <a href={`https://wa.me/${WA}?text=Hi%2C%20my%20ticket%20is%20${ticket.ticketId}`} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-display font-bold py-3 rounded-2xl hover:bg-green-600 transition-colors"
                    >💬 Follow Up on WhatsApp</a>
                  </div>
                </div>
              </motion.div>
            )}

            {!ticket && !error && !loading && (
              <div className="text-center text-slate-400 py-12">
                <div className="text-5xl mb-3">🎫</div>
                <p className="text-sm">Enter your ticket ID above to check status.</p>
                <p className="text-xs mt-2 text-slate-300">Format: HVAC-XXXXXX</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}
