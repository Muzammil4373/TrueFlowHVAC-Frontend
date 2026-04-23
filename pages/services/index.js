import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { SERVICES } from '../../lib/services';

const PHONE = process.env.NEXT_PUBLIC_PHONE || '+1 (847) 555-0100';

export default function ServicesPage() {
  return (
    <Layout title="Our HVAC Services" description="Professional AC, heating, installation, maintenance & air quality services. 24/7 emergency service across Chicagoland.">
      <section className="relative bg-brand-950 py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)'}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">🔧 What We Do</span>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-5">Complete HVAC Solutions</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">From emergency repairs to full system installations — residential and commercial — backed by our satisfaction guarantee.</p>
        </div>
      </section>

      <section className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <motion.div key={s.slug} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
              <div className="group h-full border border-slate-100 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.heroImage} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-70`} />
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">{s.icon}</div>
                </div>
                <div className="p-6">
                  <h2 className="font-display font-extrabold text-xl text-brand-950 mb-2">{s.name}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {s.features.slice(0,4).map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-orange-500 text-xs">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${s.slug}`} className="btn-primary w-full justify-center text-sm py-3">Learn More →</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-red-600 py-14 px-4 text-center">
        <h2 className="font-display font-extrabold text-4xl text-white mb-3">HVAC Emergency?</h2>
        <p className="text-red-100 mb-6 text-lg">We respond in 1-2 hours, 24/7, 365 days.</p>
        <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 bg-white text-red-600 font-display font-extrabold px-8 py-4 rounded-2xl text-lg shadow-xl hover:bg-red-50 transition-all">🚨 {PHONE}</a>
      </section>
    </Layout>
  );
}
