import { useNavigate } from 'react-router-dom';
import { getAdminHero, updateAdminHero } from '../../lib/api';
import { removeToken } from '../../lib/auth';

const AdminHeroSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    roles: '',
    title: '',
    subtitle: '',
    primaryCtaLabel: '',
    secondaryCtaLabel: '',
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
        const data = await getAdminHero();
        if (data.hero) {
          setFormData({
            ...data.hero,
            roles: Array.isArray(data.hero.roles) ? data.hero.roles.join(', ') : data.hero.roles || ''
          });
        }
      } catch (err) {
        if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
          removeToken();
          navigate('/admin/login');
        } else {
          setError('Failed to load hero settings: ' + err.message);
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
      const payload = {
        ...formData,
        roles: formData.roles.split(',').map(r => r.trim()).filter(r => r !== '')
      };
      await updateAdminHero(payload);
      setSuccess('Hero settings updated successfully');
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
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Hero Settings</h1>

      {error && <div style={{ padding: 'var(--space-4)', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {success && <div style={{ padding: 'var(--space-4)', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{success}</div>}

      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Name</label>
          <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Syah Putra Nugraha"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Roles (Comma separated for typing animation)</label>
          <input 
            name="roles"
            value={formData.roles}
            onChange={handleChange}
            placeholder="e.g. Full Stack Web Developer, Frontend Developer, Backend Developer"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Main Title</label>
          <textarea 
            name="title"
            value={formData.title}
            onChange={handleChange}
            rows={2}
            placeholder="e.g. Building Digital Experiences with Precision."
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Subtitle</label>
          <textarea 
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. Specialist in web application development..."
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Primary CTA Label</label>
            <input 
              name="primaryCtaLabel"
              value={formData.primaryCtaLabel}
              onChange={handleChange}
              placeholder="e.g. View Projects"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Secondary CTA Label</label>
            <input 
              name="secondaryCtaLabel"
              value={formData.secondaryCtaLabel}
              onChange={handleChange}
              placeholder="e.g. Download CV"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
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
          {saving ? 'Saving...' : 'Save Hero Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminHeroSettings;
