import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import api from '../api';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalOrders: 0,
    totalUsers: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
    fetchStats();
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

  const fetchStats = async () => {
    try {
      const foodsResponse = await api.get('/foods');
      setStats(prev => ({
        ...prev,
        totalFoods: foodsResponse.data.length
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to the admin control panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1l-.867 12.142A2 2 0 0118.138 21H5.862a2 2 0 01-1.995-1.858L3 7H2a1 1 0 110-2h4zM7 4h10V2H7v2zm3 6a1 1 0 112 0v6a1 1 0 11-2 0v-6zm4 0a1 1 0 112 0v6a1 1 0 11-2 0v-6z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Foods</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFoods}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/add-food')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center"
            >
              <div className="text-blue-600 text-2xl mb-2">➕</div>
              <p className="font-medium text-blue-900">Add New Food</p>
            </button>

            <button
              onClick={() => navigate('/admin/manage-foods')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center"
            >
              <div className="text-green-600 text-2xl mb-2">🍽️</div>
              <p className="font-medium text-green-900">Manage Foods</p>
            </button>

            <button
              onClick={() => navigate('/admin/orders')}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center"
            >
              <div className="text-purple-600 text-2xl mb-2">📦</div>
              <p className="font-medium text-purple-900">View Orders</p>
            </button>

            <button
              onClick={() => navigate('/food')}
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center"
            >
              <div className="text-gray-600 text-2xl mb-2">👁️</div>
              <p className="font-medium text-gray-900">View Site</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm text-gray-900">System online and functioning normally</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;