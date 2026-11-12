import React, { useState } from 'react';
import { Hammer, HardHat, Ruler, Sparkles, Layout, Landmark, Calculator, Check, MessageCircle, Phone, CheckCircle2 } from 'lucide-react';

interface BuildersViewProps {
  onAddLead: (lead: { customerName: string; phone: string; email: string; message: string; propertyName?: string }) => void;
}

export default function BuildersView({ onAddLead }: BuildersViewProps) {
  // Calculator state
  const [plotSize, setPlotSize] = useState<number>(10); // in Marlas
  const [finishType, setFinishType] = useState<'Grey Structure' | 'Turnkey Finished'>('Turnkey Finished');
  const [qualityGrade, setQualityGrade] = useState<'Standard' | 'Premium' | 'Executive'>('Premium');
  
  // Quotation lead state
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Approximate cost calculations per Marla (Peshawar averages)
  // 1 Marla is around 225 or 270 sqft. Let's assume built up area is around 1500 sqft for 5 Marla (Double story)
  // Let's keep a simple formula:
  // Grey Structure rates: Standard = 1.3 Lakh/Marla, Premium = 1.6 Lakh/Marla, Executive = 2 Lakh/Marla (times double story factor)
  // Turnkey Finished rates: Standard = 3.5 Lakh/Marla, Premium = 4.2 Lakh/Marla, Executive = 5.5 Lakh/Marla
  const getCalculatedEstimate = () => {
    let ratePerMarla = 0;
    if (finishType === 'Grey Structure') {
      if (qualityGrade === 'Standard') ratePerMarla = 140000;
      else if (qualityGrade === 'Premium') ratePerMarla = 175000;
      else ratePerMarla = 220000;
    } else {
      if (qualityGrade === 'Standard') ratePerMarla = 360000;
      else if (qualityGrade === 'Premium') ratePerMarla = 440000;
      else ratePerMarla = 580000;
    }

    const baseCost = plotSize * ratePerMarla;
    return baseCost;
  };

  const calculatedCost = getCalculatedEstimate();

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) {
      alert("Name and Phone number are required!");
      return;
    }

    const detailMsg = `Automated Quote Request: ${plotSize} Marla plot, ${finishType} using ${qualityGrade} quality grades. Estimated budget: PKR ${(calculatedCost / 100000).toFixed(1)} Lakh.`;
    
    onAddLead({
      customerName: quoteName,
      phone: quotePhone,
      email: "",
      message: detailMsg,
      propertyName: `Construction Quote (${plotSize} Marla)`
    });

    setQuoteSuccess(true);
    setQuoteName('');
    setQuotePhone('');
    setTimeout(() => setQuoteSuccess(false), 5000);
  };

  const services = [
    {
      id: 'srv-1',
      icon: HardHat,
      title: 'Complete House Construction (ہاؤس ڈویلپمنٹ)',
      description: 'End to end construction services inside Peshawar. We manage architecture alignment, foundations excavation, structural steel casting, brickwork, and plastering with certified structural warranties.',
      bullets: ['Complete design layout validation', 'Seismic earthquake standard frameworks', 'Certified local brick procurement', 'Waterproofing on base layers'],
    },
    {
      id: 'srv-2',
      icon: Hammer,
      title: 'Grey Structure Framework (گرے اسٹرکچر)',
      description: 'We construct a solid, long-lasting physical core skeleton. From basement columns to top RCC slab castings, plumbing pipes mesh layouts, and electrical conduct routing. Finishing tasks are left for your custom pace.',
      bullets: ['Premium grade Senty steel reinforcing bars', 'Cherat high strength cement concrete', 'Fully insulated electrical & utility canals', 'Pre-cast lintel bars and sturdy masonry'],
    },
    {
      id: 'srv-3',
      icon: Ruler,
      title: 'Turnkey Finished Projects (ٹوٹل فنشنگ)',
      description: 'Step into a fully premium, move-in-ready finished villa. We manage absolute everything: high-sheen tiling, customized dual kitchens, solid ash woodwork wardrobes, imported sanitary baths, and external structural painting.',
      bullets: ['Italian & Turkish premium ceramic flooring', 'Custom fitted acrylic modular kitchens', 'Solid safety glass bathroom partitions', 'Weather-shield outdoor cladding systems'],
    },
    {
      id: 'srv-4',
      icon: Landmark,
      title: 'Commercial Complex & Plazas (کمرشل تعمیرات)',
      description: 'High strength, multi-story commercial buildings layout on Ring Road & University Road. Fully compliant with modern PDA bye-laws and structured for heavy civic public parking, dynamic safety escalators alignment, and structural glass fronts.',
      bullets: ['Industrial standard heavy foundation columns', 'Spacious basement layout designs', 'Integrated central cooling conduit shafts', 'Local municipal NOC filings managed'],
    },
    {
      id: 'srv-5',
      icon: Sparkles,
      title: 'Home Renovation & Restyling (مرمت اور تزئین)',
      description: 'Revitalize aging Hayatabad and Cantt houses. Complete internal restructuring, marble refitting, double glass sound insulation layouts, plumbing re-routing, and modern false ceiling designs with ambient warm LED structures.',
      bullets: ['Acoustic soundproof glass panels', 'Modern gypsum false ceiling styles', 'German premium water pipelines upgrades', 'Damp-wall correction treatment'],
    },
    {
      id: 'srv-6',
      icon: Layout,
      title: 'Modern Interior Designing (انٹیریئر ڈیزائن)',
      description: 'Custom aesthetic rendering of living rooms, executive master beds, and corporate boardrooms. We pair modern luxury palettes with traditional Peshawar styles for gorgeous, highly comfortable living zones.',
      bullets: ['3D architectural render review models', 'Dynamic ambient warm light design grids', 'Handcrafted walnut & ash wall details', 'Premium drapery selection consultations'],
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="builders-services-root">
      
      {/* Page Title header */}
      <div className="border-b border-gray-100 pb-5 mb-10 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">Peshawar Builders Division</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex flex-col sm:flex-row sm:items-baseline">
          <span>Builders & Construction Services</span>
          <span className="text-brand-green font-normal text-sm sm:ml-2 mt-1 sm:mt-0">(پشاور کارپوریشن بلڈرز)</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-3xl">
          Construct with confidence under direct monitoring of civil engineers. We provide turnkey residential, commercial, and structural frameworks with verified material schedules.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((srv) => {
          const IconComp = srv.icon;
          return (
            <div key={srv.id} className="bg-white rounded-none border border-gray-200 hover:border-brand-gold p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 border-t-4 border-brand-green">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center shrink-0 border-b-2 border-brand-gold">
                  <IconComp size={22} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wide text-gray-950 font-display leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                {srv.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[10.5px] font-semibold text-gray-650">
                    <CheckCircle2 size={13} className="text-brand-gold shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quotation Calculator Box */}
      <div className="bg-gray-50 rounded-none border border-gray-200/85 p-6 sm:p-10 border-t-8 border-brand-green" id="construction-estimate-calculator">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left panel inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b-2 border-brand-gold pb-3 flex items-center space-x-2.5">
              <Calculator size={20} className="text-brand-green" />
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">Peshawar Construction Cost Calculator</h3>
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Estimate Grey Structure or Turnkey Costs instantly</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Plot Size (Marlas) Selector */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-2">
                  Plot Size (مرلہ سائز): <span className="text-brand-green font-mono">{plotSize} Marla</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="40"
                  step="1"
                  value={plotSize}
                  onChange={(e) => setPlotSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-none appearance-none cursor-pointer accent-brand-green"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>3 Marla</span>
                  <span>5 Marla (Standard)</span>
                  <span>10 Marla (Medium)</span>
                  <span>1 Kanal (20 Marla)</span>
                  <span>2 Kanal (40 Marla)</span>
                </div>
              </div>

              {/* Build Type Radio */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-2">Build Type (تعمیرات کی قسم)</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFinishType('Grey Structure')}
                    className={`p-3 rounded-none border-2 text-xs font-black uppercase tracking-widest flex flex-col items-center transition-all ${
                      finishType === 'Grey Structure'
                        ? 'border-brand-green bg-brand-green/5 text-brand-green shadow-xs'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>Grey Structure Only</span>
                    <span className="text-[9px] text-gray-400 font-normal normal-case mt-0.5">Skeletal walls, concrete roof, conduits</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinishType('Turnkey Finished')}
                    className={`p-3 rounded-none border-2 text-xs font-black uppercase tracking-widest flex flex-col items-center transition-all ${
                      finishType === 'Turnkey Finished'
                        ? 'border-brand-green bg-brand-green/5 text-brand-green shadow-xs'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>Turnkey Finished House</span>
                    <span className="text-[9px] text-gray-400 font-normal normal-case mt-0.5">End to end moves-in ready finishing</span>
                  </button>
                </div>
              </div>

              {/* Material Quality grade selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-2">Material Quality Standard</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Standard', label: 'Standard (اے کلاس)', desc: 'Reliable local brands' },
                    { id: 'Premium', label: 'Premium (ڈبل اے کلاس)', desc: 'High end import & Cherat link' },
                    { id: 'Executive', label: 'Executive (رائل کلاس)', desc: 'Custom luxury Turkish fixtures' },
                  ].map((grade) => (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => setQualityGrade(grade.id as any)}
                      className={`p-2.5 rounded-none border-2 text-[11px] font-black uppercase tracking-wider flex flex-col items-center text-center transition-all ${
                        qualityGrade === grade.id
                          ? 'border-brand-gold bg-brand-green text-brand-gold shadow-xs'
                          : 'border-gray-200 bg-white text-gray-750 hover:bg-gray-50'
                      }`}
                    >
                      <span>{grade.label}</span>
                      <span className="text-[9px] font-medium text-gray-400 mt-1 normal-case">{grade.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right panel output: cost estimates box and quick quote generator */}
          <div className="lg:col-span-5 bg-white rounded-none p-6 sm:p-8 border border-gray-200 shadow-md flex flex-col justify-between space-y-6 border-r-4 border-brand-gold">
            
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold block">estimated pricing result</span>
              
              <div className="bg-brand-green text-white p-5 rounded-none border border-brand-gold/20 flex flex-col items-center justify-center text-center border-t-4 border-brand-gold">
                <span className="text-xs text-brand-gold font-bold uppercase tracking-widest">Approx Peshawar Budget Estimation</span>
                <span className="text-xl sm:text-2xl font-black text-brand-gold mt-1">
                  PKR {(calculatedCost / 100000).toFixed(1)} Lakh
                </span>
                <span className="text-[10px] text-gray-300 font-mono mt-1">
                  (Approx: PKR {(calculatedCost / 10000000).toFixed(2)} Crore)
                </span>
              </div>

              {/* Cost specifications details */}
              <div className="space-y-2 text-xs text-gray-600 font-semibold">
                <div className="flex justify-between border-b border-gray-150 pb-1.5">
                  <span>Plot Dimension:</span>
                  <span className="font-mono text-gray-900">{plotSize} Marla</span>
                </div>
                <div className="flex justify-between border-b border-gray-150 pb-1.5">
                  <span>Structural Framework:</span>
                  <span className="font-semibold text-gray-900">{finishType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Material Grading:</span>
                  <span className="font-semibold text-brand-green">{qualityGrade} Quality</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                * Note: Estimates are based on current cement bags, steel bars, kiln brick labor schedules inside Peshawar KPK. Real prices are subject to structural maps approved.
              </p>
            </div>

            {/* Quick Quote lead form */}
            <div className="pt-4 border-t border-gray-150">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-800 mb-3">Submit This Result To Agent</h4>

              {quoteSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-850 text-[11px] font-bold rounded-none text-center border-2 border-emerald-300 animate-in zoom-in-95">
                  Estimate Submitted! Our civil division will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="Your Name (نام)"
                      className="w-full bg-transparent border-0 border-b border-gray-300 p-2 text-xs outline-hidden focus:border-brand-gold rounded-none"
                    />
                    <input
                      type="tel"
                      required
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      placeholder="Phone (رابطہ نمبر)"
                      className="w-full bg-transparent border-0 border-b border-gray-300 p-2 text-xs outline-hidden focus:border-brand-gold rounded-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-gold hover:bg-brand-green text-white text-xs font-black uppercase tracking-widest rounded-none shadow-sm transition-all border-b-4 border-brand-green"
                  >
                    Get Verified Quote
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
