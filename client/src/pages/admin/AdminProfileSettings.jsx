import { useNavigate } from 'react-router-dom';
import { getAdminProfile, updateAdminProfile } from '../../lib/api';
import { removeToken } from '../../lib/auth';

const AdminProfileSettings = () => {
  const [formData, setFormData] = useState({
    aboutTitle: '',
    summaryTitle: '',
    summary: '',
    avatarUrl: '',
    resumeUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminProfile();
        if (data.profile) {
          setFormData({
            aboutTitle: data.profile.aboutTitle || '',
            summaryTitle: data.profile.summaryTitle || '',
            summary: data.profile.summary || '',
            avatarUrl: data.profile.avatarUrl || '',
            resumeUrl: data.profile.resumeUrl || ''
          });
        }
      } catch (err) {
        if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
          removeToken();
          navigate('/admin/login');
        } else {
          setError('Failed to load profile settings: ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateAdminProfile(formData);
      setSuccess('Profile settings updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
        removeToken();
        navigate('/admin/login');
      } else {
        setError('Failed to save settings: ' + err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading settings...</div>;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Profile / About Settings</h1>

      {error && <div style={{ padding: 'var(--space-4)', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {success && <div style={{ padding: 'var(--space-4)', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{success}</div>}

      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>About Section Title</label>
            <input 
              name="aboutTitle"
              value={formData.aboutTitle}
              onChange={handleChange}
              placeholder="e.g. About Me"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Summary Title</label>
            <input 
              name="summaryTitle"
              value={formData.summaryTitle}
              onChange={handleChange}
              placeholder="e.g. Professional Summary"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Summary Content (HTML supported)</label>
          <textarea 
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={8}
            placeholder="e.g. Full Stack Web Developer with experience building..."
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Avatar URL</label>
          <input 
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            placeholder="e.g. https://example.com/avatar.jpg"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Resume URL</label>
          <input 
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            placeholder="e.g. /cv/cv-syah-putra-nugraha-web-developer.pdf"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: 'var(--space-4)', padding: '12px' }}>
          {saving ? 'Saving...' : 'Save Profile Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminProfileSettings;
