import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import HeroCarousel from '../components/sections/HeroCarousel';
import TestimonialSlider from '../components/sections/TestimonialSlider';
import ContactForm from '../components/ui/ContactForm';
import { SERVICES } from '../lib/services';
import { SERVICE_AREAS } from '../lib/locations';

const PHONE_DIRECT = process.env.NEXT_PUBLIC_PHONE        || '(630) 999-0127';
const PHONE_OFFICE = process.env.NEXT_PUBLIC_PHONE_OFFICE || '(888) 581-5178';
const WA           = process.env.NEXT_PUBLIC_WHATSAPP     || '18885815178';
const EMAIL        = process.env.NEXT_PUBLIC_EMAIL        || 'truflowhvac@gmail.com';

const whyUs = [
  { icon:'⚡', title:'Same-Day Service',       desc:'Most repairs completed the same day you call — no waiting around.' },
  { icon:'🌙', title:'24/7 Emergency Line',    desc:'Real person answers every call, day or night, 365 days a year.' },
  { icon:'🏅', title:'NATE-Certified Techs',   desc:'Every technician is certified, background-checked & fully insured.' },
  { icon:'💰', title:'Upfront Pricing',        desc:'We quote before we work. Zero hidden fees. Zero surprises.' },
  { icon:'✅', title:'Satisfaction Guarantee', desc:"Not happy? We'll come back and make it right at no charge." },
  { icon:'🔧', title:'All Brands Serviced',    desc:'Carrier, Trane, Lennox, Rheem, Goodman, Liberty — we service them all.' },
];

const galleryImages = [
  { url:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80', label:'AC Repair' },
  { url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', label:'Furnace Service' },
  { url:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', label:'Installation' },
  { url:'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80', label:'Maintenance' },
  { url:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', label:'Air Quality' },
  { url:'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80', label:'Duct Cleaning' },
];

const fadeUp  = { hidden:{ opacity:0, y:40 }, show:{ opacity:1, y:0, transition:{ duration:0.6 } } };
const container = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

export default function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <HeroCarousel />

      {/* ── AUTHORIZED DEALER BANNER ── */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 px-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 40px)'}} />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-3">
              🏆 Official Partnerships
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-2">
              Authorized Dealer &amp; Special Financing
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              We are proud authorized dealers of <span className="text-orange-400 font-semibold">Goodman</span> and <span className="text-orange-400 font-semibold">Liberty</span> — two of the most trusted names in HVAC. Our dealer status unlocks exclusive manufacturer financing options, extended warranties, and priority parts access for our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* LEFT: product image */}
            <motion.div
              initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-glass-lg border border-white/10 bg-white p-6">
                <img
                  src="/images/goodman-system.jpeg"
                  alt="Goodman HVAC System — Furnace, AC Unit & Coil"
                  className="w-full h-80 object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80';
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-dark px-4 py-2 rounded-xl text-center">
                    <div className="text-orange-400 font-display font-bold text-sm uppercase tracking-wide">Goodman Complete System</div>
                    <div className="text-white/70 text-xs mt-0.5">Furnace · AC Unit · Evaporator Coil</div>
                  </div>
                </div>
              </div>
              {/* floating badge */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-full flex flex-col items-center justify-center shadow-glow-orange text-center">
                <div className="text-white text-[9px] font-bold uppercase leading-tight">Special</div>
                <div className="text-white text-[9px] font-bold uppercase leading-tight">Financing</div>
                <div className="text-white text-base">💳</div>
              </div>
            </motion.div>

            {/* RIGHT: dealer info cards */}
            <motion.div
              initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7 }}
              className="space-y-4"
            >
              {/* Goodman card */}
              <div className="glass-dark rounded-2xl p-5 border border-white/10 hover:border-orange-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white font-display font-extrabold text-lg flex-shrink-0 shadow-lg">G</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-extrabold text-white text-lg">Goodman</span>
                      <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Authorized Dealer</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      As an authorized Goodman dealer, we offer factory-backed warranties, special pricing, and <span className="text-orange-400 font-semibold">exclusive financing through Goodman</span> — including 0% interest options. Goodman systems are built for durability, efficiency, and lasting comfort.
                    </p>
                  </div>
                </div>
              </div>

              {/* Liberty card */}
              <div className="glass-dark rounded-2xl p-5 border border-white/10 hover:border-orange-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-display font-extrabold text-lg flex-shrink-0 shadow-lg">L</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-extrabold text-white text-lg">Liberty</span>
                      <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Authorized Dealer</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Our Liberty dealership status means you get access to <span className="text-orange-400 font-semibold">Liberty's special financing programs</span> with competitive rates. Liberty HVAC systems deliver reliable performance with industry-leading energy efficiency ratings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Financing highlight */}
              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💳</span>
                  <div className="font-display font-extrabold text-white text-lg">Special Financing Available</div>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {[
                    '0% interest financing through Goodman & Liberty',
                    'Flexible monthly payment plans',
                    'No money down options available',
                    'Fast approval — same-day decisions',
                    'New system financing & replacement plans',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                      <span className="text-orange-400 text-xs">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 flex-wrap">
                  <a href={`tel:${PHONE_DIRECT}`} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                    📞 Ask About Financing
                  </a>
                  <Link href="/contact" className="flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    Get a Free Quote →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* contact bar */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon:'📞', label:'Direct Line (24/7)', val: PHONE_DIRECT, href:`tel:${PHONE_DIRECT}`, color:'bg-orange-500' },
              { icon:'🏢', label:'Office & WhatsApp', val: PHONE_OFFICE, href:`https://wa.me/${WA}`, color:'bg-green-500', ext:true },
              { icon:'✉️', label:'Email Us', val: EMAIL, href:`mailto:${EMAIL}`, color:'bg-blue-600' },
            ].map(c => (
              <a key={c.label} href={c.href} target={c.ext?'_blank':undefined} rel={c.ext?'noreferrer':undefined}
                className="flex items-center gap-4 glass-dark border border-white/10 hover:border-orange-500/40 rounded-2xl p-4 transition-all group">
                <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center text-lg flex-shrink-0`}>{c.icon}</div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">{c.label}</div>
                  <div className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">{c.val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={container}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="section-tag">🔧 What We Do</span>
              <h2 className="section-title text-4xl md:text-5xl">Complete HVAC Solutions</h2>
              <p className="section-subtitle max-w-2xl mx-auto">Every heating and cooling service your home or business needs — under one trusted name.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <motion.div key={s.slug} variants={fadeUp}>
                  <Link href={`/services/${s.slug}`} className="block group card-lift bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-card">
                    <div className={`h-2 bg-gradient-to-r ${s.color}`} />
                    <div className="p-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
                      <h3 className="font-display font-bold text-xl text-brand-950 mb-2">{s.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.shortDesc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {s.features.slice(0,3).map(f => <span key={f} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full">{f}</span>)}
                      </div>
                      <div className="text-orange-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <span className="section-tag">💎 Why TruFlow</span>
              <h2 className="section-title text-4xl md:text-5xl mb-5">The TruFlow Difference</h2>
              <p className="section-subtitle mb-8">We're not just another HVAC company. Here's why 10,000+ Chicagoland homeowners choose us — and keep coming back.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyUs.map((w, i) => (
                  <motion.div key={w.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
                    className="flex gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-card hover:border-orange-200 hover:shadow-card-hover transition-all">
                    <span className="text-2xl flex-shrink-0">{w.icon}</span>
                    <div>
                      <div className="font-display font-semibold text-sm text-brand-950 mb-0.5">{w.title}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{w.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <div className="glass-white p-8 rounded-3xl shadow-glass-lg">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl px-5 py-3 mb-6 -mx-2">
                  <div className="font-display font-bold text-lg">Get a Free Quote</div>
                  <div className="text-orange-100 text-xs mt-0.5">We'll get back to you within 2 hours</div>
                </div>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICE GALLERY */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">📸 Our Work</span>
            <h2 className="section-title text-4xl">Service Gallery</h2>
            <p className="section-subtitle">A look at the quality work our certified technicians deliver every day.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.07}}
                className="group relative rounded-2xl overflow-hidden aspect-video shadow-card hover:shadow-card-hover transition-all duration-300">
                <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS PREVIEW */}
      <section className="py-24 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">📍 Where We Serve</span>
            <h2 className="section-title text-4xl md:text-5xl">Serving {SERVICE_AREAS.length}+ Communities</h2>
            <p className="section-subtitle">Expert HVAC service across Chicagoland — from Naperville to Elgin.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            {SERVICE_AREAS.slice(0,15).map((city, i) => (
              <motion.div key={city.slug} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.04}}>
                <Link href={`/service-areas/${city.slug}`}
                  className="group relative block bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-card hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xl mb-1.5">📍</div>
                  <div className="font-display font-semibold text-sm text-brand-950">{city.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{city.county} Co.</div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/service-areas" className="btn-primary">View All {SERVICE_AREAS.length} Service Areas →</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialSlider />

      {/* FINAL CTA */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700" />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 60px)'}} />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <h2 className="font-display font-extrabold text-5xl text-white mb-4">HVAC Emergency?<br/>We Answer 24/7.</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">Our certified technicians are standing by. Don't suffer in the heat or cold — we respond within 1-2 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${PHONE_DIRECT}`} className="flex items-center gap-2 bg-white text-orange-600 font-display font-extrabold px-7 py-4 rounded-2xl text-base shadow-xl hover:bg-orange-50 hover:-translate-y-0.5 transition-all">
                📞 Direct: {PHONE_DIRECT}
              </a>
              <a href={`tel:${PHONE_OFFICE}`} className="flex items-center gap-2 bg-white/20 border border-white/40 text-white font-display font-extrabold px-7 py-4 rounded-2xl text-base hover:bg-white/30 transition-all">
                🏢 Office: {PHONE_OFFICE}
              </a>
              <Link href="/contact" className="btn-ghost text-base px-7 py-4">Get a Free Quote</Link>
            </div>
            <div className="mt-5 text-orange-200 text-sm">
              ✉️ <a href={`mailto:${EMAIL}`} className="underline hover:text-white transition-colors">{EMAIL}</a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
