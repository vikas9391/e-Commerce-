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
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
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
  user: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: string;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_postal_code: string;
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
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}

export interface CheckoutData {
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_postal_code: string;
  phone: string;
  payment_method: string;
}