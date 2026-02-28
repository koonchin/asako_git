import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE_CONFIG } from '../constants';
import { SiteDataContext } from '../App'; 

interface AboutProps {
  hideContact?: boolean;
}

const About: React.FC<AboutProps> = ({ hideContact = false }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  
  const siteData = useContext(SiteDataContext);
  const config = siteData?.config || {};

  // ฟังก์ชันดึงข้อความจาก Database (Translations)
  const getText = (keyPath: string) => {
    const [cat, key] = keyPath.split('.');
    return siteData?.i18n?.[cat]?.[key]?.[lang] || t(keyPath);
  };

  // จัดการชื่ออีเมลแสดงเฉพาะก่อน @
  const getMailDisplay = (email: string) => email ? email.split('@')[0].toUpperCase() : 'EMAIL';

  // ลบอักขระพิเศษออกจากเบอร์โทรเพื่อให้กดโทรออกได้จริง
  const getCallablePhone = (tel: string) => tel.replace(/\D/g, '').substring(0, tel.startsWith('02') ? 9 : 10);

  const contacts = [
    { id: 'facebook', label: 'FACEBOOK', link: config.facebook_url },
    { id: 'line', label: 'LINE', link: config.line_url },
    { id: 'tel', label: config.phone || 'TEL', link: config.phone ? `tel:${getCallablePhone(config.phone)}` : '' },
    { id: 'mail', label: getMailDisplay(config.email), link: config.email ? `mailto:${config.email}` : '' },
    { id: 'map', label: 'GOOGLE MAPS', link: config.map_url }
  ].filter(c => c.link);

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
      {/* ส่วนประวัติ (พื้นหลังแดง) */}
      <section id="about" className="py-32 px-6 bg-red-700 text-white overflow-hidden border-t border-red-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          
          <div className="flex-1 relative w-full h-[600px] group">
             <div className="absolute top-4 left-4 w-full h-full border-2 border-red-400 -z-10 group-hover:top-6 group-hover:left-6 transition-all duration-500"></div>
             <div className="w-full h-full overflow-hidden bg-red-800">
               <img 
                 src={SITE_CONFIG.about.founderImage} 
                 alt="Surin Songthanintr" 
                 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
               />
             </div>
             {/* ✅ แสดงสโลแกน */}
             {/* <div className="absolute bottom-0 right-0 bg-white text-red-700 p-6 md:p-8 max-w-sm shadow-xl">
                <h3 className="text-2xl font-bold font-serif italic mb-1">"{getText('about.slogan')}"</h3>
             </div> */}
          </div>

          <div className="flex-1 space-y-10">
            <div className="space-y-2">
              <span className="text-sm font-black uppercase tracking-[0.3em] text-red-200 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-red-200"></span>
                {getText('about.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black">
                {getText('about.title')}
              </h2>
              <p className="text-xl font-medium text-red-100 uppercase tracking-widest">
                {String(getText('about.role')).split(/(ASAKO)/i).map((text, i) => 
                  text.toUpperCase() === 'ASAKO' ? (
                    <span key={i} className="text-black font-black"> {text}</span>
                  ) : (
                    <span key={i}>{text}</span>
                  )
                )}
              </p>
            </div>

            <div className="space-y-6 font-light leading-relaxed text-base md:text-xl border-l-2 border-red-400 pl-6 text-red-50">
              <p className="font-medium text-white">
                {getText('about.intro')}
              </p>
              <p>
                {getText('about.desc')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <span className="block text-6xl font-black text-black">30+</span>
                <span className="text-sm font-bold uppercase tracking-widest text-red-200">{getText('about.stat_years')}</span>
              </div>
              <div className="space-y-2">
                <span className="block text-6xl font-black text-black">100%</span>
                <span className="text-sm font-bold uppercase tracking-widest text-red-200">{getText('about.stat_clients')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ ส่วนติดต่อ (พื้นหลังขาว) */}
      {!hideContact && (
        <section id="contact" className="py-24 px-6 bg-white border-t border-gray-100 text-gray-900">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900">
                {getText('contact.title')}
              </h2>
              <div className="w-16 h-1 bg-red-600 mx-auto"></div>
              <p className="text-gray-500 font-medium italic">
                {getText('contact.desc')}
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform overflow-hidden bg-transparent">
                    {renderIcon(c.id)}
                  </div>
                  <div className="space-y-1 text-center w-full">
                    <h3 className="font-bold uppercase tracking-widest text-sm text-gray-800 break-words">{c.label}</h3>
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