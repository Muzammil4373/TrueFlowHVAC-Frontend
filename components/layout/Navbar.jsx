import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../lib/services';

const PHONE_DIRECT = process.env.NEXT_PUBLIC_PHONE        || '(630) 999-0127';
const PHONE_OFFICE = process.env.NEXT_PUBLIC_PHONE_OFFICE || '(888) 581-5178';
const WA           = process.env.NEXT_PUBLIC_WHATSAPP     || '(888) 581-5178';
const EMAIL        = process.env.NEXT_PUBLIC_EMAIL        || 'truflowhvac@gmail.com';

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobile]     = useState(false);
  const [servicesOpen, setServices] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobile(false); setServices(false); }, [router.asPath]);

  const isActive = (href) =>
    router.pathname === href || (href !== '/' && router.pathname.startsWith(href));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/97 backdrop-blur-xl shadow-lg border-b border-slate-200'
        : 'bg-black/30 backdrop-blur-sm'
    }`}>
      
      <div className={`border-b transition-all duration-300 ${
        scrolled ? 'border-slate-200 bg-slate-50' : 'border-white/15 bg-black/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2 text-xs flex-wrap gap-y-1">
          <span className={`font-medium ${scrolled ? 'text-slate-600' : 'text-white'}`}>
            Serving 25+ Chicagoland Communities — Chicago Illinois
          </span>
          <div className="flex items-center gap-5 flex-wrap">
            <a href={`tel:${PHONE_DIRECT}`}
              className={`flex items-center gap-1.5 font-bold hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}>
              📞 Direct: {PHONE_DIRECT}
            </a>
            <a href={`tel:${PHONE_OFFICE}`}
              className={`flex items-center gap-1.5 font-bold hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}>
              🏢 Office: {PHONE_OFFICE}
            </a>
            <a href={`mailto:${EMAIL}`}
              className={`hidden md:flex items-center gap-1.5 hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
              ✉️ {EMAIL}
            </a>
            <Link href="/track-ticket"
              className={`hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-500' : 'text-white/80'}`}>
              Track Ticket
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

        {/* Logo — real image + text */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <img
            src="/images/truFlow.logo.jpeg"
            alt="TruFlow Heating and Cooling Logo"
            className="h-14 w-14 object-contain rounded-xl shadow-lg"
          />
          <div>
            <div className={`font-display font-extrabold text-xl leading-none tracking-wide transition-colors ${
              scrolled ? 'text-brand-950' : 'text-white'
            }`}>
              TruFlow
            </div>
            <div className="text-[10px] font-bold tracking-widest uppercase leading-none mt-0.5">
              <span className={scrolled ? 'text-red-600' : 'text-red-400'}>Heating</span>
              <span className={scrolled ? 'text-slate-400' : 'text-white/60'}> and </span>
              <span className={scrolled ? 'text-blue-600' : 'text-blue-300'}>Cooling</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {[
            ['/', 'Home'],
            ['/services', 'Services'],
            ['/service-areas', 'Service Areas'],
            ['/about', 'About'],
            ['/blog', 'Blog'],
            ['/contact', 'Contact'],
          ].map(([href, label]) =>
            label === 'Services' ? (
              <div
                key={href}
                className="relative"
                onMouseEnter={() => setServices(true)}
                onMouseLeave={() => setServices(false)}
              >
                <button className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${
                  isActive('/services')
                    ? 'text-orange-500'
                    : scrolled
                      ? 'text-slate-800 hover:text-orange-500 hover:bg-orange-50'
                      : 'text-white hover:text-orange-300 hover:bg-white/10'
                }`}>
                  Services <span className="text-[10px]">▾</span>
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-glass-lg border border-slate-100 overflow-hidden"
                    >
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
              <Link key={href} href={href}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive(href)
                    ? 'text-orange-500 bg-orange-50'
                    : scrolled
                      ? 'text-slate-800 hover:text-orange-500 hover:bg-orange-50'
                      : 'text-white hover:text-orange-300 hover:bg-white/10'
                }`}>
                {label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <a href={`tel:${PHONE_DIRECT}`}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
            📞 {PHONE_DIRECT}
          </a>
          <Link href="/contact"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border-2 whitespace-nowrap ${
              scrolled
                ? 'border-slate-300 text-slate-700 hover:border-orange-500 hover:text-orange-500'
                : 'border-white/40 text-white hover:bg-white/10'
            }`}>
            Get Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobile(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}
        >
          <div className="w-6 space-y-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {[
                ['/', 'Home'],
                ['/services', 'Services'],
                ['/service-areas', 'Service Areas'],
                ['/about', 'About Us'],
                ['/blog', 'Blog'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <Link key={href} href={href}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(href) ? 'bg-orange-50 text-orange-600' : 'text-slate-800 hover:bg-slate-50'
                  }`}>
                  {label}
                </Link>
              ))}
              <div className="pt-3 space-y-2">
                <a href={`tel:${PHONE_DIRECT}`}
                  className="flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl text-sm font-bold">
                  📞 Direct: {PHONE_DIRECT}
                </a>
                <a href={`tel:${PHONE_OFFICE}`}
                  className="flex items-center justify-center gap-2 bg-brand-900 text-white py-3 rounded-xl text-sm font-bold">
                  🏢 Office: {PHONE_OFFICE}
                </a>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl text-sm font-bold">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}