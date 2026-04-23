import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import ContactForm from '../../components/ui/ContactForm';
import { SERVICES, getServiceBySlug } from '../../lib/services';

export async function getStaticPaths() {
  return { paths: SERVICES.map(s => ({ params:{ slug: s.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return { notFound: true };
  return { props: { service } };
}

export default function ServicePage({ service }) {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || '+1 (847) 555-0100';
  return (
    <Layout title={service.heroTitle || service.name} description={service.metaDesc} canonical={`/services/${service.slug}`}>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-950/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-white mb-4 border border-white/20">
              {service.icon} {service.name} Services
            </motion.div>
            <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="font-display font-extrabold text-5xl md:text-6xl text-white leading-tight mb-5">
              {service.name}<br/><span className="text-orange-400">Services</span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-slate-300 text-lg leading-relaxed mb-8">
              {service.description}
            </motion.p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`} className="btn-primary">📞 Call Now</a>
              <Link href="/contact" className="btn-ghost">Get Free Quote</Link>
            </div>
          </div>
          <div className="glass-white p-7 rounded-3xl shadow-glass-lg">
            <h2 className="font-display font-bold text-lg text-brand-950 mb-4">Request {service.name} Service</h2>
            <ContactForm defaultService={service.name} compact />
          </div>
        </div>
      </section>

      {/* Features + Benefits */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-brand-950 mb-6">What's Included</h2>
            <div className="space-y-3">
              {service.features.map(f => (
                <div key={f} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors">
                  <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                  <span className="text-slate-700 text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display font-extrabold text-3xl text-brand-950 mb-6">Why Choose TruFlow</h2>
            <div className="space-y-4">
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
            <div className="mt-6 bg-brand-950 rounded-2xl p-6 text-center">
              <div className="text-white font-display font-bold text-lg mb-1">24/7 Emergency Service</div>
              <div className="text-slate-400 text-sm mb-4">Response within 1-2 hours, guaranteed.</div>
              <a href={`tel:${PHONE}`} className="btn-emergency w-full justify-center">🚨 Emergency: {PHONE}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-14 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-xl text-brand-950 mb-5">Other Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.filter(s => s.slug !== service.slug).map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-card transition-all"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="font-semibold text-sm text-brand-950">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
