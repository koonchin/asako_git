import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE_CONFIG, CONTACT_INFO } from '../constants';
import { SiteDataContext } from '../App'; // <--- Import Context
interface AboutProps {
  hideContact?: boolean;
}

const About: React.FC<AboutProps> = ({ hideContact = false }) => {
  const { t } = useTranslation();
  const siteData = useContext(SiteDataContext);
  const config = siteData?.config || {};

// ✅ 1. อัปเดตตัวแปร contacts เพิ่มแผนที่เข้าไป
  const contacts = [
    { id: 'facebook', label: 'Facebook', link: config.facebook_url, color: 'bg-[#1877F2]' },
    { id: 'line', label: 'Line', link: config.line_url, color: 'bg-[#00C300]' },
    { id: 'tel', label: config.phone || 'Tel', link: config.phone ? `tel:${config.phone}` : '', color: 'bg-green-600' },
    { id: 'mail', label: config.email || 'Email', link: config.email ? `mailto:${config.email}` : '', color: 'bg-gray-600' },
    { id: 'map', label: 'Google Maps', link: config.map_url, color: 'bg-red-500' } // ✅ เพิ่ม Map
  ].filter(c => c.link); // ซ่อนปุ่มอัตโนมัติถ้าไม่ได้กรอกข้อมูล
  // ✅ 2. อัปเดตฟังก์ชันไอคอน
    const renderIcon = (id: string) => {
        if (id === 'facebook') return <img src="/images/facebook-logo.png" alt="Facebook" className="w-full h-full object-cover" />;
        if (id === 'line') return <img src="/images/line-logo.png" alt="Line" className="w-full h-full object-cover" />;
        if (id === 'tel') return <img src="/images/tel-logo.png" alt="Tel" className="w-full h-full object-cover" />;
        if (id === 'mail') return <img src="/images/mail-logo.png" alt="Mail" className="w-full h-full object-cover" />;
        if (id === 'map') return <img src="/images/map-logo.png" alt="Map" className="w-full h-full object-cover" />;
        return null;
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

            <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-6 w-full">
                        {contacts.map((c) => (
                          <a 
                            key={c.id}
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-4 p-6 bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-lg group w-full sm:w-40 md:flex-1 max-w-[250px]"
                          >
                            <div 
                              className="w-16 h-16 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform overflow-hidden bg-transparent"
                            >
                              {renderIcon(c.id)}
                            </div>
                            <div className="space-y-1 text-center w-full">
                              <h3 className="font-bold uppercase tracking-widest text-sm text-gray-800 truncate">{c.label}</h3>
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