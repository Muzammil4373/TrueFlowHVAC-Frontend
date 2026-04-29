import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import ContactForm from '../../components/ui/ContactForm';
import { SERVICES, getServiceBySlug } from '../../lib/services';

export async function getStaticPaths() {
  return { paths: SERVICES.map(s => ({ params: { slug: s.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return { notFound: true };
  return { props: { service } };
}

// Water heater service gets special image gallery
const WATER_HEATER_IMAGES = [
  { src: '/images/water-heater-tech.jpeg',  alt: 'Technician servicing gas water heater' },
  { src: '/images/water-heater-unit.jpeg',  alt: 'Gas water heater unit — Rheem Performance Platinum' },
  { src: '/images/goodman-system.jpeg',      alt: 'HVAC system components' },
];

export default function ServicePage({ service }) {
  const PHONE_DIRECT = process.env.NEXT_PUBLIC_PHONE || '(630) 999-0127';
  const isWaterHeater = service.slug === 'gas-water-heater';

  return (
    <Layout
      title={service.name + ' — Chicago Illinois'}
      description={service.metaDesc}
      canonical={`/services/${service.slug}`}
    >
    
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {isWaterHeater ? (
            <img
              src="/images/water-heater-tech.jpeg"
              alt="Gas water heater installation Chicago Illinois"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={service.heroImage}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              className="inline-flex items-center gap-2 bg-orange-500/90 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
              {service.icon} {service.name}
            </motion.div>
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              className="font-display font-extrabold text-5xl md:text-6xl text-white leading-tight mb-4"
              style={{ textShadow:'0 2px 20px rgba(0,0,0,0.8)' }}>
              {service.name}<br />
              <span className="text-orange-400">Chicago Illinois</span>
            </motion.h1>
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              className="text-white text-lg leading-relaxed mb-8 font-medium"
              style={{ textShadow:'0 1px 8px rgba(0,0,0,0.9)' }}>
              {service.description}
            </motion.p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${PHONE_DIRECT}`} className="btn-primary">📞 {PHONE_DIRECT}</a>
              <Link href="/contact" className="btn-ghost">Get Free Quote</Link>
            </div>
          </div>

          <div className="glass-white p-7 rounded-3xl shadow-glass-lg">
            <h2 className="font-display font-bold text-lg text-brand-950 mb-4">
              Request {service.name.split(' ')[0]} Service
            </h2>
            <ContactForm defaultService={service.name} compact />
          </div>
        </div>
      </section>

      
      {isWaterHeater && (
        <section className="py-14 bg-slate-50 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl text-brand-950 mb-6 text-center">
              Gas Water Heater Services — Chicago Illinois
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {WATER_HEATER_IMAGES.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-white">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-56 object-cover"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80'; }}
                  />
                  <div className="p-3 text-center">
                    <p className="text-sm text-slate-600 font-medium">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Full description */}
            <div className="mt-8 bg-white border border-slate-100 rounded-3xl p-8 shadow-card">
              <h3 className="font-display font-extrabold text-xl text-brand-950 mb-3">
                Expert Gas Water Heater Services in Chicago Illinois
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                We specialize in the installation and repair of gas water heaters for both residential homes and commercial properties across Chicago Illinois. Whether you need a brand-new system or fast, reliable repairs, our experienced team ensures efficient, safe, and long-lasting solutions to keep your hot water flowing. Our licensed and insured technicians work with all major brands including Rheem, Bradford White, A.O. Smith, and more — and every job is backed by our satisfaction guarantee.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Features + Benefits */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-brand-950 mb-6">What's Included</h2>
            <div className="space-y-3">
              {service.features.map(f => (
                <div key={f} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors">
                  <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display font-extrabold text-3xl text-brand-950 mb-6">Why Choose TruFlow</h2>
            <div className="space-y-4 mb-6">
              {service.benefits.map(b => (
                <div key={b.title} className="flex gap-4 p-5 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl">
                  <span className="text-2xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <div className="font-display font-semibold text-brand-950 mb-1">{b.title}</div>
                    <div className="text-slate-500 text-sm">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-brand-950 rounded-2xl p-6 text-center">
              <div className="text-white font-display font-bold text-lg mb-1">24/7 Emergency Service</div>
              <div className="text-slate-400 text-sm mb-4">Response within 1-2 hours, Chicago Illinois.</div>
              <a href={`tel:${PHONE_DIRECT}`} className="btn-emergency w-full justify-center">
                🚨 Emergency: {PHONE_DIRECT}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-14 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-xl text-brand-950 mb-5">Other Services in Chicago Illinois</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.filter(s => s.slug !== service.slug).map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-card transition-all">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-semibold text-sm text-brand-950 leading-tight">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}