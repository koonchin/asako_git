import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { SiteDataContext } from '../App'; // <--- Import Context

const ProductGrid: React.FC = () => {
  const { t } = useTranslation(); 
  
  // ดึงข้อมูลสินค้าจาก Context (Database) แทนจากไฟล์ Constants
  const siteData = useContext(SiteDataContext);
  const products = siteData?.products || [];

  return (
    <section id="inventory" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-s font-black uppercase tracking-[0.2em] text-red-600">
              {t('product_grid.badge')}
            </h2>
            <p className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">
              {t('product_grid.title')}
            </p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-2 border border-gray-200 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
               {t('product_grid.filter')}
             </button>
             <button className="px-6 py-2 border border-gray-200 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
               {t('product_grid.sort')}
             </button>
          </div>
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* <div className="mt-20 text-center">
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] transition-all">
            {t('common.load_more')}
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ProductGrid;