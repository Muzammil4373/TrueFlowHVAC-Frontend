import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout
      title="Privacy Policy"
      description="TruFlow Heating & Cooling privacy policy — how we collect, use, and protect your personal information."
    >
      {/* Hero */}
      <section className="bg-brand-950 py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-extrabold text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-lg">Last updated: {new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-slate prose-lg">

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-8">
            <p className="text-slate-700 text-sm leading-relaxed m-0">
              <strong>TruFlow Heating & Cooling</strong> ("we," "our," or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit <strong>truflowhvac.com</strong> or contact us for HVAC services.
            </p>
          </div>

          {[
            {
              title: '1. Information We Collect',
              content: [
                'When you submit a service request through our contact form, we collect:',
                '• Your full name',
                '• Email address',
                '• Phone number',
                '• Service type requested',
                '• City / location',
                '• Message or description of your HVAC issue',
                '',
                'We do not collect payment information, social security numbers, or any sensitive financial data through our website.',
              ],
            },
            {
              title: '2. How We Use Your Information',
              content: [
                'We use the information you provide to:',
                '• Respond to your service request and contact you about scheduling',
                '• Generate and send your service ticket ID for tracking',
                '• Send confirmation emails about your request',
                '• Notify our team about new service inquiries',
                '• Improve our services and customer experience',
                '',
                'We do not sell, trade, or rent your personal information to third parties.',
              ],
            },
            {
              title: '3. Email Communications',
              content: [
                'When you submit a service request, you will receive:',
                '• A confirmation email with your unique Ticket ID (HVAC-XXXXXX)',
                '• Follow-up communications from our team regarding your service',
                '',
                'You may opt out of non-essential communications at any time by contacting us at truflowhvac@gmail.com.',
              ],
            },
            {
              title: '4. Data Storage & Security',
              content: [
                'Your service request information is stored securely in our database hosted on MongoDB Atlas, a cloud database service with industry-standard security measures including:',
                '• Encrypted data storage',
                '• Secure HTTPS connections',
                '• Access controls limited to authorized staff only',
                '',
                'We retain your information for as long as necessary to provide our services and comply with legal obligations.',
              ],
            },
            {
              title: '5. Cookies',
              content: [
                'Our website uses minimal cookies necessary for the site to function properly. We do not use tracking cookies or third-party advertising cookies.',
                '',
                'You can control cookie settings through your browser preferences.',
              ],
            },
            {
              title: '6. Third-Party Services',
              content: [
                'Our website uses the following trusted third-party services:',
                '• Email delivery service for sending confirmation emails',
                '• Map services (OpenStreetMap via Leaflet.js) for displaying service areas',
                '',
                'These services have their own privacy policies and we encourage you to review them.',
              ],
            },
            {
              title: '7. Your Rights',
              content: [
                'You have the right to:',
                '• Request access to the personal information we hold about you',
                '• Request correction of inaccurate information',
                '• Request deletion of your personal data',
                '• Withdraw consent for future communications',
                '',
                'To exercise any of these rights, contact us at truflowhvac@gmail.com.',
              ],
            },
            {
              title: '8. Children\'s Privacy',
              content: [
                'Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.',
              ],
            },
            {
              title: '9. Changes to This Policy',
              content: [
                'We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.',
              ],
            },
            {
              title: '10. Contact Us',
              content: [
                'If you have any questions about this Privacy Policy or how we handle your data, please contact us:',
                '',
                '📧 Email: truflowhvac@gmail.com',
                '📞 Direct: (630) 999-0127',
                '🏢 Office: (888) 581-5178',
                '🌐 Website: www.truflowhvac.com',
              ],
            },
          ].map((section) => (
            <div key={section.title} className="mb-10">
              <h2 className="font-display font-extrabold text-xl text-brand-950 mb-4 pb-2 border-b border-slate-100">
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.content.map((line, i) => (
                  <p key={i} className={`text-slate-600 text-base leading-relaxed m-0 ${
                    line.startsWith('•') ? 'ml-4' : ''
                  } ${line === '' ? 'mb-2' : ''}`}>
                    {line || <>&nbsp;</>}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center mt-10">
            <h3 className="font-display font-bold text-lg text-brand-950 mb-2">Have Questions?</h3>
            <p className="text-slate-500 text-sm mb-4">We're here to help. Contact us anytime.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="mailto:truflowhvac@gmail.com"
                className="flex items-center gap-2 bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-all text-sm">
                ✉️ Email Us
              </a>
              <Link href="/contact"
                className="flex items-center gap-2 border-2 border-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl hover:border-orange-400 hover:text-orange-500 transition-all text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
