const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://truflowhvac.com';

export default function Robots() {}
export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/login\n\nSitemap: ${BASE}/sitemap.xml\n`);
  res.end();
  return { props: {} };
}
