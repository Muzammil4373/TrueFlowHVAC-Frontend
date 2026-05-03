import Link from 'next/link';
import { SERVICE_AREAS } from '../../lib/locations';
import { SERVICES } from '../../lib/services';

const PHONE_DIRECT = process.env.NEXT_PUBLIC_PHONE        || '(888) 581-5178';
const PHONE_OFFICE = process.env.NEXT_PUBLIC_PHONE_OFFICE || '(630) 999-0127';
const WA           = process.env.NEXT_PUBLIC_WHATSAPP     || '224-451-6560';
const EMAIL        = process.env.NEXT_PUBLIC_EMAIL        || 'truflowhvac@gmail.com';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      {/* CTA strip */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-white">Need HVAC Service Today?</h3>
            <p className="text-orange-100 mt-1">24/7 emergency · Fast response · Certified techs · Licensed & Insured</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <a href={`tel:${PHONE_DIRECT}`} className="flex items-center gap-2 bg-white text-orange-600 font-bold px-5 py-3 rounded-xl hover:bg-orange-50 transition-all text-sm">
              📞 Direct: {PHONE_DIRECT}
            </a>
            <a href={`tel:${PHONE_OFFICE}`} className="flex items-center gap-2 bg-brand-950/50 text-white border border-white/30 font-bold px-5 py-3 rounded-xl hover:bg-brand-950/70 transition-all text-sm">
              🏢 Office: {PHONE_OFFICE}
            </a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-500 text-white font-bold px-5 py-3 rounded-xl hover:bg-green-600 transition-all text-sm">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-5">
            <img
              src="/images/truFlow.logo.jpeg"
              alt="TruFlow Heating and Cooling"
              className="h-20 w-auto object-contain"
            />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Chicagoland's trusted HVAC service. Licensed & insured. Certified technicians, honest pricing, and 24/7 emergency response.
          </p>

          <div className="space-y-2">
            <a href={`tel:${PHONE_DIRECT}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-orange-400 transition-colors">📞 Direct: {PHONE_DIRECT}</a>
            <a href={`tel:${PHONE_OFFICE}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-orange-400 transition-colors">🏢 Office: {PHONE_OFFICE}</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-green-400 transition-colors">💬 WhatsApp (Office)</a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-orange-400 transition-colors">✉️ {EMAIL}</a>
            <Link href="/contact" className="flex items-center gap-2 text-sm text-slate-300 hover:text-orange-400 transition-colors">🎯 Get a Free Quote</Link>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-4 text-slate-300 border-b border-slate-700 pb-2">Our Services</h4>
          <ul className="space-y-2">
            {SERVICES.map(s => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>{s.icon}</span> {s.name}
                </Link>
              </li>
            ))}
            <li><Link href="/contact" className="text-sm text-orange-400 font-semibold hover:text-orange-300 transition-colors">→ Emergency Service</Link></li>
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-4 text-slate-300 border-b border-slate-700 pb-2">Service Areas</h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            {SERVICE_AREAS.slice(0, 14).map(c => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`} className="text-xs text-slate-400 hover:text-orange-400 transition-colors truncate">{c.name}</Link>
            ))}
          </div>
          <Link href="/service-areas" className="text-xs text-orange-400 font-semibold mt-2 inline-block hover:text-orange-300">View all {SERVICE_AREAS.length} cities →</Link>
        </div>

        {/* Quick links + emergency */}
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-4 text-slate-300 border-b border-slate-700 pb-2">Quick Links</h4>
          <ul className="space-y-2 mb-6">
            {[['/', 'Home'], ['/about', 'About Us'], ['/blog', 'Blog & Tips'], ['/contact', 'Contact'], ['/track-ticket', 'Track Ticket'], ['/admin/login', 'Admin Login']].map(([href, label]) => (
              <li key={href}><Link href={href} className="text-sm text-slate-400 hover:text-orange-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
          <div className="bg-red-900/40 border border-red-700/50 rounded-2xl p-4 mb-3">
            <div className="text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="animate-pulse">🚨</span> 24/7 Direct Line
            </div>
            <a href={`tel:${PHONE_DIRECT}`} className="font-display font-bold text-lg text-white hover:text-orange-400 transition-colors block">{PHONE_DIRECT}</a>
            <a href={`tel:${PHONE_OFFICE}`} className="font-display font-bold text-base text-slate-300 hover:text-orange-400 transition-colors block mt-1">{PHONE_OFFICE} (Office)</a>
            <a href={`mailto:${EMAIL}`} className="text-xs text-slate-400 hover:text-orange-400 transition-colors block mt-1">{EMAIL}</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TruFlow Heating & Cooling. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-orange-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}