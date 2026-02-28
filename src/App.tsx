import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useApiConfig } from './hooks/useApi';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Services from './components/Services';
import AdminDashboard from './pages/adminDashboard';
import ProductDetail from './pages/ProductDetail'; // ✅ Import หน้าใหม่
import Footer from './components/Footer';

interface SiteData {
  config: any;
  products: any[];
  i18n: any;
}

// Create context to pass data down
export const SiteDataContext = React.createContext<SiteData | null>(null);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const { config, products, i18n, loading } = useApiConfig();
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    if (config && products && i18n) {
      setSiteData({ config, products, i18n });
    }
  }, [config, products, i18n]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

return (
    <SiteDataContext.Provider value={siteData}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            {/* แสดงเนื้อหาหรือวงล้อหมุนโหลดเฉพาะตรงกลาง */}
            {loading ? (
               <div className="flex items-center justify-center py-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
               </div>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inventory" element={<ProductGrid />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/product/:id" element={<ProductDetail />} />
              </Routes>
            )}
          </div>
          <Footer />
        </div>
      </Router>
    </SiteDataContext.Provider>
  );
export default App;