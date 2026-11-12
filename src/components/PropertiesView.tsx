import React, { useState, useEffect } from 'react';
import { Property, InquiryLead } from '../types';
import { MapPin, Search, Grid, List, Check, Phone, MessageCircle, ArrowLeft, ArrowRight, Table, ShieldAlert, CheckCircle2, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface PropertiesViewProps {
  properties: Property[];
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  globalFilters: { purpose?: string; type?: string; location?: string };
  setGlobalFilters: (filters: { purpose?: string; type?: string; location?: string }) => void;
  onAddLead: (lead: { customerName: string; phone: string; email: string; message: string; propertyId?: string; propertyName?: string }) => void;
}

export default function PropertiesView({
  properties,
  selectedPropertyId,
  setSelectedPropertyId,
  globalFilters,
  setGlobalFilters,
  onAddLead
}: PropertiesViewProps) {
  
  // Search state variables
  const [purpose, setPurpose] = useState<string>('All');
  const [type, setType] = useState<string>('All');
  const [locationQuery, setLocationQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minArea, setMinArea] = useState<string>('');
  const [maxArea, setMaxArea] = useState<string>('');

  // detail gallery index
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Detail property inquiry form state
  const [inqName, setInqName] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqMessage, setInqMessage] = useState('');
  const [inqSuccess, setInqSuccess] = useState(false);

  // Sync global filters transmitted from the Home Categories or Hero Search
  useEffect(() => {
    if (globalFilters.purpose) {
      setPurpose(globalFilters.purpose === 'For Sale' ? 'For Sale' : 'For Rent');
    }
    if (globalFilters.type) {
      setType(globalFilters.type);
    }
    if (globalFilters.location) {
      setLocationQuery(globalFilters.location);
    }
    // Clear global filters after consumption
    setGlobalFilters({});
  }, [globalFilters]);

  // Handle Detail Inquiry submissions
  const handleInquirySubmit = (e: React.FormEvent, prop: Property) => {
    e.preventDefault();
    if (!inqName || !inqPhone) {
      alert("Please fill out your name and phone number!");
      return;
    }
    onAddLead({
      customerName: inqName,
      phone: inqPhone,
      email: inqEmail,
      message: inqMessage || `Interested in inquiring about ${prop.title}.`,
      propertyId: prop.id,
      propertyName: prop.title
    });
    setInqSuccess(true);
    setInqName('');
    setInqPhone('');
    setInqEmail('');
    setInqMessage('');
    // delay clear
    setTimeout(() => {
      setInqSuccess(false);
    }, 4500);
  };

  // Reset all search parameters
  const handleResetSearch = () => {
    setPurpose('All');
    setType('All');
    setLocationQuery('');
    setMinPrice('');
    setMaxPrice('');
    setMinArea('');
    setMaxArea('');
  };

  // Compute filtered listings
  const filteredListings = properties.filter((prop) => {
    // 1. Purpose
    if (purpose !== 'All' && prop.purpose !== purpose) return false;
    
    // 2. Type matching
    if (type !== 'All') {
      if (type === 'Plot') {
        if (!prop.type.includes('Plot')) return false;
      } else if (prop.type !== type && !prop.type.startsWith(type)) {
        return false;
      }
    }

    // 3. Location / title queries
    if (locationQuery.trim()) {
      const q = locationQuery.toLowerCase();
      const matchesLoc = prop.location.toLowerCase().includes(q);
      const matchesTitle = prop.title.toLowerCase().includes(q);
      if (!matchesLoc && !matchesTitle) return false;
    }

    // 4. Min Price inside PKR (numerical basis)
    if (minPrice.trim()) {
      const minVal = parseFloat(minPrice) * (minPrice.toLowerCase().includes('crore') ? 10000000 : 100000);
      if (isNaN(minVal) || prop.priceNumeric < minVal) {
        // Fallback simple number
        const rawMin = parseFloat(minPrice);
        if (!isNaN(rawMin) && prop.priceNumeric < rawMin) return false;
      }
    }

    // 5. Max Price interior
    if (maxPrice.trim()) {
      const maxVal = parseFloat(maxPrice) * (maxPrice.toLowerCase().includes('crore') ? 10000000 : 100000);
      if (isNaN(maxVal) || prop.priceNumeric > maxVal) {
        const rawMax = parseFloat(maxPrice);
        if (!isNaN(rawMax) && prop.priceNumeric > rawMax) return false;
      }
    }

    // 6. Min Area inside Marlas
    if (minArea.trim()) {
      const minSize = parseFloat(minArea);
      if (!isNaN(minSize) && prop.areaNumeric < minSize) return false;
    }

    // 7. Max Area inside Marlas
    if (maxArea.trim()) {
      const maxSize = parseFloat(maxArea);
      if (!isNaN(maxSize) && prop.areaNumeric > maxSize) return false;
    }

    return true;
  });

  // Find currently active selected property details, if any
  const selectedProp = properties.find((p) => p.id === selectedPropertyId);

  // If a property detail view is active, render the Property Detail Screen
  if (selectedProp) {
    const prop = selectedProp;
    const hasAnyFeatures = Object.values(prop.features).some(v => v === true);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="property-detail-container">
        
        {/* Navigation row back */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
          <button
            onClick={() => {
              setSelectedPropertyId(null);
              setActiveImgIndex(0);
            }}
            id="back-to-listings-btn"
            className="group flex items-center space-x-2 text-xs font-bold text-brand-green hover:text-brand-gold transition-colors focus:outline-hidden"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Property Listings (پراپرٹیز لسٹ)</span>
          </button>
          
          <span className="text-[11px] text-gray-500 font-mono">
            Property Ref ID: <strong className="text-gray-800 uppercase">{prop.id}</strong>
          </span>
        </div>

        {/* Title, tags and price block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="bg-brand-green text-brand-gold font-black text-[9px] uppercase tracking-widest py-1 px-3 rounded-none shadow-xs border border-brand-gold">
                {prop.purpose}
              </span>
              <span className="bg-gray-100 text-gray-800 font-black text-[9px] uppercase tracking-widest py-1 px-3 rounded-none">
                {prop.type}
              </span>
              <span className="bg-brand-gold/10 text-brand-green border border-brand-gold/30 font-black text-[9px] uppercase tracking-widest py-1 px-3 rounded-none flex items-center">
                <MapPin size={10} className="mr-1 text-brand-gold" />
                {prop.location}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {prop.title}
            </h1>
          </div>

          <div className="bg-gray-50 border-2 border-brand-gold p-4 rounded-none flex flex-col justify-center text-center lg:text-right">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">demanded price (قیمت)</span>
            <span className="text-2xl sm:text-3xl font-black text-brand-green mt-1">{prop.price}</span>
            <span className="text-[11px] text-brand-gold font-black font-mono tracking-widest uppercase">Area Limit: {prop.area}</span>
          </div>
        </div>

        {/* Core Detail layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Space */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery Component */}
            <div className="space-y-3" id="property-gallery-block">
              {/* Main Active image */}
              <div className="relative h-96 sm:h-[480px] w-full rounded-none overflow-hidden border-2 border-brand-green bg-gray-50 shadow-sm group">
                <img
                  src={prop.images[activeImgIndex] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef'}
                  alt={`${prop.title} gallery active`}
                  className="w-full h-full object-cover transition-all"
                  referrerPolicy="no-referrer"
                />
                
                {/* Arrow switches */}
                {prop.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImgIndex((prev) => (prev === 0 ? prop.images.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-none bg-white/90 hover:bg-white text-gray-800 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-brand-green"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImgIndex((prev) => (prev === prop.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-none bg-white/90 hover:bg-white text-gray-800 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-brand-green"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* FullScreen action overlay button */}
                <button
                  onClick={() => setIsFullScreen(true)}
                  className="absolute bottom-3 right-3 bg-brand-green hover:bg-brand-gold border-r-4 border-brand-gold text-white p-2 rounded-none transition-colors flex items-center space-x-1 text-xs font-black uppercase tracking-widest"
                >
                  <Maximize2 size={13} />
                  <span>Enlarge</span>
                </button>
              </div>

              {/* Thumbnails row */}
              {prop.images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {prop.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`h-16 rounded-none overflow-hidden border-2 transition-all ${
                        idx === activeImgIndex ? 'border-brand-gold scale-102 shadow-xs' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Overview description */}
            <div className="bg-white p-6 sm:p-8 rounded-none border-t-4 border-brand-green border-x border-b border-gray-200 shadow-xs space-y-4">
              <h3 className="text-base font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3 flex justify-between items-baseline">
                <span>Detailed Property Description (تفصیلات)</span>
                <span className="text-[10px] text-brand-gold font-bold">رہائشی خصوصیات</span>
              </h3>
              
              <div className="prose text-xs sm:text-sm text-gray-650 leading-relaxed font-medium space-y-4 whitespace-pre-line">
                {prop.description}
              </div>

              <div className="p-4 bg-amber-50/70 border-l-4 border-brand-gold rounded-none mt-5">
                <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-widest">Investment Highlights:</h4>
                <ul className="list-disc list-inside text-xs text-amber-900 mt-2 space-y-1 leading-relaxed">
                  <li>Near civic locations with instant utility access.</li>
                  <li>Free from any statutory disputes or municipal penalties.</li>
                  <li>Excellent entry point for custom home builders or long-term growth.</li>
                </ul>
              </div>
            </div>

            {/* Information Parameters Table */}
            <div className="bg-white p-6 sm:p-8 rounded-none border-t-4 border-brand-gold border-x border-b border-gray-200 shadow-xs space-y-4">
              <h3 className="text-base font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3 flex items-center space-x-2">
                <Table size={16} className="text-brand-green" />
                <span>Property Information Table (تفصیلی معلوماتی جدول)</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-medium text-left text-gray-700 border border-gray-100 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-150">Parameter Field</th>
                      <th className="px-4 py-3 border-b border-gray-150">Registered Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/40">Property Type</td>
                      <td className="px-4 py-3 text-brand-green font-bold">{prop.type}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/40">Deal Purpose</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{prop.purpose}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/40">Price Asked</td>
                      <td className="px-4 py-3 text-brand-gold font-bold">{prop.price}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/40">Registered Area</td>
                      <td className="px-4 py-3 text-gray-800">{prop.area}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/40">Location Coordinates</td>
                      <td className="px-4 py-3 text-gray-600">{prop.location}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/40">Authorized Agent</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{prop.contactPerson}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Plot/House features and possession status checklists */}
            {hasAnyFeatures && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex justify-between items-baseline">
                  <span>Physical Plot/House Features (زمین کی سہولیات)</span>
                  <span className="text-xs text-brand-green font-bold">بنیادی سہولیات</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(prop.features).map(([key, value]) => {
                    if (value === undefined) return null;
                    const humanLabel = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());
                    
                    return (
                      <div key={key} className="flex items-center space-x-2 p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                          value ? 'bg-emerald-100 text-emerald-800' : 'bg-red-50 text-red-400'
                        }`}>
                          <Check size={12} className={value ? 'visible' : 'invisible'} />
                        </div>
                        <span className={`text-xs font-semibold ${value ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                          {humanLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Google Map Mock Integration */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Google Maps Location (نقشہ)</span>
                <span className="text-[11px] text-gray-400">Academy Town Peshawar Zone</span>
              </h3>

              <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-inner h-64 bg-gray-100 flex items-center justify-center group">
                {/* Visual Google Map representation */}
                <div className="absolute inset-0 grayscale-20 opacity-90 group-hover:scale-101 transition-transform">
                  <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-sky-50 flex items-center justify-center relative">
                    {/* Simulated map route markers */}
                    <div className="absolute top-1/4 left-1/3 w-32 h-1 bg-brand-gold/40 border border-brand-gold/15 -rotate-12" />
                    <div className="absolute top-1/2 left-10 w-48 h-1 bg-brand-green/30 border border-brand-green/10 rotate-45" />
                    
                    {/* Bilal Masjid Mock Marker */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="px-2.5 py-1 text-[10px] font-bold bg-white text-gray-800 shadow-md rounded-md border border-gray-200 flex items-center space-x-1 z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 block shrink-0" />
                        <span>Bilal Masjid (مسجد)</span>
                      </div>
                    </div>

                    {/* Exact Property Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                      <div className="w-5 h-5 rounded-full bg-brand-green border-2 border-brand-gold shadow-md flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      </div>
                      <div className="h-2 w-0.5 bg-brand-gold" />
                      <div className="px-3 py-1 text-[10px] font-bold bg-brand-green text-brand-gold shadow-lg rounded-full border border-brand-gold/20 flex items-center space-x-1">
                        <span>Property Location Pin</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Satellite toggler control */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 z-10 shadow-xs pointer-events-none">
                  Terrain: 34.0151° N, 71.4802° E
                </div>

                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=Academy+Town+Peshawar+Bilal+Masjid`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-brand-green hover:bg-brand-green-hover text-brand-gold hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all z-10 shadow-md flex items-center space-x-1.5"
                >
                  <MapPin size={12} />
                  <span>Get Live Directions</span>
                </a>
              </div>
            </div>

          </div>

          {/* Sidebar Area: Contact Agent triggers & form */}
          <div className="space-y-6">
            
            {/* Agent Overview Card */}
            <div className="bg-white p-6 rounded-none border border-gray-200 shadow-md space-y-4 border-l-4 border-brand-green">
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold">Property Counselor</h3>
              
              <div className="flex items-center space-x-3.5 border-b border-gray-100 pb-4">
                <div className="w-14 h-14 rounded-none bg-brand-green/10 text-brand-green font-mono font-bold text-lg flex items-center justify-center border border-brand-green/20">
                  KG
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">{prop.contactPerson}</h4>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Managing Partner</p>
                  <p className="text-[11px] text-brand-green font-extrabold">{prop.contactPhone}</p>
                </div>
              </div>

              {/* Direct call links */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${prop.contactPhone}`}
                  className="flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 p-3 rounded-none text-xs font-black uppercase tracking-wider transition-colors"
                >
                  <Phone size={13} className="text-brand-green" />
                  <span>Call Agent</span>
                </a>
                <a
                  href={`https://wa.me/${prop.contactPhone.replace(/\s+/g, '')}?text=Hi%2C%20I%20am%20interested%20in%20your%20property%20listing%20id%20${prop.id}%20(${prop.title}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white p-3 rounded-none text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
                >
                  <MessageCircle size={13} className="fill-white font-sans" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Direct property specific form */}
            <div className="bg-white p-6 rounded-none border border-gray-200 shadow-md space-y-4 border-l-4 border-brand-gold">
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-green border-b border-gray-100 pb-3">
                Send Direct Message <span className="text-[10px] font-normal tracking-normal text-gray-400 block mt-0.5">انکوائری فارم</span>
              </h4>

              {inqSuccess ? (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 rounded-none text-center space-y-2 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                  <h5 className="text-xs font-extrabold uppercase tracking-wider">Inquiry Sent Successfully!</h5>
                  <p className="text-[11px] leading-relaxed">
                    Khaista Gul office has received your inquiry for <strong>{prop.title}</strong> of area {prop.area}. We will contact you back immediately.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => handleInquirySubmit(e, prop)} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={inqName}
                      onChange={(e) => setInqName(e.target.value)}
                      placeholder="e.g Rizwan Gul"
                      className="w-full bg-gray-50 outline-hidden border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:border-brand-green focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={inqPhone}
                      onChange={(e) => setInqPhone(e.target.value)}
                      placeholder="e.g +92 300 1234567"
                      className="w-full bg-gray-50 outline-hidden border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:border-brand-green focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={inqEmail}
                      onChange={(e) => setInqEmail(e.target.value)}
                      placeholder="e.g admin@domain.com"
                      className="w-full bg-gray-50 outline-hidden border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:border-brand-green focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Inquiry Message</label>
                    <textarea
                      value={inqMessage}
                      onChange={(e) => setInqMessage(e.target.value)}
                      rows={3}
                      placeholder={`Hi, I would like to visit ${prop.title} in Academy Town Peshawar. Please share location coordinates and registry copy.`}
                      className="w-full bg-gray-50 outline-hidden border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:border-brand-green focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3.5 rounded-none text-xs font-black uppercase tracking-widest transition-colors shadow-sm border-t-2 border-brand-gold"
                  >
                    Send Property Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Full Screen Image Slider Panel */}
        {isFullScreen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-4">
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 text-white hover:text-brand-gold bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center">
              <img
                src={prop.images[activeImgIndex]}
                alt="Fullscreen listing"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              {prop.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev === 0 ? prop.images.length - 1 : prev - 1))}
                    className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center hover:scale-105"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev === prop.images.length - 1 ? 0 : prev + 1))}
                    className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center hover:scale-105"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            {/* Index summary */}
            <div className="text-white text-xs mt-4 font-mono">
              Image {activeImgIndex + 1} of {prop.images.length}
            </div>
          </div>
        )}

      </div>
    );
  }

  // list view rendering
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="properties-portal-root">
      
      {/* Title & info banner */}
      <div className="border-b border-gray-100 pb-5 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">Search Real-Estate</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-baseline">
          <span>Explore Properties in Peshawar</span>
          <span className="text-brand-green font-normal text-sm ml-2 hidden sm:inline">(تلاش اور فلٹر کا انتظام)</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Explore plots, luxury houses, apartments, and commercial facilities inside Peshawar. Use search query criteria below for instant feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Extensive Search Filter Panel */}
        <div className="bg-white p-6 rounded-none border border-gray-200 shadow-sm h-fit space-y-6 border-t-8 border-brand-green">
          <div className="border-b-2 border-brand-gold pb-3 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Advanced Filters</h3>
            <button
              onClick={handleResetSearch}
              className="text-[10px] text-brand-green hover:text-brand-gold uppercase tracking-wider font-extrabold"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-4">
            
            {/* Purpose */}
            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Deal Purpose</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-gray-300 outline-hidden py-2 text-xs font-bold text-gray-800 rounded-none focus:border-brand-gold"
              >
                <option value="All">Buy & Rent (تمام مقاصد)</option>
                <option value="For Sale">For Sale (براے فروخت)</option>
                <option value="For Rent">For Rent (براے کرایہ)</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-gray-300 outline-hidden py-2 text-xs font-bold text-gray-800 rounded-none focus:border-brand-gold"
              >
                <option value="All">All Categories (تمام اقسام)</option>
                <option value="Residential Plot">Residential Plot (رہائشی پلاٹ)</option>
                <option value="House">House / Villa (گھر)</option>
                <option value="Commercial Plot">Commercial Plot (کمرشل پلاٹ)</option>
                <option value="Shop">Shop / Retail Store (دکان)</option>
                <option value="Apartment">Apartment (فلیٹ)</option>
                <option value="Farm House">Farm House (فارم ہاؤس)</option>
              </select>
            </div>

            {/* Sector Search */}
            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Location / Keywords</label>
              <div className="relative">
                <Search size={14} className="absolute left-0 top-2.5 text-gray-400" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="e.g. Academy Town, Regi..."
                  className="w-full bg-transparent border-0 border-b border-gray-300 outline-hidden pl-7 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:border-brand-gold"
                />
              </div>
            </div>

            {/* Price Ranges in PKR */}
            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Price Range (PKR)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min (e.g. 50 Lakh)"
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-2 text-xs placeholder-gray-400 outline-hidden rounded-none focus:border-brand-gold"
                />
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max (e.g. 4 Crore)"
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-2 text-xs placeholder-gray-400 outline-hidden rounded-none focus:border-brand-gold"
                />
              </div>
              <span className="text-[9px] text-gray-400 block mt-1">Hint: Type numbers or specify Lakh/Crore words dynamically.</span>
            </div>

            {/* Area margins inside Marla */}
            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Area Range (Marlas)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  placeholder="Min Marla"
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-2 text-xs placeholder-gray-400 outline-hidden font-mono rounded-none focus:border-brand-gold"
                />
                <input
                  type="number"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  placeholder="Max Marla"
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-2 text-xs placeholder-gray-400 outline-hidden font-mono rounded-none focus:border-brand-gold"
                />
              </div>
              <span className="text-[9px] text-gray-400 block mt-1 font-mono">1 Kanal = 20 Marla.</span>
            </div>

          </div>

          <button
            onClick={handleResetSearch}
            className="w-full py-3 bg-gray-100 hover:bg-brand-green hover:text-white text-gray-800 text-xs font-black uppercase tracking-widest rounded-none transition-colors border border-gray-200"
          >
            Clear Active Parameters
          </button>
        </div>

        {/* Right Columns: Listing Card Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Status Row */}
          <div className="flex justify-between items-center bg-gray-50 border border-gray-100 p-4 rounded-xl text-xs">
            <span className="font-semibold text-gray-600">
              Filtered listings found: <strong className="text-gray-900 font-mono text-sm">{filteredListings.length}</strong>
            </span>
            <span className="text-brand-green font-bold">Khaista Gul Builders Verified</span>
          </div>

          {/* Empty state view */}
          {filteredListings.length === 0 ? (
            <div className="my-10 p-12 rounded-3xl bg-gray-50 border border-dashed border-gray-200 text-center space-y-3">
              <ShieldAlert size={48} className="text-brand-gold mx-auto" />
              <h3 className="text-sm font-bold text-gray-800">No Verified Properties Found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                We couldn't locate any plots or properties matching those precise filters. Please relax price limits, increase Marla ranges, or clear the search keywords.
              </p>
              <button
                onClick={handleResetSearch}
                className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors mt-2"
              >
                Show All Peshawar Properties again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((prop) => (
                <div 
                  key={prop.id}
                  onClick={() => setSelectedPropertyId(prop.id)}
                  className="group bg-white rounded-none border border-gray-200 hover:border-brand-gold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full border-t-4 border-brand-green"
                >
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden shrink-0">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover transform group-hover:scale-104 transition-transform duration-550"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 font-sans">
                      <span className="bg-brand-green text-brand-gold font-bold text-[9px] uppercase tracking-widest py-1 px-2.5 rounded-none shadow-xs border border-brand-gold">
                        {prop.purpose}
                      </span>
                      <span className="bg-white/95 text-gray-800 font-bold text-[9px] uppercase tracking-widest py-1 px-2.5 rounded-none shadow-xs">
                        {prop.type}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-brand-green text-white font-black text-[11px] py-1 px-2.5 rounded-none border-l-4 border-brand-gold">
                      {prop.price}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow justify-between space-y-3.5">
                    <div className="space-y-1.5">
                      <span className="flex items-center text-[9px] text-gray-400 font-bold tracking-widest uppercase">
                        <MapPin size={11} className="text-brand-gold mr-1 inline shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </span>
                      <h3 className="text-xs font-black uppercase text-gray-950 group-hover:text-brand-green transition-colors line-clamp-1 leading-snug">
                        {prop.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest text-gray-600">
                      <div>
                        <span className="text-gray-400 font-medium">Area: </span>
                        <span className="font-mono text-brand-green">{prop.area}</span>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 text-white bg-brand-green group-hover:bg-brand-gold transition-colors rounded-none select-none border-l-2 border-brand-gold">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
