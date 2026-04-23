import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingUI from './FloatingUI';
import { Toaster } from 'react-hot-toast';

const SITE = 'TruFlow Heating & Cooling';
const URL  = process.env.NEXT_PUBLIC_SITE_URL || 'https://truflowhvac.com';

export default function Layout({ children, title, description, canonical, noFloat = false }) {
  const pageTitle = title ? `${title} | ${SITE}` : `${SITE} — Fast & Reliable HVAC Services`;
  const pageDesc  = description || 'Chicagoland\'s trusted HVAC service. 24/7 emergency AC & heating repair, installation & maintenance. Certified technicians, honest pricing.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {canonical && <link rel="canonical" href={`${URL}${canonical}`} />}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HVACBusiness',
          name: SITE,
          telephone: process.env.NEXT_PUBLIC_PHONE,
          url: URL,
          address: { '@type': 'PostalAddress', addressRegion: 'IL', addressCountry: 'US' },
          areaServed: 'Chicagoland',
          openingHours: 'Mo-Su 00:00-23:59',
          priceRange: '$$',
        })}} />
      </Head>
      {!noFloat && <FloatingUI />}
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster position="top-center" toastOptions={{
        duration: 4000,
        style: { fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, borderRadius: '12px' },
        success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
      }} />
    </>
  );
}
