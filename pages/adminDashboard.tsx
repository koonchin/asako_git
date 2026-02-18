import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminConfigForm from '../components/admin/AdminConfigForm';
import AdminI18nForm from '../components/admin/AdminI18nForm';

type Tab = 'products' | 'config' | 'i18n' | 'contact' | 'logout';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [token, setToken] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (!storedToken) {
      setShowLoginForm(true);
    } else {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  if (showLoginForm && !token) {
    return <AdminLoginPage onLogin={(t) => { setToken(t); setShowLoginForm(false); }} />;
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-red-600 text-white p-8 shadow-lg">
          <h1 className="text-4xl font-black">ASAKO Admin Dashboard</h1>
          <p className="text-red-100 mt-2">Manage your website content</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-semibold border-b-4 transition ${
                activeTab === 'products'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📦 Products
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-6 py-4 font-semibold border-b-4 transition ${
                activeTab === 'config'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚙️ Site Config
            </button>
            <button
              onClick={() => setActiveTab('i18n')}
              className={`px-6 py-4 font-semibold border-b-4 transition ${
                activeTab === 'i18n'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              🌐 Translations
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-4 font-semibold border-b-4 transition ${
                activeTab === 'contact'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📧 Messages
            </button>
            <button
              onClick={handleLogout}
              className="ml-auto px-6 py-4 font-semibold text-red-600 hover:bg-red-50"
            >
              �� Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'products' && <AdminProductForm token={token} />}
          {activeTab === 'config' && <AdminConfigForm token={token} />}
          {activeTab === 'i18n' && <AdminI18nForm token={token} />}
          {activeTab === 'contact' && <AdminContactForm token={token} />}
        </div>
      </div>
    </div>
  );
};

// Admin Login Component
const AdminLoginPage: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      
      localStorage.setItem('adminToken', data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-2">ASAKO Admin</h1>
        <p className="text-gray-600 mb-8">Enter your credentials to login</p>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Default: admin / admin123 (change password immediately)
        </p>
      </div>
    </div>
  );
};

// Placeholder Components
const AdminContactForm: React.FC<{ token: string }> = () => (
  <div className="bg-white p-8 rounded-lg shadow">
    <h2 className="text-2xl font-black mb-4">Contact Messages</h2>
    <p className="text-gray-600">Contact form management coming soon...</p>
  </div>
);

export default AdminDashboard;