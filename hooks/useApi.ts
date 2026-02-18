import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

export const useApi = <T,>(endpoint: string, token?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, { headers });
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token]);

  return { data, loading, error };
};

export const useApiConfig = () => {
  const { data, loading, error } = useApi('/config/complete');
  return { config: data?.config, products: data?.products, i18n: data?.i18n, loading, error };
};