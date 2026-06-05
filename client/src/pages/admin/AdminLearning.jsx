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

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getAdminLearningItems();
      setItems(data.learningItems || []);
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
      fetchItems();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete item');
      setDeleteModalOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ margin: 0 }}>Learning Library</h1>
        <Link to="/admin/learning/new" className="btn btn-primary">Add New Learning Item</Link>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem', padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '4px' }}>{success}</div>}

      <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        {items.length === 0 ? (
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
                {items.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px' }}>{item.orderIndex}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '500' }}>{item.title}</td>
                    <td style={{ padding: '12px 16px' }}>{item.category}</td>
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
