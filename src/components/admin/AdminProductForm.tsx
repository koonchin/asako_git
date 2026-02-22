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
  is_featured: boolean;
  is_active: boolean;
}

const AdminProductForm: React.FC<{ token: string }> = ({ token }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Product>({
    name_en: '',
    name_th: '',
    name_cn: '',
    description_en: '',
    description_th: '',
    description_cn: '',
    price: 0,
    category_en: '',
    category_th: '',
    category_cn: '',
    image_url: '',
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  const fetchProducts = async () => {
    try {
const response = await fetch(`${API_URL}/products`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingId ? 'Product updated!' : 'Product created!');
        fetchProducts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id || null);
  };

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_th: '',
      name_cn: '',
      description_en: '',
      description_th: '',
      description_cn: '',
      price: 0,
      category_en: '',
      category_th: '',
      category_cn: '',
      image_url: '',
      is_featured: false,
      is_active: true,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit' : 'Add New'} Product</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name (English)"
            value={formData.name_en}
            onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Name (Thai)"
            value={formData.name_th}
            onChange={(e) => setFormData({ ...formData, name_th: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Name (Chinese)"
            value={formData.name_cn}
            onChange={(e) => setFormData({ ...formData, name_cn: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Similar inputs for descriptions, categories, etc */}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
            />
            <span>Featured</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            />
            <span>Active</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded font-bold">
            {editingId ? 'Update' : 'Create'} Product
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded font-bold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Name</th>
                <th className="px-6 py-3 text-left font-bold">Price</th>
                <th className="px-6 py-3 text-left font-bold">Category</th>
                <th className="px-6 py-3 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">{product.name_en}</td>
                  <td className="px-6 py-4">¥{product.price}</td>
                  <td className="px-6 py-4">{product.category_en}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id!)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;