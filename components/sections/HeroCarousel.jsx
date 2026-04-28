import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PHONE_DIRECT = process.env.NEXT_PUBLIC_PHONE        || '(630) 999-0127';
const PHONE_OFFICE = process.env.NEXT_PUBLIC_PHONE_OFFICE || '(888) 581-5178';
const WA           = process.env.NEXT_PUBLIC_WHATSAPP     || '18885815178';

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    tag: '24/7 Emergency Service — Chicago Illinois',
    h1a: 'Expert HVAC Services',
    h1b: 'in Chicago Illinois',
    sub: 'Fast • Reliable • Affordable — Authorized Goodman Dealer with 10-Year Labor & Parts Warranty.',
    cta1: { label: '🚨 Call Now — ' + PHONE_DIRECT, href: `tel:${PHONE_DIRECT}`, style: 'btn-emergency' },
    cta2: { label: 'Get Free Quote', href: '/contact', style: 'btn-ghost' },
  },
  {
    bg: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1600&q=80',
    tag: 'Furnace & AC Repair • Installation',
    h1a: 'Furnace Repair &',
    h1b: 'AC Installation',
    sub: 'Licensed & Insured. Certified EPA & HVAC Technicians. E-Verify & Background Checked. Honest, Upfront Pricing.',
    cta1: { label: '📞 ' + PHONE_DIRECT, href: `tel:${PHONE_DIRECT}`, style: 'btn-primary' },
    cta2: { label: 'Our Services', href: '/services', style: 'btn-ghost' },
  },
  {
    bg: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
    tag: '0% APR Financing Available',
    h1a: '0% APR Financing',
    h1b: 'Also Available',
    sub: 'Special financing through Goodman & Liberty. No money down options. Same-day approval on qualifying HVAC purchases.',
    cta1: { label: '💳 Ask About Financing', href: `/contact`, style: 'btn-primary' },
    cta2: { label: 'View Services', href: '/services', style: 'btn-ghost' },
  },
];

const stats = [
  { value: '10 Yr',  label: 'Labor & Parts Warranty' },
  { value: '24/7',   label: 'Emergency Service' },
  { value: '0% APR', label: 'Financing Available' },
  { value: '100%',   label: 'Licensed & Insured' },
];

export default function HeroCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const initSwiper = async () => {
      const { Swiper } = await import('swiper');
      const { Autoplay, EffectFade, Pagination, Navigation } = await import('swiper/modules');
      if (swiperRef.current && !swiperRef.current.swiper) {
        new Swiper(swiperRef.current, {
          modules: [Autoplay, EffectFade, Pagination, Navigation],
          effect: 'fade',
          autoplay: { delay: 5500, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
          loop: true,
        });
      }
    };
    initSwiper();
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      <div ref={swiperRef} className="swiper h-full">
        <div className="swiper-wrapper">
          {slides.map((slide, i) => (
            <div key={i} className="swiper-slide relative h-full">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.bg})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950/93 via-brand-950/75 to-brand-950/40" />

              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
                      className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-white mb-6 border border-white/30">
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                      {slide.tag}
                    </motion.div>

                    <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
                      className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
                      {slide.h1a}<br/>
                      <span className="text-orange-400">{slide.h1b}</span>
                    </motion.h1>

                    <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
                      className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                      {slide.sub}
                    </motion.p>

                    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
                      className="flex flex-wrap gap-3">
                      <a href={slide.cta1.href} className={slide.cta1.style}>{slide.cta1.label}</a>
                      <Link href={slide.cta2.href} className={slide.cta2.style}>{slide.cta2.label}</Link>
                    </motion.div>

                    {/* Two phone numbers */}
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}}
                      className="flex flex-wrap gap-4 mt-6">
                      <a href={`tel:${PHONE_DIRECT}`} className="text-white/70 text-sm hover:text-orange-400 transition-colors">📞 Direct: {PHONE_DIRECT}</a>
                      <a href={`tel:${PHONE_OFFICE}`} className="text-white/70 text-sm hover:text-orange-400 transition-colors">🏢 Office: {PHONE_OFFICE}</a>
                    </motion.div>
                  </div>

                  {/* Stats glass card */}
                  <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:0.5}}
                    className="hidden lg:block">
                    <div className="glass p-8 rounded-3xl">
                      <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-6">Why Chicagoland Trusts TruFlow</div>
                      <div className="grid grid-cols-2 gap-5">
                        {stats.map(s => (
                          <div key={s.value} className="bg-white/10 rounded-2xl p-4 text-center">
                            <div className="font-display font-extrabold text-2xl text-orange-400 leading-tight">{s.value}</div>
                            <div className="text-white/70 text-xs mt-1">{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
                        {['Licensed & Insured','Certified EPA & HVAC Technicians','E-Verify & Background Checked','Honest, Upfront Pricing'].map(t => (
                          <div key={t} className="flex items-center gap-2 text-white/70 text-xs">
                            <span className="text-orange-400">✓</span> {t}
                          </div>
                        ))}
                      </div>
                      {/* Goodman badge */}
                      <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                        <div className="bg-red-700 border-2 border-red-500 rounded-lg px-3 py-2 text-center">
                          <div className="text-white font-bold text-xs leading-tight">Goodman®</div>
                          <div className="text-yellow-400 text-[9px] uppercase tracking-wide">Authorized Dealer</div>
                        </div>
                        <div className="text-white/60 text-xs leading-relaxed">10-Year Labor &amp;<br/>Parts Warranty</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2"></div>
        <div className="swiper-button-prev !text-white/70 hover:!text-white !left-4"></div>
        <div className="swiper-button-next !text-white/70 hover:!text-white !right-20"></div>
      </div>
    </section>
  );
}
