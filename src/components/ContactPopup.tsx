import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const contacts = [
    { id: 'facebook', label: 'Facebook', link: 'https://facebook.com/asako-agri', color: 'bg-[#1877F2]' },
    { id: 'line', label: 'Line', link: 'https://line.me/ti/p/@asako', color: 'bg-[#00C300]' },
    { id: 'tel', label: 'Tel', link: 'tel:+6621234567', color: 'bg-green-600' },
    { id: 'map', label: 'Map', link: 'https://goo.gl/maps/xyz', color: 'bg-red-500' }
  ];

  // ✅ เพิ่มฟังก์ชันแสดงไอคอน
  const renderIcon = (id: string) => {
    if (id === 'facebook') return <img src="/images/facebook-logo.png" alt="Facebook" className="w-full h-full object-cover" />;
    if (id === 'line') return <img src="/images/line-logo.png" alt="Line" className="w-full h-full object-cover" />;
    if (id === 'tel') return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
    if (id === 'map') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z"/></svg>;
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>;
  };

  return (
    <div className="fixed bottom-8 right-24 z-[90] flex flex-col items-end">
      
      {/* Popup Content */}
      <div className={`transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-0 opacity-0 translate-y-10'} origin-bottom-right`}>
        <div className="bg-white rounded-xl shadow-2xl p-4 w-64 border border-gray-100">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-2">
            {t('contact.title') || "Contact Us"}
          </h3>
          <div className="space-y-2">
            {contacts.map((c) => (
              <a 
                key={c.id} 
                href={c.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                {/* แก้ไข div ตัวนี้ */}
                <div 
                  className={`w-8 h-8 rounded-full ${(c.id === 'line' || c.id === 'facebook') ? 'bg-transparent' : c.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform overflow-hidden`}
                >
                  {renderIcon(c.id)}
                </div>
                <span className="text-sm font-bold text-gray-700">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full border-black-100 border shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-50 ${isOpen ? 'bg-gray-900 rotate-45' : 'bg-white'}`}
      >
        {isOpen ? (
           <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> // กากบาท (จากบวกหมุน 45 องศา)
        ) : (
           <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> // รูปโทรศัพท์
        )}
      </button>
    </div>
  );
};

export default ContactPopup;