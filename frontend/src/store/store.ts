import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import { AuthState, CartState, ProductState } from '../types';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  },
});

// Manually define RootState
export interface RootState {
  auth: AuthState;
  cart: CartState;
  products: ProductState;
}

export type AppDispatch = typeof store.dispatch;

// Export a dummy persistor to avoid breaking App.tsx
export const persistor = {
  persist: () => {},
  purge: () => Promise.resolve(),
  flush: () => Promise.resolve(),
  pause: () => {},
  getState: () => ({}),
};