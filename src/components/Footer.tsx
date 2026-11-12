import React from 'react';
import { Phone, Mail, MapPin, Building2, Facebook, Twitter, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-brand-gold select-none" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setTab('home')}>
            <div className="w-10 h-10 rounded-sm bg-brand-green flex items-center justify-center text-brand-gold border-2 border-brand-gold">
              <Building2 size={20} />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight font-display uppercase">Khaista Gul</span>
              <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest leading-none mt-0.5">Property Dealer & Builders</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            لوگوں کو بہترین اور تصدیق شدہ خرید و فروخت، پلاٹس، گھروں، کرایہ اور جدید ترین تعمیراتی خدمات کے بارے میں معلومات اور رہنمائی فراہم کرنے والا پشاور کا بااعتمد ادارہ۔
          </p>
          <div className="flex space-x-2 pt-2">
            <a 
              href="https://wa.me/923001234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-none border border-brand-gold bg-transparent text-brand-gold hover:bg-brand-gold hover:text-brand-green flex items-center justify-center transition-colors"
            >
              <MessageCircle size={15} />
            </a>
            <a 
              href="tel:+923001234567"
              className="w-9 h-9 rounded-none border border-brand-gold bg-transparent text-brand-gold hover:bg-brand-gold hover:text-brand-green flex items-center justify-center transition-colors"
            >
              <Phone size={15} />
            </a>
          </div>
        </div>

        {/* Categories / Quick Links */}
        <div>
          <h3 className="text-white font-bold text-xs tracking-wider uppercase mb-5 font-display border-b-2 border-brand-gold pb-2">
            Fast Navigation <span className="text-[9px] text-brand-gold block font-sans lowercase mt-0.5">تلاش کا طریقہ</span>
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => setTab('home')} className="hover:text-brand-gold hover:translate-x-1 transition-all flex items-center text-gray-405">
                <ArrowRight size={10} className="mr-2 text-brand-gold" />
                <span>Home Page (ہوم پیج)</span>
              </button>
            </li>
            <li>
              <button onClick={() => setTab('properties')} className="hover:text-brand-gold hover:translate-x-1 transition-all flex items-center text-gray-405">
                <ArrowRight size={10} className="mr-2 text-brand-gold" />
                <span>Properties Portal (پراپرٹیز تلاش کریں)</span>
              </button>
            </li>
            <li>
              <button onClick={() => setTab('builders')} className="hover:text-brand-gold hover:translate-x-1 transition-all flex items-center text-gray-405">
                <ArrowRight size={10} className="mr-2 text-brand-gold" />
                <span>Builders Services (تعمیراتی امور)</span>
              </button>
            </li>
            <li>
              <button onClick={() => setTab('projects')} className="hover:text-brand-gold hover:translate-x-1 transition-all flex items-center text-gray-405">
                <ArrowRight size={10} className="mr-2 text-brand-gold" />
                <span>Success Projects (مکمل شدہ پروجیکٹس)</span>
              </button>
            </li>
            <li>
              <button onClick={() => setTab('blog')} className="hover:text-brand-gold hover:translate-x-1 transition-all flex items-center text-gray-405">
                <ArrowRight size={10} className="mr-2 text-brand-gold" />
                <span>Latest News & Guides (تعلیمی آرٹیکلز)</span>
              </button>
            </li>
            <li>
              <button onClick={() => setTab('admin')} className="hover:text-brand-gold hover:translate-x-1 transition-all flex items-center text-gray-405">
                <ArrowRight size={10} className="mr-2 text-brand-gold" />
                <span>Admin Office Access (انتظامی کنٹرول)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Builder services tags */}
        <div>
          <h3 className="text-white font-bold text-xs tracking-wider uppercase mb-5 font-display border-b-2 border-brand-gold pb-2">
            Construction <span className="text-[9px] text-brand-gold block font-sans lowercase mt-0.5">ہمارے تعمیراتی کام</span>
          </h3>
          <div className="flex flex-wrap gap-2 pt-1 font-sans">
            <span className="text-[10px] px-2.5 py-1 rounded-none border border-gray-800 bg-transparent text-gray-400 hover:border-brand-gold hover:text-white transition-colors cursor-pointer" onClick={() => setTab('builders')}>House Construction</span>
            <span className="text-[10px] px-2.5 py-1 rounded-none border border-gray-800 bg-transparent text-gray-400 hover:border-brand-gold hover:text-white transition-colors cursor-pointer" onClick={() => setTab('builders')}>Grey Structure skeleton</span>
            <span className="text-[10px] px-2.5 py-1 rounded-none border border-gray-800 bg-transparent text-gray-400 hover:border-brand-gold hover:text-white transition-colors cursor-pointer" onClick={() => setTab('builders')}>Turnkey Projects</span>
            <span className="text-[10px] px-2.5 py-1 rounded-none border border-gray-800 bg-transparent text-gray-400 hover:border-brand-gold hover:text-white transition-colors cursor-pointer" onClick={() => setTab('builders')}>Interior Design</span>
            <span className="text-[10px] px-2.5 py-1 rounded-none border border-gray-800 bg-transparent text-gray-400 hover:border-brand-gold hover:text-white transition-colors cursor-pointer" onClick={() => setTab('builders')}>Home Renovation</span>
            <span className="text-[10px] px-2.5 py-1 rounded-none border border-gray-800 bg-transparent text-gray-400 hover:border-brand-gold hover:text-white transition-colors cursor-pointer" onClick={() => setTab('builders')}>Commercial Plazas</span>
          </div>
          <div className="mt-5 p-3.5 rounded-none bg-gray-900 border border-gray-805 border-l-4 border-l-brand-gold flex items-center space-x-2">
            <ShieldCheck size={16} className="text-brand-gold shrink-0" />
            <span className="text-[10px] text-gray-400 font-medium leading-tight">Registered KPK housing agent, guaranteed 100% genuine properties.</span>
          </div>
        </div>

        {/* Contact info details */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 font-display border-b border-gray-800 pb-2">
            Head Office <span className="text-xs text-brand-gold block font-sans lowercase">دفتر کا پتہ</span>
          </h3>
          <ul className="space-y-3.5 text-xs text-gray-400">
            <li className="flex items-start">
              <MapPin size={15} className="text-brand-gold mr-2.5 shrink-0 mt-0.5" />
              <span>Academy Town, Main University Road Area, Peshawar, KPK, Pakistan</span>
            </li>
            <li className="flex items-center">
              <Phone size={15} className="text-brand-gold mr-2.5 shrink-0" />
              <a href="tel:+923001234567" className="hover:text-white transition-colors">+92 300 1234567</a>
            </li>
            <li className="flex items-center">
              <MessageCircle size={15} className="text-brand-gold mr-2.5 shrink-0" />
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chat on WhatsApp</a>
            </li>
            <li className="flex items-center">
              <Mail size={15} className="text-brand-gold mr-2.5 shrink-0" />
              <a href="mailto:info@khaistagul.com" className="hover:text-white transition-colors">info@khaistagul.com</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-gray-500">
          <p>© {currentYear} Khaista Gul Property Dealer & Builders. All Rights Reserved.</p>
          <p className="flex items-center space-x-1 text-[11px]">
            <span>Developed as high-speed SPA</span>
            <span className="text-brand-gold">•</span>
            <span className="font-semibold text-gray-400">Peshawar Real Estate Division</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
