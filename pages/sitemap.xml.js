import { SERVICE_AREAS } from '../lib/locations';
import { SERVICES } from '../lib/services';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://truflowhvac.com';

const generateSitemap = () => {
  const statics = ['', '/services', '/service-areas', '/about', '/blog', '/contact', '/track-ticket'];
  const services = SERVICES.map(s => `/services/${s.slug}`);
  const cities   = SERVICE_AREAS.map(c => `/service-areas/${c.slug}`);
  const all = [...statics, ...services, ...cities];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(p => `  <url>
    <loc>${BASE}${p}</loc>
    <changefreq>${p === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${p === '' ? '1.0' : p.includes('/service-areas/') || p.includes('/services/') ? '0.8' : '0.7'}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;
};

export default function Sitemap() {}
export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}
