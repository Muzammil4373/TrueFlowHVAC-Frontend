export const SERVICE_AREAS = [
  { slug:'addison',           name:'Addison',            lat:41.9314, lng:-87.9887, zip:'60101', county:'DuPage',  desc:'Expert HVAC service for Addison homes and businesses.' },
  { slug:'arlington-heights', name:'Arlington Heights',  lat:42.0884, lng:-87.9806, zip:'60004', county:'Cook',    desc:'Trusted heating & cooling in Arlington Heights.' },
  { slug:'barrington',        name:'Barrington',         lat:42.1536, lng:-88.1364, zip:'60010', county:'Cook',    desc:'Premium HVAC solutions for Barrington residents.' },
  { slug:'bolingbrook',       name:'Bolingbrook',        lat:41.6964, lng:-88.0684, zip:'60440', county:'Will',    desc:'Fast & reliable AC repair in Bolingbrook.' },
  { slug:'bartlett',          name:'Bartlett',           lat:41.9950, lng:-88.1856, zip:'60103', county:'DuPage',  desc:'Full HVAC services in Bartlett, IL.' },
  { slug:'batavia',           name:'Batavia',            lat:41.8500, lng:-88.3126, zip:'60510', county:'Kane',    desc:'Heating & cooling experts for Batavia families.' },
  { slug:'bensenville',       name:'Bensenville',        lat:41.9583, lng:-87.9401, zip:'60106', county:'DuPage',  desc:'Professional HVAC in Bensenville.' },
  { slug:'bloomingdale',      name:'Bloomingdale',       lat:41.9531, lng:-88.0812, zip:'60108', county:'DuPage',  desc:'Quality air conditioning service in Bloomingdale.' },
  { slug:'carol-stream',      name:'Carol Stream',       lat:41.9128, lng:-88.1348, zip:'60116', county:'DuPage',  desc:'Comprehensive HVAC solutions in Carol Stream.' },
  { slug:'hanover-park',      name:'Hanover Park',       lat:41.9995, lng:-88.1437, zip:'60133', county:'DuPage',  desc:'Same-day HVAC service in Hanover Park.' },
  { slug:'des-plaines',       name:'Des Plaines',        lat:42.0334, lng:-87.8834, zip:'60016', county:'Cook',    desc:'24/7 emergency HVAC in Des Plaines.' },
  { slug:'elgin',             name:'Elgin',              lat:42.0354, lng:-88.2826, zip:'60120', county:'Kane',    desc:'Top-rated HVAC technicians in Elgin.' },
  { slug:'elk-grove-village', name:'Elk Grove Village',  lat:42.0042, lng:-87.9973, zip:'60007', county:'Cook',    desc:'Fast HVAC repair in Elk Grove Village.' },
  { slug:'elmhurst',          name:'Elmhurst',           lat:41.8994, lng:-87.9403, zip:'60126', county:'DuPage',  desc:'Expert heating & cooling in Elmhurst.' },
  { slug:'oakbrook',          name:'Oakbrook',           lat:41.8475, lng:-87.9578, zip:'60523', county:'DuPage',  desc:'Premium HVAC service in Oak Brook, IL.' },
  { slug:'rolling-meadows',   name:'Rolling Meadows',    lat:42.0706, lng:-88.0134, zip:'60008', county:'Cook',    desc:'Reliable HVAC in Rolling Meadows.' },
  { slug:'rosemont',          name:'Rosemont',           lat:41.9856, lng:-87.8756, zip:'60018', county:'Cook',    desc:'Professional AC & heating in Rosemont.' },
  { slug:'schaumburg',        name:'Schaumburg',         lat:42.0334, lng:-88.0834, zip:'60193', county:'Cook',    desc:'Leading HVAC service provider in Schaumburg.' },
  { slug:'south-barrington',  name:'South Barrington',   lat:42.0764, lng:-88.1439, zip:'60010', county:'Cook',    desc:'Expert HVAC for South Barrington homes.' },
  { slug:'st-charles',        name:'St. Charles',        lat:41.9142, lng:-88.3084, zip:'60174', county:'Kane',    desc:'Complete HVAC solutions in St. Charles.' },
  { slug:'geneva',            name:'Geneva',             lat:41.8875, lng:-88.3050, zip:'60134', county:'Kane',    desc:'Trusted heating & AC service in Geneva.' },
  { slug:'glen-ellyn',        name:'Glen Ellyn',         lat:41.8775, lng:-88.0631, zip:'60137', county:'DuPage',  desc:'Quality HVAC service in Glen Ellyn.' },
  { slug:'glendale-heights',  name:'Glendale Heights',   lat:41.9231, lng:-88.0700, zip:'60139', county:'DuPage',  desc:'Affordable HVAC in Glendale Heights.' },
  { slug:'naperville',        name:'Naperville',         lat:41.7508, lng:-88.1535, zip:'60540', county:'DuPage',  desc:'Award-winning HVAC service in Naperville.' },
  { slug:'plainfield',        name:'Plainfield',         lat:41.6267, lng:-88.2015, zip:'60544', county:'Will',    desc:'Fast, reliable HVAC in Plainfield, IL.' },
];

export const getCityBySlug = (slug) => SERVICE_AREAS.find(c => c.slug === slug);

export const CITY_REVIEWS = {
  naperville: [
    { name:'David K.', stars:5, text:'Called at midnight during a heatwave. Tech arrived in 90 min and had AC running by 1am. Incredible!', date:'July 2024' },
    { name:'Sarah M.', stars:5, text:'Best HVAC company in Naperville. Fair pricing and they explain everything.', date:'August 2024' },
  ],
  schaumburg: [
    { name:'Tom B.', stars:5, text:'Furnace died on New Year\'s Eve. TruFlow sent someone in 2 hours. Saved our holiday!', date:'Jan 2024' },
    { name:'Linda R.', stars:5, text:'New Carrier system installed. Clean, fast, and professional team.', date:'March 2024' },
  ],
  default: [
    { name:'Michael T.', stars:5, text:'Same-day service, honest pricing, certified techs. TruFlow is the only HVAC company I\'ll ever call!', date:'2024' },
    { name:'Jennifer P.', stars:5, text:'The 24/7 emergency line actually works! Real person, real help at 3am.', date:'2024' },
  ],
};

export const getCityReviews = (slug) => CITY_REVIEWS[slug] || CITY_REVIEWS.default;
