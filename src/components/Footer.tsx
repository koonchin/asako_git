import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SiteDataContext } from '../App'; // ✅ Import Context

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  // ✅ ดึงข้อมูล config จาก Database
  const siteData = useContext(SiteDataContext);
  const config = siteData?.config || {};

  // ✅ ดึงที่อยู่ให้ตรงตามภาษาปัจจุบัน
  const getAddress = () => {
    if (lang === 'th') return config.address_th;
    if (lang === 'cn') return config.address_cn;
    return config.address_en || "Bangkok, Thailand"; // Fallback
  };

const contacts = [
    { id: 'facebook', label: 'Facebook', link: config.facebook_url },
    { id: 'line', label: 'Line', link: config.line_url },
    { id: 'tel', label: config.phone || 'Tel', link: config.phone ? `tel:${config.phone}` : '' },
    { id: 'mail', label: config.email || 'Email', link: config.email ? `mailto:${config.email}` : '' },
    { id: 'map', label: 'Google Maps', link: config.map_url } // ✅ เพิ่ม Map
  ].filter(c => c.link);

  
  return (
      <footer className="bg-white pt-24 pb-12 px-6 text-gray-800 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            {/* Column 1: Logo & Address */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-sm">
                  <span className="text-white font-black text-xs">ASK</span>
                </div>
                <span className="text-lg font-black tracking-tighter uppercase text-gray-900">
                  Asako<span className="text-gray-500">THAILAND</span>
                </span>
              </div>
              {/* ✅ ใช้ที่อยู่ที่ดึงจาก Database */}
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest leading-loose whitespace-pre-line">
                {getAddress()}
              </p>
            </div>

          {/* Column 2: Quick Links (เปลี่ยนให้เข้ากับเว็บ) */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6 opacity-80">
              Quick Links
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <li><Link to="/" className="hover:text-red-600 transition-colors">Home</Link></li>
              <li><Link to="/inventory" className="hover:text-red-600 transition-colors">{t('nav.inventory') || 'Inventory'}</Link></li>
              <li><Link to="/services" className="hover:text-red-600 transition-colors">{t('nav.services') || 'Services'}</Link></li>
              <li><Link to="/about" className="hover:text-red-600 transition-colors">{t('nav.about') || 'About Us'}</Link></li>
            </ul>
          </div>

{/* Column 3: Contact Info */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6 opacity-80">
              {t('nav.contact') || 'Contact Us'}
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              {/* ✅ ใช้ contacts ที่มาจาก Database */}
              {contacts.map(c => (
                <li key={c.id}>
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                    {c.id.toUpperCase()}: {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6 opacity-80">
              {t('footer.col_newsletter')}
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.email_placeholder')}
                className="flex-1 bg-gray-50 border border-gray-200 px-4 py-3 text-[10px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-600 transition-colors"
              />
              <button className="bg-red-600 text-white px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors">
                {t('footer.btn_join')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            {t('footer.rights')}
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-red-600 transition-colors">{t('footer.link_privacy')}</a>
            <a href="#" className="hover:text-red-600 transition-colors">{t('footer.link_terms')}</a>
            <a href="#" className="hover:text-red-600 transition-colors">{t('footer.link_ethics')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;