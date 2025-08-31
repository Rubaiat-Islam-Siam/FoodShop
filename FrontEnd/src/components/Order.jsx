import React, { useEffect, useState } from 'react'
import api from '../api'
import { useParams } from 'react-router-dom';

const Order = () => {
  const {id} = useParams();
  const [loading,setLoading] = useState();
  const [food,setFood] =useState();

  useEffect(()=>{
    setLoading(true);
    api.get(`/food/${id}`)
    .then((res)=>{
       setFood(res.data);
       setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    })
  },[id])

 if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Order is Processing...</p>
                </div>
            </div>
        )
    }
  return (
    <div>
      {food.price}
    </div>
  )
}

export default Order
