// components/DealerCTA.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const DealerCTA: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-6 bg-red-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            {t('dealer.title')}
          </h2>
          <p className="text-red-100 text-lg font-medium">
            {t('dealer.subtitle')}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link to="/contact">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl active:scale-95">
              {t('dealer.button')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealerCTA;