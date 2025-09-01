import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';

const Navber = () => {
  const [userDetails, setUserDetails] = useState(null);
  
  const fetchUserData = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Firebase User:', user);
        try {
          const docRef = doc(db, 'User', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log('User document data:', userData);
            console.log('Photo URL:', userData.photo);
            setUserDetails(userData);
          } else {
            console.log('No user document found - using Firebase user data');
            // Fallback to Firebase user data if no Firestore document
            setUserDetails({
              firstName: user.displayName || 'User',
              email: user.email,
              photo: user.photoURL,
              role: 'user'
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback to Firebase user data on error
          setUserDetails({
            firstName: user.displayName || 'User',
            email: user.email,
            photo: user.photoURL,
            role: 'user'
          });
        }
      } else {
        console.log('User is not logged in');
        setUserDetails(null);
      }
    });
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar text-white shadow-md" style={{backgroundColor: '#384959'}}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/food'>Foods</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {userDetails?.role === 'admin' && (
                <>
                  <li><hr className="my-2" /></li>
                  <li className="menu-title">Admin Panel</li>
                  <li><Link to='/admin/dashboard'>Dashboard</Link></li>
                  <li><Link to='/admin/add-food'>Add Food</Link></li>
                  <li><Link to='/admin/manage-foods'>Manage Foods</Link></li>
                  <li><Link to='/admin/orders'>Orders</Link></li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl ml-10 text-white">
            <span className="font-bold">FoodExpress</span>
          </Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link 
                to='/' 
                className="font-medium text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to='/food' 
                className="font-medium text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Foods
              </Link>
            </li>
            <li>
              <Link 
                to='/about' 
                className="font-medium text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-all duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="font-medium text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Contact
              </Link>
            </li>

            {userDetails?.role === 'admin' && (
              <li className="relative group">
                <button className="flex items-center font-semibold bg-white/10 text-white hover:bg-white/20 transition-all duration-200 rounded-lg px-4 py-2 w-full">
                  Admin Panel
                  <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute hidden group-hover:block right-0 top-full pt-2 w-48 z-50">
                  <ul className="bg-[#384959] text-white rounded-lg overflow-hidden">
                    <li>
                      <Link 
                        to='/admin/dashboard' 
                        className="block px-4 py-3 transition-colors duration-200 border-b border-gray-100 hover:bg-gray-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to='/admin/add-food' 
                        className="block px-4 py-3 transition-colors duration-200 border-b border-gray-100 hover:bg-gray-700"
                      >
                        Add Food
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to='/admin/manage-foods' 
                        className="block px-4 py-3 transition-colors duration-200 border-b border-gray-100 hover:bg-gray-700"
                      >
                        Manage Foods
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to='/admin/orders' 
                        className="block px-4 py-3 transition-colors duration-200 hover:bg-gray-700"
                      >
                        Orders
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
        
        <div className="navbar-end mr-10">
          {userDetails ? (
            <div className="flex items-center gap-3">
              {/* Profile Image with fallback */}
              {userDetails.role === 'admin' &&(
                <div className='badge badge-error badge-sm'>ADMIN</div>
              )}

              <div className="avatar">
                <div className="w-8 h-8 rounded-full">
                  {userDetails.photo ? (
                    <img 
                      src={userDetails.photo} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', userDetails.photo);
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Fallback avatar */}
                  <div 
                    className={`w-full h-full rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold ${userDetails.photo ? 'hidden' : 'flex'}`}
                  >
                    {userDetails.firstName ? userDetails.firstName.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
              </div>
              
              <span className="text-sm font-medium text-white">Hello, {userDetails.firstName || 'User'}
                {userDetails.role === 'admin' && (
                  <span className='text-red-300 font-bold ml-1'>(Admin)</span>
                )}
              </span>
              <button 
                onClick={() => {
                  auth.signOut();
                  setUserDetails(null);
                }} 
                className="btn btn-sm bg-white/10 text-white hover:bg-white/20 border-none"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to='/login' className="btn bg-white/10 text-white hover:bg-white/20 border-none">Log in</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navber