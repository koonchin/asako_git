// components/About.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SITE_CONFIG, CONTACT_INFO } from '../constants'; // ✅ Import

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <section id="about" className="py-32 px-6 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          
          {/* ✅ Image Section */}
          <div className="flex-1 relative w-full h-[600px] group">
             <div className="absolute top-4 left-4 w-full h-full border-2 border-gray-100 -z-10 group-hover:top-6 group-hover:left-6 transition-all duration-500"></div>
             <div className="w-full h-full overflow-hidden bg-gray-100">
               <img 
                 src={SITE_CONFIG.about.founderImage} // ✅ Use Config
                 alt="Surin Songthanin" 
                 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
               />
             </div>
             <div className="absolute bottom-0 right-0 bg-red-600 text-white p-6 md:p-8 max-w-sm">
                <h3 className="text-2xl font-bold font-serif italic mb-1">"{t('about.slogan')}"</h3>
             </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-10">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-red-600 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-red-600"></span>
                {t('about.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                {t('about.title')}
              </h2>
              <p className="text-lg font-medium text-gray-900 uppercase tracking-widest">
                {t('about.role')}
              </p>
            </div>

            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-base md:text-lg border-l-2 border-gray-200 pl-6">
              <p className="font-medium text-gray-800">
                {t('about.intro')}
              </p>
              <p>
                {t('about.desc')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <span className="block text-5xl font-black text-gray-200">30+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">{t('about.stat_years')}</span>
              </div>
              <div className="space-y-2">
                <span className="block text-5xl font-black text-gray-200">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">{t('about.stat_clients')} (One Stop Service)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ New Contact Section Added at the end */}
      <section id="contact" className="py-24 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900">
              {t('contact.title')}
            </h2>
            <p className="text-gray-500">
              {t('contact.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {CONTACT_INFO.map((c) => (
              <a 
                key={c.id}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-lg group"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-md"
                  style={{ backgroundColor: c.color }}
                >
                  {/* Simple generic icon based on ID logic or generic */}
                  {c.id === 'tel' ? '📞' : c.id === 'line' ? '💬' : c.id === 'facebook' ? 'f' : '📍'}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm">{c.id}</h3>
                  <p className="text-gray-500 text-xs">{c.label}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;