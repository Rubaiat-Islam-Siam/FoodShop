import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import api from '../api';

const AddFood = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'User', user.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAdmin(true);
      } else {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      toast.error('Error verifying admin status');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!foodData.name || !foodData.price || !foodData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post('/foods/add', {
        name: foodData.name.trim(),
        price: parseFloat(foodData.price),
        category: foodData.category.trim(),
        image: foodData.image.trim() || 'https://via.placeholder.com/300x200?text=No+Image',
        description: foodData.description.trim()
      });

      if (response.data.success) {
        toast.success('Food item added successfully!');
        setFoodData({
          name: '',
          price: '',
          category: '',
          image: '',
          description: ''
        });
      } else {
        toast.error('Failed to add food item');
      }
    } catch (error) {
      console.error('Error adding food:', error);
      toast.error('Error adding food item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Add New Food Item</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to Dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Name 
              </label>
              <input
                type="text"
                name="name"
                value={foodData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter food name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={foodData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={foodData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Salad">Salad</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={foodData.image}
                onChange={handleInputChange}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use default placeholder image
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={foodData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter food description"
              />
            </div>

            {/* Preview */}
            {foodData.name && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={foodData.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                      }}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{foodData.name}</h4>
                      <p className="text-green-600 font-semibold">
                        ${foodData.price || '0.00'}
                      </p>
                      <p className="text-sm text-gray-500">{foodData.category}</p>
                    </div>
                  </div>
                  {foodData.description && (
                    <p className="text-sm text-gray-600 mt-3">{foodData.description}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                  submitting
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Food...
                  </span>
                ) : (
                  'Add Food Item'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/admin/manage-foods')}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Manage Foods
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;