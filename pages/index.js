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
  { icon:'🔒', title:'Licensed & Insured',           desc:'Fully licensed, bonded & insured for your complete protection.' },
  { icon:'🏅', title:'Certified EPA & HVAC Techs',   desc:'Every technician holds EPA certification and is NATE-trained.' },
  { icon:'✅', title:'E-Verify & Background Checked', desc:'All our technicians are E-Verified and background checked.' },
  { icon:'💰', title:'Honest, Upfront Pricing',       desc:'We quote before we work. Zero hidden fees. Zero surprises.' },
  { icon:'⚡', title:'Same-Day Service',              desc:'Most repairs completed the same day you call.' },
  { icon:'🌙', title:'24/7 Emergency Line',           desc:'Real person answers every call, day or night, 365 days a year.' },
];

const serviceChecklist = [
  'Furnace Repair & Installation',
  'AC Repair & Installation',
  'Gas Water Heater Installation & Repair',
  'Maintenance & Tune-Ups',
  'Gas Water Heater\'s & Boiler Installation and Maintenance Repair',
];

const trustBadges = [
  { icon:'🔒', text:'Licensed & Insured' },
  { icon:'🏅', text:'Certified EPA & HVAC Technicians' },
  { icon:'✅', text:'E-Verify & Background Checked Technicians' },
  { icon:'💰', text:'Honest, Upfront Pricing' },
];

const galleryImages = [
  { url:'https://www.vizensolutions.com/assets/img/blog/hvac.jpg', label:'AC Repair' },
  { url:'https://urcts.in/wp-content/uploads/2025/09/hvac-design.webp',   label:'Furnace Service' },
  { url:'https://studyhub.org.uk/wp-content/uploads/2025/05/coworkers-servicing-hvac-system-min-1-scaled.jpg', label:'Installation' },
  { url:'https://trinityplumbingpdx.com/wp-content/uploads/2024/10/Repair-Old-Hot-Water-Heater.jpg', label:'Maintenance' },
  { url:'https://mgcs.net.in/wp-content/uploads/2024/08/the-future-of-smart-hvac-trends-and-innovations.jpg', label:'Boiler Service' },
  { url:'https://stradaservices.com/wp-content/uploads/2024/05/01-choosing-an-hvac-system-for-your-home.jpg.webp', label:'Water Heater' },
];

const fadeUp   = { hidden:{ opacity:0, y:40 }, show:{ opacity:1, y:0, transition:{ duration:0.6 } } };
const stagger  = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

export default function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <HeroCarousel />

      {/* ── EXPERT HVAC BANNER ── */}
      <section className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-8 px-4 text-center">
        <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-1">
            Expert HVAC Services in Chicago Illinois
          </h2>
          <p className="font-display text-xl md:text-2xl text-yellow-400 font-bold tracking-wide">
            Fast &bull; Reliable &bull; Affordable
          </p>
        </motion.div>
      </section>

      {/* ── AUTHORIZED DEALER + FLYER SECTION ── */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 px-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 40px)'}} />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-3">
              🏆 Official Partnerships
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-2">
              Authorized Goodman Dealer — 10-Year Warranty
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              As an <span className="text-orange-400 font-semibold">authorized Goodman dealer</span>, we offer factory-backed warranties, exclusive financing, and priority parts access for our customers across Chicago Illinois.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* LEFT — flyer image */}
            <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="/images/truflow-template.jpeg"
                  alt="TruFlow HVAC — Expert HVAC Services in Chicago Illinois"
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

            {/* RIGHT — content cards */}
            <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}} className="space-y-4">

              {/* Dealer + Warranty badges */}
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-900/60 border-2 border-red-600 rounded-2xl p-4 text-center">
                  <div className="text-white font-display font-extrabold text-lg leading-tight">Goodman®</div>
                  <div className="text-yellow-400 font-bold text-sm uppercase tracking-wider mt-1">Authorized Dealer</div>
                </div>
                <div className="bg-yellow-600/20 border-2 border-yellow-500 rounded-2xl p-4 text-center">
                  <div className="text-yellow-400 font-display font-extrabold text-3xl leading-none">10</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wider mt-1">Years Labor &amp; Parts Warranty</div>
                </div>
              </div> */}

              {/* Service checklist */}
              <div className="glass-dark rounded-2xl p-5 border border-white/10">
                <div className="text-orange-400 font-display font-bold text-sm uppercase tracking-widest mb-3">Our Services</div>
                <ul className="space-y-2.5">
                  {serviceChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white text-sm">
                      <span className="text-orange-400 text-base flex-shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <span className="text-yellow-400 font-bold text-sm">Licensed &amp; Insured</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="glass-dark rounded-2xl p-5 border border-white/10">
                <div className="text-orange-400 font-display font-bold text-sm uppercase tracking-widest mb-3">Why Choose TruFlow</div>
                <ul className="space-y-2">
                  {trustBadges.map((b) => (
                    <li key={b.text} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span>{b.icon}</span> {b.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 0% APR Financing */}
              <div className="bg-gradient-to-r from-yellow-600/30 to-yellow-500/10 border-2 border-yellow-500/60 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">✅</span>
                  <div>
                    <div className="font-display font-extrabold text-white text-xl">0% APR Financing Available</div>
                    <div className="text-yellow-400 text-sm font-semibold">Special financing through Goodman &amp; Liberty</div>
                  </div>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {[
                    '0% APR interest financing — no extra cost to you',
                    'Flexible monthly payment plans',
                    'No money down options available',
                    'Fast approval — same-day decisions',
                    'Available on new system installations',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                      <span className="text-yellow-400 text-xs">✓</span> {item}
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

              {/* Website + contact row */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 glass-dark border border-white/10 rounded-2xl px-4 py-3">
                  <span className="text-xl">🌐</span>
                  <div>
                    <div className="text-slate-400 text-xs">Website</div>
                    <div className="text-white font-semibold text-sm">www.truflowhvac.com</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* contact bar */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon:'📞', label:'Direct Line (24/7)', val: PHONE_DIRECT, href:`tel:${PHONE_DIRECT}`,         color:'bg-orange-500' },
              { icon:'🏢', label:'Office & WhatsApp',   val: PHONE_OFFICE, href:`https://wa.me/${WA}`,       color:'bg-green-500', ext:true },
              { icon:'✉️', label:'Email Us',            val: EMAIL,        href:`mailto:${EMAIL}`,            color:'bg-blue-600'  },
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

      {/* ── SERVICES ── */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="section-tag">🔧 What We Do</span>
              <h2 className="section-title text-4xl md:text-5xl">Our HVAC Services</h2>
              <p className="section-subtitle max-w-2xl mx-auto">Complete Heating, Cooling & Water Heater Solutions for Chicago Homes & Businesses — Reliable, Efficient, and Built to Last.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <motion.div key={s.slug} variants={fadeUp}>
                  <Link href={`/services/${s.slug}`} className="block group card-lift bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-card">
                    <div className={`h-2 bg-gradient-to-r ${s.color}`} />
                    <div className="p-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {s.icon}
                      </div>
                      <h3 className="font-display font-bold text-lg text-brand-950 mb-2 leading-tight">{s.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.shortDesc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {s.features.slice(0,3).map(f => (
                          <span key={f} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full">{f}</span>
                        ))}
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

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <span className="section-tag">💎 Why TruFlow</span>
              <h2 className="section-title text-4xl md:text-5xl mb-5">The TruFlow Difference</h2>
              <p className="section-subtitle mb-8">We're not just another HVAC company. Here's why Chicagoland homeowners trust us — and keep coming back.</p>
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

      {/* ── 0% APR FINANCING FULL SECTION ── */}
      <section className="py-20 bg-gradient-to-br from-yellow-900/40 via-brand-950 to-brand-950 px-4 overflow-hidden relative border-y border-yellow-600/20">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'repeating-linear-gradient(45deg,#f59e0b 0,#f59e0b 1px,transparent 1px,transparent 40px)'}} />
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <div className="inline-flex items-center justify-center gap-3 mb-5">
              <span className="text-4xl">✅</span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
                0% APR Financing Also Available
              </h2>
              <span className="text-4xl">✅</span>
            </div>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
              Don't let cost stop you from getting the HVAC system your home deserves. We offer <span className="text-yellow-400 font-bold">0% APR special financing</span> through our authorized partnerships with Goodman and Liberty — making comfort affordable for every budget.
            </p>
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {[
                { icon:'💳', title:'0% APR Interest',     desc:'No interest financing available on qualifying HVAC system purchases.' },
                { icon:'📅', title:'Flexible Payments',   desc:'Choose a monthly payment plan that works for your budget.' },
                { icon:'⚡', title:'Same-Day Approval',   desc:'Fast financing decisions — get approved and installed same day.' },
              ].map(f => (
                <div key={f.title} className="glass-dark border border-yellow-500/20 rounded-2xl p-5 text-center">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <div className="font-display font-bold text-white text-lg mb-1">{f.title}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${PHONE_DIRECT}`} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-display font-extrabold px-8 py-4 rounded-2xl text-base shadow-xl transition-all hover:-translate-y-0.5">
                📞 Call to Apply — {PHONE_DIRECT}
              </a>
              <Link href="/contact" className="flex items-center gap-2 border-2 border-white/30 text-white font-display font-bold px-8 py-4 rounded-2xl text-base hover:bg-white/10 transition-all">
                Learn More →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE GALLERY ── */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">📸 Our Work</span>
            <h2 className="section-title text-4xl">Service Gallery</h2>
            <p className="section-subtitle">Quality HVAC work across Chicago Illinois — delivered by our certified technicians.</p>
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

      {/* ── SERVICE AREAS ── */}
      <section className="py-24 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">📍 Where We Serve</span>
            <h2 className="section-title text-4xl md:text-5xl">Serving {SERVICE_AREAS.length}+ Communities</h2>
            <p className="section-subtitle">Expert HVAC service across Chicagoland — from Naperville to Elgin and everywhere in between.</p>
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

      {/* ── TESTIMONIALS ── */}
      <TestimonialSlider />

      {/* ── FINAL CTA ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-900" />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 60px)'}} />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <h2 className="font-display font-extrabold text-5xl text-white mb-2">HVAC Emergency?</h2>
            <h3 className="font-display font-extrabold text-3xl text-yellow-400 mb-5">We Answer 24/7.</h3>
            <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
              Expert HVAC services in Chicago Illinois — Fast, Reliable & Affordable.<br/>
              <span className="text-yellow-400 font-semibold">0% APR Financing Also Available.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${PHONE_DIRECT}`} className="flex items-center gap-2 bg-white text-red-700 font-display font-extrabold px-7 py-4 rounded-2xl text-base shadow-xl hover:bg-red-50 hover:-translate-y-0.5 transition-all">
                📞 Direct: {PHONE_DIRECT}
              </a>
              <a href={`tel:${PHONE_OFFICE}`} className="flex items-center gap-2 bg-white/20 border border-white/40 text-white font-display font-extrabold px-7 py-4 rounded-2xl text-base hover:bg-white/30 transition-all">
                🏢 Office: {PHONE_OFFICE}
              </a>
              <Link href="/contact" className="btn-ghost text-base px-7 py-4">Get a Free Quote</Link>
            </div>
            <div className="mt-5 text-red-200 text-sm">
              ✉️ <a href={`mailto:${EMAIL}`} className="underline hover:text-white transition-colors">{EMAIL}</a>
              &nbsp;·&nbsp; 🌐 www.truflowhvac.com
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}