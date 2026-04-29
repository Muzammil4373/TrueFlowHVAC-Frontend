import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { SERVICES } from '../../lib/services';

const PHONE_DIRECT = process.env.NEXT_PUBLIC_PHONE || '(630) 999-0127';

export default function ServicesPage() {
  return (
    <Layout
      title="HVAC Services — Chicago Illinois"
      description="Professional furnace repair, AC installation, gas water heater, maintenance & boiler services in Chicago Illinois. Licensed & insured. 24/7 emergency."
    >
      {/* Hero */}
      <section className="relative bg-brand-950 py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)'
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-5">
            🔧 What We Do
          </span>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-5 leading-tight">
            HVAC Services<br />
            <span className="text-orange-400">Chicago Illinois</span>
          </h1>
          <p className="text-slate-200 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            From emergency repairs to full system installations — residential and commercial — backed by our satisfaction guarantee and 10-Year Warranty.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-100 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/services/${s.slug}`} className="block group service-card h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.heroImage}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-3xl">{s.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="service-card-title">{s.name}</h2>
                  <p className="service-card-desc">{s.shortDesc}</p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {s.features.slice(0, 4).map(f => (
                      <li key={f} className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                        <span className="text-orange-400 font-bold text-xs flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="service-card-link">
                    Learn More <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-red-700 py-16 px-4 text-center">
        <h2 className="font-display font-extrabold text-4xl text-white mb-3">
          HVAC Emergency in Chicago Illinois?
        </h2>
        <p className="text-red-100 mb-6 text-xl font-medium">
          We respond in 1-2 hours, 24/7, 365 days a year.
        </p>
        <a href={`tel:${PHONE_DIRECT}`}
          className="inline-flex items-center gap-2 bg-white text-red-700 font-display font-extrabold px-8 py-4 rounded-2xl text-xl shadow-xl hover:bg-red-50 transition-all">
          🚨 {PHONE_DIRECT}
        </a>
      </section>
    </Layout>
  );
}