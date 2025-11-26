import axios from 'axios';

// Dynamically determine API URL based on current host
// This allows the app to work on both localhost and network IP addresses
const getApiUrl = () => {
    // If VITE_API_URL is set, use it
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // Otherwise, use the current host with port 5000
    // This makes it work on both localhost and network IP
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:5000/api`;
};

const API_URL = getApiUrl();

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
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

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
};

// Files API
export const filesAPI = {
    upload: (formData, onProgress) =>
        api.post('/files/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: onProgress,
        }),
    getFiles: (folderId = null, sortBy = 'upload_date', sortOrder = 'desc') =>
        api.get('/files', { params: { folderId, sortBy, sortOrder } }),
    downloadFile: (id) => api.get(`/files/download/${id}`, { responseType: 'blob' }),
    deleteFile: (id) => api.delete(`/files/${id}`),
    renameFile: (id, newName) => api.put(`/files/rename/${id}`, { newName }),
    moveFile: (id, folderId) => api.put(`/files/${id}/move`, { folderId }),
    searchFiles: (query) => api.get('/files/search', { params: { q: query } }),
};

// Folders API
export const foldersAPI = {
    createFolder: (name, parentId = null) => api.post('/files/folders', { name, parentId }),
    getFolders: (parentId = null) => api.get('/files/folders', { params: { parentId } }),
    deleteFolder: (id) => api.delete(`/files/folders/${id}`),
    renameFolder: (id, newName) => api.put(`/files/folders/${id}/rename`, { newName }),
};

export default api;
