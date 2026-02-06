import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_active: boolean;
  is_staff: boolean;
  total_orders: number;
  total_spent: number;
  date_joined: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserActive = async (userId: number) => {
    try {
      await adminAPI.toggleUserActive(userId);
      fetchUsers();
      alert('User status updated successfully');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error updating user status');
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h1 className="text-4xl font-heading font-extrabold text-gray-900">Users Management</h1>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-900">
                        {user.first_name} {user.last_name || user.username}
                      </p>
                      <p className="text-sm text-gray-500">{user.username}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.phone || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-blue-600">{user.total_orders || 0}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600">
                      ₹{user.total_spent ? user.total_spent.toFixed(2) : '0.00'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.is_staff ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                        Staff
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                        Customer
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.is_active ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(user.date_joined).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleUserActive(user.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.is_active
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {user.is_active ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;