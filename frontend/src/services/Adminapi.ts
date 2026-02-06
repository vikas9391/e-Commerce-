import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials: { email?: string; username?: string; password: string }) => {
    return api.post('/auth/login/', credentials);
  },
  
  getProfile: () => {
    return api.get('/auth/profile/');
  },
  
  register: (data: any) => {
    return api.post('/auth/register/', data);
  },
  
  logout: (refreshToken: string) => {
    return api.post('/auth/logout/', { refresh_token: refreshToken });
  },
};

// Admin API
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => {
    return api.get('/admin-panel/dashboard/stats/');
  },
  
  getRecentOrders: () => {
    return api.get('/admin-panel/dashboard/recent_orders/');
  },
  
  getSalesAnalytics: () => {
    return api.get('/admin-panel/dashboard/sales_analytics/');
  },
  
  // Products
  getProducts: (params?: any) => {
    return api.get('/admin-panel/products/', { params });
  },
  
  getProduct: (id: number) => {
    return api.get(`/admin-panel/products/${id}/`);
  },
  
  createProduct: (data: any) => {
    return api.post('/admin-panel/products/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  updateProduct: (id: number, data: any) => {
    return api.put(`/admin-panel/products/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteProduct: (id: number) => {
    return api.delete(`/admin-panel/products/${id}/`);
  },
  
  toggleProductAvailability: (id: number) => {
    return api.post(`/admin-panel/products/${id}/toggle_availability/`);
  },
  
  updateProductStock: (id: number, stock: number) => {
    return api.post(`/admin-panel/products/${id}/update_stock/`, { stock });
  },
  
  // Users
  getUsers: (params?: any) => {
    return api.get('/admin-panel/users/', { params });
  },
  
  getUser: (id: number) => {
    return api.get(`/admin-panel/users/${id}/`);
  },
  
  updateUser: (id: number, data: any) => {
    return api.put(`/admin-panel/users/${id}/`, data);
  },
  
  deleteUser: (id: number) => {
    return api.delete(`/admin-panel/users/${id}/`);
  },
  
  toggleUserActive: (id: number) => {
    return api.post(`/admin-panel/users/${id}/toggle_active/`);
  },
  
  toggleUserStaff: (id: number) => {
    return api.post(`/admin-panel/users/${id}/toggle_staff/`);
  },
  
  // Orders
  getOrders: (params?: any) => {
    return api.get('/admin-panel/orders/', { params });
  },
  
  getOrder: (id: number) => {
    return api.get(`/admin-panel/orders/${id}/`);
  },
  
  updateOrderStatus: (id: number, status: string) => {
    return api.post(`/admin-panel/orders/${id}/update_status/`, { status });
  },
  
  updateOrderPaymentStatus: (id: number, payment_status: string) => {
    return api.post(`/admin-panel/orders/${id}/update_payment_status/`, { payment_status });
  },
  
  // Categories
  getCategories: (params?: any) => {
    return api.get('/admin-panel/categories/', { params });
  },
  
  getCategory: (id: number) => {
    return api.get(`/admin-panel/categories/${id}/`);
  },
  
  createCategory: (data: any) => {
    return api.post('/admin-panel/categories/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  updateCategory: (id: number, data: any) => {
    return api.put(`/admin-panel/categories/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteCategory: (id: number) => {
    return api.delete(`/admin-panel/categories/${id}/`);
  },
};

export default api;