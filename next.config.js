/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL:       process.env.NEXT_PUBLIC_API_URL       || 'https://trueflowhvac.onrender.com/api',
    NEXT_PUBLIC_WHATSAPP:      process.env.NEXT_PUBLIC_WHATSAPP      || '224-451-6560',
    NEXT_PUBLIC_PHONE:         process.env.NEXT_PUBLIC_PHONE         || '630) 999-0127',
    NEXT_PUBLIC_PHONE_OFFICE:  process.env.NEXT_PUBLIC_PHONE_OFFICE  || '(888) 581-5178',
    NEXT_PUBLIC_EMAIL:         process.env.NEXT_PUBLIC_EMAIL         || 'truflowhvac@gmail.com',
    NEXT_PUBLIC_BUSINESS_NAME: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'TruFlow Heating & Cooling',
    NEXT_PUBLIC_MAPS_KEY:      process.env.NEXT_PUBLIC_MAPS_KEY      || '',
    NEXT_PUBLIC_SITE_URL:      process.env.NEXT_PUBLIC_SITE_URL      || 'https://truflowhvac.com',
  },
  images: { domains: ['images.unsplash.com', 'source.unsplash.com'] },
};
