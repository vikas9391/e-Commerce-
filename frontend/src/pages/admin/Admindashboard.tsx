import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';

interface DashboardStats {
  total_products: number;
  total_orders: number;
  total_users: number;
  total_revenue: number;
  low_stock_products: number;
  pending_orders: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_products: 0,
    total_orders: 0,
    total_users: 0,
    total_revenue: 0,
    low_stock_products: 0,
    pending_orders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await adminAPI.getDashboardStats();
      console.log('Dashboard stats:', response.data);
      setStats(response.data);
    } catch (error: any) {
      console.error('Error fetching stats:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.detail || 'Error loading dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button 
            onClick={fetchDashboardStats}
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.total_products,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.total_orders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500',
      link: '/admin/orders',
    },
    {
      title: 'Total Users',
      value: stats.total_users,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500',
      link: '/admin/users',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.total_revenue.toFixed(2)}`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-amber-500 to-orange-500',
      link: '/admin/orders',
    },
  ];

  const alertCards = [
    {
      title: 'Low Stock Products',
      value: stats.low_stock_products,
      description: 'Products with less than 10 units',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'border-amber-500 bg-amber-50 text-amber-700',
      link: '/admin/products?filter=low-stock',
    },
    {
      title: 'Pending Orders',
      value: stats.pending_orders,
      description: 'Orders awaiting processing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'border-blue-500 bg-blue-50 text-blue-700',
      link: '/admin/orders?status=processing',
    },
  ];

  return (
    <div className="container-custom py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-heading font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 font-medium">Welcome back! Here's your store overview</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="group bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                {card.icon}
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {alertCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${card.color}`}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {card.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                <p className="text-sm opacity-80">{card.description}</p>
              </div>
              <div className="text-3xl font-bold">{card.value}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products/new"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-blue-600">Add Product</p>
              <p className="text-sm text-gray-500">Create new medicine</p>
            </div>
          </Link>

          <Link
            to="/admin/categories"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-blue-600">Manage Categories</p>
              <p className="text-sm text-gray-500">Organize products</p>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-blue-600">View Orders</p>
              <p className="text-sm text-gray-500">Manage customer orders</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;