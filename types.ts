// types.ts

// สร้าง Type สำหรับข้อความ 3 ภาษา
export interface LocalizedString {
  en: string;
  th: string;
  cn: string;
}

export interface Product {
  id: string;
  // เปลี่ยน name, category จาก string ธรรมดา เป็น LocalizedString
  name: LocalizedString;
  category: LocalizedString;
  price: string;
  image: string;
  // specs ก็เก็บเป็น array ของข้อความ 3 ภาษา
  specs: LocalizedString[];
}