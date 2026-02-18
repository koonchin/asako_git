// components/SpareParts.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const SpareParts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
           <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=500" className="w-full h-64 object-cover" alt="Parts 1" />
           <img src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=500" className="w-full h-64 object-cover mt-12" alt="Parts 2" />
        </div>

        <div className="flex-1 space-y-8">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 block">
             {t('spare_parts.badge')}
           </span>
           <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
             {t('spare_parts.title')}
           </h2>
           <p className="text-lg text-gray-500 font-light leading-relaxed">
             {t('spare_parts.subtitle')}
           </p>
           <button className="border-2 border-gray-900 text-gray-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all">
             {t('spare_parts.button')}
           </button>
        </div>
      </div>
    </section>
  );
};

export default SpareParts;