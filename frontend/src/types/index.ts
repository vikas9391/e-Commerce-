import storage from "redux-persist/lib/storage";

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
  is_staff: boolean;           // Added
  is_superuser: boolean;        // Added
  is_active: boolean;           // Added
  date_joined: string;          // Added
  last_login?: string;          // Added (optional)
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;               // Added (if you have category images)
  created_at: string;
}

export interface Product {
  id: number;
  category: Category;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  image?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  reviews: Review[];
  average_rating: number;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  created_at: string;
}

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

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: string;
  subtotal: number;
}

export interface Order {
  id: number;
  order_number?: string;        // Added
  user: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';  // Added
  total_amount: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state?: string;      // Added
  shipping_country: string;
  shipping_postal_code: string;
  shipping_phone?: string;      // Added
  phone: string;
  payment_method: string;
  is_paid: boolean;
  paid_at?: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

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

export interface LoginCredentials {
  email?: string;               // Made optional
  username?: string;            // Added for username login
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  phone?: string;               // Added
}

export interface CheckoutData {
  shipping_address: string;
  shipping_city: string;
  shipping_state?: string;      // Added
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
  total_revenue: string;
  low_stock_products: number;
  pending_orders: number;
}

export interface AdminProduct extends Product {
  category_name?: string;
}

export interface AdminUser extends User {
  total_orders?: number;
  total_spent?: string;
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