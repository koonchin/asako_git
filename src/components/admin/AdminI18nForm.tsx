import React, { useState, useEffect } from 'react';

interface I18nText {
  id: number;
  key_path: string;
  en: string;
  th: string;
  cn: string;
  category: string;
}

const AdminI18nForm: React.FC<{ token: string }> = ({ token }) => {
  const [texts, setTexts] = useState<I18nText[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('nav');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/i18n/texts');
      const data = await response.json();
      setTexts(data);
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  };

  const filteredTexts = texts.filter((t) => t.category === selectedCategory);
  const categories = ['nav', 'hero', 'about', 'services', 'footer', 'common'];

  const handleUpdate = async (text: I18nText) => {
    try {
      const response = await fetch(`http://localhost:5000/api/i18n/texts/${text.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(text),
      });

      if (response.ok) {
        alert('Translation updated!');
        setEditingId(null);
        fetchTexts();
      }
    } catch (error) {
      console.error('Error updating text:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded font-bold transition ${
              selectedCategory === cat
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Key</th>
                <th className="px-6 py-3 text-left font-bold">English</th>
                <th className="px-6 py-3 text-left font-bold">Thai</th>
                <th className="px-6 py-3 text-left font-bold">Chinese</th>
                <th className="px-6 py-3 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTexts.map((text) => (
                <tr key={text.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs">{text.key_path}</td>
                  <td className="px-6 py-4">{text.en}</td>
                  <td className="px-6 py-4">{text.th}</td>
                  <td className="px-6 py-4">{text.cn}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setEditingId(editingId === text.id ? null : text.id)}
                      className="text-blue-600 hover:underline"
                    >
                      {editingId === text.id ? 'Done' : 'Edit'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <EditI18nModal
          text={texts.find((t) => t.id === editingId)!}
          onSave={handleUpdate}
          onCancel={() => setEditingId(null)}
        />
      )}
    </div>
  );
};

const EditI18nModal: React.FC<{
  text: I18nText;
  onSave: (text: I18nText) => void;
  onCancel: () => void;
}> = ({ text, onSave, onCancel }) => {
  const [editText, setEditText] = useState(text);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8">
        <h2 className="text-2xl font-bold mb-6">Edit: {editText.key_path}</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-bold mb-2">English</label>
            <textarea
              value={editText.en}
              onChange={(e) => setEditText({ ...editText, en: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Thai</label>
            <textarea
              value={editText.th}
              onChange={(e) => setEditText({ ...editText, th: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Chinese</label>
            <textarea
              value={editText.cn}
              onChange={(e) => setEditText({ ...editText, cn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onSave(editText)}
            className="bg-red-600 text-white px-6 py-2 rounded font-bold"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminI18nForm;