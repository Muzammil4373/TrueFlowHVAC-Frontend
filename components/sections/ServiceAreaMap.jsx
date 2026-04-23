import { useEffect, useRef, useState } from 'react';
import { SERVICE_AREAS } from '../../lib/locations';

export default function ServiceAreaMap({ selectedCity = null }) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const [active, setActive] = useState(selectedCity);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      if (cancelled || !containerRef.current) return;

      // Always destroy any existing instance first
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      // Fix webpack breaking Leaflet default icons
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current, {
        center: [41.9, -88.05],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map);

      const makeIcon = (isActive) =>
        L.divIcon({
          className: '',
          html: `<div style="
            width:${isActive ? 36 : 28}px;
            height:${isActive ? 36 : 28}px;
            background:${isActive ? '#f97316' : '#1e40af'};
            border:3px solid white;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            box-shadow:0 4px 16px rgba(0,0,0,0.3);
          "></div>`,
          iconSize:   [isActive ? 36 : 28, isActive ? 36 : 28],
          iconAnchor: [(isActive ? 36 : 28) / 2, isActive ? 36 : 28],
        });

      SERVICE_AREAS.forEach((city) => {
        const marker = L.marker([city.lat, city.lng], {
          icon: makeIcon(city.slug === selectedCity),
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:180px;padding:4px">
            <div style="font-weight:700;font-size:15px;color:#0f2744;margin-bottom:4px">${city.name}</div>
            <div style="font-size:12px;color:#64748b;margin-bottom:6px">${city.county} County, IL ${city.zip}</div>
            <div style="font-size:12px;color:#475569;margin-bottom:10px">${city.desc}</div>
            <a href="/service-areas/${city.slug}"
               style="display:inline-block;background:#f97316;color:white;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;">
              View Services →
            </a>
          </div>
        `, { maxWidth: 240 });

        marker.on('click', () => setActive(city.slug));
      });
    };

    initMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-glass-lg border border-slate-200">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={containerRef} style={{ height: '480px', width: '100%' }} />
      <div className="absolute top-4 left-4 glass-white px-4 py-2 rounded-xl shadow-md">
        <div className="text-xs font-semibold text-brand-900 uppercase tracking-wider">
          📍 {SERVICE_AREAS.length} Service Areas
        </div>
        <div className="text-xs text-slate-400 mt-0.5">Click any marker for details</div>
      </div>
    </div>
  );
}
