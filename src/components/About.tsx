import React from 'react';
import { useTranslation } from 'react-i18next';
import { SITE_CONFIG, CONTACT_INFO } from '../constants';

interface AboutProps {
  hideContact?: boolean;
}

const About: React.FC<AboutProps> = ({ hideContact = false }) => {
  const { t } = useTranslation();

  const renderIcon = (id: string) => {
    if (id === 'facebook') return <img src="/images/facebook-logo.png" alt="Facebook" className="w-full h-full object-cover" />;    
    // ✅ เปลี่ยนเป็นใช้รูปภาพสำหรับ Line
    if (id === 'line') return <img src="/images/line-logo.png" alt="Line" className="w-full h-full object-cover" />;
    
    if (id === 'tel') return <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
    if (id === 'map') return <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z"/></svg>;
    return <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><circle cx="12" cy="12" r="10" /></svg>;
  };

  return (
    <>
      <section id="about" className="py-32 px-6 bg-red-700 text-white overflow-hidden border-t border-red-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          
          <div className="flex-1 relative w-full h-[600px] group">
             <div className="absolute top-4 left-4 w-full h-full border-2 border-red-400 -z-10 group-hover:top-6 group-hover:left-6 transition-all duration-500"></div>
             <div className="w-full h-full overflow-hidden bg-red-800">
               <img 
                 src={SITE_CONFIG.about.founderImage} 
                 alt="Surin Songthanin" 
                 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
               />
             </div>
             {/* ✅ ซ่อน Slogan ไว้ก่อน */}
             {/* <div className="absolute bottom-0 right-0 bg-white text-red-700 p-6 md:p-8 max-w-sm shadow-xl hidden">
                <h3 className="text-2xl font-bold font-serif italic mb-1">"{t('about.slogan')}"</h3>
             </div> */}
          </div>

          <div className="flex-1 space-y-10">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-red-200 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-red-200"></span>
                {t('about.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                {t('about.title')}
              </h2>
              <p className="text-lg font-medium text-red-100 uppercase tracking-widest">
                {t('about.role')}
              </p>
            </div>

            <div className="space-y-6 font-light leading-relaxed text-base md:text-lg border-l-2 border-red-400 pl-6 text-red-50">
              <p className="font-medium text-white">
                {t('about.intro')}
              </p>
              <p>
                {t('about.desc')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <span className="block text-5xl font-black text-white">30+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-200">{t('about.stat_years')}</span>
              </div>
              <div className="space-y-2">
                <span className="block text-5xl font-black text-white">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-200">{t('about.stat_clients')} (One Stop Service)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!hideContact && (
        <section id="contact" className="py-24 px-6 bg-gray-50 border-t border-gray-200 text-gray-900">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tight">
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
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform overflow-hidden"
                    style={{ backgroundColor: (c.id === 'line' || c.id === 'facebook') ? 'transparent' : c.color }}
                  >
                    {renderIcon(c.id)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold uppercase tracking-widest text-sm text-gray-800">{c.id}</h3>
                    <p className="text-gray-500 text-xs">{c.label}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;