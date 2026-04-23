import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';

export default function NotFound() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || '+1 (847) 555-0100';
  return (
    <Layout title="Page Not Found">
      <section className="relative bg-brand-950 min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 50% 50%, #f97316 0%, transparent 60%)'}} />
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="relative text-center max-w-lg mx-auto">
          <div className="font-display font-black text-[160px] text-orange-500/20 leading-none select-none">404</div>
          <h1 className="font-display font-extrabold text-4xl text-white -mt-8 mb-4">Page Not Found</h1>
          <p className="text-slate-400 text-lg mb-8">The page you're looking for doesn't exist. But your HVAC problem probably does — let us help.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">← Back to Home</Link>
            <a href={`tel:${PHONE}`} className="btn-emergency">🚨 Emergency Line</a>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
