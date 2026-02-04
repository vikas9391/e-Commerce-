import { useEffect, useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../services/api';
import { RootState } from '../store/store';
import { User } from '../types';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<Partial<User>>({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postal_code: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
        postal_code: user.postal_code || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await authAPI.updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-sm py-12">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-8 h-8 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h1 className="text-4xl font-heading font-extrabold text-gray-900">My Profile</h1>
      </div>

      {/* User Info Card */}
      <div className="bg-gradient-to-r from-medical-primary to-medical-secondary p-8 rounded-xl text-white mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.username}</h2>
            <p className="text-white/80">{user?.email}</p>
          </div>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">Profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.first_name} 
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} 
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="form-label">Last Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.last_name} 
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} 
                placeholder="Enter last name"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact Information
          </h3>
          <div>
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-input" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Address
          </h3>
          <div className="space-y-5">
            <div>
              <label className="form-label">Street Address</label>
              <textarea 
                className="form-textarea" 
                value={formData.address} 
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House/Flat number, Street, Area"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="form-label">City</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.city} 
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                  placeholder="Your city"
                />
              </div>
              <div>
                <label className="form-label">Country</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.country} 
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })} 
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="form-label">Postal Code</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.postal_code} 
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} 
                  placeholder="PIN code"
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-medical-primary to-medical-secondary text-white rounded-lg font-heading font-bold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating Profile...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Profile
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;