import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const newsAPI = {
  getAll: () => api.get('/news'),
  getById: (id) => api.get(`/news/${id}`),
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
};

export const eventsAPI = {
  getAll: () => api.get('/events'),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

export const classifiedsAPI = {
  getAll: () => api.get('/classifieds'),
  create: (data) => api.post('/classifieds', data),
  update: (id, data) => api.put(`/classifieds/${id}`, data),
  delete: (id) => api.delete(`/classifieds/${id}`),
};

export const businessLocationsAPI = {
  getAll: () => api.get('/business-locations'),
  getById: (id) => api.get(`/business-locations/${id}`),
  create: (data) => api.post('/business-locations', data),
  update: (id, data) => api.put(`/business-locations/${id}`, data),
  delete: (id) => api.delete(`/business-locations/${id}`),
};

export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;
