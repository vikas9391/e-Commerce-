import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useAppSelector } from '../store/hooks';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-dark text-2xl font-heading font-bold transition-all duration-300 hover:opacity-80">
          <div className="w-10 h-10 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-medical-primary font-extrabold">MediCare</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-700 font-semibold text-[15px] relative group flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link to="/products" className="text-gray-700 font-semibold text-[15px] relative group flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Medicines
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/orders" className="text-gray-700 font-semibold text-[15px] relative group flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link to="/profile" className="flex items-center gap-2 text-gray-700 font-semibold text-[15px] relative group">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {user?.username}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <button 
                onClick={handleLogout} 
                className="px-5 py-2.5 border-2 border-gray-300 rounded-lg bg-transparent text-gray-700 font-heading font-semibold text-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2.5 border-2 border-medical-primary rounded-lg bg-transparent text-medical-primary font-heading font-semibold text-sm transition-all duration-300 hover:bg-medical-primary hover:text-white">
                Login
              </Link>
              <Link to="/register" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-medical-primary to-medical-secondary text-white font-heading font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Sign Up
              </Link>
            </>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-700 transition-all duration-300 p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-medical-accent text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;