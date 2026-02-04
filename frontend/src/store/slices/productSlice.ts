import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, Product, Category } from '../../types';

const initialState: ProductState = {
  products: [],
  categories: [],
  currentProduct: null,
  loading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{ results?: Product[]; count?: number; next?: string | null; previous?: string | null } | Product[]>) => {
      if (Array.isArray(action.payload)) {
        state.products = action.payload;
      } else {
        state.products = action.payload.results || [];
        if (action.payload.count) {
          state.pagination = {
            count: action.payload.count,
            next: action.payload.next || null,
            previous: action.payload.previous || null,
          };
        }
      }
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
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
  setProducts,
  setCategories,
  setCurrentProduct,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;