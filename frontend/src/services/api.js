import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Family API
export const familyAPI = {
  create: (familyData) => api.post('/family/create', familyData),
  getAll: () => api.get('/family'),
  getById: (id) => api.get(`/family/${id}`),
  addMember: (familyId, memberData) => api.post(`/family/${familyId}/members`, memberData),
  updateMember: (memberId, memberData) => api.put(`/family/members/${memberId}`, memberData),
  deleteMember: (memberId) => api.delete(`/family/members/${memberId}`),
};

// Upload API
export const uploadAPI = {
  uploadImages: (formData) => api.post('/upload/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Training API
export const trainingAPI = {
  start: (trainingData) => api.post('/training/start', trainingData),
  getStatus: (trainingId) => api.get(`/training/status/${trainingId}`),
};

// Albums API
export const albumsAPI = {
  generate: (albumData) => api.post('/albums/generate', albumData),
  getById: (id) => api.get(`/albums/${id}`),
};

export default api;