import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { SERVICE_AREAS } from '../../lib/locations';

const ServiceAreaMap = dynamic(() => import('../../components/sections/ServiceAreaMap'), { ssr: false, loading: () => (
  <div className="w-full h-[480px] bg-slate-100 rounded-3xl flex items-center justify-center">
    <div className="text-center text-slate-400"><div className="text-4xl mb-2">🗺️</div><div className="text-sm">Loading map…</div></div>
  </div>
)});

export default function ServiceAreasPage() {
  const [search, setSearch] = useState('');
  const filtered = SERVICE_AREAS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout title="Service Areas" description={`TruFlow HVAC serves ${SERVICE_AREAS.length}+ Chicagoland communities including Naperville, Schaumburg, Arlington Heights and more.`}>
      {/* Hero */}
      <section className="relative bg-brand-950 py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 30% 60%, #f97316 0%, transparent 45%)'}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">📍 Where We Work</span>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4">Serving {SERVICE_AREAS.length}+ Cities</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">Chicagoland's trusted HVAC service provider — click any city for local services, reviews, and contact options.</p>
          <div className="relative max-w-md mx-auto">
            <input type="text" placeholder="Search your city…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-slate-400 rounded-2xl px-5 py-4 font-body focus:outline-none focus:border-orange-400 pr-12 text-sm"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="font-display font-extrabold text-2xl text-brand-950 mb-2">Interactive Service Map</h2>
            <p className="text-slate-500 text-sm">Click any marker to see city details and services</p>
          </div>
          <ServiceAreaMap />
        </div>
      </section>

      {/* City cards */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-extrabold text-2xl text-brand-950">
              {search ? `${filtered.length} Cities Found` : `All ${SERVICE_AREAS.length} Service Areas`}
            </h2>
            <span className="text-sm text-slate-400">Hover for details · Click to view services</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filtered.map((city, i) => (
              <motion.div key={city.slug} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:(i%10)*0.05}}>
                <Link href={`/service-areas/${city.slug}`}
                  className="group relative block bg-white border border-slate-100 rounded-2xl p-5 text-center hover:border-orange-300 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">📍</div>
                    <div className="font-display font-bold text-sm text-brand-950">{city.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{city.county} Co. · {city.zip}</div>
                    <div className="mt-2 text-xs text-orange-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">View Services →</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-display font-bold text-lg text-brand-950 mb-2">City Not Found</h3>
              <p className="text-slate-500 text-sm mb-4">We may still serve your area — contact us to confirm.</p>
              <Link href="/contact" className="btn-primary">Contact Us</Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
