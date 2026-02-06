import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Product, Category, Cart, Order, User, LoginCredentials, RegisterData, CheckoutData } from '../types';

const API_URL = 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: RegisterData): Promise<AxiosResponse<{ user: User; access: string; refresh: string }>> =>
    api.post('/auth/register/', data),
  
  login: (data: LoginCredentials): Promise<AxiosResponse<{ access: string; refresh: string }>> =>
    api.post('/auth/login/', data),
  
  logout: (refreshToken: string): Promise<AxiosResponse> =>
    api.post('/auth/logout/', { refresh_token: refreshToken }),
  
  getProfile: (): Promise<AxiosResponse<User>> =>
    api.get('/auth/profile/'),
  
  updateProfile: (data: Partial<User>): Promise<AxiosResponse<User>> =>
    api.put('/auth/profile/', data),
};

// Products API
export const productsAPI = {
  getAll: (params?: Record<string, any>): Promise<AxiosResponse<{ results: Product[]; count: number; next: string | null; previous: string | null }>> =>
    api.get('/products/', { params }),
  
  getBySlug: (slug: string): Promise<AxiosResponse<Product>> =>
    api.get(`/products/${slug}/`),
  
  getCategories: (): Promise<AxiosResponse<Category[]>> =>
    api.get('/products/categories/'),
  
  addReview: (slug: string, data: { rating: number; comment: string }): Promise<AxiosResponse> =>
    api.post(`/products/${slug}/add_review/`, data),
};

// Cart API
export const cartAPI = {
  get: (): Promise<AxiosResponse<Cart>> =>
    api.get('/orders/cart/'),
  
  add: (data: { product_id: number; quantity: number }): Promise<AxiosResponse<Cart>> =>
    api.post('/orders/cart/', data),
  
  updateItem: (data: { item_id: number; quantity: number }): Promise<AxiosResponse<Cart>> =>
    api.put('/orders/cart/update_item/', data),
  
  removeItem: (data: { item_id: number }): Promise<AxiosResponse<Cart>> =>
    api.delete('/orders/cart/remove_item/', { data }),
  
  clear: (): Promise<AxiosResponse<Cart>> =>
    api.delete('/orders/cart/clear/'),
};

// Orders API
export const ordersAPI = {
  create: (data: CheckoutData): Promise<AxiosResponse<Order>> =>
    api.post('/orders/orders/', data),
  
  getAll: (): Promise<AxiosResponse<Order[]>> =>
    api.get('/orders/orders/'),
  
  getById: (id: number): Promise<AxiosResponse<Order>> =>
    api.get(`/orders/orders/${id}/`),
  
  markPaid: (id: number): Promise<AxiosResponse<Order>> =>
    api.post(`/orders/orders/${id}/mark_paid/`),
};

// Admin API
export const adminAPI = {
  // Dashboard
  getDashboardStats: (): Promise<AxiosResponse<{
    total_products: number;
    total_orders: number;
    total_users: number;
    total_revenue: number;
    low_stock_products: number;
    pending_orders: number;
  }>> =>
    api.get('/admin-panel/dashboard/stats/'),
  
  getRecentOrders: (): Promise<AxiosResponse<Order[]>> =>
    api.get('/admin-panel/dashboard/recent_orders/'),
  
  getSalesAnalytics: (): Promise<AxiosResponse<{
    daily_sales: any[];
    top_products: any[];
  }>> =>
    api.get('/admin-panel/dashboard/sales_analytics/'),
  
  // Products
  getProducts: (params?: Record<string, any>): Promise<AxiosResponse<{ results: Product[]; count: number } | Product[]>> =>
    api.get('/admin-panel/products/', { params }),
  
  getProduct: (id: number): Promise<AxiosResponse<Product>> =>
    api.get(`/admin-panel/products/${id}/`),
  
  createProduct: (data: FormData): Promise<AxiosResponse<Product>> =>
    api.post('/admin-panel/products/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  updateProduct: (id: number, data: FormData): Promise<AxiosResponse<Product>> =>
    api.put(`/admin-panel/products/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  deleteProduct: (id: number): Promise<AxiosResponse> =>
    api.delete(`/admin-panel/products/${id}/`),
  
  toggleProductAvailability: (id: number): Promise<AxiosResponse<Product>> =>
    api.post(`/admin-panel/products/${id}/toggle_availability/`),
  
  updateProductStock: (id: number, stock: number): Promise<AxiosResponse<Product>> =>
    api.post(`/admin-panel/products/${id}/update_stock/`, { stock }),
  
  // Users
  getUsers: (params?: Record<string, any>): Promise<AxiosResponse<User[]>> =>
    api.get('/admin-panel/users/', { params }),
  
  getUser: (id: number): Promise<AxiosResponse<User>> =>
    api.get(`/admin-panel/users/${id}/`),
  
  updateUser: (id: number, data: Partial<User>): Promise<AxiosResponse<User>> =>
    api.put(`/admin-panel/users/${id}/`, data),
  
  deleteUser: (id: number): Promise<AxiosResponse> =>
    api.delete(`/admin-panel/users/${id}/`),
  
  toggleUserActive: (id: number): Promise<AxiosResponse<User>> =>
    api.post(`/admin-panel/users/${id}/toggle_active/`),
  
  toggleUserStaff: (id: number): Promise<AxiosResponse<User>> =>
    api.post(`/admin-panel/users/${id}/toggle_staff/`),
  
  // Orders
  getOrders: (params?: Record<string, any>): Promise<AxiosResponse<Order[]>> =>
    api.get('/admin-panel/orders/', { params }),
  
  getOrder: (id: number): Promise<AxiosResponse<Order>> =>
    api.get(`/admin-panel/orders/${id}/`),
  
  updateOrderStatus: (id: number, status: string): Promise<AxiosResponse<Order>> =>
    api.post(`/admin-panel/orders/${id}/update_status/`, { status }),
  
  updateOrderPaymentStatus: (id: number, payment_status: string): Promise<AxiosResponse<Order>> =>
    api.post(`/admin-panel/orders/${id}/update_payment_status/`, { payment_status }),
  
  // Categories
  getCategories: (params?: Record<string, any>): Promise<AxiosResponse<Category[]>> =>
    api.get('/admin-panel/categories/', { params }),
  
  getCategory: (id: number): Promise<AxiosResponse<Category>> =>
    api.get(`/admin-panel/categories/${id}/`),
  
  createCategory: (data: FormData): Promise<AxiosResponse<Category>> =>
    api.post('/admin-panel/categories/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  updateCategory: (id: number, data: FormData): Promise<AxiosResponse<Category>> =>
    api.put(`/admin-panel/categories/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  deleteCategory: (id: number): Promise<AxiosResponse> =>
    api.delete(`/admin-panel/categories/${id}/`),
};

export default api;