import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAPI } from '../../services/api';

interface Category {
  id: number;
  name: string;
}

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    is_available: true,
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await adminAPI.getCategories();
      setCategories(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await adminAPI.getProduct(Number(id));
      const product = response.data;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        is_available: product.is_available,
        image: null,
      });
      if (product.image) {
        setImagePreview(product.image);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error loading product');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('stock', formData.stock);
      submitData.append('category', formData.category);
      submitData.append('is_available', formData.is_available.toString());
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      if (id) {
        await adminAPI.updateProduct(Number(id), submitData);
        alert('Product updated successfully');
      } else {
        await adminAPI.createProduct(submitData);
        alert('Product created successfully');
      }
      
      navigate('/admin/products');
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <h1 className="text-4xl font-heading font-extrabold text-gray-900">
            {id ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="Enter product description"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_available"
                checked={formData.is_available}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
              />
              <label className="text-sm font-bold text-gray-700">
                Product is available for sale
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : id ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;