import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../lib/services';

const PHONE_DIRECT  = process.env.NEXT_PUBLIC_PHONE         || '(888) 581-5178';
const PHONE_OFFICE  = process.env.NEXT_PUBLIC_PHONE_OFFICE  || '(630) 999-0127';
const WA            = process.env.NEXT_PUBLIC_WHATSAPP      || '224-451-6560';

export default function FloatingUI() {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Emergency banner */}
      <div className="emergency-marquee text-white text-center py-2 px-4 text-sm font-semibold relative z-[60]">
        <span className="animate-pulse mr-2">🚨</span>
        24/7 Emergency HVAC Service – Call Direct:&nbsp;
        <a href={`tel:${PHONE_DIRECT}`} className="underline font-bold hover:no-underline">{PHONE_DIRECT}</a>
        &nbsp;| Office:&nbsp;
        <a href={`tel:${PHONE_OFFICE}`} className="underline font-bold hover:no-underline">{PHONE_OFFICE}</a>
        <span className="animate-pulse ml-2">🚨</span>
      </div>

      {/* Floating side panel */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">

        {/* Emergency */}
        <motion.a href={`tel:${PHONE_DIRECT}`} whileHover={{ x: -4 }}
          className="group flex items-center bg-red-600 text-white rounded-l-2xl overflow-hidden shadow-2xl">
          <div className="px-3 py-4 flex flex-col items-center gap-1">
            <span className="text-lg">🚨</span>
            <span className="text-[9px] font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">Emergency</span>
          </div>
          <div className="max-w-0 group-hover:max-w-[160px] overflow-hidden transition-all duration-300 whitespace-nowrap">
            <div className="pr-4 pl-1">
              <div className="text-xs font-bold uppercase">24/7 Emergency</div>
              <div className="text-[10px] opacity-80">{PHONE_DIRECT}</div>
            </div>
          </div>
        </motion.a>

        {/* Direct number */}
        <motion.a href={`tel:${PHONE_DIRECT}`} whileHover={{ x: -4 }}
          className="group flex items-center bg-brand-900 text-white rounded-l-2xl overflow-hidden shadow-xl">
          <div className="px-3 py-4 flex flex-col items-center gap-1">
            <span className="text-lg">📞</span>
            <span className="text-[9px] font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">Direct</span>
          </div>
          <div className="max-w-0 group-hover:max-w-[160px] overflow-hidden transition-all duration-300 whitespace-nowrap">
            <div className="pr-4 pl-1">
              <div className="text-xs font-bold">Direct Line</div>
              <div className="text-[10px] opacity-80">{PHONE_DIRECT}</div>
            </div>
          </div>
        </motion.a>

        {/* WhatsApp (office number) */}
        <motion.a href={`https://wa.me/${WA}?text=Hello%20I%20need%20HVAC%20service`}
          target="_blank" rel="noreferrer" whileHover={{ x: -4 }}
          className="group flex items-center bg-green-500 text-white rounded-l-2xl overflow-hidden shadow-xl">
          <div className="px-3 py-4 flex flex-col items-center gap-1">
            <span className="text-lg">💬</span>
            <span className="text-[9px] font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">WhatsApp</span>
          </div>
          <div className="max-w-0 group-hover:max-w-[160px] overflow-hidden transition-all duration-300 whitespace-nowrap">
            <div className="pr-4 pl-1">
              <div className="text-xs font-bold">Chat With Us</div>
              <div className="text-[10px] opacity-80">{PHONE_OFFICE}</div>
            </div>
          </div>
        </motion.a>

        {/* Quick Services */}
        <div className="relative">
          <motion.button onClick={() => setServicesOpen(!servicesOpen)} whileHover={{ x: -4 }}
            className="group flex items-center bg-orange-500 text-white rounded-l-2xl overflow-hidden shadow-xl w-full">
            <div className="px-3 py-4 flex flex-col items-center gap-1">
              <span className="text-lg">⚡</span>
              <span className="text-[9px] font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">Services</span>
            </div>
          </motion.button>
          <AnimatePresence>
            {servicesOpen && (
              <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
                className="absolute right-full top-0 mr-2 bg-white rounded-2xl shadow-glass-lg border border-slate-100 w-52 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                  <span className="text-white font-bold text-sm">Quick Services</span>
                </div>
                {SERVICES.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-orange-50 transition-colors border-b border-slate-50 last:border-0">
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{s.name}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating WhatsApp bubble */}
      <motion.a href={`https://wa.me/${WA}?text=Hello%20I%20need%20HVAC%20service`}
        target="_blank" rel="noreferrer"
        animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full shadow-2xl flex items-center justify-center text-2xl"
        aria-label="WhatsApp">
        💬
      </motion.a>
    </>
  );
}
