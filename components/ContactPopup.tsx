// components/ContactPopup.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // ข้อมูล Contact (แก้ไขลิงก์จริงได้ที่นี่ หรือย้ายไป i18n ก็ได้)
  const contacts = [
    { 
      id: 'facebook', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      ), 
      label: 'Facebook', 
      link: 'https://facebook.com/asako-agri', 
      color: 'bg-[#1877F2]' 
    },
    { 
      id: 'line', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.37.5 0 4.97 0 10.49c0 5 4.38 9.17 10.3 9.87.4.08.95.25 1.09.58.12.28.08.72.03 1.01-.05.35-.34 1.35-.39 1.56-.09.38-.41 1.48 1.25.79 1.66-.69 4.52-2.65 6.16-4.52 3.32-3.61 3.56-7.56 3.56-8.29C22 4.97 17.52.5 12 .5zM9.53 13.1H7.21c-.32 0-.58-.26-.58-.58V8.92c0-.32.26-.58.58-.58h2.32c.32 0 .58.26.58.58v3.6c0 .32-.26.58-.58.58zm3.62 0h-2.32c-.32 0-.58-.26-.58-.58V8.92c0-.32.26-.58.58-.58h2.32c.32 0 .58.26.58.58v3.6c0 .32-.26.58-.58.58zm4.4 0h-3.1c-.32 0-.58-.26-.58-.58V8.92c0-.32.26-.58.58-.58h.58v3.02h2.52c.32 0 .58.26.58.58v.58zm-1.16-4.18h-2.32c-.32 0-.58-.26-.58-.58s.26-.58.58-.58h2.32c.32 0 .58.26.58.58s-.26.58-.58.58z"/></svg>
      ), 
      label: 'Line', 
      link: 'https://line.me/ti/p/@asako', 
      color: 'bg-[#00C300]' 
    },
    { 
      id: 'tel', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
      ), 
      label: 'Tel', 
      link: 'tel:+6621234567', 
      color: 'bg-green-600' 
    },
    { 
      id: 'mail', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      ), 
      label: 'Email', 
      link: 'mailto:contact@asako.com', 
      color: 'bg-gray-600' 
    },
    { 
      id: 'map', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      ), 
      label: 'Map', 
      link: 'https://goo.gl/maps/xyz', 
      color: 'bg-red-500' 
    }
  ];

  return (
    <div className="fixed bottom-8 right-24 z-[90] flex flex-col items-end"> {/* ขยับซ้ายมาจาก right-8 เดิมของ AgriAdvisor */}
      
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
                <div className={`w-8 h-8 rounded-full ${c.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  {c.icon}
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