import React from 'react';
import { CompletedProject } from '../types';
import { MapPin, Calendar, Banknote, ShieldCheck } from 'lucide-react';

interface ProjectsViewProps {
  projects: CompletedProject[];
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="completed-projects-root">
      
      {/* Page Title */}
      <div className="border-b border-gray-100 pb-5 mb-10 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1 font-display">Contractor Portfolio</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex flex-col sm:flex-row sm:items-baseline">
          <span>Completed Projects Showcase</span>
          <span className="text-brand-green font-normal text-sm sm:ml-2 mt-1 sm:mt-0">(تعمیراتی پورٹ فولیو)</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-3xl">
          Review our successful delivery of triple-story residential villas, commercial structures, farmhouses, and corporate complexes inside top Peshawar residential territories.
        </p>
      </div>

      {/* Bento grid layout of completed projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            id={`project-card-${proj.id}`}
            className="group bg-white rounded-none border border-gray-200 overflow-hidden hover:border-brand-gold shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border-t-4 border-brand-green"
          >
            {/* Project Image Panel */}
            <div className="relative h-64 w-full bg-asphalt-100 overflow-hidden shrink-0">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover transform group-hover:scale-101.5 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Completed tag ribbon */}
              <div className="absolute top-4 left-4 bg-brand-green text-brand-gold text-[9px] font-black uppercase tracking-widest py-1.5 px-3.5 rounded-none shadow-md border border-brand-gold flex items-center">
                <ShieldCheck size={12} className="mr-1.5 shrink-0" />
                <span>100% Handover Completed</span>
              </div>
            </div>

            {/* Project Data details */}
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  <MapPin size={13} className="text-brand-gold shrink-0" />
                  <span className="truncate">{proj.location}</span>
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-gray-950 group-hover:text-brand-green transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Scope parameters footer strip */}
              <div className="pt-4 border-t border-gray-150 grid grid-cols-2 gap-4 text-xs font-semibold text-gray-650">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-brand-green shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold leading-none uppercase tracking-wider">Delivered On</span>
                    <span className="font-mono">{proj.completionDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Banknote size={14} className="text-brand-green shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold leading-none uppercase tracking-wider">Project Budget</span>
                    <span className="font-mono text-brand-green">{proj.budget}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Verification assurance quote */}
      <div className="mt-16 p-8 bg-brand-green rounded-none text-white relative overflow-hidden shadow-md border-r-8 border-brand-gold">
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-sm font-black text-brand-gold uppercase tracking-widest">Constructing On Your Own Plot?</h4>
            <p className="text-xs text-gray-200 font-semibold">
              Get raw material checklists, concrete cylinder test protocols, and soil structural analysis plans scheduled.
            </p>
          </div>
          <a
            href="https://wa.me/923001234567?text=Hi%2C%20I%20am%2520interested%20in%20obtaining%20construction%20advice%20for%20my%20plot."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold hover:bg-white hover:text-brand-green text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-none transition-all shadow-xs shrink-0 border-b-2 border-brand-green"
          >
            Ask Construction Advice
          </a>
        </div>
      </div>

    </div>
  );
}
