import { Property, CompletedProject, BlogPost, Testimonial } from '../types';

export const defaultProperties: Property[] = [
  {
    id: "prop-1",
    title: "12 Marla Premier Residential Plot",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
    ],
    price: "PKR 55 Lakh",
    priceNumeric: 5500000,
    area: "12 Marla",
    areaNumeric: 12,
    location: "Academy Town, Peshawar",
    type: "Residential Plot",
    purpose: "For Sale",
    description: "Near Bilal Masjid. 12 Marla prime residential plot available for sale in a highly peaceful, secure, and rapidly growing area of Academy Town, Peshawar. This plot offers excellent features and is perfect for building a dream home or long-term dynamic investment with supreme ROI.",
    features: {
      possessionAvailable: true,
      cornerPlot: true,
      parkFacing: true,
      balloted: true,
      sewerageSystem: true,
      electricityAvailable: true,
      waterSupply: true,
      suiGasAvailable: true,
      boundaryWall: true
    },
    contactPerson: "Khaista Gul",
    contactPhone: "+92 300 1234567"
  },
  {
    id: "prop-2",
    title: "Luxury 1 Kanal Modern House",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
    ],
    price: "PKR 4.2 Crore",
    priceNumeric: 42000000,
    area: "1 Kanal",
    areaNumeric: 20,
    location: "Phase 6, Hayatabad, Peshawar",
    type: "House",
    purpose: "For Sale",
    description: "A spectacularly constructed triple-story 5-bedroom luxury house with premium fixtures, double heights, Turkish tile flooring, dual kitchens, servant quarters, and an elegant terrace overlooking the Khyber Hills. Located in the elite high-security gated precinct of Hayatabad Phase 6.",
    features: {
      possessionAvailable: true,
      cornerPlot: false,
      parkFacing: true,
      balloted: true,
      sewerageSystem: true,
      electricityAvailable: true,
      waterSupply: true,
      suiGasAvailable: true,
      boundaryWall: true
    },
    contactPerson: "Fawad Gul",
    contactPhone: "+92 315 9876543"
  },
  {
    id: "prop-3",
    title: "10 Marla Brand New Double Story House",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800"
    ],
    price: "PKR 2.4 Crore",
    priceNumeric: 24000000,
    area: "10 Marla",
    areaNumeric: 10,
    location: "Sector G3, Regi Model Town, Peshawar",
    type: "House",
    purpose: "For Sale",
    description: "An elegant, structurally verified double-story unit featuring 4 large master bedrooms with en-suite luxury washrooms, customized wooden wardrobes, imported sanitary ware, 2 dynamic TV lounges, car porch for two sedans, and high quality safety grills.",
    features: {
      possessionAvailable: true,
      cornerPlot: true,
      parkFacing: false,
      balloted: true,
      sewerageSystem: true,
      electricityAvailable: true,
      waterSupply: true,
      suiGasAvailable: false,
      boundaryWall: true
    },
    contactPerson: "Khaista Gul",
    contactPhone: "+92 300 1234567"
  },
  {
    id: "prop-4",
    title: "Commercial Corner Shop on Ground Floor",
    images: [
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    ],
    price: "PKR 90 Thousand / Month",
    priceNumeric: 90000,
    area: "4 Marla",
    areaNumeric: 4,
    location: "University Road, Peshawar",
    type: "Shop",
    purpose: "For Rent",
    description: "High visibility commercial shop measuring 4 Marla on main University Road, Peshawar. Highly suited for franchise stores, clothing brands, pharmacies, or bank booths. Features massive storefront glass panels with heavy commercial foot traffic.",
    features: {
      possessionAvailable: true,
      cornerPlot: true,
      parkFacing: false,
      balloted: true,
      sewerageSystem: true,
      electricityAvailable: true,
      waterSupply: true,
      suiGasAvailable: true,
      boundaryWall: false
    },
    contactPerson: "Arshad Khan",
    contactPhone: "+92 333 5558881"
  },
  {
    id: "prop-5",
    title: "5 Marla Commercial Plot (Main Boulevard)",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
    ],
    price: "PKR 1.2 Crore",
    priceNumeric: 12000000,
    area: "5 Marla",
    areaNumeric: 5,
    location: "Ring Road, Peshawar",
    type: "Commercial Plot",
    purpose: "For Sale",
    description: "Ideally situated commercial plot measuring 5 Marla on Main Ring Road, Peshawar. Perfect for building a multi-story commercial plaza or high-yield office building. Fully commercial-notified by local authorities with standard municipal approvals ready.",
    features: {
      possessionAvailable: true,
      cornerPlot: false,
      parkFacing: true,
      balloted: true,
      sewerageSystem: true,
      electricityAvailable: true,
      waterSupply: true,
      suiGasAvailable: false,
      boundaryWall: true
    },
    contactPerson: "Khaista Gul",
    contactPhone: "+92 300 1234567"
  },
  {
    id: "prop-6",
    title: "Elegant 3 Bed Apartment (Deans Heights)",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800"
    ],
    price: "PKR 45 Thousand / Month",
    priceNumeric: 45000,
    area: "8 Marla",
    areaNumeric: 8,
    location: "Saddar Cantonment, Peshawar",
    type: "Apartment",
    purpose: "For Rent",
    description: "Fully furnished high-end 3-bedroom apartment with built-in heating, solid ash cabinetry, fully tiled floors, and 24/7 dedicated security. Located in the highly sought-after secure Cantonment area close to elite educational academies.",
    features: {
      possessionAvailable: true,
      cornerPlot: false,
      parkFacing: false,
      balloted: true,
      sewerageSystem: true,
      electricityAvailable: true,
      waterSupply: true,
      suiGasAvailable: true,
      boundaryWall: true
    },
    contactPerson: "Hamza Gul",
    contactPhone: "+92 321 4443322"
  },
  {
    id: "prop-7",
    title: "Spacious 4 Kanal Royal Farm House",
    images: [
      "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800"
    ],
    price: "PKR 8.5 Crore",
    priceNumeric: 85000000,
    area: "4 Kanal",
    areaNumeric: 80,
    location: "Warsak Road, Peshawar",
    type: "Farm House",
    purpose: "For Sale",
    description: "Escape the city's hustle in this custom constructed luxury farmhouse on Warsak Road. Spanning across 4 Kanals, it includes an expansive lush green fruit orchard, high-capacity swimming pool, private security guard room, and deep sweet-water tube well.",
    features: {
      possessionAvailable: true,
      cornerPlot: true,
      parkFacing: true,
      balloted: true,
      sewerageSystem: true,
      electricityAvailable: true,
      waterSupply: true,
      suiGasAvailable: true,
      boundaryWall: true
    },
    contactPerson: "Khaista Gul",
    contactPhone: "+92 300 1234567"
  }
];

export const defaultProjects: CompletedProject[] = [
  {
    id: "proj-1",
    title: "Luxury Residential Villa",
    location: "Phase 4, Hayatabad, Peshawar",
    budget: "PKR 3.5 Crore",
    completionDate: "October 2025",
    description: "A super-premium turnkey construction project built from scratch including foundation design, earthquake resistant grey structure, interior tiling, custom layout design, and beautiful aesthetic wooden fixtures.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-2",
    title: "Gul Plaza Commercial Complex",
    location: "Main Ring Road, Peshawar",
    budget: "PKR 12 Crore",
    completionDate: "February 2026",
    description: "Modern commercial multi-story building featuring structural grey core, heavy high-load basement columns, comprehensive electrical ducting, glass retail fronts, and safety exit features.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-3",
    title: "Modern Farm House Renovation",
    location: "Warsak Road, Peshawar",
    budget: "PKR 85 Lakh",
    completionDate: "May 2025",
    description: "Complete overhaul of an existing farm estate with minimalist rustic architecture, luxury pool integration, perimeter security installation and modern landscape layout.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-4",
    title: "Corporate Gated Complex (Renovation & Finish)",
    location: "Saddar Cantonment, Peshawar",
    budget: "PKR 1.8 Crore",
    completionDate: "August 2025",
    description: "Premium turnkey renovation and interior corporate detailing for a leading commercial institute. Features automated high-speed cooling integration, acoustic board implementation and glass separations.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  }
];

export const defaultBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "Comprehensive Property Investment Guide for Peshawar in 2026",
    date: "June 10, 2026",
    excerpt: "Peshawar real estate market is expanding rapidly. Find out the top secure locations to invest, including Hayatabad, Regi Model Town, and Academy Town.",
    content: "Peshawar's real estate landscape is witnessing historical developments, driven by major infrastructural links like the Northern Bypass and high-speed transit lanes. Buying vacant residential plots in established localities like Academy Town and developing sectors of Regi Model Town (RMT) presents an extraordinary medium-term investment window with highly secured returns.\n\n### Key Areas to Target:\n1. **Academy Town**: Extremely central, highly peaceful, closer to premium university campuses and mosques. Perfect for family-oriented home builders.\n2. **Hayatabad**: Unbeaten premium class security, mature civic amenities, excellent schools, and top healthcare options.\n3. **Regi Model Town**: Exceptional planning, wider streets, and very reasonable plot price brackets offering exceptional leverage for builders wanting high ROI on construction.",
    category: "Property Investment Guide",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read"
  },
  {
    id: "blog-2",
    title: "5 Vital Buying Tips for First-Time Home Buyers in KP",
    date: "May 22, 2026",
    excerpt: "Avoid expensive title settlement disputes. A step-by-step verification checklist for registries, municipal approvals, and possession state.",
    content: "Purchasing your first home or land in Khyber Pakhtunkhwa requires rigorous local deed verification. Make sure you don't skip the registry check and physical boundary wall evaluation.\n\n### Core Step By Step Checklist:\n- **Verify Registry (Fard-e-Malkiat)**: Confirm owner credentials directly at the local Patwari registry office.\n- **Check Municipal NOCs**: Ensure no local master plan cuts across the plot boundary.\n- **Evaluate Possession**: Seek possession letters before committing complete payments.\n- **Assess Utility Proximities**: Confirm high-tension wires do not pass directly above your property roofline.",
    category: "Buying Tips",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read"
  },
  {
    id: "blog-3",
    title: "Understanding Grey Structure Costs: What is Included?",
    date: "April 15, 2026",
    excerpt: "What exactly makes up the grey structure framework of a home in Pakistan? A detailed guide to materials, foundations, and cost estimation.",
    content: "When constructing a home, understanding the division between 'Grey Structure' (structural skeleton) and 'Finishing' (paint, tiles, cabinetry) is vital for proper cost scheduling.\n\n### What a Standard Grey Structure Includes:\n1. **Foundation & Excavation**: Digging down to optimal load-bearing clay layers.\n2. **Masonry Walls**: High-strength local bricks bound in concrete.\n3. **Roof Slabs (RCC)**: High-tensile steel reinforcement with quality aggregate concrete.\n4. **Plumbing & Conduit Piping**: Electrical and pipeline rough-ins embedded within masonry channels before plastering.",
    category: "Construction Advice",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    readTime: "6 min read"
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Lt. Col. (R) Tariq Mahmood",
    role: "Property Investor",
    comment: "I purchased two residential plots in Academy Town through Khaista Gul Builders. Their transparency is unmatched. They verified the registry, handled NOC documents, and helped secure physical possession in record time. Highly professional team!",
    rating: 5,
    date: "March 2026"
  },
  {
    id: "test-2",
    name: "Dr. Maria Yusuf",
    role: "Home Owner in Hayatabad",
    comment: "We contracted Khaista Gul & Builders to construct our triple-story family home on a turnkey basis. Their work quality is robust, meeting international safety metrics. The project layout was precisely aligned, and they delivered exactly on budget.",
    rating: 5,
    date: "January 2026"
  },
  {
    id: "test-3",
    name: "Muhammad Shahid",
    role: "Overseas Client (UK)",
    comment: "Being abroad, it is extremely difficult to trust property transactions in Peshawar. Khaista Gul and his modern support staff provided HD video validation, live satellite coords, and handled my transactions with utmost honesty and legal protection. Highly recommended!",
    rating: 5,
    date: "May 2026"
  }
];
