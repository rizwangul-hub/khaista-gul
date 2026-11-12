import React, { useState } from 'react';
import { Property, InquiryLead } from '../types';
import { Settings, BarChart3, PlusCircle, Trash2, CheckCircle, Clock, Smartphone, MessageCircle, Mail, Tag, MapPin, Table } from 'lucide-react';

interface AdminViewProps {
  properties: Property[];
  leads: InquiryLead[];
  onAddProperty: (prop: Property) => void;
  onDeleteProperty: (id: string) => void;
  onUpdateLeadStatus: (id: string, status: 'New' | 'Contacted' | 'Completed') => void;
  onDeleteLead: (id: string) => void;
}

export default function AdminView({
  properties,
  leads,
  onAddProperty,
  onDeleteProperty,
  onUpdateLeadStatus,
  onDeleteLead
}: AdminViewProps) {
  
  // Tab within Admin Panel
  const [adminTab, setAdminTab] = useState<'stats' | 'properties' | 'leads'>('stats');

  // Form states for creating a new property listing
  const [title, setTitle] = useState('');
  const [ptype, setPtype] = useState<Property['type']>('Residential Plot');
  const [purpose, setPurpose] = useState<Property['purpose']>('For Sale');
  const [price, setPrice] = useState('');
  const [priceNumeric, setPriceNumeric] = useState('');
  const [area, setArea] = useState('');
  const [areaNumeric, setAreaNumeric] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  // Features checklist states
  const [possessionAvailable, setPossessionAvailable] = useState(true);
  const [cornerPlot, setCornerPlot] = useState(false);
  const [parkFacing, setParkFacing] = useState(false);
  const [balloted, setBalloted] = useState(true);
  const [sewerageSystem, setSewerageSystem] = useState(true);
  const [electricityAvailable, setElectricityAvailable] = useState(true);
  const [waterSupply, setWaterSupply] = useState(true);
  const [suiGasAvailable, setSuiGasAvailable] = useState(false);
  const [boundaryWall, setBoundaryWall] = useState(false);

  // Simple custom image URL input or pick default
  const [customImage, setCustomImage] = useState('');

  const [addSuccess, setAddSuccess] = useState(false);

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !area || !location) {
      alert("Please fill in all primary fields!");
      return;
    }

    const priceNum = parseFloat(priceNumeric) || 0;
    const areaNum = parseFloat(areaNumeric) || 0;

    // Use default high quality architecture image if empty
    const imgUrl = customImage.trim() || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800";

    const newProp: Property = {
      id: `prop-custom-${Date.now()}`,
      title,
      type: ptype,
      purpose,
      price,
      priceNumeric: priceNum,
      area,
      areaNumeric: areaNum,
      location,
      description,
      images: [imgUrl],
      features: {
        possessionAvailable,
        cornerPlot,
        parkFacing,
        balloted,
        sewerageSystem,
        electricityAvailable,
        waterSupply,
        suiGasAvailable,
        boundaryWall
      },
      contactPerson: "Khaista Gul Office",
      contactPhone: "+92 300 1234567"
    };

    onAddProperty(newProp);
    setAddSuccess(true);
    
    // Reset Form
    setTitle('');
    setPrice('');
    setPriceNumeric('');
    setArea('');
    setAreaNumeric('');
    setLocation('');
    setDescription('');
    setCustomImage('');
    setCornerPlot(false);
    setParkFacing(false);
    setBoundaryWall(false);

    setTimeout(() => {
      setAddSuccess(false);
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="admin-dashboard-container">
      
      {/* Admin Title header */}
      <div className="border-b border-gray-150 pb-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center space-x-1.5">
            <Settings size={13} />
            <span>Khaista Gul Operating Suite</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Office & Management Panel <span className="text-brand-green font-normal text-sm ml-1 hidden sm:inline">(انتظامی کنٹرول پینل)</span>
          </h1>
        </div>

        {/* Admin Navigation Toggles */}
        <div className="flex bg-gray-100 p-1 rounded-none border border-gray-250 select-none text-xs">
          <button
            onClick={() => setAdminTab('stats')}
            className={`px-4 py-2 rounded-none font-bold transition-all uppercase tracking-wider ${
              adminTab === 'stats' ? 'bg-brand-green text-brand-gold shadow-xs border-r border-brand-gold' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Statistics (اعداد و شمار)
          </button>
          <button
            onClick={() => setAdminTab('properties')}
            className={`px-4 py-2 rounded-none font-bold transition-all uppercase tracking-wider ${
              adminTab === 'properties' ? 'bg-brand-green text-brand-gold shadow-xs border-r border-brand-gold' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Properties ({properties.length})
          </button>
          <button
            onClick={() => setAdminTab('leads')}
            className={`px-4 py-2 rounded-none font-bold transition-all uppercase tracking-wider ${
              adminTab === 'leads' ? 'bg-brand-green text-brand-gold shadow-xs' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Leads Feed ({leads.length})
          </button>
        </div>
      </div>

      {/* 1. STATISTICS TAB VIEW */}
      {adminTab === 'stats' && (
        <div className="space-y-8 animate-in fade-in duration-200" id="admin-stats-view">
          
          {/* Quick Metrics card list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Total properties */}
            <div className="bg-white p-6 rounded-none border border-gray-205 shadow-sm flex items-center justify-between border-t-4 border-brand-green">
              <div className="space-y-1.5">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">Total Listings</span>
                <span className="text-3xl font-black text-brand-green block font-mono">{properties.length}</span>
                <span className="text-[10.5px] text-gray-500 font-bold uppercase tracking-wider">Peshawar holdings</span>
              </div>
              <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold">
                <Tag size={20} />
              </div>
            </div>

            {/* Total Leads */}
            <div className="bg-white p-6 rounded-none border border-gray-205 shadow-sm flex items-center justify-between border-t-4 border-brand-gold">
              <div className="space-y-1.5">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">Customer Leads</span>
                <span className="text-3xl font-black text-brand-gold block font-mono">{leads.length}</span>
                <span className="text-[10.5px] text-emerald-600 font-extrabold uppercase tracking-wider">Active CRM feed</span>
              </div>
              <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold">
                <BarChart3 size={20} />
              </div>
            </div>

            {/* Simulated active traffic */}
            <div className="bg-white p-6 rounded-none border border-gray-255 shadow-sm flex items-center justify-between border-t-4 border-brand-green">
              <div className="space-y-1.5">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">Simulated Visitors</span>
                <span className="text-3xl font-black text-gray-800 block font-mono">1,482</span>
                <span className="text-[10.5px] text-gray-500 font-bold uppercase tracking-wider">High organic click through</span>
              </div>
              <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold">
                <Smartphone size={20} />
              </div>
            </div>

            {/* Verified NOC properties status */}
            <div className="bg-white p-6 rounded-none border border-gray-255 shadow-sm flex items-center justify-between border-t-4 border-brand-gold">
              <div className="space-y-1.5">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">Registry Approved</span>
                <span className="text-3xl font-black text-brand-green block font-mono">100%</span>
                <span className="text-[10.5px] text-neutral-500 font-bold uppercase tracking-wider">Zero litigations</span>
              </div>
              <div className="w-12 h-12 rounded-none bg-brand-green text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold">
                <CheckCircle size={20} />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick action info banner or manual check */}
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200/60 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900 font-display">System Integrity & Legal Controls</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Every property added in this admin board becomes instantly available inside the public facing <strong>Properties Search</strong> system! You can test adding customized land properties and verify how search parameters, Marla ranges, and locations recalculate dynamically.
                </p>
                <p className="text-xs text-gray-500 leading-relaxed font-sans" dir="rtl">
                  پراپرٹیز مینیجر میں کسی بھی قسم کے نئے گھر یا پلاٹ کو جمع کرنے کا فارم مہیا کیا گیا ہے۔ یہاں ڈالا گیا ڈیٹا ہوم پیج اور سرچ فلٹرز میں خود بخود شامل ہو جاتا ہے۔
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 flex space-x-2">
                <button
                  onClick={() => setAdminTab('properties')}
                  className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  Go to Property Management
                </button>
                <button
                  onClick={() => setAdminTab('leads')}
                  className="bg-brand-gold hover:bg-brand-gold-hover text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  Review Customer Leads
                </button>
              </div>
            </div>

            {/* Static distribution details */}
            <div className="bg-white p-6 rounded-3xl border border-gray-155 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Active CRM Log Metrics</h3>
              <div className="space-y-3 text-xs text-gray-650">
                <div className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span className="font-semibold text-gray-500">Unread Leads:</span>
                  <span className="font-mono text-gray-950 font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full">{leads.filter(l => l.status === 'New').length} New</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span className="font-semibold text-gray-500">Contacted Leads:</span>
                  <span className="font-mono text-gray-950">{leads.filter(l => l.status === 'Contacted').length} Pending</span>
                </div>
                <div className="flex justify-between pb-1.5">
                  <span className="font-semibold text-gray-500">Closed Inquiries:</span>
                  <span className="font-mono text-brand-green font-bold">{leads.filter(l => l.status === 'Completed').length} Archived</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 2. PROPERTIES CRUD TAB VIEW */}
      {adminTab === 'properties' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200" id="admin-properties-view">
          
          {/* Add property formulation */}
          <form onSubmit={handleCreateProperty} className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md space-y-5">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-green border-b border-gray-100 pb-2 flex justify-between items-baseline">
              <span>Insert New Property Listing</span>
              <span className="text-[10px] text-brand-gold font-bold">پراپرٹی کا اندراج کریں</span>
            </h3>

            {addSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-150 text-emerald-800 text-xs font-bold rounded-lg text-center animate-in zoom-in-95">
                Property Added dynamically! View below or inside search lists.
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Property Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10 Marla Brand New Modern House"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-gray-700 outline-hidden focus:border-brand-green"
              />
            </div>

            {/* Type / Purpose */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Section Purpose</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-xs"
                >
                  <option value="For Sale">For Sale (فروخت)</option>
                  <option value="For Rent">For Rent (کرایہ)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Listing Type</label>
                <select
                  value={ptype}
                  onChange={(e) => setPtype(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-xs"
                >
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="House">House / Villa</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                  <option value="Shop">Shop / Retail Store</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Farm House">Farm House</option>
                </select>
              </div>
            </div>

            {/* Price String and Price Numeric */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Price String *</label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. PKR 55 Lakh"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Price Numeric (PKR) *</label>
                <input
                  type="number"
                  required
                  value={priceNumeric}
                  onChange={(e) => setPriceNumeric(e.target.value)}
                  placeholder="e.g. 5500000"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-hidden font-mono"
                />
              </div>
            </div>

            {/* Area String & Area Marla Numeric */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Area String *</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. 12 Marla"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Marlas Numeric *</label>
                <input
                  type="number"
                  required
                  value={areaNumeric}
                  onChange={(e) => setAreaNumeric(e.target.value)}
                  placeholder="e.g 12"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-hidden font-mono"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Peshawar Sector Sector *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Academy Town, Peshawar"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-hidden"
              />
            </div>

            {/* Custom Image URL */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Main Image URL (or Leave blank)</label>
              <input
                type="url"
                value={customImage}
                onChange={(e) => setCustomImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-hidden text-[11px] font-mono"
              />
            </div>

            {/* Description detailed layout */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 font-display">Property description text</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe masjid proximities, corner roads parameters, etc."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-hidden"
              />
            </div>

            {/* Features Checklists */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 font-display">Select physical features (سہولیات)</label>
              
              <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={possessionAvailable} onChange={(e) => setPossessionAvailable(e.target.checked)} />
                  <span>Possession Available</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={cornerPlot} onChange={(e) => setCornerPlot(e.target.checked)} />
                  <span>Corner Plot</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={parkFacing} onChange={(e) => setParkFacing(e.target.checked)} />
                  <span>Park Facing</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={balloted} onChange={(e) => setBalloted(e.target.checked)} />
                  <span>Balloted Lot</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={sewerageSystem} onChange={(e) => setSewerageSystem(e.target.checked)} />
                  <span>Sewerage System</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={electricityAvailable} onChange={(e) => setElectricityAvailable(e.target.checked)} />
                  <span>Electricity Active</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={waterSupply} onChange={(e) => setWaterSupply(e.target.checked)} />
                  <span>Water Supply</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={suiGasAvailable} onChange={(e) => setSuiGasAvailable(e.target.checked)} />
                  <span>Sui Gas Active</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-green hover:bg-brand-green-hover text-brand-gold text-xs font-bold uppercase rounded-lg shadow-sm"
            >
              Add Property To Database
            </button>
          </form>

          {/* Existing properties checker list */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-md space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-2">
              Registered Listings ({properties.length} entries)
            </h3>

            <div className="overflow-y-auto max-h-[640px] space-y-3.5 pr-2">
              {properties.map((prop) => (
                <div key={prop.id} className="p-3.5 bg-gray-50 hover:bg-gray-100/70 border border-gray-150 rounded-xl flex justify-between items-center text-xs animate-in fade-in-50 duration-150">
                  <div className="flex items-center space-x-3.5">
                    <img src={prop.images[0]} alt="thumb" className="w-12 h-12 rounded-lg object-cover border shrink-0" referrerPolicy="no-referrer" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] bg-brand-green/10 text-brand-green font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {prop.type}
                      </span>
                      <h4 className="font-bold text-gray-900 line-clamp-1">{prop.title}</h4>
                      <p className="text-[11px] text-gray-500 font-medium">Location: {prop.location} • {prop.area}</p>
                      <p className="text-[11px] text-brand-green font-bold">{prop.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteProperty(prop.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 3. LEADS CRM FEED TABLE VIEW */}
      {adminTab === 'leads' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-md space-y-6 animate-in fade-in duration-200" id="admin-leads-view">
          
          <div className="border-b border-gray-100 pb-3 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Active Customer inquiries Leads CRM</h3>
              <p className="text-xs text-gray-500">Review submissions lodged by potential clients on consultation grids and property detail sheets.</p>
            </div>
            
            <span className="font-mono text-xs font-bold text-brand-gold bg-brand-green px-3 py-1 rounded-full">
              CRM Count: {leads.length} leads
            </span>
          </div>

          {leads.length === 0 ? (
            <div className="p-12 border border-dashed border-gray-200 rounded-2xl text-center text-xs text-gray-500 font-semibold uppercase">
              No Client leads submitted yet. Navigate to properties or consultation to submit simulation inquiries!
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    lead.status === 'New' 
                      ? 'border-l-4 border-l-brand-gold border-gray-200 bg-amber-50/15' 
                      : lead.status === 'Contacted'
                        ? 'border-l-4 border-l-blue-500 border-gray-205 bg-blue-50/5'
                        : 'border-l-4 border-l-emerald-500 border-gray-150 bg-gray-50/40 opacity-70'
                  }`}
                >
                  {/* Lead meta info */}
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block font-mono">Inquiry Timestamp: {lead.date}</span>
                      <h4 className="text-sm font-bold text-gray-950 flex items-center gap-2">
                        <span>{lead.customerName}</span>
                        {lead.propertyName && (
                          <span className="text-[10px] bg-brand-green/10 text-brand-green font-bold uppercase px-2.5 py-0.5 rounded-full border border-brand-green/15">
                            Pref: {lead.propertyName}
                          </span>
                        )}
                      </h4>
                      
                      {/* Contacts strip */}
                      <div className="flex flex-wrap items-center gap-3.5 text-xs text-gray-600 font-semibold pt-1">
                        <a href={`tel:${lead.phone}`} className="flex items-center hover:text-brand-green transition-colors">
                          <Smartphone size={12} className="mr-1 inline text-brand-gold" />
                          <span>{lead.phone}</span>
                        </a>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center hover:text-brand-green transition-colors">
                            <Mail size={12} className="mr-1 inline text-brand-gold" />
                            <span>{lead.email}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center space-x-2">
                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                        className="bg-white border text-xs font-bold rounded-lg p-1.5 focus:outline-hidden"
                      >
                        <option value="New">🟢 New (انکوائری)</option>
                        <option value="Contacted">🔵 Contacted (pending)</option>
                        <option value="Completed">⚪ Completed (archived)</option>
                      </select>
                      
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="p-4 bg-white border border-gray-100 rounded-xl text-xs sm:text-sm text-gray-700 font-medium whitespace-pre-wrap">
                    "{lead.message}"
                  </div>

                  {/* Quick responses shortcuts */}
                  <div className="pt-2 border-t border-gray-50 flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\s+/g, '')}?text=Hi%20${encodeURIComponent(lead.customerName)}%2C%20this%2520is%20Khaista%20Gul%20Builders%20Peshawar.%20We%20received%20your%20inquiry%20regarding%20${encodeURIComponent(lead.propertyName || 'properties')}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 px-3.5 rounded-xl transition-colors shadow-xs"
                    >
                      <MessageCircle size={12} className="fill-white" />
                      <span>Reply on WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-bold py-1.5 px-3.5 rounded-xl transition-colors"
                    >
                      <Smartphone size={12} className="text-brand-green" />
                      <span>Direct Dial Call</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
