import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import PropertiesView from './components/PropertiesView';
import BuildersView from './components/BuildersView';
import ProjectsView from './components/ProjectsView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';

// Seed data
import { defaultProperties, defaultProjects, defaultBlogs, defaultTestimonials } from './data/defaultData';
import { Property, InquiryLead } from './types';
import { Phone, MessageCircle } from 'lucide-react';

export default function App() {
  const [currentTab, setTab] = useState<string>('home');
  
  // Persistent Property holds
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('khaista_properties');
    return saved ? JSON.parse(saved) : defaultProperties;
  });

  // Persistent Lead holds
  const [leads, setLeads] = useState<InquiryLead[]>(() => {
    const saved = localStorage.getItem('khaista_leads');
    // Seed some initial leads for admin overview to demonstrate capabilities
    const initialLeads: InquiryLead[] = [
      {
        id: "lead-init-1",
        customerName: "Rizwan Gul",
        phone: "+92 315 9998822",
        email: "rizwangul535@gmail.com",
        propertyName: "12 Marla Premier Residential Plot",
        propertyId: "prop-1",
        message: "Assalam o alaikum, I am highly interested in buying this 12 Marla plot in Academy Town Peshawar. Please share legal registries copy and map coordinate offsets. Shukriya.",
        date: "2026-06-17",
        status: "New"
      },
      {
        id: "lead-init-2",
        customerName: "Engr. Salman Shah",
        phone: "+92 333 5554433",
        email: "salman.shah@example.com",
        propertyName: "Construction Quote (10 Marla)",
        message: "Automated Quote: Interested in executing a 10 Marla premium turnkey finish construction on my family plot in Hayatabad. Send a material schedule list.",
        date: "2026-06-16",
        status: "Contacted"
      }
    ];
    return saved ? JSON.parse(saved) : initialLeads;
  });

  // Global filters exchanged between screens
  const [globalFilters, setGlobalFilters] = useState<{ purpose?: string; type?: string; location?: string }>({});
  
  // Property detailed ID tracking
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Sync properties change
  useEffect(() => {
    localStorage.setItem('khaista_properties', JSON.stringify(properties));
  }, [properties]);

  // Sync leads change
  useEffect(() => {
    localStorage.setItem('khaista_leads', JSON.stringify(leads));
  }, [leads]);

  // Core callback: Add new listing from admin
  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  // Delete listing from admin
  const handleDeleteProperty = (id: string) => {
    if (confirm("Are you sure you want to delete this property listing?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      if (selectedPropertyId === id) setSelectedPropertyId(null);
    }
  };

  // Add new customer inquiry lead
  const handleAddLead = (rawLead: { customerName: string; phone: string; email: string; message: string; propertyId?: string; propertyName?: string }) => {
    const newLead: InquiryLead = {
      id: `lead-${Date.now()}`,
      customerName: rawLead.customerName,
      phone: rawLead.phone,
      email: rawLead.email,
      propertyName: rawLead.propertyName,
      propertyId: rawLead.propertyId,
      message: rawLead.message,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  // Toggle lead contacted status
  const handleUpdateLeadStatus = (id: string, status: 'New' | 'Contacted' | 'Completed') => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  // Delete lead
  const handleDeleteLead = (id: string) => {
    if (confirm("Are you sure you want to delete this customer lead?")) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  // Switch tabs smoothly and scroll to top
  const handleTabChange = (tabId: string) => {
    setTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/20 text-gray-800">
      
      {/* Universal Sticky Header Navigation */}
      <Navbar currentTab={currentTab} setTab={handleTabChange} />

      {/* Main Content Router Segment */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <HomeView
            properties={properties}
            testimonials={defaultTestimonials}
            setTab={handleTabChange}
            setGlobalFilter={setGlobalFilters}
            setSelectedPropertyId={setSelectedPropertyId}
            onAddLead={handleAddLead}
          />
        )}

        {currentTab === 'properties' && (
          <PropertiesView
            properties={properties}
            selectedPropertyId={selectedPropertyId}
            setSelectedPropertyId={setSelectedPropertyId}
            globalFilters={globalFilters}
            setGlobalFilters={setGlobalFilters}
            onAddLead={handleAddLead}
          />
        )}

        {currentTab === 'builders' && (
          <BuildersView onAddLead={handleAddLead} />
        )}

        {currentTab === 'projects' && (
          <ProjectsView projects={defaultProjects} />
        )}

        {currentTab === 'blog' && (
          <BlogView blogs={defaultBlogs} />
        )}

        {currentTab === 'contact' && (
          <ContactView onAddLead={handleAddLead} />
        )}

        {currentTab === 'admin' && (
          <AdminView
            properties={properties}
            leads={leads}
            onAddProperty={handleAddProperty}
            onDeleteProperty={handleDeleteProperty}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onDeleteLead={handleDeleteLead}
          />
        )}
      </main>

      {/* Persistent Footer and credits */}
      <Footer setTab={handleTabChange} />

      {/* Floating Call & WhatsApp Buttons on Bottom Right */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40 select-none font-sans" id="floating-actions-bar">
        {/* Call button */}
        <a
          href="tel:+923001234567"
          className="w-12 h-12 bg-brand-green hover:bg-brand-green-hover text-brand-gold hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 border border-brand-gold/35"
          id="floating-call-trigger"
          title="Call Headquarters"
        >
          <Phone size={20} />
        </a>

        {/* WhatsApp Help button */}
        <a
          href="https://wa.me/923001234567?text=Assalam%20o%20alaikum%2C%20I%20want%20to%20inquire%20about%20plots%20or%20construction%20with%20Khaista%20Gul%20Builders."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          id="floating-whatsapp-trigger"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={22} className="fill-white" />
        </a>
      </div>

    </div>
  );
}
