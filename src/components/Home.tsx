import React, { useContext } from 'react';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import About from './About';
import Services from './Services';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; 
import { SITE_CONFIG } from '../constants';
import { SiteDataContext } from '../App';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const lang = i18n.language || 'en';
  
  const siteData = useContext(SiteDataContext);
  const config = siteData?.config || {};

  // ✅ เปลี่ยนคำว่า ระบบน้ำ เป็น ปั๊มน้ำ
  const promoCategories = [
    { id: 1, name: { en: 'Water Pumps', th: 'ปั๊มน้ำ', cn: '水泵' }, img: '/images/5/1.jpg', cat: 'Water Systems' },
    { id: 2, name: { en: 'Shredders', th: 'เครื่องบดย่อย', cn: '粉碎机' }, img: '/images/2/1.jpg', cat: 'Shredders' },
    { id: 3, name: { en: 'Processing', th: 'แปรรูปอาหาร', cn: '加工设备' }, img: '/images/3/1.jpg', cat: 'Processing' },
    { id: 4, name: { en: 'Packaging', th: 'บรรจุภัณฑ์', cn: '包装设备' }, img: '/images/4/1.jpg', cat: 'Packaging' },
  ];

  return (
    <>
      <Hero />
      <About hideContact={true} />

      <div 
        onClick={() => navigate('/inventory')} 
        className="block bg-gray-100 py-12 px-6 hover:bg-gray-200 transition-colors cursor-pointer group"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="relative px-5">
             <img src={SITE_CONFIG.home.catalogMockup1} className="h-40 w-32 object-cover border-4 border-white shadow-xl rotate-[-10deg] group-hover:rotate-[-12deg] transition-transform" />
             <img src={SITE_CONFIG.home.catalogMockup2} className="h-40 w-32 object-cover border-4 border-white shadow-xl absolute top-0 left-10 rotate-[5deg] z-10 group-hover:rotate-[8deg] transition-transform" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-red-700 text-3xl md:text-5xl font-black tracking-tighter leading-tight uppercase italic">
              {t('download.title')}
            </h2>
            <p className="text-gray-600 font-bold mt-2 tracking-[0.2em] animate-pulse">
               CLICK TO VIEW ALL PRODUCTS
            </p>
          </div>
        </div>
      </div>

      <section className="bg-red-700 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 h-full lg:h-[500px]">
          <div 
            onClick={() => navigate('/inventory')}
            className="lg:w-1/3 relative group cursor-pointer overflow-hidden rounded-sm shadow-2xl h-[400px] lg:h-auto bg-white"
          >
            {/* ✅ ใช้ object-contain เพื่อให้รูปพอดีกรอบไม่ถูกตัด */}
            <img 
              src={SITE_CONFIG.home.promotionMain} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              alt="Promotion"
            />
            <div className="absolute inset-0 bg-red-900/40 group-hover:bg-red-900/10 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 pointer-events-none">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-center drop-shadow-md">
                {t('promotion.title')}
              </h2>
              <p className="text-2xl font-bold opacity-100 uppercase tracking-[0.3em] mt-2 drop-shadow-md">
                {t('promotion.subtitle')}
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-2 gap-4 h-full lg:h-auto">
            {promoCategories.map((item) => (
              <div 
                key={item.id}
                onClick={() => navigate(`/inventory?category=${item.cat}`)}
                className="relative group cursor-pointer overflow-hidden bg-white rounded-sm shadow-lg h-[200px] lg:h-auto"
              >
                <img 
                  src={item.img} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  alt={item.name.en}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-lg font-black uppercase tracking-tight">
                    {item.name[lang as keyof typeof item.name] || item.name.en}
                  </h3>
                  <button className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    VIEW CATEGORY <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="product-grid">
        <ProductGrid featuredOnly={true} />
      </div>

      {/* ✅ วิดีโอ Section แบบฝังในหน้าเว็บ (เป็นทางเลือกที่สอง) */}
      <section className="bg-gray-50 py-24 px-6 border-y border-gray-200">
         <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
               See ASAKO in Action
            </h2>
            <div className="aspect-video bg-black rounded-lg shadow-xl overflow-hidden border-4 border-white">
               <iframe 
                 className="w-full h-full" 
                 src="https://www.youtube.com/embed/ScMzIvxBSi4" 
                 title="ASAKO Video" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen>
               </iframe>
            </div>
         </div>
      </section>

      <div className="bg-red-700">
         <Services /> 
      </div>
      
<section className="relative min-h-[400px] flex items-center justify-center py-24 px-6 bg-red-600 border-t border-red-600">
   <div className="absolute inset-0 z-0 overflow-hidden">
      <img 
        src={SITE_CONFIG.home.dealerBackground} 
        className="w-full h-full object-cover opacity-30" 
        alt="Background"
      />
   </div>

   <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
      <div className="text-center space-y-4">
        <h2 className="text-white text-4xl md:text-7xl font-black uppercase italic drop-shadow-lg">
           {t('dealer_cta.subtitle')}
        </h2>
        <div className="w-24 h-2 bg-white mx-auto rounded-full opacity-80"></div>
      </div>
      <button 
         onClick={() => navigate('/about')} 
         className="bg-white hover:bg-gray-100 text-red-700 px-16 py-5 text-xl md:text-2xl font-black transition-all shadow-2xl hover:-translate-y-1 active:scale-95 uppercase mt-6 rounded-sm"
      >
         {t('dealer_cta.button')}
      </button>
   </div>
</section>

    </>
  );
};

export default Home;