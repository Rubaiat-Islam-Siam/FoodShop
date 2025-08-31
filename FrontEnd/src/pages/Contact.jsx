import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    toast("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-10 font-['Poppins']">
      <div className="bg-amber-50 w-full max-w-5xl h-auto md:h-[550px] flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden relative border-2 border-amber-200">
        {/* Left Side - Form */}
        <div className="flex-1 bg-amber-50 p-6 md:p-10 text-black flex flex-col justify-center gap-6 relative">
          
          <div className="animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-sm md:text-md max-w-[350px] mt-2 text-amber-800">
              Feel free to contact us any time. We will get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2 text-black animate-slide-up">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full md:w-[350px] p-3 border-b-2 border-amber-400 bg-transparent outline-none transition-all duration-300 focus:shadow-[0_4px_6px_-1px_rgba(255,193,7,0.3),0_2px_4px_-1px_rgba(255,193,7,0.1)]"
              />
             
            </div>
            
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full md:w-[350px] p-3 border-b-2 border-amber-400 bg-transparent outline-none transition-all duration-300 focus:shadow-[0_4px_6px_-1px_rgba(255,193,7,0.3),0_2px_4px_-1px_rgba(255,193,7,0.1)]"
              />
             
            </div>
            
            <div className="relative">
              <input
                type="text"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full md:w-[350px] p-3 border-b-2 border-amber-400 bg-transparent outline-none transition-all duration-300 focus:shadow-[0_4px_6px_-1px_rgba(255,193,7,0.3),0_2px_4px_-1px_rgba(255,193,7,0.1)]"
              />
              
            </div>
            
            <button
              type="submit"
              className="w-full md:w-[350px] mt-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <span>SEND</span>
              
            </button>
          </form>

          {/* Yellow corner accent top-left */}
          <div className="absolute top-0 left-0 w-10 h-10 bg-yellow-400 clip-polygon-top-left"></div>
          
        </div>


        {/* Right Side - Info Box - CENTERED */}
        <div className="w-full md:w-[450px] h-auto my-auto justify-end md:h-[400px] flex items-center justify-center relative z-10">
          <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 md:p-8 flex flex-col justify-center rounded-2xl gap-5 shadow-2xl border-2 border-amber-500 w-full max-w-[400px] h-auto">
            <h2 className="text-2xl font-bold text-yellow-400 animate-fade-in">Info</h2>
            
            <div className="space-y-4 animate-fade-in">
              <p className="info-item flex items-center gap-3 transition-all duration-300 p-2 rounded hover:bg-amber-400/20 hover:translate-x-1">
                <i className="fas fa-envelope text-yellow-400 w-5"></i>
                <span>siamthelegendman@gmail.com</span>
              </p>
              <p className="info-item flex items-center gap-3 transition-all duration-300 p-2 rounded hover:bg-amber-400/20 hover:translate-x-1">
                <i className="fas fa-phone text-yellow-400 w-5"></i>
                <span>+880 17233-35513</span>
              </p>
              <p className="info-item flex items-center gap-3 transition-all duration-300 p-2 rounded hover:bg-amber-400/20 hover:translate-x-1">
                <i className="fas fa-map-marker-alt text-yellow-400 w-5"></i>
                <span>14 Greenroad St.</span>
              </p>
              <p className="info-item flex items-center gap-3 transition-all duration-300 p-2 rounded hover:bg-amber-400/20 hover:translate-x-1">
                <i className="fas fa-clock text-yellow-400 w-5"></i>
                <span>09:00 AM - 10:00 PM</span>
              </p>
            </div>
            
            <div className="flex space-x-4 mt-4 animate-fade-in">
              <div  className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-black hover:scale-110 transition-transform">
                <i className="fab fa-facebook-f" ></i>
                <a href="https://www.facebook.com/rubaiatislam.siam"></a>
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-black hover:scale-110 transition-transform">
                <i className="fab fa-twitter"></i>
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-200 font-bold flex items-center justify-center text-black hover:scale-110 transition-transform">
                <i className="fab fa-instagram font-bold"></i>
              </div>
            </div>

  
            
          </div>
        </div>
      </div>

      {/* Add Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Add Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
          }
          
          .animate-slide-up {
            animation: slideUp 0.5s ease-out forwards;
            opacity: 0;
          }
          
          .clip-polygon-top-left {
            clip-path: polygon(0 0, 0% 100%, 100% 0);
          }
          
          .clip-polygon-bottom-left {
            clip-path: polygon(100% 0, 0% 100%, 100% 100%);
          }
          
          .font-['Poppins'] {
            font-family: 'Poppins', sans-serif;
          }
          
          /* Staggered animations */
          .animate-slide-up:nth-child(1) {
            animation-delay: 0.1s;
          }
          
          .animate-fade-in:nth-child(1) {
            animation-delay: 0.3s;
          }
          
          .animate-fade-in:nth-child(2) {
            animation-delay: 0.5s;
          }
        `}
      </style>
    </div>
  );
};

export default Contact;