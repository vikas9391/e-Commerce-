import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

// Load initial state from localStorage
const loadStateFromStorage = (): AuthState => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return {
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error('Error loading auth state from storage:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = loadStateFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; access: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.access;
      state.error = null;
      
      // Persist to localStorage
      localStorage.setItem('token', action.payload.access);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
      
      // Clear localStorage on failure
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refresh_token');
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      
      // Update user in localStorage
      if (state.isAuthenticated) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // For token refresh
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  setLoading,
  clearError,
  refreshToken,
} = authSlice.actions;

export default authSlice.reducer;