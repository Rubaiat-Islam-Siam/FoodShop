import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    toast('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with decorative elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-12 right-12 w-24 h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative z-10">
            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto relative z-10">
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Contact Form with enhanced styling */}
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
                <p className="text-blue-100 mt-1">Fill out the form below and we'll get back to you shortly</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-5 text-black pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                        placeholder="Enter Name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-5 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-5 text-black pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full pl-5 text-black pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* FAQ Section with enhanced styling */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <p className="text-blue-100 mt-1">Find quick answers to common questions</p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg transition-all duration-300 hover:border-blue-600 hover:bg-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How long does delivery take?</h3>
              <p className="text-gray-600">Delivery typically takes 30-45 minutes depending on your location and current order volume.</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg transition-all duration-300 hover:border-purple-600 hover:bg-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you offer catering services?</h3>
              <p className="text-gray-600">Yes, we offer catering for events of all sizes. Contact us for custom menus and pricing.</p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded-r-lg transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and cash on delivery.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg transition-all duration-300 hover:border-blue-600 hover:bg-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you have vegetarian/vegan options?</h3>
              <p className="text-gray-600">Yes, we have a wide variety of vegetarian and vegan dishes. Look for the special icons on our menu.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Contact;