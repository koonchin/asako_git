import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SiteDataContext } from '../App';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const siteData = useContext(SiteDataContext);
  const { i18n, t } = useTranslation();
  const lang = i18n.language || 'en';
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  const backendUrl = API_URL.replace('/api', '');

  const [mainImage, setMainImage] = useState<string>('');

  // หาข้อมูลสินค้าจาก Context
  const product = siteData?.products.find((p: any) => p.id.toString() === id);

  useEffect(() => {
    if (product) {
      setMainImage(getFullImageUrl(product.image_url));
      window.scrollTo(0, 0); // เลื่อนขึ้นบนสุดเมื่อเปลี่ยนหน้า
    }
  }, [product]);

  if (!product) return <div className="py-40 text-center text-xl">Product not found</div>;

  const getName = () => product[`name_${lang}`] || product.name_en;
  const getCategory = () => product[`category_${lang}`] || product.category_en;
  const getDesc = () => product[`description_${lang}`] || product.description_en;
  const specs = getDesc() ? String(getDesc()).split(',') : [];

  const getFullImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('/uploads/') ? `${backendUrl}${url}` : url;
  };

  // แปลง detail_images จาก String เป็น Array
  let detailImages: string[] = [];
  try {
    detailImages = product.detail_images ? JSON.parse(product.detail_images) : [];
  } catch {
    detailImages = [];
  }

  // หา Related Products (หมวดหมู่เดียวกัน แต่ไม่ใช่ตัวมันเอง สุ่มมา 4 ตัว)
  const relatedProducts = siteData?.products
    .filter((p: any) => p.category_en === product.category_en && p.id.toString() !== id)
    .slice(0, 4);

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Section รายละเอียดสินค้า */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12">
        {/* รูปภาพ */}
        <div className="md:w-1/2 space-y-4">
          <div className="aspect-square bg-gray-50 border border-gray-100 w-full overflow-hidden">
            <img src={mainImage} alt={getName()} className="w-full h-full object-cover" />
          </div>
          
          {/* แกลเลอรี่รูปย่อย (รวมรูปหลักเข้าไปด้วย) */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            <img 
              src={getFullImageUrl(product.image_url)} 
              onClick={() => setMainImage(getFullImageUrl(product.image_url))}
              className={`w-20 h-20 object-cover cursor-pointer border-2 ${mainImage === getFullImageUrl(product.image_url) ? 'border-red-600' : 'border-transparent hover:border-gray-300'}`}
            />
            {detailImages.map((imgUrl, idx) => {
              const fullUrl = getFullImageUrl(imgUrl);
              return (
                <img 
                  key={idx} 
                  src={fullUrl} 
                  onClick={() => setMainImage(fullUrl)}
                  className={`w-20 h-20 object-cover cursor-pointer border-2 ${mainImage === fullUrl ? 'border-red-600' : 'border-transparent hover:border-gray-300'}`}
                />
              );
            })}
          </div>
        </div>

        {/* ข้อมูล */}
        <div className="md:w-1/2 space-y-8">
          <button onClick={() => navigate('/inventory')} className="text-xs font-bold text-gray-400 hover:text-red-600 uppercase tracking-widest">
            ← {t('product_detail.back')}
          </button>
          
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              {getCategory()}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">{getName()}</h1>
            
            {/* ✅ แสดงราคาหน้า Detail เป็นสีแดงใหญ่ๆ */}
              {product.show_price && (
               <div className="space-y-1">
                 {product.price_max > 0 && (
                    <p className="text-lg font-bold text-gray-400 line-through">
                      ฿{Number(product.price_max).toLocaleString()}
                    </p>
                 )}
                 <p className="text-4xl font-black text-red-600">
                   ฿{Number(product.price).toLocaleString()}
                 </p>
               </div>
            )}
          </div>

          <div className="border-t border-gray-100 pt-8 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Specifications</h3>
            <ul className="space-y-3">
              {specs.map((spec: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  <span className="font-light">{spec.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section สินค้าที่เกี่ยวข้อง */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-20 px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-10 text-center">
              {t('product_detail.related')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;