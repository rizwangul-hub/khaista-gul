import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Building2, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', labelUrdu: 'ہوم' },
    { id: 'properties', label: 'Properties', labelUrdu: 'پراپرٹیز' },
    { id: 'builders', label: 'Builders Services', labelUrdu: 'تعمیراتی خدمات' },
    { id: 'projects', label: 'Completed Projects', labelUrdu: 'پروجیکٹس' },
    { id: 'blog', label: 'Real Estate Blog', labelUrdu: 'بلاگ' },
    { id: 'contact', label: 'Contact Us', labelUrdu: 'رابطہ کریں' },
    { id: 'admin', label: 'Admin Panel', labelUrdu: 'ایڈمن', isSpecial: true },
  ];

  const handleNavClick = (tabId: string) => {
    setTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-green text-white border-b-4 border-brand-gold shadow-md">
      {/* Top bar with quick contact info */}
      <div className="hidden sm:flex bg-brand-green-hover text-white/90 py-2 px-4 text-xs font-medium justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-4">
          <span className="flex items-center hover:text-brand-gold transition-colors">
            <Phone size={12} className="mr-1.5 text-brand-gold" />
            +92 300 1234567
          </span>
          <span className="flex items-center hover:text-brand-gold transition-colors">
            <Mail size={12} className="mr-1.5 text-brand-gold" />
            info@khaistagul.com
          </span>
          <span className="flex items-center">
            <MapPin size={12} className="mr-1.5 text-brand-gold" />
            Academy Town, Peshawar
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="p-1 px-2 rounded-sm bg-white/10 text-brand-gold font-semibold uppercase tracking-wider">
            Verified KPK Property Dealer & Registered Builders
          </span>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Brand Group */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
            id="nav-logo-group"
          >
            <div className="w-12 h-12 rounded-sm bg-white flex items-center justify-center text-[#0F5132] font-black text-xl group-hover:scale-105 transition-transform duration-300 shadow-sm border-2 border-brand-gold">
              KG
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-black tracking-tight text-white font-display uppercase">Khaista Gul</span>
                <span className="text-[9px] font-bold text-[#0F5132] uppercase tracking-wider bg-brand-gold px-1.5 py-0.5 rounded-sm">Builders</span>
              </div>
              <p className="text-[10px] text-brand-gold uppercase font-bold tracking-widest -mt-0.5">Property Dealer & Construction Co.</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-1 select-none">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 outline-hidden ${
                  item.isSpecial 
                    ? currentTab === item.id 
                      ? 'bg-brand-gold text-brand-green shadow-sm' 
                      : 'text-brand-gold border-2 border-brand-gold hover:bg-brand-gold hover:text-brand-green'
                    : currentTab === item.id
                      ? 'text-brand-gold font-extrabold border-b-2 border-brand-gold'
                      : 'text-white/80 hover:text-brand-gold hover:border-b-2 hover:border-brand-gold/60'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>{item.label}</span>
                  <span className="text-[9px] font-normal tracking-wide lowercase opacity-65 -mt-0.5">
                    {item.labelUrdu}
                  </span>
                </div>
              </button>
            ))}
          </nav>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center space-x-2.5">
            <a
              href="tel:+923001234567"
              id="header-call-btn"
              className="flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-green px-5 py-2.5 rounded-none text-xs font-extrabold uppercase tracking-widest transition-all duration-200"
            >
              <Phone size={14} className="text-brand-green" />
              <span>Call Now</span>
            </a>
            <a
              href="https://wa.me/923001234567?text=Hi%2C%20I%20am%20interested%20in%20properties%20and%20construction%20services%20with%20Khaista%20Gul%20Builders."
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-brand-green px-5 py-2.5 rounded-none text-xs font-extrabold uppercase tracking-widest transition-all duration-200 shadow-sm"
            >
              <MessageCircle size={14} className="text-brand-green" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Hamburguer button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center p-2 rounded-none text-white hover:text-brand-gold hover:bg-brand-green-hover transition-colors focus:outline-hidden"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="lg:hidden border-t-2 border-brand-gold bg-brand-green text-white shadow-xl animate-in fade-in-50 duration-200" id="mobile-menu-drawer">
          <div className="px-2 pt-2 pb-5 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-colors ${
                  currentTab === item.id
                    ? 'bg-brand-gold text-brand-green font-extrabold'
                    : 'text-white/80 hover:bg-brand-green-hover hover:text-brand-gold'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-xs ${currentTab === item.id ? 'text-brand-green font-bold' : 'text-brand-gold/60'}`}>
                  {item.labelUrdu}
                </span>
              </button>
            ))}
            <div className="pt-4 pb-1 border-t border-white/15 px-4 flex flex-col space-y-2">
              <a
                href="tel:+923001234567"
                className="flex items-center justify-center space-x-2 w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-green py-3 rounded-none text-xs font-extrabold uppercase tracking-widest transition-colors"
               >
                <Phone size={15} />
                <span>Call Quick Hotline</span>
              </a>
              <a
                href="https://wa.me/923001234567?text=Hi%2C%20I%20am%20interested"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full bg-white hover:bg-gray-150 text-brand-green py-3 rounded-none text-xs font-extrabold uppercase tracking-widest transition-colors"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
