import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const ManageFoods = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);

  const navigate = useNavigate();

  // ✅ Verify user and admin role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "User", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();

            if (userData.role !== "admin") {
              toast.error("Access denied. Admin only!");
              navigate("/");
              return;
            }

            setUserDetails(userData);
            await fetchFoods();
          } else {
            toast.error("User data not found");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error verifying admin access");
          navigate("/");
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // ✅ Fetch all foods
  const fetchFoods = async () => {
    setLoadingFoods(true);
    try {
      const response = await api.get("/foods");
      console.log("Foods API Response:", response.data);

      // Handle different backend response formats
      let foodsArray = [];
      if (Array.isArray(response.data)) {
        foodsArray = response.data;
      } else if (response.data.foods) {
        foodsArray = response.data.foods;
      } else if (response.data.data) {
        foodsArray = response.data.data;
      }

      setFoods(foodsArray || []);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Failed to load foods");
    } finally {
      setLoadingFoods(false);
    }
  };

  // ✅ Show delete confirmation modal
  const handleDeleteClick = (foodId) => {
    setSelectedFoodId(foodId);
    setShowConfirm(true);
  };

  // ✅ Delete food
  const deleteFood = async (foodId) => {
    try {
      console.log("Deleting food with ID:", foodId);
      const response = await api.delete(`/foods/${foodId}`);
      console.log("Delete response:", response);

      // Check if deletion was successful
      if (response.status >= 200 && response.status < 300) {
        toast.success("Food item deleted successfully!");

        // Remove the deleted item from local state
        setFoods((prev) => prev.filter((food) => food._id !== foodId));

        // Refresh the foods list to ensure UI is in sync
        await fetchFoods();
      } else {
        toast.error("Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food:", error);

      if (error.response?.status === 404) {
        toast.error("Food item not found");
      } else if (error.response?.status === 500) {
        toast.error("Server error while deleting food item");
      } else {
        toast.error("Failed to delete food item. Please try again.");
      }
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return null;
  }

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* Main Content - Apply blur when modal is open */}
      <div className={`transition-all duration-300 ${showConfirm ? 'blur-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ✅ Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Foods</h1>
            <p className="text-gray-600 mt-2">
              Edit and manage your food items
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/admin/add-food"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Add New Food
            </Link>
            <Link
              to="/admin/dashboard"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* ✅ Foods List */}
        <div className="bg-white rounded-lg shadow-md">
          {loadingFoods ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading foods...</p>
            </div>
          ) : foods.length === 0 ? (
            <div className="p-8 text-center">
              <p className="mt-4 text-lg text-gray-600">No food items found</p>
              <p className="text-gray-500">
                Start by adding your first food item
              </p>
              <Link
                to="/admin/add-food"
                className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Add Food Item
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Food Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {foods.map((food) => (
                    <tr key={food._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={
                              food.image ||
                              "https://via.placeholder.com/48x48?text=No+Image"
                            }
                            alt={food.name}
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/48x48?text=No+Image")
                            }
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {food.name}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {food.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {food.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${food.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            food.inStock !== false
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {food.inStock !== false ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteClick(food._id)}
                          className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition-colors"
                        >
                          Delete
                        </button>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* End of blurred content */}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-10 z-20">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-96 text-center border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  deleteFood(selectedFoodId);
                  setShowConfirm(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFoods;
