import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PHONE_DIRECT = process.env.NEXT_PUBLIC_PHONE        || '(630) 999-0127';
const PHONE_OFFICE = process.env.NEXT_PUBLIC_PHONE_OFFICE || '(888) 581-5178';

const slides = [
  {
    bg: 'https://www.vizensolutions.com/assets/img/blog/hvac.jpg',
    tag: '24/7 Emergency Service — Chicago Illinois',
    h1a: 'Expert HVAC Services',
    h1b: 'in Chicago Illinois',
    sub: 'Don’t let a failing furnace leave your family in the cold. Our EPA-certified heating specialists are on call 24/7 for emergency repairs, new furnace installations, and full system replacements. We stand behind every install with a 10-year labor and parts warranty you can trust.',
    badge: '🔥 Furnace & Heating',
    cta1: { label: '🚨 Call Now — ' + PHONE_DIRECT, href: `tel:${PHONE_DIRECT}`, style: 'btn-emergency' },
    cta2: { label: 'Get Free Quote', href: '/contact', style: 'btn-ghost' },
  },
  {
    bg: 'https://urcts.in/wp-content/uploads/2025/09/hvac-design.webp',
    tag: 'AC Repair & Installation — Same Day Service',
    h1a: 'AC Repair &',
    h1b: 'Installation',
    sub: 'Licensed & Insured. Certified EPA & HVAC Technicians. E-Verify & Background Checked. Honest, Upfront Pricing.',
    badge: '❄️ Air Conditioning',
    cta1: { label: '📞 ' + PHONE_DIRECT, href: `tel:${PHONE_DIRECT}`, style: 'btn-primary' },
    cta2: { label: 'AC Services', href: '/services/ac-repair-installation', style: 'btn-ghost' },
  },
  {
    // Using uploaded water heater tech photo as background
    bg: 'https://stradaservices.com/wp-content/uploads/2024/05/01-choosing-an-hvac-system-for-your-home.jpg.webp',
    tag: 'Gas Water Heater — Installation & Repair',
    h1a: 'Gas Water Heater',
    h1b: 'Installation & Repair',
    sub: 'We specialize in the installation and repair of gas water heaters for both residential homes and commercial properties in Chicago Illinois.',
    badge: '🚿 Water Heaters',
    cta1: { label: '📞 ' + PHONE_DIRECT, href: `tel:${PHONE_DIRECT}`, style: 'btn-primary' },
    cta2: { label: 'Water Heater Services', href: '/services/gas-water-heater', style: 'btn-ghost' },
  },
  {
    bg: 'https://trinityplumbingpdx.com/wp-content/uploads/2024/10/Repair-Old-Hot-Water-Heater.jpg',
    tag: 'Preventive Maintenance & Tune-Ups',
    h1a: 'Maintenance &',
    h1b: 'Tune-Ups',
    sub: 'Prevent costly breakdowns. Extend your system life by 5–10 years. Annual plans available for homes and businesses in Chicago Illinois.',
    badge: '🛡️ Maintenance',
    cta1: { label: '📅 Schedule Tune-Up', href: '/contact', style: 'btn-primary' },
    cta2: { label: 'Learn More', href: '/services/maintenance-tune-ups', style: 'btn-ghost' },
  },
  {
    bg: 'https://mgcs.net.in/wp-content/uploads/2024/08/the-future-of-smart-hvac-trends-and-innovations.jpg',
    tag: '0% APR Financing Available',
    h1a: '0% APR Financing',
    h1b: 'Also Available',
    sub: 'No money down options. Same-day approval on qualifying HVAC purchases in Chicago Illinois.',
    badge: '💳 Special Financing',
    cta1: { label: '💳 Ask About Financing', href: '/contact', style: 'btn-primary' },
    cta2: { label: 'All Services', href: '/services', style: 'btn-ghost' },
  },
];

const stats = [
  { value: '10 Yr',  label: 'Labor & Parts Warranty' },
  { value: '24/7',   label: 'Emergency Service'       },
  { value: '0% APR', label: 'Financing Available'     },
  { value: '100%',   label: 'Licensed & Insured'      },
];

const trustList = [
  'Licensed & Insured',
  'Certified EPA & HVAC Technicians',
  'E-Verify & Background Checked',
  'Honest, Upfront Pricing',
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
          speed: 1000,
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
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.bg})` }}
              />
              {/* Strong overlay so all text is very readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center">

                  {/* LEFT — text */}
                  <div>
                    {/* Tag pill */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/40 px-4 py-2 rounded-full text-sm font-bold text-white mb-3 shadow-lg"
                    >
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      {slide.tag}
                    </motion.div>

                    {/* Service badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="block mb-5"
                    >
                      <span className="inline-flex items-center gap-2 bg-orange-500/90 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                        {slide.badge}
                      </span>
                    </motion.div>

                   
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-5 drop-shadow-2xl"
                      style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
                    >
                      <span className="text-white">{slide.h1a}</span><br />
                      <span className="text-orange-400">{slide.h1b}</span>
                    </motion.h1>

                    {/* Sub — bright, easy to read */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white text-lg leading-relaxed mb-8 max-w-xl font-medium"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
                    >
                      {slide.sub}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap gap-3"
                    >
                      <a href={slide.cta1.href} className={slide.cta1.style}>{slide.cta1.label}</a>
                      <Link href={slide.cta2.href} className={slide.cta2.style}>{slide.cta2.label}</Link>
                    </motion.div>

                    {/* Phone numbers — bright white */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap gap-5 mt-6 pt-5 border-t border-white/30"
                    >
                      <a href={`tel:${PHONE_DIRECT}`}
                        className="flex items-center gap-2 text-white text-base font-bold hover:text-orange-400 transition-colors"
                        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                        <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm shadow-lg">📞</span>
                        Direct: {PHONE_DIRECT}
                      </a>
                      <a href={`tel:${PHONE_OFFICE}`}
                        className="flex items-center gap-2 text-white text-base font-bold hover:text-orange-400 transition-colors"
                        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                        <span className="w-8 h-8 bg-white/20 border border-white/40 rounded-lg flex items-center justify-center text-sm">🏢</span>
                        Office: {PHONE_OFFICE}
                      </a>
                    </motion.div>
                  </div>

                  {/* RIGHT — glass stats card */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="hidden lg:block"
                  >
                    <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-7 shadow-2xl">

                      {/* Logo in card */}
                      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/15">
                        <img
                          src="/images/truFlow.logo.jpeg"
                          alt="TruFlow Logo"
                          className="w-14 h-14 object-contain rounded-xl"
                        />
                        <div>
                          <div className="font-display font-extrabold text-xl text-white leading-none">TruFlow</div>
                          <div className="text-xs font-bold tracking-widest uppercase mt-0.5">
                            <span className="text-red-400">Heating</span>
                            <span className="text-white/50"> and </span>
                            <span className="text-blue-300">Cooling</span>
                          </div>
                          <div className="text-white/50 text-[10px] mt-0.5">Chicago Illinois</div>
                        </div>
                      </div>

                      {/* Stat grid */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {stats.map(s => (
                          <div key={s.value} className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center">
                            <div className="font-display font-extrabold text-2xl text-orange-400 leading-tight">{s.value}</div>
                            <div className="text-white text-xs font-semibold mt-1">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Trust list — bright white */}
                      {/* <div className="space-y-2 mb-5">
                        {trustList.map(t => (
                          <div key={t} className="flex items-center gap-2.5 text-white text-sm font-semibold">
                            <span className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">✓</span>
                            {t}
                          </div>
                        ))}
                      </div> */}

                      {/* Goodman badge — only here, once */}
                      {/* <div className="border-t border-white/15 pt-4 flex items-center gap-3">
                        <div className="bg-red-700 border-2 border-red-400 rounded-xl px-4 py-2.5 text-center flex-shrink-0">
                          <div className="text-white font-display font-extrabold text-sm leading-none">Goodman®</div>
                          <div className="text-yellow-400 text-[9px] uppercase tracking-widest mt-0.5">Authorized Dealer</div>
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">10-Year Warranty</div>
                          <div className="text-white/60 text-xs">Labor & Parts Included</div>
                        </div>
                      </div> */}
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* Slide counter */}
              <div className="absolute top-28 right-8 z-10 hidden lg:flex items-center gap-2">
                <span className="font-mono font-bold text-white text-lg" style={{textShadow:'0 1px 8px rgba(0,0,0,0.8)'}}>{String(i + 1).padStart(2, '0')}</span>
                <span className="text-white/50">/</span>
                <span className="text-white/50 font-mono text-sm">{String(slides.length).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2" />
        <div className="swiper-button-prev !text-white hover:!text-orange-400 !left-4" />
        <div className="swiper-button-next !text-white hover:!text-orange-400 !right-8" />
      </div>
    </section>
  );
}