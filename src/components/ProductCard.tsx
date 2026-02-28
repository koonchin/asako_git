import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SiteDataContext } from '../App';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { i18n, t } = useTranslation(); 
  const lang = i18n.language || 'en';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ ดึงข้อมูล config จาก Database มาใช้ทำปุ่มติดต่อใน Modal
  const siteData = useContext(SiteDataContext);
  const config = siteData?.config || {};

  const getName = () => product[`name_${lang}`] || product.name_en;
  const getCategory = () => product[`category_${lang}`] || product.category_en;
  const getDesc = () => product[`description_${lang}`] || product.description_en;

  // ✅ สร้าง Array ช่องทางติดต่อจาก Config (อันไหนไม่มีข้อมูล จะถูก filter ทิ้งอัตโนมัติ)
// ✅ 1. อัปเดตตัวแปร contacts เพิ่มแผนที่เข้าไป
  const getCallablePhone = (tel: string) => tel.replace(/\D/g, '').substring(0, tel.startsWith('02') ? 9 : 10);


// ✅ 1. อัปเดตตัวแปร contacts เพิ่มแผนที่เข้าไป
  const contacts = [
    { id: 'facebook', label: 'Facebook', link: config.facebook_url, color: 'bg-[#1877F2]' },
    { id: 'line', label: 'Line', link: config.line_url, color: 'bg-[#00C300]' },
    // ✅ ใช้ getCallablePhone สำหรับลิงก์
    { id: 'tel', label: config.phone || 'Tel', link: config.phone ? `tel:${getCallablePhone(config.phone)}` : '', color: 'bg-green-600' },
    { id: 'mail', label: config.email || 'Email', link: config.email ? `mailto:${config.email}` : '', color: 'bg-gray-600' },
    { id: 'map', label: 'Google Maps', link: config.map_url, color: 'bg-red-500' }
  ].filter(c => c.link); // ซ่อนปุ่มอัตโนมัติถ้าไม่ได้กรอกข้อมูล // ซ่อนปุ่มอัตโนมัติถ้าไม่ได้กรอกข้อมูล

  const specs = getDesc() ? String(getDesc()).split(',') : [];

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  const backendUrl = API_URL.replace('/api', '');
  
  let imageUrl = product.image_url;
  if (imageUrl?.startsWith('/uploads/')) {
    imageUrl = `${backendUrl}${imageUrl}`;
  }

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
      <div className="group bg-white border border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl hover:shadow-gray-200/40 p-1 flex flex-col h-full">
        {/* ✅ กดที่รูปแล้วเปลี่ยนหน้าไปที่ Product Detail */}
        <div 
          onClick={() => navigate(`/product/${product.id}`)}
          className="aspect-square w-full overflow-hidden bg-gray-50 relative cursor-pointer"
        >
          <img
            src={imageUrl} 
            alt={getName()} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-4 left-4">
            <span className="text-[0.7rem] font-black uppercase tracking-widest px-2 py-1 bg-white/90 backdrop-blur-sm border border-gray-100 text-gray-500">
              {getCategory()}
            </span>
          </div>
        </div>
        
        {/* ให้เนื้อหาตรงกลางดันปุ่มลงไปชิดด้านล่างสุดเสมอ */}
        <div className="p-6 space-y-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2">
            <h3 
              onClick={() => navigate(`/product/${product.id}`)}
              className="text-sm font-black uppercase tracking-tighter text-gray-900 hover:text-red-600 transition-colors line-clamp-2 cursor-pointer"
            >
              {getName()}
            </h3>
            {/* ✅ โชว์ราคาเป็นสีแดง และเช็คค่า price_max */}
            {product.show_price && (
              <div className="text-right">
                {product.price_max > 0 && (
                   <span className="text-[10px] font-bold text-gray-400 line-through block">
                     ฿{Number(product.price_max).toLocaleString()}
                   </span>
                )}
                <span className="text-sm font-black text-red-600 whitespace-nowrap block mt-[-2px]">
                  ฿{Number(product.price).toLocaleString()}
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-1.5 border-t border-gray-50 pt-4 flex-grow">
            {specs.map((spec: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-200 rounded-full shrink-0"></span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest line-clamp-1">
                   {spec.trim()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
            <button 
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-3 text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300"
            >
              {t('common.view_details')}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-2 py-3 text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300"
            >
              {t('common.inquire')}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal Pop-up สอบถามสินค้า */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="font-black text-lg text-gray-900 uppercase tracking-tight">
                {t('common.inquire') || 'Inquire Product'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-red-600 transition-colors bg-white rounded-full p-1 border border-gray-200 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Product Preview */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <img src={imageUrl} alt={getName()} className="w-16 h-16 object-cover rounded-md border border-gray-200 shadow-sm bg-white" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{getName()}</h4>
                  {/* ซ่อนราคาใน Modal ด้วย */}
                  <p className="text-red-600 font-black text-sm mt-1">฿{Number(product.price).toLocaleString()}</p>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-4">
                  {t('contact.title') || 'Contact us via'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {contacts.map(c => (
                    <a 
                      key={c.id} 
                      href={c.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                    >
                       <div 
                         className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm overflow-hidden group-hover:scale-110 transition-transform duration-300" 
                         style={{ backgroundColor: (c.id === 'line' || c.id === 'facebook') ? 'transparent' : c.color }}
                       >
                          {renderIcon(c.id)}
                       </div>
                       <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">{c.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;