// components/Hero.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="pt-40 pb-20 px-6 overflow-hidden bg-white relative">
      {/* Background Graphic (Abstract) */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gray-50 -skew-x-12 translate-x-1/3 -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-red-200 bg-red-50 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-red-700">
              {t('hero.badge')}
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter">
            {t('hero.title_line1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              {t('hero.title_line2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed font-light border-l-4 border-red-600 pl-6">
            {t('hero.subtitle')}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
            onClick={() => navigate('/inventory')}
            className="bg-gray-900 hover:bg-black text-white px-10 py-4 text-s font-bold uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              {t('hero.view_catalog')}
            </button>
            <button 
            onClick={() => navigate('/about')}
            className="border border-gray-300 hover:border-red-600 hover:text-red-600 text-gray-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all bg-white">
              {t('hero.learn_more')}
            </button>
          </div>
        </div>
        
        {/* Hero Image / Graphic */}
        <div className="flex-1 w-full relative h-[500px] lg:h-[600px] flex items-center justify-center">
           <div className="relative w-full h-full">
              {/* ตรวจสอบไฟล์รูป hero.jpg หรือใช้รูปเครื่องจักรเท่ๆ */}
              <img 
                src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=1000" 
                alt="Industrial Machinery" 
                className="w-full h-full object-cover shadow-2xl rounded-sm grayscale hover:grayscale-0 transition-all duration-1000"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl border-t-4 border-red-600 max-w-xs hidden md:block">
                 <p className="text-4xl font-black text-gray-900">30+</p>
                 <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">Years of Excellence</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;