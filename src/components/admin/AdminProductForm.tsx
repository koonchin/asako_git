import React, { useState, useEffect } from 'react';

interface Product {
  id?: number;
  name_en: string;
  name_th: string;
  name_cn: string;
  description_en: string;
  description_th: string;
  description_cn: string;
  price: number;
  category_en: string;
  category_th: string;
  category_cn: string;
  image_url: string;
  detail_images: string; // เก็บเป็น JSON string
  is_featured: boolean;
  is_active: boolean;
}

const AdminProductForm: React.FC<{ token: string, onLogout: () => void }> = ({ token, onLogout }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // State สำหรับรูป Detail โดยเฉพาะ (เป็น Array)
  const [detailImagesArr, setDetailImagesArr] = useState<string[]>([]);

  const [formData, setFormData] = useState<Product>({
    name_en: '', name_th: '', name_cn: '',
    description_en: '', description_th: '', description_cn: '',
    price: 0, category_en: '', category_th: '', category_cn: '',
    image_url: '', detail_images: '[]', is_featured: false, is_active: true,
  });
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.status === 401 || response.status === 403) return onLogout();
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // 1. ฟังก์ชันอัปโหลดรูปภาพหลัก (1 รูป)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData,
      });

      if (response.status === 401 || response.status === 403) return onLogout();

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, image_url: data.url });
        alert('อัปโหลดรูปภาพหลักสำเร็จ!');
      } else {
        alert('อัปโหลดรูปภาพล้มเหลว');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

// 2. ฟังก์ชันอัปโหลดรูป Detail (รองรับอัปโหลดหลายรูปพร้อมกัน)
  const handleDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    // ✅ แก้ไขตรงนี้: ระบุ Type <File> ให้ Array.from หรือประกาศเป็น File[]
    const files: File[] = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    const uploadedUrls: string[] = [];

    // วนลูปอัปโหลดรูปภาพทีละไฟล์
    for (const file of files) {
      const uploadData = new FormData();
      
      // ✅ ตอนนี้ TypeScript จะรู้แล้วว่า file คือ File (ซึ่งสืบทอดจาก Blob) ไม่ใช่ unknown
      uploadData.append('image', file);

      try {
        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: uploadData,
        });

        if (response.status === 401 || response.status === 403) return onLogout();

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url); // เก็บ url ที่อัปโหลดสำเร็จไว้
        }
      } catch (error) {
        console.error('Error uploading detail file:', error);
      }
    }

    // ถ้ายอัปโหลดสำเร็จอย่างน้อย 1 รูป ให้นำไปรวมกับรูปเดิมที่มีอยู่
    if (uploadedUrls.length > 0) {
      const newArr = [...detailImagesArr, ...uploadedUrls];
      setDetailImagesArr(newArr);
      setFormData({ ...formData, detail_images: JSON.stringify(newArr) });
    }

    // ล้างค่า input เพื่อให้สามารถเลือกรูปเซ็ตเดิมซ้ำได้
    e.target.value = '';
  };
  const removeDetailImage = (indexToRemove: number) => {
    const newArr = detailImagesArr.filter((_, index) => index !== indexToRemove);
    setDetailImagesArr(newArr);
    setFormData({ ...formData, detail_images: JSON.stringify(newArr) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`;

      const finalData = { ...formData, detail_images: JSON.stringify(detailImagesArr) };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      if (response.status === 401 || response.status === 403) return onLogout();
      if (response.ok) {
        alert(editingId ? 'Product updated!' : 'Product created!');
        fetchProducts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id || null);
    // แปลง string จาก DB ให้กลายเป็น Array เพื่อแสดงใน UI
    try {
      setDetailImagesArr(product.detail_images ? JSON.parse(product.detail_images) : []);
    } catch {
      setDetailImagesArr([]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      name_en: '', name_th: '', name_cn: '', description_en: '', description_th: '', description_cn: '',
      price: 0, category_en: '', category_th: '', category_cn: '', image_url: '', detail_images: '[]',
      is_featured: false, is_active: true,
    });
    setDetailImagesArr([]);
    setEditingId(null);
  };

  const getFullImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('/uploads/')) return `${API_URL.replace('/api', '')}${url}`;
    return url; 
  };
  
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.status === 401 || response.status === 403) return onLogout();
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h2>

        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Name (EN)</label>
            <input
              type="text"
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Name (TH)</label>
            <input
              type="text"
              value={formData.name_th}
              onChange={(e) => setFormData({ ...formData, name_th: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Name (CN)</label>
            <input
              type="text"
              value={formData.name_cn}
              onChange={(e) => setFormData({ ...formData, name_cn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Category (EN)</label>
            <input
              type="text"
              value={formData.category_en}
              onChange={(e) => setFormData({ ...formData, category_en: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Category (TH)</label>
            <input
              type="text"
              value={formData.category_th}
              onChange={(e) => setFormData({ ...formData, category_th: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Category (CN)</label>
            <input
              type="text"
              value={formData.category_cn}
              onChange={(e) => setFormData({ ...formData, category_cn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Description (EN)</label>
            <textarea
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Description (TH)</label>
            <textarea
              value={formData.description_th}
              onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Description (CN)</label>
            <textarea
              value={formData.description_cn}
              onChange={(e) => setFormData({ ...formData, description_cn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows={2}
            />
          </div>
        </div>

        {/* Price & Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-center">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Product Main Image</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 cursor-pointer"
              />
              {formData.image_url && (
                <img 
                  src={getFullImageUrl(formData.image_url)} 
                  alt="Preview" 
                  className="w-12 h-12 object-cover rounded shadow border shrink-0"
                />
              )}
            </div>
          </div>
        </div>

        {/* ✅ เพิ่ม UI อัปโหลดรูปภาพ Detail (รองรับ Multiple) */}
        <div className="mb-6 p-4 border border-gray-200 bg-gray-50 rounded">
          <label className="block text-sm font-bold text-gray-700 mb-2">Detail Images (เลือกได้หลายรูปพร้อมกัน)</label>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="file"
              accept="image/*"
              multiple // 👈 กำหนดให้เลือกได้หลายรูป
              onChange={handleDetailImageUpload}
              className="px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer w-full md:w-1/2"
            />
          </div>
          
          {/* แกลเลอรี่รูป Detail */}
          {detailImagesArr.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {detailImagesArr.map((img, idx) => (
                <div key={idx} className="relative group border border-gray-300 rounded p-1 bg-white">
                  <img src={getFullImageUrl(img)} alt={`Detail ${idx}`} className="w-20 h-20 object-cover rounded" />
                  <button 
                    type="button" 
                    onClick={() => removeDetailImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6 mb-8 bg-gray-50 p-4 rounded border border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-5 h-5 accent-red-600 cursor-pointer"
            />
            <span className="font-bold text-gray-700">Featured (แสดงหน้าแรก)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 accent-red-600 cursor-pointer"
            />
            <span className="font-bold text-gray-700">Active (เปิดขาย)</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition-colors">
            {editingId ? 'Update Product' : 'Create Product'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded font-bold transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

{/* Products Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-black text-gray-800">Product List</h2>
          <span className="text-gray-500 font-bold">{products.length} Items</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-black text-gray-600">Image</th>
                <th className="px-6 py-4 font-black text-gray-600">ชื่อสินค้า (TH)</th> {/* ✅ แก้ตรงนี้ */}
                <th className="px-6 py-4 font-black text-gray-600">Price</th>
                <th className="px-6 py-4 font-black text-gray-600">Category</th>
                <th className="px-6 py-4 font-black text-gray-600 text-center">Status</th>
                <th className="px-6 py-4 font-black text-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    <img 
                      src={getFullImageUrl(product.image_url)} 
                      alt={product.name_th || product.name_en} 
                      className="w-10 h-10 object-cover rounded border"
                    />
                  </td>
                  {/* ✅ แก้ตรงนี้ (ดึง name_th มาโชว์เป็นหลัก) */}
                  <td className="px-6 py-3 font-bold text-gray-800">
                    {product.name_th || product.name_en}
                  </td>
                  <td className="px-6 py-3 text-gray-600">฿{Number(product.price).toLocaleString()}</td>
                  <td className="px-6 py-3 text-gray-600">{product.category_th || product.category_en}</td> {/* แสดงหมวดหมู่เป็นไทยด้วยก็ได้ */}
                  <td className="px-6 py-3 text-center">
                    {product.is_active ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Active</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold">Hidden</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center space-x-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id!)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No products found. Add your first product above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;