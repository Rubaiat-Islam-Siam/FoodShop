import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Foods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/foods")
      .then(res => {
        console.log("API Response:", res.data);
        setFoods(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-4 text-lg">Loading delicious foods...</span>
    </div>
  );
  
  if (error) return (
    <div className="text-center p-8">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 animate-pulse" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-[#f9fafb] to-[#f5f6fa] min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 mt-6 text-transparent bg-clip-text bg-gradient-to-r from-[#273c75] to-[#44bd32] animate-pulse">
        Foods Menu
      </h1>
      
      {foods.length === 0 ? (
        <div className="text-center p-8 animate-bounce">
          <div className="text-6xl mb-4">🍕</div>
          <p className="text-xl text-gray-600">No foods found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food, index) => (
            <div 
              key={food._id} 
              className="card bg-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <figure className="h-60 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    console.log("Image failed to load:", food.image);
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </figure>
              <div className="card-body p-5">
                <h2 className="card-title text-2xl font-bold text-[#273c75] mb-2 transition-colors duration-300 hover:text-[#44bd32]">
                  {food.name} <span className="text-[#e84118]">${food.price}</span>
                </h2>
                <p className="text-gray-700  rounded-full px-2 py-1 inline-block text-lg font-semibold mb-4 ">
                  {food.category}
                </p>
                <div className="card-actions -mt-15 justify-end">
                  <Link 
                    to={`/foodDetails/${food._id}`} 
                    className="btn bg-[#273c75] text-white py-2 px-6 rounded-full hover:bg-[#44bd32] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}