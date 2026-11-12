export interface Property {
  id: string;
  title: string;
  images: string[];
  price: string; // e.g. "PKR 55 Lakh"
  priceNumeric: number; // in PKR, for filtering (e.g. 5500000)
  area: string; // e.g. "12 Marla"
  areaNumeric: number; // in Marla, for filtering
  location: string;
  type: 'Residential Plot' | 'House' | 'Commercial Plot' | 'Shop' | 'Apartment' | 'Farm House';
  purpose: 'For Sale' | 'For Rent';
  description: string;
  features: {
    possessionAvailable?: boolean;
    cornerPlot?: boolean;
    parkFacing?: boolean;
    balloted?: boolean;
    sewerageSystem?: boolean;
    electricityAvailable?: boolean;
    waterSupply?: boolean;
    suiGasAvailable?: boolean;
    boundaryWall?: boolean;
    [key: string]: boolean | undefined;
  };
  contactPerson: string;
  contactPhone: string;
}

export interface InquiryLead {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  propertyName?: string;
  propertyId?: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Completed';
}

export interface CompletedProject {
  id: string;
  title: string;
  location: string;
  budget: string;
  completionDate: string;
  description: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
}
