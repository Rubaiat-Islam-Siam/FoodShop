import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User created:', user);
        
        if(user){
            await setDoc(doc(db, 'User', user.uid), {
                email: user.email,
                firstName: firstName.trim(), // Use state value and trim whitespace
                lastName: lastName.trim(),   // Use state value and trim whitespace
                createdAt: new Date().toISOString()
            });
            
            toast.success('Account created successfully!',{
                position:'top-center'
            });
            navigate('/'); // Redirect to home or login page
        }
       console.log('Signing up with:', { firstName, lastName, email, password, rememberMe });
    }catch(err){
       console.error('Signup error:', err);
       
       // Better error handling
       if (err.code === 'auth/email-already-in-use') {
         toast.error('Email is already registered',{
                position:'top-center'
            });
       } else if (err.code === 'auth/weak-password') {
         toast.error('Password is too weak');
       } else if (err.code === 'auth/invalid-email') {
         toast.error('Invalid email address',{
                position:'top-center'
            });
       } else {
         toast.error('Failed to create account. Please try again.',{
                position:'top-center'
            });
       }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        
        if(result.user){
            await setDoc(doc(db, 'User', result.user.uid), {
                email: result.user.email,
                firstName: result.user.displayName || 'Google User',
                photo: result.user.photoURL,
                lastName: '',
                createdAt: new Date().toISOString()
            });
            
            toast.success('Google sign-up successful!', {
                position: 'top-center'
            });
            navigate('/');
        }
    } catch (err) {
        console.error('Google sign-up error:', err);
        toast.error('Google sign-up failed. Please try again.', {
            position: 'top-center'
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="py-6 px-8 bg-[#6A89A7]">
          <h1 className="text-3xl font-bold text-center text-white">Create Account</h1>
          <p className="text-center text-indigo-100 mt-2">Join us today!</p>
        </div>
        
        <form className="py-8 px-8" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-black mb-6 text-center">Sign Up</h3>

          {/* First Name */}
          <div className="mb-5">
            <label className="block text-black text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-5">
            <label className="block text-black text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-black text-sm font-medium mb-2">Email address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="mb-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-[#6A89A7] hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
          
          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          {/* Google Sign In */}
          <div className="mb-6">
            <button 
              type="button" 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </div>
          
          <p className="text-center text-gray-600 text-sm">
            Already have an account? 
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              Login Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
