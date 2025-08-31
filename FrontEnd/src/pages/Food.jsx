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
        console.log("API Response:", res.data); // Debug log
        setFoods(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-[#f5f6fa]">
      <h1 className="text-3xl font-bold text-black text-center mb-8">Foods Menu </h1>
      
      {foods.length === 0 ? (
        <div className="text-center p-8">No foods found</div>
      ) : (
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map(food => (
            <div key={food._id} className="card bg-[#dcdde1] w-full shadow-lg">
              <figure className="h-60">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("Image failed to load:", food.image);
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-[#273c75] text-2xl font-bold">{food.name} - ${food.price}</h2>
                <p className="text-gray-900 text-lg font-bold">{food.category}</p>
                <div className="card-actions justify-end">
                  <Link 
                    to={`/foodDetails/${food._id}`} 
                    className="btn btn-primary"
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