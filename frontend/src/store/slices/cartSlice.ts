import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Cart } from '../../types';

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.items = action.payload.items || [];
      state.total = action.payload.total || 0;
    },
    addToCart: (state, action: PayloadAction<{ product: any; quantity: number }>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.product.id
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          id: Date.now(),
          product: action.payload.product,
          quantity: action.payload.quantity,
          subtotal: parseFloat(action.payload.product.price) * action.payload.quantity,
        });
      }
      
      state.total = state.items.reduce(
        (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
        0
      );
    },
    updateCartItem: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      
      state.total = state.items.reduce(
        (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;