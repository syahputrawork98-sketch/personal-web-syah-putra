import { getToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetcher = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Public Projects
export const getPublicProjects = () => fetcher('/api/projects');
export const getPublicProjectBySlug = (slug) => fetcher(`/api/projects/${slug}`);

// Auth
export const loginAdmin = (email, password) => 
  fetcher('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getCurrentAdmin = () => fetcher('/api/auth/me');

// Admin Projects
export const getAdminProjects = () => fetcher('/api/admin/projects');
export const getAdminProject = (id) => fetcher(`/api/admin/projects/${id}`);

export const createProject = (data) => 
  fetcher('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateProject = (id, data) => 
  fetcher(`/api/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteProject = (id) => 
  fetcher(`/api/admin/projects/${id}`, {
    method: 'DELETE',
  });
