import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import ContactForm from '../../components/ui/ContactForm';
import { SERVICE_AREAS, getCityBySlug, getCityReviews } from '../../lib/locations';
import { SERVICES } from '../../lib/services';

const ServiceAreaMap = dynamic(() => import('../../components/sections/ServiceAreaMap'), { ssr: false });

export async function getStaticPaths() {
  return { paths: SERVICE_AREAS.map(c => ({ params:{ city: c.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  const city = getCityBySlug(params.city);
  if (!city) return { notFound: true };
  return { props: { city, reviews: getCityReviews(params.city) } };
}

export default function CityPage({ city, reviews }) {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || '+1 (847) 555-0100';

  return (
    <Layout
      title={`HVAC Services in ${city.name}, IL`}
      description={`Expert HVAC services in ${city.name}, IL — AC repair, heating, installation & maintenance. 24/7 emergency. TruFlow Heating & Cooling.`}
      canonical={`/service-areas/${city.slug}`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org','@type':'LocalBusiness',
        name:`TruFlow Heating & Cooling – ${city.name}`,
        telephone: PHONE,
        address:{ '@type':'PostalAddress', addressLocality: city.name, addressRegion:'IL', postalCode: city.zip, addressCountry:'US' },
        areaServed: city.name,
      })}} />

      {/* Hero */}
      <section className="relative bg-brand-950 py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 70% 40%, #f97316 0%, transparent 50%)'}} />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link href="/service-areas" className="text-slate-400 text-sm hover:text-orange-400 transition-colors">← All Service Areas</Link>
              <span className="text-slate-600">·</span>
              <span className="text-orange-400 text-sm">{city.name}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              📍 {city.county} County, IL
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white leading-tight mb-5">
              HVAC Services<br/><span className="text-orange-400">in {city.name}</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{city.desc} Certified technicians serving {city.zip} and surrounding areas with 24/7 emergency availability.</p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`} className="btn-emergency text-base px-6 py-3">🚨 Emergency Service</a>
              <a href={`tel:${PHONE}`} className="btn-primary">📞 {PHONE}</a>
            </div>
          </div>
          <div className="glass-white p-7 rounded-3xl shadow-glass-lg">
            <h2 className="font-display font-bold text-lg text-brand-950 mb-1">Request Service in {city.name}</h2>
            <p className="text-slate-400 text-xs mb-4">{city.name}, IL {city.zip}</p>
            <ContactForm compact />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl text-brand-950 mb-2">Services in {city.name}</h2>
          <p className="text-slate-500 mb-8">Complete HVAC solutions for {city.name} homes and businesses</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(s => (
              <div key={s.slug} className="border border-slate-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-card transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="font-display font-semibold text-base text-brand-950">{s.name} in {city.name}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{s.shortDesc}</p>
                <Link href={`/services/${s.slug}`} className="text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-14 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl text-brand-950 mb-5">We Come to You in {city.name}</h2>
          <ServiceAreaMap selectedCity={city.slug} />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl text-brand-950 mb-6">What {city.name} Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-3 text-yellow-400">{'★'.repeat(r.stars)}</div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">{r.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm text-brand-950">{r.name}</div>
                    <div className="text-xs text-slate-400">{city.name} · {r.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby cities */}
      <section className="py-12 bg-brand-950 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-xl text-white mb-5">Also Serving Nearby Cities</h2>
          <div className="flex flex-wrap gap-2">
            {SERVICE_AREAS.filter(c => c.slug !== city.slug).slice(0,10).map(c => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`}
                className="bg-brand-900 border border-slate-700 text-slate-300 hover:border-orange-400 hover:text-orange-400 px-4 py-2 rounded-xl text-sm transition-colors"
              >
                {c.name}
              </Link>
            ))}
            <Link href="/service-areas" className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">All Cities →</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
