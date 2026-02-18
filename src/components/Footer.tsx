// components/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-red-600 pt-24 pb-12 px-6 text-white border-t border-red-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Logo & Address */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                <span className="text-red-600 font-black text-xs">NA</span>
              </div>
              <span className="text-lg font-black tracking-tighter uppercase text-white">
                Asako<span className="text-white/80">Agri</span>
              </span>
            </div>
            <p className="text-xs text-red-100 font-medium uppercase tracking-widest leading-loose">
              {t('footer.address_line1')} <br />
              {t('footer.address_line2')} <br />
              {t('footer.address_country')}
            </p>
          </div>

          {/* Column 2: Inventory */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6 opacity-80">
              {t('footer.col_inventory')}
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-red-100">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.tractors')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.harvesters')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.rice_planters')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.maintenance')}</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6 opacity-80">
              {t('footer.col_support')}
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-red-100">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.field_service')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.spare_parts')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.financing')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.warranty')}</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6 opacity-80">
              {t('footer.col_newsletter')}
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.email_placeholder')}
                className="flex-1 bg-red-700 border border-red-500 px-4 py-3 text-[10px] text-white placeholder:text-red-300 focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-red-600 px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
                {t('footer.btn_join')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-red-500 flex flex-col md:flex-row justify-between items-center gap-6 text-red-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            {t('footer.rights')}
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">{t('footer.link_privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.link_terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.link_ethics')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;