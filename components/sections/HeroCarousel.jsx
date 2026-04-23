import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PHONE = process.env.NEXT_PUBLIC_PHONE || '+1 (847) 555-0100';
const WA    = process.env.NEXT_PUBLIC_WHATSAPP || '18475550100';

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1600&q=80',
    tag: '24/7 Emergency Service',
    h1: 'Fast & Reliable\nHeating & Cooling',
    sub: 'Chicagoland\'s trusted HVAC experts — certified technicians, same-day service, and honest pricing.',
    badge: '❄️ AC Services',
    cta1: { label: '🚨 Emergency Call', href: `tel:${PHONE}`, style: 'btn-emergency' },
    cta2: { label: 'Get Free Quote', href: '/contact', style: 'btn-ghost' },
  },
  {
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    tag: 'Furnace Repair & Installation',
    h1: 'Stay Warm Through\nEvery Chicago Winter',
    sub: 'Expert furnace repair and heating installation. Emergency response within 1-2 hours when you need it most.',
    badge: '🔥 Heating Experts',
    cta1: { label: '📞 Call Now', href: `tel:${PHONE}`, style: 'btn-primary' },
    cta2: { label: 'View Heating Services', href: '/services/heating', style: 'btn-ghost' },
  },
  {
    bg: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
    tag: 'New System Installation',
    h1: 'Complete HVAC\nInstallation Done Right',
    sub: 'Free in-home estimates for new HVAC systems. Energy Star equipment, flexible financing, utility rebates.',
    badge: '🔧 Installation Pros',
    cta1: { label: 'Get Free Estimate', href: '/contact', style: 'btn-primary' },
    cta2: { label: 'Learn More', href: '/services/installation', style: 'btn-ghost' },
  },
];

const stats = [
  { value: '10K+', label: 'Homes Served' },
  { value: '25+', label: 'Cities Covered' },
  { value: '24/7', label: 'Emergency Line' },
  { value: '15+', label: 'Years Experience' },
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
          autoplay: { delay: 5000, disableOnInteraction: false },
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
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url(${slide.bg})` }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-900/40" />
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-white mb-6 border border-white/30"
                    >
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                      {slide.tag}
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {slide.h1.split('\n')[0]}<br/>
                      <span className="text-orange-400">{slide.h1.split('\n')[1]}</span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl"
                    >
                      {slide.sub}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap gap-3"
                    >
                      <a href={slide.cta1.href} className={slide.cta1.style}>{slide.cta1.label}</a>
                      <Link href={slide.cta2.href} className={slide.cta2.style}>{slide.cta2.label}</Link>
                    </motion.div>
                  </div>

                  {/* Stats glass card */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="hidden lg:block"
                  >
                    <div className="glass p-8 rounded-3xl">
                      <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-6">Why Chicagoland Trusts Us</div>
                      <div className="grid grid-cols-2 gap-5">
                        {stats.map(s => (
                          <div key={s.value} className="bg-white/10 rounded-2xl p-4 text-center">
                            <div className="font-display font-extrabold text-3xl text-orange-400">{s.value}</div>
                            <div className="text-white/70 text-xs mt-1">{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 pt-5 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {['🧑', '👩', '🧔'].map((e, i) => (
                              <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-base border-2 border-white/20">{e}</div>
                            ))}
                          </div>
                          <div>
                            <div className="text-white text-sm font-semibold">NATE-Certified Techs</div>
                            <div className="text-white/60 text-xs">Background checked & insured</div>
                          </div>
                        </div>
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full bg-white/60 h-1/2 animate-bounce-slow"></div>
        </div>
      </div>
    </section>
  );
}
