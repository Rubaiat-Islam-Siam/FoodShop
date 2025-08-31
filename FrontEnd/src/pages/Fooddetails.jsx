import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import api from '../api';

const Fooddetails = () => {

    const {id} = useParams();
    const [food,setfood] = useState({})
    const [loading, setLoading] = useState(true)
    const [count,setCount] = useState(1);

    const handleIncrease = () => {
          setCount( (prev)=> prev+1)
    }
    const handleDecrease = () => {
        setCount ((prev)=> prev>1 ? prev-1 : 1 )
    }

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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        )
    }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2">
                        <div className="h-80 md:h-full w-full relative">
                            <img
                                className="h-full w-full object-cover"
                                src={food.image}
                                alt={food.name}  
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {food.category || "Delicious"}
                            </div>
                        </div>
                    </div>
                    <div className="p-8 md:w-1/2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-gray-900">{food.name}</h2>
                            <span className="text-2xl font-bold text-primary">${food.price || "12.99"}</span>
                        </div>
                        
                        <div className="mt-4 flex items-center">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600">(42 reviews)</span>
                        </div>
                        
                        <p className="mt-6 text-gray-600 leading-relaxed">{food.description || "A delicious dish with premium ingredients and authentic flavors."}</p>
                        
                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase">Ingredients</h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {food.ingredients ? (
                                    food.ingredients.map((ingredient, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                            {ingredient}
                                        </span>
                                    ))
                                ) : (
                                    <>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Fresh Herbs</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Organic Vegetables</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Premium Spices</span>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="mt-8 flex items-center space-x-4">
                            <div className="flex items-center border rounded-lg px-4 py-2">
                                <button className="text-gray-500 hover:text-gray-700" onClick={handleDecrease}>-</button>
                                <span className="mx-4 text-gray-700">{count}</span>
                                <button className="text-gray-500 hover:text-gray-700" onClick={handleIncrease}>+</button>
                            </div>
                            <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105">
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Nutritional Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <span className="block text-2xl font-bold text-primary">320</span>
                        <span className="text-sm text-gray-600">Calories</span>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <span className="block text-2xl font-bold text-primary">12g</span>
                        <span className="text-sm text-gray-600">Protein</span>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <span className="block text-2xl font-bold text-primary">8g</span>
                        <span className="text-sm text-gray-600">Fat</span>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <span className="block text-2xl font-bold text-primary">42g</span>
                        <span className="text-sm text-gray-600">Carbs</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Fooddetails