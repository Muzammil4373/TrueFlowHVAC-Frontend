import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';

const POSTS = [
  { slug:'5-signs-ac-needs-repair', title:'5 Warning Signs Your AC Needs Repair Before Summer', excerpt:'Don\'t wait until your AC breaks down on the hottest day. Here are 5 warning signs your system needs attention now.', category:'AC', date:'June 2024', readTime:5, icon:'❄️', color:'from-blue-500 to-cyan-400' },
  { slug:'furnace-maintenance-fall', title:'Fall Furnace Maintenance Checklist for Chicagoland Homeowners', excerpt:'Before the first freeze hits, run through this essential checklist to ensure your home stays warm all winter long.', category:'Heating', date:'September 2024', readTime:7, icon:'🔥', color:'from-orange-500 to-red-400' },
  { slug:'hvac-filter-replacement', title:'How Often Should You Replace Your HVAC Filter?', excerpt:'Most homeowners don\'t replace filters often enough — and it\'s costing them money and air quality. Here\'s the real answer.', category:'Maintenance', date:'August 2024', readTime:4, icon:'🛡️', color:'from-green-500 to-emerald-400' },
  { slug:'heat-pump-vs-furnace', title:'Heat Pump vs Furnace: Which Is Better for Chicago Winters?', excerpt:'The heat pump revolution is real — but can they handle Chicago winters? We break down pros, cons, and costs.', category:'Heating', date:'October 2024', readTime:8, icon:'🌡️', color:'from-violet-500 to-purple-400' },
  { slug:'indoor-air-quality-guide', title:'The Complete Guide to Improving Indoor Air Quality', excerpt:'Indoor air can be 5x more polluted than outdoor air. Here\'s everything you need to know about improving it.', category:'Air Quality', date:'July 2024', readTime:6, icon:'💨', color:'from-teal-500 to-cyan-400' },
  { slug:'new-hvac-cost-2024', title:'How Much Does a New HVAC System Cost in 2024?', excerpt:'Transparent pricing guide for HVAC installation in Chicagoland — with real numbers and factors that affect cost.', category:'Installation', date:'May 2024', readTime:6, icon:'🔧', color:'from-amber-500 to-orange-400' },
];

const CAT_COLORS = {
  AC:'bg-blue-50 text-blue-700 border-blue-200',
  Heating:'bg-red-50 text-red-700 border-red-200',
  Maintenance:'bg-green-50 text-green-700 border-green-200',
  'Air Quality':'bg-teal-50 text-teal-700 border-teal-200',
  Installation:'bg-orange-50 text-orange-700 border-orange-200',
};

export default function BlogPage() {
  const featured = POSTS[0];
  const rest     = POSTS.slice(1);

  return (
    <Layout title="HVAC Tips & Blog" description="Expert HVAC tips, maintenance guides, and local insights from TruFlow's certified technicians.">
      {/* Hero */}
      <section className="relative bg-brand-950 py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 60% 40%, #f97316 0%, transparent 50%)'}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">📝 Knowledge Base</span>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4">HVAC Tips & Blog</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">Expert advice from our certified technicians to help you save money, stay comfortable, and know when to call the pros.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Featured */}
          <div className="mb-12">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">⭐ Featured Article</div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
              <Link href={`/blog/${featured.slug}`} className="group block border border-slate-100 rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-300 grid md:grid-cols-2">
                <div className={`bg-gradient-to-br ${featured.color} p-12 flex items-center justify-center`}>
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">{featured.icon}</div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-3 w-fit ${CAT_COLORS[featured.category]}`}>{featured.category}</span>
                  <h2 className="font-display font-extrabold text-2xl text-brand-950 mb-3 group-hover:text-orange-500 transition-colors">{featured.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl group-hover:bg-orange-600 transition-colors">Read Article →</span>
                    <span className="text-xs text-slate-400">{featured.readTime} min · {featured.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div key={post.slug} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                <Link href={`/blog/${post.slug}`} className="group block border border-slate-100 rounded-3xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`bg-gradient-to-br ${post.color} h-32 flex items-center justify-center`}>
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{post.icon}</span>
                  </div>
                  <div className="p-5">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${CAT_COLORS[post.category]}`}>{post.category}</span>
                    <h2 className="font-display font-bold text-base text-brand-950 mb-2 group-hover:text-orange-500 transition-colors leading-tight">{post.title}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-500 text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">Read more <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                      <span className="text-xs text-slate-400">{post.readTime} min</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
