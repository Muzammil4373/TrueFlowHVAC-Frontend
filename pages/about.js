import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';

const team = [
  { name:'Marcus Johnson', role:'Founder & Lead Tech', cert:'NATE Certified · 18 yrs', emoji:'👨‍🔧', color:'from-blue-500 to-cyan-400' },
  { name:'Sarah Chen',     role:'Commercial Specialist',cert:'EPA 608 · 12 yrs',       emoji:'👩‍🔧', color:'from-orange-500 to-red-400'  },
  { name:'Roberto Diaz',  role:'Installation Expert',  cert:'NATE Certified · 10 yrs', emoji:'👨‍🔧', color:'from-green-500 to-emerald-400'},
  { name:'Amy Park',       role:'Customer Experience',  cert:'HVAC Coordinator · 8 yrs',emoji:'👩‍💼', color:'from-purple-500 to-violet-400'},
];
const stats = [
  {val:'2009', lbl:'Founded'},
  {val:'10K+', lbl:'Homes Served'},
  {val:'25+',  lbl:'Cities Covered'},
  {val:'100%', lbl:'Satisfaction Goal'},
];

export default function AboutPage() {
  return (
    <Layout title="About Us" description="Learn about TruFlow Heating & Cooling — Chicagoland's trusted family-owned HVAC company since 2009.">
      <section className="relative bg-brand-950 py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 25% 50%, #f97316 0%, transparent 50%)'}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">Our Story</span>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4">Chicagoland's Trusted<br/>HVAC Family</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">Since 2009, we've kept Chicagoland homes comfortable — one call at a time.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <h2 className="font-display font-extrabold text-4xl text-brand-950 mb-5">More Than an HVAC Company</h2>
            <p className="text-slate-600 leading-relaxed mb-4">TruFlow was founded on one principle: treat every customer like a neighbor. We don't upsell unnecessary repairs, we don't charge hidden fees, and we don't leave a job until it's done right.</p>
            <p className="text-slate-600 leading-relaxed mb-8">Every technician is NATE-certified, background-checked, and trained to the highest industry standards. When we step into your home, we treat it like our own.</p>
            <div className="grid grid-cols-4 gap-4">
              {stats.map(s => (
                <div key={s.val} className="text-center bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-4">
                  <div className="font-display font-extrabold text-2xl text-orange-500">{s.val}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="glass-white rounded-3xl p-8 shadow-glass-lg">
            <h3 className="font-display font-extrabold text-xl text-brand-950 mb-6">Our Core Values</h3>
            {[
              {icon:'🤝',title:'Honesty First',desc:"We give honest assessments, not sales pitches. If you don't need a repair, we'll tell you."},
              {icon:'⚡',title:'Rapid Response',desc:'HVAC emergencies don\'t wait. Neither do we. 1-2 hour response on emergency calls.'},
              {icon:'🏅',title:'Certified Excellence',desc:'Every tech is NATE-certified with ongoing training for the latest systems and refrigerants.'},
              {icon:'💛',title:'Community Commitment',desc:"We're proud members of the communities we serve. We invest here because we live here."},
            ].map(v => (
              <div key={v.title} className="flex gap-3 mb-5 last:mb-0 p-3 hover:bg-orange-50 rounded-xl transition-colors">
                <span className="text-2xl">{v.icon}</span>
                <div>
                  <div className="font-semibold text-sm text-brand-950">{v.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="font-display font-extrabold text-4xl text-brand-950">Meet the Team</h2>
          <p className="text-slate-500 mt-3">Certified professionals committed to your comfort</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {team.map((t, i) => (
            <motion.div key={t.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
              className="bg-white border border-slate-100 rounded-3xl p-6 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg`}>{t.emoji}</div>
              <div className="font-display font-bold text-base text-brand-950">{t.name}</div>
              <div className="text-orange-500 text-sm font-medium mt-0.5">{t.role}</div>
              <div className="text-slate-400 text-xs mt-1">{t.cert}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-brand-950 py-16 px-4 text-center">
        <h2 className="font-display font-extrabold text-4xl text-white mb-4">Ready for the TruFlow Difference?</h2>
        <p className="text-slate-400 mb-6">Join 10,000+ Chicagoland homeowners who trust us.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="btn-primary">📞 Call Now</a>
          <Link href="/contact" className="btn-ghost">Get Free Quote</Link>
        </div>
      </section>
    </Layout>
  );
}
