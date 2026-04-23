import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../lib/services';

const PHONE_DIRECT = process.env.NEXT_PUBLIC_PHONE        || '(630) 999-0127';
const PHONE_OFFICE = process.env.NEXT_PUBLIC_PHONE_OFFICE || '(888) 581-5178';
const WA           = process.env.NEXT_PUBLIC_WHATSAPP     || '18885815178';
const EMAIL        = process.env.NEXT_PUBLIC_EMAIL        || 'truflowhvac@gmail.com';

export default function Navbar() {
  const [scrolled, setScrolled]    = useState(false);
  const [mobileOpen, setMobile]    = useState(false);
  const [servicesOpen, setServices]= useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobile(false); setServices(false); }, [router.asPath]);

  const isActive = (href) => router.pathname === href || (href !== '/' && router.pathname.startsWith(href));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100' : 'bg-transparent'
    }`}>
      {/* Top bar */}
      <div className={`border-b transition-all duration-300 ${scrolled ? 'border-slate-100 bg-slate-50' : 'border-white/10 bg-white/5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2 text-xs flex-wrap gap-y-1">
          <span className={scrolled ? 'text-slate-500' : 'text-white/70'}>Serving 25+ Chicagoland Communities</span>
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`tel:${PHONE_DIRECT}`} className={`flex items-center gap-1 font-semibold hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>
              📞 Direct: {PHONE_DIRECT}
            </a>
            <a href={`tel:${PHONE_OFFICE}`} className={`flex items-center gap-1 font-semibold hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>
              🏢 Office: {PHONE_OFFICE}
            </a>
            <a href={`mailto:${EMAIL}`} className={`hidden md:flex items-center gap-1 hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-500' : 'text-white/70'}`}>
              ✉️ {EMAIL}
            </a>
            <Link href="/track-ticket" className={`hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-500' : 'text-white/70'}`}>Track Ticket</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <div className={`font-display font-extrabold text-lg leading-none transition-colors ${scrolled ? 'text-brand-950' : 'text-white'}`}>TruFlow</div>
            <div className="text-[9px] text-orange-500 font-semibold tracking-widest uppercase leading-none">Heating & Cooling</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {[['/', 'Home'], ['/services', 'Services'], ['/service-areas', 'Service Areas'], ['/about', 'About'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) =>
            label === 'Services' ? (
              <div key={href} className="relative" onMouseEnter={() => setServices(true)} onMouseLeave={() => setServices(false)}>
                <button className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  isActive('/services') ? 'text-orange-500' : scrolled ? 'text-slate-700 hover:text-orange-500' : 'text-white/90 hover:text-white'
                }`}>
                  Services <span className="text-[10px]">▾</span>
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-glass-lg border border-slate-100 overflow-hidden">
                      {SERVICES.map(s => (
                        <Link key={s.slug} href={`/services/${s.slug}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors border-b border-slate-50 last:border-0">
                          <span className="text-xl">{s.icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-slate-800">{s.name}</div>
                            <div className="text-xs text-slate-400">{s.tagline}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={href} href={href} className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(href) ? 'text-orange-500 bg-orange-50' : scrolled ? 'text-slate-700 hover:text-orange-500 hover:bg-slate-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}>
                {label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${PHONE_DIRECT}`} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg hover:-translate-y-0.5">
            📞 {PHONE_DIRECT}
          </a>
          <Link href="/contact" className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
            scrolled ? 'border-slate-200 text-slate-700 hover:border-orange-400 hover:text-orange-500' : 'border-white/30 text-white hover:bg-white/10'
          }`}>
            Get Quote
          </Link>
        </div>

        <button onClick={() => setMobile(!mobileOpen)} className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {[['/', 'Home'], ['/services', 'Services'], ['/service-areas', 'Service Areas'], ['/about', 'About Us'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                <Link key={href} href={href} className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(href) ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                  {label}
                </Link>
              ))}
              <div className="pt-3 space-y-2">
                <a href={`tel:${PHONE_DIRECT}`} className="flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl text-sm font-semibold">📞 Direct: {PHONE_DIRECT}</a>
                <a href={`tel:${PHONE_OFFICE}`} className="flex items-center justify-center gap-2 bg-brand-900 text-white py-3 rounded-xl text-sm font-semibold">🏢 Office: {PHONE_OFFICE}</a>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl text-sm font-semibold">💬 WhatsApp</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
