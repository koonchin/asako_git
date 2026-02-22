import React, { useState, useEffect } from 'react';

interface SiteConfig {
  id?: number;
  phone: string;
  email: string;
  address_en: string;
  address_th: string;
  address_cn: string;
  hero_image_url: string;
  hero_title_en: string;
  hero_title_th: string;
  hero_title_cn: string;
  facebook_url: string;
  instagram_url: string;
  line_url: string;
}

const AdminConfigForm: React.FC<{ token: string }> = ({ token }) => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  const fetchConfig = async () => {
    try {
      const response = await fetch(`${API_URL}/config`);
      const data = await response.json();
      setConfig(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching config:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        alert('Site configuration updated!');
      }
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!config) return <div>No configuration found</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-6">Site Configuration</h2>

      {/* Contact Info */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-bold mb-4">Contact Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="tel"
            placeholder="Phone"
            value={config.phone}
            onChange={(e) => setConfig({ ...config, phone: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={config.email}
            onChange={(e) => setConfig({ ...config, email: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Addresses */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-bold mb-4">Address</h3>
        <div className="space-y-4">
          <textarea
            placeholder="Address (English)"
            value={config.address_en}
            onChange={(e) => setConfig({ ...config, address_en: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={3}
          />
          <textarea
            placeholder="Address (Thai)"
            value={config.address_th}
            onChange={(e) => setConfig({ ...config, address_th: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={3}
          />
          <textarea
            placeholder="Address (Chinese)"
            value={config.address_cn}
            onChange={(e) => setConfig({ ...config, address_cn: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-bold mb-4">Social Media</h3>
        <div className="space-y-4">
          <input
            type="url"
            placeholder="Facebook URL"
            value={config.facebook_url}
            onChange={(e) => setConfig({ ...config, facebook_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="url"
            placeholder="Instagram URL"
            value={config.instagram_url}
            onChange={(e) => setConfig({ ...config, instagram_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="url"
            placeholder="Line URL"
            value={config.line_url}
            onChange={(e) => setConfig({ ...config, line_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-bold mb-4">Hero Section</h3>
        <input
          type="url"
          placeholder="Hero Image URL"
          value={config.hero_image_url}
          onChange={(e) => setConfig({ ...config, hero_image_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700"
      >
        Update Configuration
      </button>
    </form>
  );
};

export default AdminConfigForm;