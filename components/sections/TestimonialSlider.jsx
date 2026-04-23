import { useEffect, useRef } from 'react';

const testimonials = [
  { name: 'Michael Thompson', city: 'Naperville', stars: 5, service: 'Emergency AC Repair', avatar: 'M', color: 'from-blue-500 to-cyan-400',
    text: 'Called at 11pm when our AC died during a heatwave. TruFlow had a tech at my door within 90 minutes and it was fixed by midnight. These guys are incredible — highly recommend!' },
  { name: 'Jennifer Patterson', city: 'Schaumburg', stars: 5, service: 'Furnace Installation', avatar: 'J', color: 'from-orange-500 to-red-400',
    text: 'TruFlow installed a new Carrier furnace last fall. The team was professional, clean, and finished on schedule. Our heating bills dropped 28% compared to last year. Worth every penny!' },
  { name: 'Robert Alvarez', city: 'Arlington Heights', stars: 5, service: 'Emergency Heating', avatar: 'R', color: 'from-green-500 to-emerald-400',
    text: 'Furnace went out on New Year\'s Eve. I thought we\'d freeze all night, but TruFlow answered the phone immediately and sent a tech within 2 hours. Genuinely saved our holiday.' },
  { name: 'Lisa Kowalski', city: 'Elmhurst', stars: 5, service: 'Annual Maintenance', avatar: 'L', color: 'from-purple-500 to-violet-400',
    text: 'Been on the TruFlow maintenance plan for 3 years. No breakdowns, lower bills, and I have peace of mind every season. Their technicians are always on time and very thorough.' },
  { name: 'David Chen', city: 'Naperville', stars: 5, service: 'AC Installation', avatar: 'D', color: 'from-teal-500 to-cyan-400',
    text: 'Replaced our entire HVAC system with TruFlow. They helped us pick the right Trane system for our home size, got us rebates we didn\'t even know about, and the install was flawless.' },
  { name: 'Amanda Foster', city: 'Bolingbrook', stars: 5, service: 'Air Quality', avatar: 'A', color: 'from-pink-500 to-rose-400',
    text: 'My daughter has severe allergies. TruFlow installed a whole-home air purifier and the difference is night and day. She sleeps so much better now. Absolutely worth it.' },
];

export default function TestimonialSlider() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { Swiper } = await import('swiper');
      const { Autoplay, Pagination } = await import('swiper/modules');
      if (swiperRef.current && !swiperRef.current.swiper) {
        new Swiper(swiperRef.current, {
          modules: [Autoplay, Pagination],
          slidesPerView: 1,
          spaceBetween: 24,
          autoplay: { delay: 4000, disableOnInteraction: false },
          pagination: { el: '.testimonial-pagination', clickable: true },
          breakpoints: {
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
          loop: true,
        });
      }
    };
    init();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-brand-950 to-brand-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            ⭐ Customer Reviews
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real reviews from real Chicagoland homeowners. 4.9★ average across 500+ reviews.
          </p>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-2xl">★</span>)}
            <span className="text-white font-bold ml-2">4.9</span>
            <span className="text-slate-400 text-sm ml-1">(500+ reviews)</span>
          </div>
        </div>

        {/* Swiper */}
        <div ref={swiperRef} className="swiper overflow-visible">
          <div className="swiper-wrapper pb-12">
            {testimonials.map((t, i) => (
              <div key={i} className="swiper-slide h-auto">
                <div className="glass-dark h-full p-6 rounded-3xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 group">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.stars)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                  </div>
                  {/* Quote */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.city} · {t.service}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-pagination flex justify-center gap-2"></div>
        </div>
      </div>
    </section>
  );
}
