import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email, password) => api.post('/auth/register', { email, password }),
  login: (email, password) => api.post('/auth/login', { email, password })
};

export const topicsAPI = {
  getAll: () => api.get('/topics'),
  create: (data) => api.post('/topics', data),
  update: (id, data) => api.put(`/topics/${id}`, data),
  updateSubtopic: (topicId, subtopicId, data) => 
    api.put(`/topics/${topicId}/subtopics/${subtopicId}`, data)
};

export default api;

