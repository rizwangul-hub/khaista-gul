import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, Facebook, MessageCircle } from 'lucide-react';

interface BlogViewProps {
  blogs: BlogPost[];
}

export default function BlogView({ blogs }: BlogViewProps) {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const activeBlog = blogs.find((b) => b.id === selectedBlogId);

  // If viewing a detailed blog article
  if (activeBlog) {
    const blog = activeBlog;
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="blog-detail-screen">
        
        {/* Back navigation */}
        <button
          onClick={() => setSelectedBlogId(null)}
          className="group flex items-center space-x-2 text-xs font-bold text-brand-green hover:text-brand-gold transition-colors focus:outline-hidden mb-8"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Educational Articles</span>
        </button>

        {/* Article Meta */}
        <div className="space-y-4">
          <span className="inline-block bg-brand-green text-brand-gold font-bold text-[9px] uppercase tracking-widest py-1 px-3 rounded-none border border-brand-gold">
            {blog.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 uppercase tracking-tighter leading-none">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-extrabold uppercase tracking-wider border-b border-gray-150 pb-5">
            <span className="flex items-center">
              <Calendar size={13} className="mr-1.5 text-brand-gold shrink-0" />
              <span>{blog.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock size={13} className="mr-1.5 text-brand-gold shrink-0" />
              <span>{blog.readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center">
              <User size={13} className="mr-1.5 text-brand-gold shrink-0" />
              <span>Khaista Gul Editorial</span>
            </span>
          </div>
        </div>

        {/* Hero image header */}
        <div className="my-6 rounded-none overflow-hidden h-64 sm:h-[400px] border-2 border-brand-green">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Content markup rendering */}
        <div className="prose max-w-none text-xs sm:text-sm text-gray-700 leading-relaxed space-y-6 font-medium">
          {blog.content.split('\n\n').map((para, i) => {
            // Simple markdown header translation
            if (para.startsWith('### ')) {
              return (
                <h3 key={i} className="text-base font-bold text-gray-900 pt-3 tracking-tight border-b border-gray-100 pb-1 font-display">
                  {para.replace('### ', '')}
                </h3>
              );
            }
            if (para.startsWith('1. ') || para.startsWith('- ')) {
              return (
                <ul key={i} className="list-disc list-inside pl-4 space-y-2">
                  {para.split('\n').map((li, j) => (
                    <li key={j} className="text-[11px] sm:text-xs">
                      {li.replace(/^[0-9]\.\s+\*\*/, '').replace(/^-\s+\*\*/, '').replace(/\*\*:/, ':')}
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>

        {/* Share buttons panel */}
        <div className="mt-12 pt-6 border-t-2 border-brand-gold flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Share This Expert Guide:</span>
          
          <div className="flex space-x-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-wider py-2 px-4 rounded-none shadow-xs border-b-2 border-blue-900"
            >
              <Facebook size={12} className="fill-white shrink-0" />
              <span>Facebook</span>
            </a>
            <a 
              href={`https://wa.me/?text=Check%20out%20this%20article:%20${encodeURIComponent(blog.title)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black uppercase tracking-wider py-2 px-4 rounded-none shadow-xs border-b-2 border-emerald-900"
            >
              <MessageCircle size={12} className="fill-white shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>Value;

      </div>
    );
  }

  // Blog general list view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300" id="blog-root">
      
      {/* Title header */}
      <div className="border-b border-gray-100 pb-5 mb-10 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">Knowledge & SEO Hub</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex flex-col sm:flex-row sm:items-baseline">
          <span>Real Estate & Construction Blogs</span>
          <span className="text-brand-green font-normal text-sm sm:ml-2 mt-1 sm:mt-0">(تعلیمی بلاگ)</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-3xl">
          Get structural insights with guides on Peshawar land holdings, grey framework cost planning, registry verification, and safe legal conveyancing in KPK.
        </p>
      </div>

      {/* Blogs list grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => setSelectedBlogId(blog.id)}
            className="group bg-white rounded-none border border-gray-200 overflow-hidden hover:border-brand-gold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full border-t-4 border-brand-green"
          >
            {/* Image banner */}
            <div className="relative h-48 w-full bg-asphalt-50 overflow-hidden shrink-0">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform group-hover:scale-102.5 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-brand-green text-brand-gold font-bold text-[9px] uppercase tracking-widest py-1 px-2.5 rounded-none border border-brand-gold shadow-sm">
                {blog.category}
              </span>
            </div>

            {/* Information panel */}
            <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                  <span className="flex items-center">
                    <Calendar size={11} className="mr-1 text-brand-gold shrink-0" />
                    <span>{blog.date}</span>
                  </span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase text-gray-950 group-hover:text-brand-green transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-150 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-brand-green">
                <span>Read Full Article</span>
                <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
