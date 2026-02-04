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

export default api;