import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, db } from './firebase';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!',{
        position:'top-center'
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error('Login failed. Please check your credentials.',{
        position:'top-center'
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      await setDoc(doc(db, "User", user.uid), {
        Name: user.displayName || "",
        Email: user.email || "",
        photo: user.photoURL || ""
      }, { merge: true });
      
      toast.success('Google sign-in successful!');
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error('Google sign-in failed.');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-indigo-100 transform transition-all duration-300 hover:shadow-xl">
        {/* Header with gradient background */}
        <div className="bg-[#6A89A7] py-4 px-6 -mx-10 -mt-10 rounded-t-2xl mb-6">
          <h2 className="text-center text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-1 text-center text-indigo-100">
            Sign in to access your account
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200 animate-pulse">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-red-700">{error}</span>
              </div>
            </div>
          )}
          
          {/* Email Input with icon */}
          <div className="space-y-4 my-10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {/* Password Input with icon */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-white bg-white focus:ring-indigo-500 border-gray-300  rounded transition duration-150 ease-in-out"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#0376e9] hover:text-indigo-500 transition duration-150 ease-in-out">
                Forgot your password?
              </a>
            </div>
          </div>
           
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6A89A7] hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Sign in
                </span>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-[#0567c9] hover:text-indigo-500 transition duration-150 ease-in-out">
                Sign up here
              </a>
            </p>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition duration-150 ease-in-out hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </form>
      
      </div>
    </div>
  );
};

export default Login;