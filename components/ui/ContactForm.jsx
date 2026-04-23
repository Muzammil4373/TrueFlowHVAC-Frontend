import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { submitContact } from '../../lib/api';
import { SERVICES } from '../../lib/services';
import { SERVICE_AREAS } from '../../lib/locations';

const WA = process.env.NEXT_PUBLIC_WHATSAPP || '(888)581-5178';

// ─────────────────────────────────────────────────────────
// Field MUST be outside ContactForm — if defined inside,
// React treats it as a new component every render and
// unmounts/remounts the input, losing focus after each key.
// ─────────────────────────────────────────────────────────
function Field({ name, label, type = 'text', placeholder, required = false, error, value, onChange, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {children || (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`form-input ${error ? 'border-red-400 ring-4 ring-red-50' : ''}`}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-xs mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm({ defaultService = '', compact = false }) {
  const [form, setForm]     = useState({
    name: '', email: '', phone: '',
    serviceType: defaultService,
    city: '', message: '',
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket]   = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim())   e.phone   = 'Phone number required';
    if (!form.message.trim()) e.message = 'Please describe your issue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await submitContact(form);
      setTicket(res.data.ticketId);
      toast.success('Request submitted successfully!');
      setForm({ name: '', email: '', phone: '', serviceType: '', city: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──
  if (ticket) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 px-4"
      >
        <div className="text-6xl mb-4">✅</div>
        <h3 className="font-display font-extrabold text-2xl text-brand-950 mb-2">Request Submitted!</h3>
        <p className="text-slate-500 text-sm mb-5">
          A confirmation email is on its way. We'll contact you within 2-4 hours.
        </p>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-5 inline-block mb-6">
          <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Your Ticket ID</div>
          <div className="font-mono font-extrabold text-3xl text-brand-950 tracking-widest">{ticket}</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/${WA}?text=Hi%2C%20my%20ticket%20is%20${ticket}`}
            target="_blank" rel="noreferrer"
            className="btn-primary justify-center"
          >
            💬 Follow Up on WhatsApp
          </a>
          <button
            onClick={() => setTicket(null)}
            className="px-5 py-3 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-500 transition-all"
          >
            Submit Another Request
          </button>
        </div>
      </motion.div>
    );
  }

  // ── Form ──
  const cols = compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className={`grid gap-4 ${cols}`}>
        <Field
          name="name" label="Full Name"
          placeholder="John Smith" required
          value={form.name} onChange={handleChange} error={errors.name}
        />
        <Field
          name="email" label="Email Address" type="email"
          placeholder="john@example.com" required
          value={form.email} onChange={handleChange} error={errors.email}
        />
      </div>

      <div className={`grid gap-4 ${cols}`}>
        <Field
          name="phone" label="Phone Number" type="tel"
          placeholder="+1 (555) 123-4567" required
          value={form.phone} onChange={handleChange} error={errors.phone}
        />
        <Field name="serviceType" label="Service Type" error={errors.serviceType}>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className={`form-input ${errors.serviceType ? 'border-red-400' : ''}`}
          >
            <option value="">Select service…</option>
            {SERVICES.map(s => (
              <option key={s.slug} value={s.name}>{s.icon} {s.name}</option>
            ))}
            <option value="Emergency">🚨 Emergency Service</option>
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      <Field name="city" label="Your City" error={errors.city}>
        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select your city…</option>
          {SERVICE_AREAS.map(c => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
        </select>
      </Field>

      <Field name="message" label="Describe Your Issue" required error={errors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your HVAC issue or service needed…"
          rows={4}
          className={`form-input resize-none ${errors.message ? 'border-red-400 ring-4 ring-red-50' : ''}`}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </Field>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-display font-bold py-4 rounded-xl shadow-lg hover:shadow-glow-orange transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : '🚀 Submit Request — Get Ticket ID'}
      </motion.button>

      <p className="text-xs text-slate-400 text-center">
        By submitting you agree to be contacted. No spam, ever.
      </p>
    </form>
  );
}