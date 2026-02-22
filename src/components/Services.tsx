import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../constants';
import { SiteDataContext } from '../App'; // <--- Import Context

const Services: React.FC = () => {
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
  
  const highlights = [
    { title: t('highlights.item1_t'), desc: t('highlights.item1_d'), icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { title: t('highlights.item2_t'), desc: t('highlights.item2_d'), icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /> },
    { title: t('highlights.item3_t'), desc: t('highlights.item3_d'), icon: <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.006 3.42 3.42 0 014.438 0c.699.57 1.489.92 2.33 1.006a3.42 3.42 0 012.835 2.835c.086.841.436 1.631 1.006 2.33a3.42 3.42 0 010 4.438c-.57.699-.92 1.489-1.006 2.33a3.42 3.42 0 01-2.835 2.835 3.42 3.42 0 01-2.33 1.006 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-2.33-1.006 3.42 3.42 0 01-2.835-2.835 3.42 3.42 0 01-1.006-2.33 3.42 3.42 0 010-4.438c.57-.699.92-1.489 1.006-2.33a3.42 3.42 0 012.835-2.835z" /> },
    { title: t('highlights.item4_t'), desc: t('highlights.item4_d'), icon: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> },
    { title: t('highlights.item5_t'), desc: t('highlights.item5_d'), icon: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
    { title: t('highlights.item6_t'), desc: t('highlights.item6_d'), icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
    { title: t('highlights.item7_t'), desc: t('highlights.item7_d'), icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> },
    { title: t('highlights.item8_t'), desc: t('highlights.item8_d'), icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> }
  ];

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
      <section id="services" className="py-24 px-6 bg-red-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
              {t('highlights.title')}
            </h2>
            <p className="text-lg md:text-xl font-medium text-white/90 max-w-2xl mx-auto">
              {t('highlights.subtitle')}
            </p>
            <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {highlights.map((item, i) => (
              <div 
                key={i} 
                className="group p-8 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:border-transparent hover:-translate-y-2 transition-all duration-300 cursor-pointer rounded-xl flex flex-col items-center text-center shadow-lg"
              >
                <div className="w-16 h-16 shrink-0 bg-white text-red-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-red-700">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-white/70 transition-colors duration-300 group-hover:text-red-600/80 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-200 text-gray-900">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              {t('contact.title') || "Contact Us"}
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto"></div>
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
    </>
  );
};

export default Services;