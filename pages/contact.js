// pages/contact.js
import Layout from '../components/layout/Layout';
import ContactForm from '../components/ui/ContactForm';
const PHONE = process.env.NEXT_PUBLIC_PHONE || '+1 (847) 555-0100';
const WA    = process.env.NEXT_PUBLIC_WHATSAPP || '18475550100';
export default function ContactPage() {
  return (
    <Layout title="Contact Us" description="Contact TruFlow HVAC for fast service. 24/7 emergency line, WhatsApp, or submit a request online.">
      <section className="relative bg-brand-950 py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 50% 60%, #f97316 0%, transparent 50%)'}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4">Get in Touch</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">Emergency or not — we respond fast. Choose how you'd like to reach us.</p>
        </div>
      </section>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="font-display font-extrabold text-2xl text-brand-950 mb-5">Contact Options</h2>
            {[
              {icon:'🚨',title:'24/7 Emergency',sub:'Call now for urgent help',val:PHONE,href:`tel:${PHONE}`,bg:'bg-red-600'},
              {icon:'📞',title:'Call Us',sub:'Mon–Fri 7am–9pm, Sat–Sun 8am–6pm',val:PHONE,href:`tel:${PHONE}`,bg:'bg-brand-900'},
              {icon:'💬',title:'WhatsApp',sub:'Chat instantly anytime',val:'Open WhatsApp',href:`https://wa.me/${WA}`,bg:'bg-green-500',ext:true},
            ].map(c=>(
              <a key={c.title} href={c.href} target={c.ext?'_blank':undefined} rel={c.ext?'noreferrer':undefined}
                className={`flex items-center gap-4 p-4 ${c.bg} text-white rounded-2xl hover:opacity-90 transition-opacity`}>
                <span className="text-2xl">{c.icon}</span>
                <div><div className="font-display font-bold text-sm uppercase">{c.title}</div><div className="text-xs opacity-75">{c.sub}</div><div className="text-sm font-semibold mt-0.5">{c.val}</div></div>
              </a>
            ))}
          </div>
          <div className="lg:col-span-2 glass-white rounded-3xl shadow-glass p-8">
            <h2 className="font-display font-extrabold text-2xl text-brand-950 mb-1">Send a Request</h2>
            <p className="text-slate-400 text-sm mb-6">You'll receive a ticket ID instantly via email.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
