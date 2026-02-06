import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useAppSelector } from '../store/hooks';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if user is admin
  const isAdmin = user?.is_superuser || user?.is_staff;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-dark text-2xl font-heading font-bold transition-all duration-300 hover:opacity-80">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-blue-600 font-extrabold">MediCare</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-700 font-semibold text-[15px] relative group flex items-center gap-2 transition-colors duration-300 hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link to="/products" className="text-gray-700 font-semibold text-[15px] relative group flex items-center gap-2 transition-colors duration-300 hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Medicines
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {isAuthenticated ? (
            <>
              {/* Admin Dashboard Link */}
              {isAdmin && (
                <Link to="/admin/dashboard" className="text-gray-700 font-semibold text-[15px] relative group flex items-center gap-2 transition-colors duration-300 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}

              <Link to="/orders" className="text-gray-700 font-semibold text-[15px] relative group flex items-center gap-2 transition-colors duration-300 hover:text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-gray-700 font-semibold text-[15px] relative group transition-colors duration-300 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                  {user?.username}
                  {isAdmin && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                      Admin
                    </span>
                  )}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fadeIn">
                    {/* Admin Section */}
                    {isAdmin && (
                      <>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-sm">Admin Dashboard</p>
                            <p className="text-xs text-gray-500">Manage your store</p>
                          </div>
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                      </>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-sm">Profile</p>
                        <p className="text-xs text-gray-500">View your profile</p>
                      </div>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-sm">Settings</p>
                        <p className="text-xs text-gray-500">Manage your account</p>
                      </div>
                    </Link>

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <div className="text-left">
                        <p className="font-semibold text-sm">Logout</p>
                        <p className="text-xs text-red-400">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/register" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-heading font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              Sign Up
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-700 transition-all duration-300 p-2 rounded-lg hover:bg-gray-100 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-md">
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