import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState(null);
  const [count, setCount] = useState(1);
  const [orderForm, setOrderForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "cash",
    specialInstructions: "",
  });

  useEffect(() => {
    console.log("Order component mounted");
    console.log("ID from params:", id);

    if (id) {
      setLoading(true);
      api
        .get(`/foods/${id}`)
        .then((res) => {
          setFood(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error response:", err.response); // Log full error response

          toast.error("Failed to load food details");
          setLoading(false);
        });
    }
  }, [id]);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleInputChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !orderForm.fullName ||
      !orderForm.email ||
      !orderForm.phone ||
      !orderForm.address
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        foodId: id,
        foodName: food.name,
        price: food.price,
        quantity: count,
        totalAmount: (food.price * count).toFixed(2),
        customerInfo: orderForm,
        orderDate: new Date().toISOString(),
      };

      // Here you would send the order to your backend
      console.log("Order placed:", orderData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Food not found
          </h2>
          <p className="text-gray-600 mb-2">
            The item you're looking for doesn't exist.
          </p>
          <p className="text-sm text-gray-500 mb-2">Food ID: {id}</p>

          <div className="space-y-2 mb-6">
            <button
              onClick={() => navigate("/food")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mr-4"
            >
              Back to Menu
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Retry
            </button>
          </div>
          <div className="text-xs text-gray-400">
            <p>If this error persists, check:</p>
            <p>1. Backend server is running on port 4000</p>
            <p>2. Food ID exists in database</p>
            <p>3. API endpoint /foods/{id} is working</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="">
            {/* Food Image */}
            <div className="md:flex-shrink-0 md:w-4xl h-[300px]">
              <img
                className="h-80 w-full object-cover md:h-full"
                src={
                  food.image ||
                  "https://via.placeholder.com/400x400?text=No+Image"
                }
                alt={food.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            </div>

            {/* Order Form */}
            <div className="p-8 md:">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {food.name}
                </h1>
                <span className="text-2xl font-bold text-green-600">
                  ${food.price}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 p-3 rounded-xl border border-blue-100 gap-4">
  <label className="block text-lg font-semibold text-gray-800">
    Quantity
  </label>

  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
    <div className="flex items-center border border-gray-300 rounded-xl px-3 sm:px-4 py-2 bg-white transition-all duration-300 hover:border-blue-500 hover:shadow-md w-full sm:w-auto justify-center">
      <button
        className="text-gray-600 hover:text-blue-700 transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 text-lg font-medium"
        onClick={handleDecrease}
      >
        -
      </button>
      <span className="mx-4 text-gray-800 font-bold w-8 text-center text-md">
        {count}
      </span>
      <button
        className="text-gray-600 hover:text-blue-700 transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 text-lg font-medium"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>

    <p className="text-lg font-bold text-green-700 bg-white py-2 px-4 rounded-lg border border-green-100 shadow-sm w-full sm:w-auto text-center">
      Total: ${(food.price * count).toFixed(2)}
    </p>
  </div>
</div>


              {/* Customer Information Form */}
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Delivery Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={orderForm.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={orderForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={orderForm.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={orderForm.address}
                    onChange={handleInputChange}
                    placeholder="Street address, apartment, suite, etc."
                    className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={orderForm.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2  text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cash">Cash on Delivery</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={orderForm.specialInstructions}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any special requests..."
                    className="w-full px-3 py-2  text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Placing Order...
                      </span>
                    ) : (
                      `Place Order - $${(food.price * count).toFixed(2)}`
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/food")}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back to Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
