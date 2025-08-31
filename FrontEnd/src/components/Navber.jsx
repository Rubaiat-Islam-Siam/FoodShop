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
              photo: user.photoURL
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback to Firebase user data on error
          setUserDetails({
            firstName: user.displayName || 'User',
            email: user.email,
            photo: user.photoURL
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
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl ml-10">FoodExpress</Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/food'>Foods</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="navbar-end mr-10">
          {userDetails ? (
            <div className="flex items-center gap-3">
              {/* Profile Image with fallback */}
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
              
              <span className="text-sm font-medium">Hello, {userDetails.firstName || 'User'}</span>
              <button 
                onClick={() => {
                  auth.signOut();
                  setUserDetails(null);
                }} 
                className="btn btn-sm btn-outline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to='/login' className="btn">Log in</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navber
