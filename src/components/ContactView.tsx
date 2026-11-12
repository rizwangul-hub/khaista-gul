import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, CheckCircle2, ShieldCheck, Clock, Send } from 'lucide-react';

interface ContactViewProps {
  onAddLead: (lead: { customerName: string; phone: string; email: string; message: string; propertyName?: string }) => void;
}

export default function ContactView({ onAddLead }: ContactViewProps) {
  // Form state
  const [conName, setConName] = useState('');
  const [conPhone, setConPhone] = useState('');
  const [conEmail, setConEmail] = useState('');
  const [conMsg, setConMsg] = useState('');
  const [conSuccess, setConSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conName || !conPhone) {
      alert("Name and Phone number are required!");
      return;
    }

    onAddLead({
      customerName: conName,
      phone: conPhone,
      email: conEmail,
      message: conMsg || "Submitted general contact page inquiry.",
      propertyName: "Contact Page Inquiry"
    });

    setConSuccess(true);
    setConName('');
    setConPhone('');
    setConEmail('');
    setConMsg('');
    setTimeout(() => setConSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="contact-us-root">
      
      {/* Title header */}
      <div className="border-b border-gray-100 pb-5 mb-10 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">Get In Touch</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex flex-col sm:flex-row sm:items-baseline">
          <span>Contact Our Headquarters</span>
          <span className="text-brand-green font-normal text-sm sm:ml-2 mt-1 sm:mt-0">(رابطہ فارم اور معلومات)</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-3xl">
          Visit our main office at Academy Town, Peshawar, or submit a request online. Our representative will contact you with accurate property files.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Contact details card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-green text-white p-6 sm:p-8 rounded-none border-t-8 border-brand-gold shadow-lg space-y-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <MapPin size={240} className="text-brand-gold" />
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold">Heads Office</span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display leading-none">
                Khaista Gul Property <br />Dealer & Builders
              </h2>
            </div>

            <div className="space-y-4 pt-2 text-xs text-gray-200">
              {/* Office Address */}
              <div className="flex items-start space-x-3.5">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed font-semibold">
                  Main University Road Precinct, Academy Town, Peshawar, KPK, Pakistan
                </p>
              </div>

              {/* Call Hotline */}
              <div className="flex items-center space-x-3.5">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <a href="tel:+923001234567" className="hover:text-brand-gold font-mono font-bold transition-colors">
                  +92 300 1234567
                </a>
              </div>

              {/* WhatsApp Live */}
              <div className="flex items-center space-x-3.5">
                <MessageCircle size={18} className="text-brand-gold shrink-0" />
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold font-mono font-bold transition-colors">
                  +92 300 1234567
                </a>
              </div>

              {/* Email support */}
              <div className="flex items-center space-x-3.5">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <a href="mailto:info@khaistagul.com" className="hover:text-brand-gold transition-colors">
                  info@khaistagul.com
                </a>
              </div>
            </div>

            {/* Operating hours */}
            <div className="pt-4 border-t border-white/10 flex items-start space-x-3 text-xs text-gray-300">
              <Clock size={16} className="text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold">Business Hours:</span>
                <span className="leading-relaxed">Monday - Saturday (09:00 AM - 07:00 PM) Closed Sunday.</span>
              </div>
            </div>
          </div>

          {/* Quick trust metrics panel */}
          <div className="bg-white p-6 rounded-none border border-gray-250 shadow-xs space-y-3 border-l-4 border-brand-green">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 font-display">Client Satisfaction Priorities:</h4>
            <div className="space-y-2 text-xs text-gray-650 font-semibold">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={13} className="text-brand-gold shrink-0" />
                <span>Immediate verified documentation copy sharing.</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={13} className="text-brand-gold shrink-0" />
                <span>On-site physical validation guidance.</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={13} className="text-brand-gold shrink-0" />
                <span>0% third party registry litigation risks.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive contact map AND contact form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-none border border-gray-250 shadow-md space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-150 pb-3 flex justify-between items-baseline">
            <span>Direct Lead Booking Form</span>
            <span className="text-[9px] text-brand-green font-black">رابطہ ریکارڈ کریں</span>
          </h3>

          {conSuccess ? (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-300 text-emerald-850 rounded-none text-center space-y-2 animate-in zoom-in-95 duration-200">
              <ShieldCheck size={36} className="text-emerald-600 mx-auto pointer-events-none" />
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-950">Message Submitted Successfully!</h4>
              <p className="text-[11px] leading-relaxed font-semibold">
                Thank you for contacting Khaista Gul Builders. We have added your details to our active CRM database. Our property specialists will dial you back or WhatsApp you immediately.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={conName}
                    onChange={(e) => setConName(e.target.value)}
                    placeholder="e.g. Rizwan Gul"
                    className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 p-2.5 text-xs text-gray-700 focus:border-brand-gold transition-colors rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={conPhone}
                    onChange={(e) => setConPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 p-2.5 text-xs text-gray-700 focus:border-brand-gold transition-colors rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
                <input
                  type="email"
                  value={conEmail}
                  onChange={(e) => setConEmail(e.target.value)}
                  placeholder="e.g. support@khaistagul.com"
                  className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 p-2.5 text-xs text-gray-700 focus:border-brand-gold transition-colors rounded-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Your Message or property specification</label>
                <textarea
                  required
                  value={conMsg}
                  onChange={(e) => setConMsg(e.target.value)}
                  rows={4}
                  placeholder="Enter details here..."
                  className="w-full bg-transparent outline-hidden border-0 border-b border-gray-300 p-2.5 text-xs text-gray-700 focus:border-brand-gold transition-colors rounded-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-green text-white py-3.5 rounded-none text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 border-b-4 border-brand-green shadow-sm"
              >
                <Send size={13} className="shrink-0" />
                <span>Send Message</span>
              </button>
            </form>
          )}

          {/* Map Section Row */}
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Our Physical Map Coordinates</h4>
            <div className="rounded-none overflow-hidden border border-gray-250 h-44 bg-gray-50 relative">
              {/* Map background mockup */}
              <div className="absolute inset-0 bg-sky-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-brand-green border-2 border-brand-gold animate-ping absolute" />
                  <div className="w-4 h-4 rounded-full bg-brand-green border-2 border-brand-gold shadow-md relative z-10 flex items-center justify-center" />
                  <span className="bg-brand-green text-white text-[9px] font-black px-2.5 py-1 rounded-none border border-brand-gold whitespace-nowrap shadow-xs uppercase tracking-wider">
                    Khaista Gul Office, Academy Town
                  </span>
                </div>
              </div>
              <a 
                href="https://maps.google.com/?q=Academy+Town+Peshawar"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2.5 right-2.5 bg-white text-gray-800 text-[10px] font-extrabold px-3 py-1.5 rounded-none border border-gray-300 shadow-sm uppercase tracking-wider transition-all hover:bg-brand-green hover:text-white"
              >
                Open Google Maps
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
