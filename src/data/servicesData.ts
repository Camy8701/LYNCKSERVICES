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
    id: "allgemeine-renovierung",
    slug: "renovierung",
    nameDe: "Allgemeine Renovierung",
    nameEn: "General Renovation",
    titleDe: "Allgemeine Renovierung",
    titleEn: "General Renovation",
    icon: "home",
    descriptionDe: "Badzimmer, Küche, Fenster & Türen, Malerarbeiten",
    descriptionEn: "Bathroom, Kitchen, Windows & Doors, Painting",
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
    descriptionDe: "Reparatur, Sanierung, Neueindeckung und Sturmschaden-Beseitigung",
    descriptionEn: "Repair, Renovation, Re-roofing and Storm Damage Removal",
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
    descriptionDe: "Smart Home, Panel-Upgrades, Reparatur und Neuinstallation",
    descriptionEn: "Smart Home, Panel Upgrades, Repair and New Installation",
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
    id: "heizung-hvac",
    slug: "heizung",
    nameDe: "Heizung & HVAC",
    nameEn: "Heating & HVAC",
    titleDe: "Heizung & HVAC",
    titleEn: "Heating & HVAC",
    icon: "flame",
    descriptionDe: "Notfall-Service, Installation, Wartung und Reparatur von Heizungsanlagen",
    descriptionEn: "Emergency Service, Installation, Maintenance and Repair of Heating Systems",
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
    descriptionDe: "Luft-, Erd- und Wasserwärmepumpen, Brennstoffzelle/BHKW",
    descriptionEn: "Air, Ground and Water Heat Pumps, Fuel Cell/CHP",
    imagePath: "/blog-heating.jpg",
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
    id: "klempner-sanitaer",
    slug: "klempner",
    nameDe: "Klempner & Sanitär",
    nameEn: "Plumbing & Sanitary",
    titleDe: "Klempner & Sanitär",
    titleEn: "Plumbing & Sanitary",
    icon: "droplets",
    descriptionDe: "Rohrreinigung, Reparaturen, Neuinstallation von Sanitäranlagen",
    descriptionEn: "Pipe Cleaning, Repairs, New Installation of Sanitary Facilities",
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
    descriptionDe: "Förderung bis 70%, Installation, Beratung und Wartung von Solaranlagen",
    descriptionEn: "Subsidies up to 70%, Installation, Consulting and Maintenance of Solar Systems",
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
    id: "klimatechnik",
    slug: "klimatechnik",
    nameDe: "Klimatechnik",
    nameEn: "Air Conditioning",
    titleDe: "Klimatechnik",
    titleEn: "Air Conditioning",
    icon: "snowflake",
    descriptionDe: "Wohnbereich, Büros, Industrie, Kühlzellen, Serverraumkühlung",
    descriptionEn: "Residential, Offices, Industrial, Cold Storage, Server Room Cooling",
    imagePath: "/blog-heating.jpg", // Placeholder - will need new image
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
    descriptionDe: "Energieberatung, Heizungscheck, Thermografie, Förderung",
    descriptionEn: "Energy Consulting, Heating Check, Thermography, Subsidies",
    imagePath: "/blog-renovation.jpg", // Placeholder - will need new image
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
