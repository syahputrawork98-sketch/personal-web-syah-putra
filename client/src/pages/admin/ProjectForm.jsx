import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    shortDescription: '',
    description: '',
    role: '',
    techStack: [],
    impact: '',
    challenge: '',
    solution: '',
    features: [],
    imageUrl: '',
    demoUrl: '',
    githubUrl: '',
    status: 'Prototype',
    featured: false,
    orderIndex: 0
  });

  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/id/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTechAdd = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.techStack.includes(techInput.trim())) {
        setFormData(prev => ({
          ...prev,
          techStack: [...prev.techStack, techInput.trim()]
        }));
      }
      setTechInput('');
    }
  };

  const removeTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/projects/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/projects', formData);
      }
      navigate('/admin/projects');
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    }
  };

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ marginBottom: 'var(--space-8)' }}>{isEdit ? 'Edit Project' : 'Add New Project'}</h1>
        
        <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-8)' }}>
          <div className="grid-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div>
              <label className="detail-label">Slug (Unique ID)</label>
              <input name="slug" className="lang-select" style={{ width: '100%' }} value={formData.slug} onChange={handleChange} required placeholder="e.g. construction-app" />
            </div>
            <div>
              <label className="detail-label">Status</label>
              <select name="status" className="lang-select" style={{ width: '100%' }} value={formData.status} onChange={handleChange}>
                <option value="Prototype">Prototype</option>
                <option value="Production">Production</option>
                <option value="In Progress">In Progress</option>
                <option value="Internal">Internal</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label className="detail-label">Title</label>
            <input name="title" className="lang-select" style={{ width: '100%' }} value={formData.title} onChange={handleChange} required placeholder="e.g. Construction Monitoring System" />
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label className="detail-label">Role</label>
            <input name="role" className="lang-select" style={{ width: '100%' }} value={formData.role} onChange={handleChange} required placeholder="e.g. Full Stack Developer" />
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label className="detail-label">Tech Stack (Press Enter to add)</label>
            <input 
              className="lang-select" 
              style={{ width: '100%', marginBottom: 'var(--space-2)' }} 
              value={techInput} 
              onChange={(e) => setTechInput(e.target.value)} 
              onKeyDown={handleTechAdd}
              placeholder="e.g. React"
            />
            <div className="tech-badges">
              {formData.techStack.map(tech => (
                <span key={tech} className="tech-badge" onClick={() => removeTech(tech)} style={{ cursor: 'pointer' }}>
                  {tech} ✕
                </span>
              ))}
            </div>
          </div>

          <div className="grid-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div>
              <label className="detail-label">Demo URL</label>
              <input name="demoUrl" className="lang-select" style={{ width: '100%' }} value={formData.demoUrl} onChange={handleChange} />
            </div>
            <div>
              <label className="detail-label">GitHub URL</label>
              <input name="githubUrl" className="lang-select" style={{ width: '100%' }} value={formData.githubUrl} onChange={handleChange} />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} id="featured" />
            <label htmlFor="featured">Featured Project</label>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Project</button>
            <button type="button" onClick={() => navigate('/admin/projects')} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
