// components/Navbar.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const navLinks = [
    { label: t('nav.inventory'), path: '/inventory' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.about'), path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* ✅ Logo Image */}
        <Link to="/" className="flex items-center">
          {/* ตรวจสอบให้แน่ใจว่าไฟล์ logo.jpg อยู่ใน public/images/ */}
          <img 
            src="/images/logo.jpg" 
            alt="ASAKO THAILAND" 
            className="h-24 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive(link.path) 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                  : 'text-gray-500 hover:text-red-600 hover:pb-1'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-red-600/20 rounded-sm">
            {t('nav.inquire')}
          </button>

          {/* Language Switcher */}
          <div className="relative group ml-4 border-l border-gray-200 pl-4">
            <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-red-600">
              <span className="mr-1">🌐</span> {i18n.language.toUpperCase()}
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button onClick={() => changeLanguage('th')} className="block w-full text-left px-4 py-3 text-xs font-bold hover:bg-gray-50 hover:text-red-600">🇹🇭 Thai</button>
              <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-3 text-xs font-bold hover:bg-gray-50 hover:text-red-600">🇺🇸 English</button>
              <button onClick={() => changeLanguage('cn')} className="block w-full text-left px-4 py-3 text-xs font-bold hover:bg-gray-50 hover:text-red-600">🇨🇳 Chinese</button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 focus:outline-none">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
           </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-24 left-0 w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
        <div className="flex flex-col p-6 gap-6 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-red-600"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex gap-4 border-t border-gray-100 pt-4">
            <button onClick={() => changeLanguage('th')} className={`text-xs font-bold uppercase px-3 py-2 rounded ${i18n.language === 'th' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>TH</button>
            <button onClick={() => changeLanguage('en')} className={`text-xs font-bold uppercase px-3 py-2 rounded ${i18n.language === 'en' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>EN</button>
            <button onClick={() => changeLanguage('cn')} className={`text-xs font-bold uppercase px-3 py-2 rounded ${i18n.language === 'cn' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>CN</button>
          </div>

          <button className="bg-red-600 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest">
            {t('nav.inquire')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;