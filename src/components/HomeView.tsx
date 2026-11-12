import React, { useState } from 'react';
import { Property, Testimonial } from '../types';
import { Search, MapPin, Building2, Phone, MessageCircle, Home, CheckCircle2, ShieldCheck, Star, ArrowRight, TrendingUp, Users, HeartHandshake } from 'lucide-react';

interface HomeViewProps {
  properties: Property[];
  testimonials: Testimonial[];
  setTab: (tab: string) => void;
  setGlobalFilter: (filters: { purpose?: string; type?: string; location?: string }) => void;
  setSelectedPropertyId: (id: string | null) => void;
  onAddLead: (lead: { customerName: string; phone: string; email: string; message: string; propertyName?: string }) => void;
}

export default function HomeView({
  properties,
  testimonials,
  setTab,
  setGlobalFilter,
  setSelectedPropertyId,
  onAddLead
}: HomeViewProps) {
  // Hero search form state
  const [searchPurpose, setSearchPurpose] = useState('For Sale');
  const [searchType, setSearchType] = useState('All Types');
  const [searchLocation, setSearchLocation] = useState('');

  // Local consultation form state
  const [conName, setConName] = useState('');
  const [conPhone, setConPhone] = useState('');
  const [conEmail, setConEmail] = useState('');
  const [conMsg, setConMsg] = useState('');
  const [conSuccess, setConSuccess] = useState(false);

  // Categories helper
  const categories = [
    { title: 'Residential Plots', count: properties.filter(p => p.type === 'Residential Plot').length, typeKey: 'Residential Plot', icon: MapPin },
    { title: 'Luxury Houses', count: properties.filter(p => p.type === 'House').length, typeKey: 'House', icon: Home },
    { title: 'Commercial Plots', count: properties.filter(p => p.type === 'Commercial Plot').length, typeKey: 'Commercial Plot', icon: Building2 },
    { title: 'Commercial Shops', count: properties.filter(p => p.type === 'Shop').length, typeKey: 'Shop', icon: Building2 },
    { title: 'Apartments', count: properties.filter(p => p.type === 'Apartment').length, typeKey: 'Apartment', icon: Home },
    { title: 'Farm Houses', count: properties.filter(p => p.type === 'Farm House').length, typeKey: 'Farm House', icon: TrendingUp }
  ];

  // Featured lists (take first 3)
  const featured = properties.slice(0, 3);
  
  // Latest lists (take last 3)
  const latest = [...properties].reverse().slice(0, 3);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalFilter({
      purpose: searchPurpose,
      type: searchType === 'All Types' ? undefined : searchType,
      location: searchLocation.trim() || undefined
    });
    setTab('properties');
  };

  const handleCategoryClick = (typeKey: string) => {
    setGlobalFilter({
      type: typeKey
    });
    setTab('properties');
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conName || !conPhone) {
      alert("Please fill in your name and phone number!");
      return;
    }
    onAddLead({
      customerName: conName,
      phone: conPhone,
      email: conEmail,
      message: conMsg || "Requested general construction or property consultation.",
      propertyName: "General Consultation"
    });
    setConSuccess(true);
    setConName('');
    setConPhone('');
    setConEmail('');
    setConMsg('');
    setTimeout(() => setConSuccess(false), 5000);
  };

  const navigateToProperty = (id: string) => {
    setSelectedPropertyId(id);
    setTab('properties');
  };

  return (
    <div className="animate-in fade-in-50 duration-500" id="home-view-container">
      
      {/* 1. Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden" id="hero-section">
        {/* Abstract Architectural overlay */}
        <div className="absolute inset-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
            alt="Peshawar architecture layout" 
            className="w-full h-full object-cover filter brightness-50 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
          
          {/* Hero left details & Urdu statement */}
          <div className="max-w-2xl text-center lg:text-left space-y-6">
            <span className="inline-flex items-center space-x-2 bg-brand-green text-white px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-widest border-l-4 border-brand-gold">
              <ShieldCheck size={14} className="mr-1 text-brand-gold" />
              <span>NOC Approved & LDA/KPK registered</span>
            </span>
            <h1 className="text-4.5xl sm:text-5xl lg:text-6.5xl font-black text-white tracking-tighter leading-none uppercase">
              Khaista Gul <br />
              <span className="text-brand-gold">Property Dealer</span> & Builders
            </h1>
            
            {/* Elegant Urdu presentation */}
            <div className="p-5 bg-brand-green/45 border-l-4 border-brand-gold rounded-none shrink-0 text-right">
              <p className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed font-sans" dir="rtl">
                لوگوں کو پشاور میں خرید و فروخت، کرایہ، پلاٹس، گھروں اور کمرشل پراپرٹیز کی معلومات اور اعلیٰ معیار کی تعمیراتی خدمات فراہم کرنا۔
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-semibold">
              We specialize in premium listings across <span className="text-white font-extrabold underline decoration-brand-gold decoration-2">Academy Town, Hayatabad, Regi Model Town, Saddar, and Ring Road Peshawar</span>. Build your core assets with verified legal titles and absolute security.
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <a
                href="tel:+923001234567"
                className="flex items-center justify-center space-x-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-green px-7 py-4 rounded-none font-black text-xs uppercase tracking-widest transition-all border-2 border-brand-gold shadow-sm"
              >
                <Phone size={16} />
                <span>Call Quick Hotline</span>
              </a>
              <a
                href="https://wa.me/923001234567?text=Hi%2C%20I%20am%20interested%20in%20a%20property%20deal%20or%20construction%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-transparent hover:bg-white/5 text-white hover:text-brand-gold px-7 py-4 rounded-none font-black text-xs uppercase tracking-widest transition-all border-2 border-white/60 shadow-sm"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Live Chat</span>
              </a>
            </div>
          </div>

          {/* Hero right: Dynamic Search Form Card */}
          <div className="w-full lg:max-w-md bg-white p-6 sm:p-8 rounded-none shadow-xl border-l-4 border-brand-green flex flex-col">
            <h3 className="text-md font-bold text-gray-900 border-b-2 border-brand-gold pb-3 flex items-center justify-between uppercase tracking-wider">
              <span>Find Your Next Property</span>
              <span className="text-[10px] text-white bg-brand-green px-2 py-0.5 rounded-none font-sans uppercase">تلاش کریں</span>
            </h3>

            <form onSubmit={handleHeroSearchSubmit} className="mt-4 space-y-5">
              
              {/* Purpose Selector Tap */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Purpose (مقصد)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchPurpose('For Sale')}
                    className={`py-2.5 px-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all border ${
                      searchPurpose === 'For Sale'
                        ? 'bg-brand-green text-white border-brand-green shadow-xs'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Buy (خریدیں)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchPurpose('For Rent')}
                    className={`py-2.5 px-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all border ${
                      searchPurpose === 'For Rent'
                        ? 'bg-brand-green text-white border-brand-green shadow-xs'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Rent (کرایہ)
                  </button>
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Property Type (قسم)</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 py-2.5 text-xs text-gray-800 font-bold focus:border-brand-gold rounded-none"
                >
                  <option value="All Types">All Categories (تمام اقسام)</option>
                  <option value="Residential Plot">Residential Plot (رہائشی پلاٹ)</option>
                  <option value="House">House / Villa (گھر)</option>
                  <option value="Commercial Plot">Commercial Plot (کمرشل پلاٹ)</option>
                  <option value="Shop">Shop (دکان)</option>
                  <option value="Apartment">Apartment (فلیٹ)</option>
                  <option value="Farm House">Farm House (فارم ہاؤس)</option>
                </select>
              </div>

              {/* Location Input Filter */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Sector / Location (جگہ)</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-1 top-2.5 text-brand-gold" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Academy Town, Hayatabad..."
                    className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 pl-7 pr-2 py-2 text-xs text-gray-800 font-bold placeholder-gray-400 focus:border-brand-gold rounded-none"
                  />
                </div>
                <span className="text-[9px] text-gray-400 mt-1 block font-medium">Leave empty to view all Peshawar sectors.</span>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-black uppercase tracking-widest py-4 rounded-none transition-colors shadow-md flex items-center justify-center space-x-2 border-t-2 border-brand-gold"
              >
                <Search size={15} className="text-brand-gold" />
                <span>Execute Smart Search</span>
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* 2. Property Categories Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100" id="categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Property Portals</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Explore Property Categories <span className="text-brand-green font-normal text-lg block sm:inline sm:ml-2">(پروڈکٹ کیٹلاگ)</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
              We cover all spectrums of real estate holdings in Peshawar. Click any category block below to instantly view filtered property listings.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleCategoryClick(cat.typeKey)}
                  className="bg-white p-6 rounded-none border border-gray-200 hover:border-brand-gold shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold border border-brand-gold flex items-center justify-center transition-all duration-300 mb-3.5">
                    <IconComp size={20} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 leading-tight group-hover:text-brand-green transition-colors">{cat.title}</h4>
                  <p className="text-[9px] text-gray-500 mt-1 font-mono tracking-wide uppercase">{cat.count} plots</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Featured & Latest Plots Section */}
      <section className="py-16 bg-white" id="featured-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 space-y-3 md:space-y-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Invest Real-Estate</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                Featured Properties <span className="text-brand-green font-normal text-lg block sm:inline sm:ml-2">(نمایاں منڈیاں)</span>
              </h2>
            </div>
            <button
              onClick={() => {
                setGlobalFilter({});
                setTab('properties');
              }}
              className="group text-xs font-bold text-brand-green flex items-center hover:text-brand-gold transition-colors"
            >
              <span>View All Listings ({properties.length})</span>
              <ArrowRight size={14} className="ml-1.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Featured Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((prop) => (
              <div 
                key={prop.id}
                onClick={() => navigateToProperty(prop.id)}
                className="group bg-white rounded-none border border-gray-200 overflow-hidden hover:border-brand-gold shadow-xs hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Image panel & Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 font-sans">
                    <span className="bg-brand-green text-brand-gold font-bold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-none shadow-xs border border-brand-gold/30">
                      {prop.purpose}
                    </span>
                    <span className="bg-white text-gray-800 font-bold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-none shadow-xs border border-gray-200">
                      {prop.type}
                    </span>
                  </div>

                  {/* Price sticker overlay */}
                  <div className="absolute bottom-0 right-0 bg-brand-gold text-brand-green text-[13px] font-black py-2 px-4 shadow-sm rounded-none border-l-2 border-t-2 border-brand-green">
                    {prop.price}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <MapPin size={12} className="text-brand-gold mr-1 inline" />
                      <span>{prop.location}</span>
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>

                  {/* Core stats parameters */}
                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[11px] font-bold text-gray-600">
                    <div>
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Size: </span>
                      <span className="font-mono text-gray-800">{prop.area}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-green bg-brand-green/5 px-2.5 py-1 rounded-none border border-brand-green/10 group-hover:bg-brand-green group-hover:text-white transition-colors">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. About Company Section */}
      <section className="py-16 bg-gray-900 text-white relative overflow-hidden" id="about-us-section">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Building2 size={600} className="text-brand-gold" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image construction illustration */}
          <div className="relative rounded-none overflow-hidden border-2 border-brand-gold shadow-2xl h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800" 
              alt="Builders in Peshawar KPK" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
            
            {/* Quick counters box */}
            <div className="absolute bottom-0 left-0 right-0 bg-brand-green p-6 border-t-4 border-brand-gold flex justify-around text-center rounded-none shadow-lg">
              <div>
                <span className="text-xl sm:text-2xl font-black text-brand-gold block font-mono">15+</span>
                <span className="text-[9px] text-gray-300 uppercase font-black tracking-wider">Years Experience</span>
              </div>
              <div className="border-l border-white/20 h-8 mt-1" />
              <div>
                <span className="text-xl sm:text-2xl font-black text-brand-gold block font-mono">200+</span>
                <span className="text-[9px] text-gray-300 uppercase font-black tracking-wider">Plots Handled</span>
              </div>
              <div className="border-l border-white/20 h-8 mt-1" />
              <div>
                <span className="text-xl sm:text-2xl font-black text-brand-gold block font-mono">40+</span>
                <span className="text-[9px] text-gray-300 uppercase font-black tracking-wider">Houses Built</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Trust & Legitimacy</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              About Khaista Gul Builders <br />
              <span className="text-brand-gold font-normal text-xl sm:text-2xl font-display italic">شراکت داری اور بہترین تعمیرات</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans" dir="rtl">
              خواہ آپ اپنے خوابوں کا گھر پشاور میں تعمیر کرنا چاہتے ہوں یا جائیداد کی تصدیق شدہ خرید و فروخت کا ارادہ رکھتے ہوں، خائستہ گل پراپرٹی ڈیلر اینڈ بلڈرز پشاور کا سب سے بااعتماد اور قانونی نام ہے۔ ہم آپ کے حقوق کو مکمل قانونی تحفظ فراہم کرتے ہیں۔
            </p>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Khaista Gul Property Dealer & Builders has been at the forefront of urban development inside Peshawar, KPK. We provide transparent mediation, legal registry validation (Fard checker), land mapping guidance, and high-performance engineering for residential units, commercial complexes, and private villas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Trusted Dealer / ایجنٹ</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Transparent legal filings with zero land dispute risks.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Verified Properties / جائیدادیں</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Physical possession confirmation before financial deals.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Professional Engineers / بلڈرز</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">In-house architectural and grey skeleton experts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Investment Advice / گائیڈ</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Strategic property evaluations in fast growing domains.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTab('builders')}
              className="mt-4 inline-flex items-center space-x-2 text-xs font-bold text-brand-gold hover:text-white border-b-2 border-brand-gold pb-1.5 transition-colors"
            >
              <span>Explore Builder & Renovation Plans</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="py-16 bg-white border-b border-gray-100" id="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Our Code of Conduct</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Why Choose Khaista Gul Co? <span className="text-brand-green font-normal text-lg block sm:inline sm:ml-2">(ہمارے امتیازات)</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              We operate on basic fundamental business virtues that protect the hard earned wealth of our regional and overseas clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-50 rounded-none border border-gray-250 flex flex-col space-y-3 items-center text-center hover:border-brand-gold transition-colors">
              <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center border border-brand-gold shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">100% Genuine Deeds</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                We perform intensive background verification with land revenue departments for every plot listed.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-none border border-gray-255 flex flex-col space-y-3 items-center text-center hover:border-brand-gold transition-colors">
              <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center border border-brand-gold shadow-sm">
                <TrendingUp size={24} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">Highest ROI Advice</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Our team monitors municipal expansions to point you towards property holdings poised to generate supreme values.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-none border border-gray-255 flex flex-col space-y-3 items-center text-center hover:border-brand-gold transition-colors">
              <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center border border-brand-gold shadow-sm">
                <Users size={24} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">Professional Builders</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Experienced civil engineers overseeing construction foundations, concrete blends, and grey layouts.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-none border border-gray-255 flex flex-col space-y-3 items-center text-center hover:border-brand-gold transition-colors">
              <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center border border-brand-gold shadow-sm">
                <HeartHandshake size={24} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">Overseas Protection</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Dedicated representation for overseas Pakistanis with regular live video reviews and secure contracts.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Genuine Client feedback</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Testimonials <span className="text-brand-green font-normal text-lg block sm:inline sm:ml-2">(کلائنٹ کے خیالات)</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Hear directly from civilian executives, medical specialists, and overseas Pakistanis who built assets with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div key={test.id} className="bg-white p-6 rounded-none border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex space-x-1 text-brand-gold mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed italic mb-5">
                    "{test.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t-2 border-brand-gold/60 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">{test.name}</h4>
                    <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">{test.role}</p>
                  </div>
                  <span className="text-[10px] text-brand-green font-mono font-bold tracking-tight">{test.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Lead Consultation Section */}
      <section className="py-16 bg-white" id="consultation-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-brand-green rounded-none p-6 sm:p-12 text-white relative overflow-hidden shadow-xl border-t-8 border-brand-gold">
            {/* Background elements */}
            <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none">
              <Building2 size={300} className="text-brand-gold" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              {/* Left explanation */}
              <div className="space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Fast Consultation</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
                  Get Free Consultation & <br />Estimations Instant <span className="text-brand-gold block font-display font-medium text-lg mt-1 italic css-rtl">بغیر فیس مشاورت</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  Ready to construct a residential plot? Interested in buying a verified 12 Marla or 1 Kanal property in Peshawar? Fill in this quick details layout, and our Managing Partner Khaista Gul will directly get in touch with you.
                </p>

                <div className="space-y-3 text-xs pt-2">
                  <div className="flex items-center space-x-3 text-gray-200">
                    <CheckCircle2 size={16} className="text-brand-gold" />
                    <span>Instant callback within 2 hours guaranteed on business days.</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-200">
                    <CheckCircle2 size={16} className="text-brand-gold" />
                    <span>Free cost analysis for grey structural skeletons.</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-200">
                    <CheckCircle2 size={16} className="text-brand-gold" />
                    <span>Comprehensive document title checking.</span>
                  </div>
                </div>
              </div>

              {/* Right: Lead Capture Form */}
              <div className="bg-white text-gray-800 p-6 sm:p-8 rounded-none shadow-xl border-l-4 border-brand-gold">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 border-b-2 border-brand-gold pb-3 flex justify-between items-baseline">
                  <span>Consultation Request Form</span>
                  <span className="text-[10px] text-[#0F5132] font-bold">بغیر فیس مشاورت</span>
                </h3>

                {conSuccess ? (
                  <div className="mt-6 p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-800 rounded-none space-y-2 text-center animate-in zoom-in-95 duration-200">
                    <ShieldCheck size={36} className="text-emerald-600 mx-auto" />
                    <h4 className="text-xs font-extrabold uppercase tracking-widest">Thank you, Lead Generated Successfully!</h4>
                    <p className="text-[11px] leading-relaxed">
                      Your details are recorded. Our representative will contact you shortly via <strong>Phone / WhatsApp</strong> at your registered number!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="mt-4 space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={conName}
                          onChange={(e) => setConName(e.target.value)}
                          placeholder="e.g. Rizwan Gul"
                          className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 py-2.5 text-xs text-gray-800 focus:border-brand-gold rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={conPhone}
                          onChange={(e) => setConPhone(e.target.value)}
                          placeholder="e.g. +92 300 0000000"
                          className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 py-2.5 text-xs text-gray-800 focus:border-brand-gold rounded-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        value={conEmail}
                        onChange={(e) => setConEmail(e.target.value)}
                        placeholder="e.g. user@domain.com"
                        className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 py-2.5 text-xs text-gray-800 focus:border-brand-gold rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Message & Real Estate Preference</label>
                      <textarea
                        value={conMsg}
                        onChange={(e) => setConMsg(e.target.value)}
                        rows={3}
                        placeholder="e.g. Interested in buying a 12 Marla residential plot in Academy town Peshawar. Please share legal registries."
                        className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 py-2.5 text-xs text-gray-800 focus:border-brand-gold rounded-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-black uppercase tracking-widest py-4 rounded-none transition-colors shadow-md flex items-center justify-center space-x-2 border-t-2 border-brand-gold"
                    >
                      <MessageCircle size={15} />
                      <span>Submit Request (ریکارڈ جمع کریں)</span>
                    </button>

                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
