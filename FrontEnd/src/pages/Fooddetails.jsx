import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import api from '../api';

const Fooddetails = () => {

    const {id} = useParams();
    const [food,setfood] = useState({})
    const [loading, setLoading] = useState(true)
    const [imageLoaded, setImageLoaded] = useState(false);

    
    useEffect(()=> {
        setLoading(true)
        api.get(`/foods/${id}`)
        .then(res => {
            setfood(res.data)
            setLoading(false)
        })
        .catch(err=> {
            console.log(err)
            setLoading(false)
        });
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading delicious details...</p>
                </div>
            </div>
        )
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2 relative">
                        <div className="h-80 md:h-full w-full relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gray-200 animate-pulse rounded-lg ${imageLoaded ? 'hidden' : 'block'}`}></div>
                            <img
                                className={`h-full w-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                                src={food.image}
                                alt={food.name}
                                onLoad={() => setImageLoaded(true)}
                                onError={(e) => {
                                    console.log("Image failed to load:", food.image);
                                    e.target.src = "https://via.placeholder.com/500x600?text=No+Image";
                                    setImageLoaded(true);
                                }}
                            />
                            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce inline-block">
                                {food.category || "Delicious"}
                            </div>
                        </div>
                    </div>
                    <div className="p-8 md:w-1/2 justify-center my-auto">
                        <div className="flex items-center justify-between animate-slide-in">
                            <h2 className="text-3xl font-bold text-gray-900">{food.name}</h2>
                            <span className="text-2xl font-bold text-blue-500 animate-pulse">${food.price || "12.99"}</span>
                        </div>
                        
                        <div className="mt-4 flex items-center animate-fade-in-delayed">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600">(42 reviews)</span>
                        </div>
                        
                        <p className="mt-6 text-gray-600 leading-relaxed animate-fade-in-delayed">{food.description || "A delicious dish with premium ingredients and authentic flavors."}</p>
                        
                        <div className="mt-8 border-t border-gray-100 pt-6 animate-fade-in-delayed">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase">Ingredients</h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {food.ingredients ? (
                                    food.ingredients.map((ingredient, index) => (
                                        <span 
                                            key={index} 
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 hover:scale-105"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {ingredient}
                                        </span>
                                    ))
                                ) : (
                                    <>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 hover:scale-105">Fresh Herbs</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 hover:scale-105">Organic Vegetables</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 hover:scale-105">Premium Spices</span>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="mt-8 flex items-center space-x-4 animate-fade-in-delayed">
                            
                            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg" >
                                <Link to={`/order/${id}`}>
                                Add to Order
                                </Link>
                                
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-900 mb-6 animate-fade-in">Nutritional Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { value: "320", label: "Calories", delay: "0s" },
                        { value: "12g", label: "Protein", delay: "0.1s" },
                        { value: "8g", label: "Fat", delay: "0.2s" },
                        { value: "42g", label: "Carbs", delay: "0.3s" }
                    ].map((item, index) => (
                        <div 
                            key={index}
                            className="text-center p-4 bg-gray-50 rounded-lg transition-all duration-500 hover:bg-blue-50 hover:scale-105 hover:shadow-md"
                            style={{ animationDelay: item.delay }}
                        >
                            <span className="block text-2xl font-bold text-blue-500">{item.value}</span>
                            <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Back button */}
            <div className="mt-8 text-center animate-fade-in">
                <button 
                    onClick={() => window.history.back()} 
                    className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 font-medium"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Menu
                </button>
            </div>
        </div>

        {/* Add CSS for animations */}
        <style jsx>{`
            .animate-fade-in {
                animation: fadeIn 0.8s ease-out forwards;
            }
            .animate-fade-in-delayed {
                opacity: 0;
                animation: fadeIn 0.8s ease-out forwards;
                animation-delay: 0.3s;
            }
            .animate-slide-in {
                opacity: 0;
                transform: translateX(-20px);
                animation: slideIn 0.6s ease-out forwards;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { opacity: 0; transform: translateX(-20px); }
                to { opacity: 1; transform: translateX(0); }
            }
        `}</style>
    </div>
  )
}

export default Fooddetails