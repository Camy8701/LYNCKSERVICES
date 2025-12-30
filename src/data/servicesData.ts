// ============================================
// SERVICES DATA WITH SUBCATEGORIES
// ============================================

export type ServiceSubcategory = {
  id: string;
  nameDe: string;
  nameEn: string;
  icon?: string;
};

export type ServiceWithSubcategories = {
  id: string;
  slug: string;
  nameDe: string;
  nameEn: string;
  titleDe: string;
  titleEn: string;
  icon: string;
  descriptionDe: string;
  descriptionEn: string;
  imagePath: string;
  subcategories: ServiceSubcategory[];
};

export const servicesData: ServiceWithSubcategories[] = [
  {
    id: "sanitaer",
    slug: "sanitaer",
    nameDe: "Sanitär",
    nameEn: "Sanitary",
    titleDe: "Sanitär",
    titleEn: "Sanitary",
    icon: "home",
    descriptionDe: "Professionelle Sanitärinstallationen und Badezimmerrenovierungen. Wir bieten komplette Badsanierung, barrierefreie Badlösungen und moderne Sanitärtechnik. Von der Planung bis zur Ausführung – alles aus einer Hand für Ihr Traumbad.",
    descriptionEn: "Professional sanitary installations and bathroom renovations. We offer complete bathroom renovations, accessible bathroom solutions, and modern sanitary technology. From planning to execution – everything from one source for your dream bathroom.",
    imagePath: "/blog-renovation.jpg",
    subcategories: [
      {
        id: "bathroom",
        nameDe: "Badzimmer",
        nameEn: "Bathroom Renovation"
      },
      {
        id: "kitchen",
        nameDe: "Küche",
        nameEn: "Kitchen Renovation"
      },
      {
        id: "windows-doors",
        nameDe: "Fenster & Türen",
        nameEn: "Windows & Doors"
      },
      {
        id: "painting",
        nameDe: "Malerarbeiten",
        nameEn: "Painting"
      },
      {
        id: "flooring",
        nameDe: "Bodenbeläge",
        nameEn: "Flooring"
      }
    ]
  },
  {
    id: "dachdecker",
    slug: "dachdecker",
    nameDe: "Dachdecker",
    nameEn: "Roofing",
    titleDe: "Dachdecker",
    titleEn: "Roofing",
    icon: "warehouse",
    descriptionDe: "Professionelle Dacharbeiten von erfahrenen Meisterbetrieben. Ob Dachreparatur, komplette Sanierung oder Neueindeckung – wir sorgen für ein dichtes Dach über Ihrem Kopf. Schnelle Sturmschadenbehebung und langlebige Lösungen für Steildach und Flachdach.",
    descriptionEn: "Professional roofing work from experienced master craftsmen. Whether roof repair, complete renovation, or re-roofing – we ensure a watertight roof over your head. Fast storm damage repair and durable solutions for pitched and flat roofs.",
    imagePath: "/blog-roofing.jpg",
    subcategories: [
      {
        id: "repair",
        nameDe: "Reparatur",
        nameEn: "Repairs"
      },
      {
        id: "renovation",
        nameDe: "Sanierung",
        nameEn: "Renovation"
      },
      {
        id: "re-roofing",
        nameDe: "Neueindeckung",
        nameEn: "Re-roofing"
      },
      {
        id: "storm-damage",
        nameDe: "Sturmschaden",
        nameEn: "Storm Damage"
      }
    ]
  },
  {
    id: "elektriker",
    slug: "elektriker",
    nameDe: "Elektriker",
    nameEn: "Electrician",
    titleDe: "Elektriker",
    titleEn: "Electrician",
    icon: "zap",
    descriptionDe: "Zertifizierte Elektroinstallationen für Sicherheit und Komfort. Von der Elektroinstallation über Smart-Home-Systeme bis zur E-Auto-Ladestation. Wir modernisieren Ihre Elektrik, installieren energiesparende Lichttechnik und sorgen für sichere Stromversorgung in Ihrem Zuhause.",
    descriptionEn: "Certified electrical installations for safety and comfort. From electrical installations to smart home systems and EV charging stations. We modernize your electrics, install energy-saving lighting technology, and ensure safe power supply in your home.",
    imagePath: "/blog-electrician.jpg",
    subcategories: [
      {
        id: "electrical-installation",
        nameDe: "Elektrische Installation",
        nameEn: "Electrical Installation"
      },
      {
        id: "customer-service-repairs",
        nameDe: "Kundendienst und Reparaturen",
        nameEn: "Customer Service & Repairs"
      },
      {
        id: "lighting-technology",
        nameDe: "Lichttechnik",
        nameEn: "Lighting Technology"
      },
      {
        id: "smart-home",
        nameDe: "Smart Home",
        nameEn: "Smart Home Systems"
      },
      {
        id: "ev-charging",
        nameDe: "Elektroauto-Ladestation",
        nameEn: "EV Charging Station"
      }
    ]
  },
  {
    id: "heizung",
    slug: "heizung",
    nameDe: "Heizung",
    nameEn: "Heating",
    titleDe: "Heizung",
    titleEn: "Heating",
    icon: "flame",
    descriptionDe: "24-Stunden-Notdienst für Heizungsausfälle unter 0163/3293127. Professionelle Installation, Wartung und Reparatur aller Heizungssysteme. Wir denken vom Kunden her und bieten umfassende Lösungen für alle gebäudetechnischen Anforderungen – schnell, zuverlässig und kompetent.",
    descriptionEn: "24-hour emergency service for heating failures at 0163/3293127. Professional installation, maintenance, and repair of all heating systems. We think from the customer's perspective and offer comprehensive solutions for all building technology needs – fast, reliable, and competent.",
    imagePath: "/blog-heating.jpg",
    subcategories: [
      {
        id: "solar-thermal",
        nameDe: "Solaranlagen und Solartechnik",
        nameEn: "Solar Thermal Systems"
      },
      {
        id: "gas-oil-heating",
        nameDe: "Gas-/Ölheizung",
        nameEn: "Gas/Oil Heating"
      },
      {
        id: "ventilation",
        nameDe: "Kontrollierte Wohnraumlüftung",
        nameEn: "Controlled Residential Ventilation"
      }
    ]
  },
  {
    id: "waermepumpe",
    slug: "waermepumpe",
    nameDe: "Wärmepumpe",
    nameEn: "Heat Pump Systems",
    titleDe: "Wärmepumpe",
    titleEn: "Heat Pump Systems",
    icon: "thermometer",
    descriptionDe: "Zukunftssichere Heiztechnik mit Wärmepumpen. Umweltfreundlich heizen mit Luft-, Erd- oder Wasserwärmepumpen. Profitieren Sie von staatlichen Förderungen und senken Sie Ihre Heizkosten dauerhaft. Inklusive Beratung zu Brennstoffzellen und BHKW-Systemen für maximale Energieeffizienz.",
    descriptionEn: "Future-proof heating technology with heat pumps. Eco-friendly heating with air, ground, or water heat pumps. Benefit from government subsidies and permanently reduce your heating costs. Including consultation on fuel cells and CHP systems for maximum energy efficiency.",
    imagePath: "/service-heat-pump.jpg",
    subcategories: [
      {
        id: "air-water-heat-pump",
        nameDe: "Luft-Wasser-Wärmepumpe",
        nameEn: "Air-Water Heat Pump"
      },
      {
        id: "ground-water-heat-pump",
        nameDe: "Sole-Wasser-Wärmepumpe",
        nameEn: "Ground-Water Heat Pump"
      },
      {
        id: "water-water-heat-pump",
        nameDe: "Wasser-Wasser-Wärmepumpe",
        nameEn: "Water-Water Heat Pump"
      },
      {
        id: "fuel-cell-chp",
        nameDe: "Brennstoffzelle/BHKW",
        nameEn: "Fuel Cell/CHP"
      },
      {
        id: "wood-pellet",
        nameDe: "Holzpellettechnik",
        nameEn: "Wood Pellet Heating"
      }
    ]
  },
  {
    id: "klempner",
    slug: "klempner",
    nameDe: "Klempner",
    nameEn: "Plumbing",
    titleDe: "Klempner",
    titleEn: "Plumbing",
    icon: "droplets",
    descriptionDe: "Professionelle Klempnerarbeiten für alle Anforderungen. Rohrbruchreparaturen mit moderner Thermografie-Kamera zur Leckortung, Rohrreinigung und Neuinstallationen. Ob klassischer Rohrbruch, feuchte Stellen oder Schimmelbefall – wir lokalisieren die Ursache und beseitigen Schäden fachgerecht.",
    descriptionEn: "Professional plumbing services for all requirements. Pipe burst repairs with modern thermography camera for leak detection, pipe cleaning, and new installations. Whether classic pipe burst, damp spots, or mold infestation – we locate the cause and professionally eliminate damage.",
    imagePath: "/blog-plumbing.png",
    subcategories: [
      {
        id: "bathroom-renovation-construction",
        nameDe: "Badsanierung und Badbau",
        nameEn: "Bathroom Renovation & Construction"
      },
      {
        id: "accessible-bathroom",
        nameDe: "Barrierefreies Bad",
        nameEn: "Accessible Bathroom"
      },
      {
        id: "rainwater-harvesting",
        nameDe: "Regenwassernutzung",
        nameEn: "Rainwater Harvesting"
      },
      {
        id: "drinking-water-hygiene",
        nameDe: "Trinkwasserhygiene",
        nameEn: "Drinking Water Hygiene"
      },
      {
        id: "pipe-burst-repair",
        nameDe: "Rohrbruch-Reparatur",
        nameEn: "Pipe Burst Repair"
      }
    ]
  },
  {
    id: "solar-photovoltaik",
    slug: "solar",
    nameDe: "Solar & Photovoltaik",
    nameEn: "Solar & Photovoltaic",
    titleDe: "Solar & Photovoltaik",
    titleEn: "Solar & Photovoltaic",
    icon: "sun",
    descriptionDe: "Nachhaltige Energiegewinnung mit Photovoltaik-Anlagen. Profitieren Sie von bis zu 70% Förderung für Ihre PV-Anlage. Komplettservice von der Beratung über Installation bis zur Wartung. Inklusive Energiespeichersystemen für maximale Unabhängigkeit vom Stromnetz.",
    descriptionEn: "Sustainable energy generation with photovoltaic systems. Benefit from up to 70% subsidies for your PV system. Complete service from consultation to installation and maintenance. Including energy storage systems for maximum independence from the power grid.",
    imagePath: "/blog-solar.jpg",
    subcategories: [
      {
        id: "photovoltaic",
        nameDe: "Photovoltaik",
        nameEn: "Photovoltaic Systems"
      },
      {
        id: "energy-storage",
        nameDe: "Energiespeichersysteme",
        nameEn: "Energy Storage Systems"
      },
      {
        id: "subsidies",
        nameDe: "Förderung",
        nameEn: "Subsidies & Incentives"
      }
    ]
  },
  {
    id: "klimatechnik-lueftung",
    slug: "klimatechnik",
    nameDe: "Klimatechnik & Lüftung",
    nameEn: "Air Conditioning & Ventilation",
    titleDe: "Klimatechnik & Lüftung",
    titleEn: "Air Conditioning & Ventilation",
    icon: "snowflake",
    descriptionDe: "Moderne Klimaanlagen und Lüftungssysteme für optimales Raumklima. Vom Wohnbereich über Büros bis zur Industrie – wir planen und installieren maßgeschneiderte Klima- und Lüftungslösungen. Inklusive Kühlzellen und Serverraumkühlung für spezielle Anforderungen.",
    descriptionEn: "Modern air conditioning and ventilation systems for optimal indoor climate. From residential areas to offices and industry – we plan and install customized climate and ventilation solutions. Including cold storage rooms and server room cooling for special requirements.",
    imagePath: "/service-air-conditioning.jpg",
    subcategories: [
      {
        id: "residential-ac",
        nameDe: "Klimaanlagen im Wohnbereich",
        nameEn: "Residential AC"
      },
      {
        id: "office-ac",
        nameDe: "Klimatechnik für Büros",
        nameEn: "Office AC"
      },
      {
        id: "industrial-ac",
        nameDe: "Klimatechnik für Industrie",
        nameEn: "Industrial AC"
      },
      {
        id: "cold-storage",
        nameDe: "Kühlzellen",
        nameEn: "Cold Storage Rooms"
      },
      {
        id: "server-room-cooling",
        nameDe: "Serverraumkühlung",
        nameEn: "Server Room Cooling"
      }
    ]
  },
  {
    id: "service-beratung",
    slug: "service-beratung",
    nameDe: "Service & Beratung",
    nameEn: "Service & Consultation",
    titleDe: "Service & Beratung",
    titleEn: "Service & Consultation",
    icon: "clipboard",
    descriptionDe: "Wir machen's einfach – das ist nicht ohne Grund unsere Unternehmensphilosophie. Umfassende Beratung und Service rund um Ihre Gebäudetechnik. 24-Stunden-Notdienst unter 0163/3293127. Von Energieberatung über Thermografie bis zur Förderberatung – wir finden für (fast) alles eine Lösung.",
    descriptionEn: "We make it simple – that's our company philosophy for a reason. Comprehensive consulting and service for all your building technology needs. 24-hour emergency service at 0163/3293127. From energy consulting to thermography and subsidy advice – we find a solution for (almost) everything.",
    imagePath: "/service-consultation.jpg",
    subcategories: [
      {
        id: "energy-consulting",
        nameDe: "Energieberatung",
        nameEn: "Energy Consulting"
      },
      {
        id: "pipe-burst-repair-service",
        nameDe: "Rohrbruch-Reparatur",
        nameEn: "Pipe Burst Repair"
      },
      {
        id: "heating-building-check",
        nameDe: "Heizungs- und Gebäudecheck",
        nameEn: "Heating & Building Check"
      },
      {
        id: "gas-check",
        nameDe: "Gascheck",
        nameEn: "Gas Check"
      },
      {
        id: "sewer-camera-inspection",
        nameDe: "Kanal-Kamerainspektion",
        nameEn: "Sewer Camera Inspection"
      },
      {
        id: "funding",
        nameDe: "Förderung",
        nameEn: "Funding/Subsidies"
      },
      {
        id: "thermography-leak-detection",
        nameDe: "Thermografie/Leckortung",
        nameEn: "Thermography/Leak Detection"
      },
      {
        id: "hydraulic-balancing",
        nameDe: "Hydraulischer Abgleich",
        nameEn: "Hydraulic Balancing"
      },
      {
        id: "mobile-heating-units",
        nameDe: "Mobile Heizgeräte",
        nameEn: "Mobile Heating Units"
      },
      {
        id: "emergency-service",
        nameDe: "Notdienst",
        nameEn: "Emergency Service"
      }
    ]
  }
];

// Helper function to get service by slug
export function getServiceBySlug(slug: string): ServiceWithSubcategories | undefined {
  return servicesData.find(service => service.slug === slug);
}

// Helper function to get all service slugs for routing
export function getAllServiceSlugs(): string[] {
  return servicesData.map(service => service.slug);
}

// Helper function to get subcategories for a service
export function getSubcategoriesForService(serviceSlug: string): ServiceSubcategory[] {
  const service = getServiceBySlug(serviceSlug);
  return service?.subcategories || [];
}
