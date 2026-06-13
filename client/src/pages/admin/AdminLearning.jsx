import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminLearningItems, deleteLearningItem } from '../../lib/api';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { removeToken } from '../../lib/auth';

const AdminLearning = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getAdminLearningItems();
      const loadedItems = data.learningItems || [];
      setItems(loadedItems);
      
      // Reset activeTab to 'ALL' if the current category is no longer present
      const currentCats = Array.from(new Set(loadedItems.map(item => item.category || 'Other')));
      if (activeTab !== 'ALL' && !currentCats.includes(activeTab)) {
        setActiveTab('ALL');
      }
      setError('');
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message.includes('401')) {
        removeToken();
        navigate('/admin/login');
      } else {
        setError(err.message || 'Failed to load learning items');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [navigate]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteLearningItem(itemToDelete.id);
      setSuccess('Item deleted successfully');
      setDeleteModalOpen(false);
      setItemToDelete(null);
      await fetchItems();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete item');
      setDeleteModalOpen(false);
    }
  };

  // Derive categories dynamically
  const categories = Array.from(new Set(items.map(item => item.category || 'Other')))
    .sort((a, b) => a.localeCompare(b));

  const filteredItems = activeTab === 'ALL'
    ? items
    : items.filter(item => (item.category || 'Other') === activeTab);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ margin: 0 }}>Learning Library</h1>
        <Link to="/admin/learning/new" className="btn btn-primary">Add New Learning Item</Link>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem', padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '4px' }}>{success}</div>}

      {/* Tabs Filter */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <button
          onClick={() => setActiveTab('ALL')}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: activeTab === 'ALL' ? 'var(--primary-color)' : 'transparent',
            color: activeTab === 'ALL' ? 'white' : 'var(--text-color)',
            fontWeight: activeTab === 'ALL' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            opacity: activeTab === 'ALL' ? 1 : 0.7,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          All
          <span style={{
            marginLeft: '6px',
            fontSize: '0.75rem',
            backgroundColor: activeTab === 'ALL' ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-muted, rgba(0, 0, 0, 0.05))',
            color: activeTab === 'ALL' ? 'white' : 'var(--text-muted, #6b7280)',
            padding: '2px 6px',
            borderRadius: '10px',
            fontWeight: '600'
          }}>
            {items.length}
          </span>
        </button>

        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: activeTab === cat ? 'var(--primary-color)' : 'transparent',
              color: activeTab === cat ? 'white' : 'var(--text-color)',
              fontWeight: activeTab === cat ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: activeTab === cat ? 1 : 0.7,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {cat}
            <span style={{
              marginLeft: '6px',
              fontSize: '0.75rem',
              backgroundColor: activeTab === cat ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-muted, rgba(0, 0, 0, 0.05))',
              color: activeTab === cat ? 'white' : 'var(--text-muted, #6b7280)',
              padding: '2px 6px',
              borderRadius: '10px',
              fontWeight: '600'
            }}>
              {items.filter(item => (item.category || 'Other') === cat).length}
            </span>
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', opacity: 0.6 }}>
            Loading learning items...
          </div>
        ) : filteredItems.length === 0 ? (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', opacity: 0.7 }}>
            No learning items found. Click "Add New Learning Item" to create one.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Order</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Title</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Category</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Level</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Published</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Featured</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px' }}>{item.orderIndex}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '500' }}>{item.title}</td>
                    <td style={{ padding: '12px 16px' }}>{item.category || '-'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '0.8rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--border-color)' }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>{item.level || '-'}</td>
                    <td style={{ padding: '12px 16px' }}>{item.isPublished ? '✅' : '❌'}</td>
                    <td style={{ padding: '12px 16px' }}>{item.featured ? '⭐' : '-'}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <Link to={`/admin/learning/${item.id}/edit`} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.85rem', marginRight: '8px' }}>Edit</Link>
                      <button onClick={() => handleDeleteClick(item)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.85rem', color: '#ef4444', borderColor: '#ef4444' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Learning Item"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default AdminLearning;
