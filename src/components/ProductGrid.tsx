import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SiteDataContext } from '../App';

// ✅ เพิ่ม Props เพื่อรับค่าว่าจะโชว์เฉพาะ Featured หรือไม่
interface ProductGridProps {
  featuredOnly?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ featuredOnly = false }) => {
  const { t } = useTranslation(); 
  const location = useLocation();
  
  const siteData = useContext(SiteDataContext);
  let products = siteData?.products || [];

  // 1. กรองเฉพาะสินค้าที่เปิดขาย (Active)
  products = products.filter((p: any) => p.is_active);

  // 2. ถ้ามาจากหน้า Home ให้กรองเฉพาะที่ติ๊ก Featured (แสดงหน้าแรก)
  if (featuredOnly) {
    products = products.filter((p: any) => p.is_featured);
  }

  // 3. กรองตามหมวดหมู่ (เผื่อเวลากดปุ่ม View Category จากหน้า Home)
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('category');
  if (categoryFilter) {
    products = products.filter((p: any) => p.category_en === categoryFilter);
  }

  return (
    <section id="inventory" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-s font-black uppercase tracking-[0.2em] text-red-600">
              {t('product_grid.badge')}
            </h2>
            <p className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">
              {categoryFilter ? categoryFilter : t('product_grid.title')}
            </p>
          </div>
          {!featuredOnly && (
            <div className="flex gap-4">
               <button className="px-6 py-2 border border-gray-200 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                 {t('product_grid.filter')}
               </button>
               <button className="px-6 py-2 border border-gray-200 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                 {t('product_grid.sort')}
               </button>
            </div>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 font-bold">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;