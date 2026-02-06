// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  date_joined: string;
  last_login?: string;
  total_orders?: number;
  total_spent?: number;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  products_count?: number;
  created_at: string;
  updated_at?: string;
}

// Product Types
export interface Product {
  id: number;
  category: number | Category;
  category_name?: string;
  name: string;
  slug?: string;
  description: string;
  price: string | number;
  stock: number;
  image?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  reviews?: Review[];
  average_rating?: number;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  created_at: string;
}

// Cart Types
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
  created_at: string;
  updated_at: string;
}

// Order Types
export interface OrderItem {
  id: number;
  product: number | Product;
  product_name?: string;
  product_image?: string;
  quantity: number;
  price: string | number;
  subtotal?: number;
}

export interface Order {
  id: number;
  order_number?: string;
  user: number | string;
  user_email?: string;
  user_name?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  total_amount: string | number;
  shipping_address: string;
  shipping_city: string;
  shipping_state?: string;
  shipping_country?: string;
  shipping_postal_code?: string;
  shipping_pincode?: string;
  shipping_phone?: string;
  phone?: string;
  payment_method: string;
  is_paid?: boolean;
  paid_at?: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  items_count?: number;
}

// Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Cart State
export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

// Product State
export interface ProductState {
  products: Product[];
  categories: Category[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

// Auth Types
export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface CheckoutData {
  shipping_address: string;
  shipping_city: string;
  shipping_state?: string;
  shipping_country: string;
  shipping_postal_code: string;
  phone: string;
  payment_method: string;
}

// Admin Panel Types
export interface AdminStats {
  total_products: number;
  total_orders: number;
  total_users: number;
  total_revenue: number;
  low_stock_products: number;
  pending_orders: number;
}

export interface AdminProduct extends Product {
  category_name?: string;
}

export interface AdminUser extends User {
  total_orders?: number;
  total_spent?: number;
}

export interface AdminOrder extends Order {
  user_email?: string;
  user_name?: string;
  items_count?: number;
}

export interface AdminCategory extends Category {
  products_count?: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user?: User;
}

export interface RegisterResponse {
  user: User;
  access: string;
  refresh: string;
}

// Filter and Sort Types
export interface ProductFilters {
  category?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  is_available?: boolean;
  ordering?: string;
  page?: number;
}

export interface AdminFilters {
  search?: string;
  status?: string;
  payment_status?: string;
  is_staff?: boolean;
  is_active?: boolean;
  start_date?: string;
  end_date?: string;
  filter?: string;
  category?: string;
}