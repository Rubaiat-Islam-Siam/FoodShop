import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Executive Chef",
      image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      description: "With over 15 years of culinary experience, Sarah brings creativity and passion to every dish."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      description: "Michael ensures our kitchen runs smoothly and our delivery service is always on time."
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Pastry Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      description: "Elena's desserts are works of art that delight both the eyes and the palate."
    },
    {
      id: 4,
      name: "David Kim",
      role: "Nutritionist",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      description: "David ensures our meals are not only delicious but also balanced and nutritious."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Meals Served Daily" },
    { number: "25", label: "Expert Chefs" },
    { number: "15", label: "Years of Experience" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative py-20 bg-[#BDDDFC] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center ">
            <h1 className={`text-4xl text-[#384959] md:text-5xl font-bold mb-6 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              About FoodExpress
            </h1>
            <p className="text-xl max-w-3xl text-[#505081]  mx-auto">
              We're passionate about creating delicious, nutritious meals that bring people together and make life better.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              FoodExpress began in 2008 with a simple mission: to make high-quality, delicious food accessible to everyone. 
              What started as a small family-owned restaurant has grown into a beloved food delivery service trusted by thousands.
            </p>
            <p className="text-gray-600 mb-4">
              Our founders believed that food should be both nourishing and exciting. They traveled the world to learn different 
              culinary techniques and brought back the best flavors to create our unique menu.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate while staying true to our roots. We source ingredients locally whenever possible, 
              support sustainable farming practices, and never compromise on quality or taste.
            </p>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <img 
              src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
              alt="Our restaurant kitchen" 
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <p className="text-4xl font-bold text-blue-600">{stat.number}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-9 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Meet Our Team</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Our talented team of chefs, nutritionists, and food enthusiasts work together to create exceptional dining experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-3">Quality</h3>
              <p className="text-gray-600">We never compromise on ingredients or preparation. Every dish is crafted with care and attention to detail.</p>
            </div>
            
            <div className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Sustainability</h3>
              <p className="text-gray-600">We're committed to eco-friendly practices, from sourcing local ingredients to using compostable packaging.</p>
            </div>
            
            <div className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Innovation</h3>
              <p className="text-gray-600">We're constantly exploring new flavors and techniques to keep our menu exciting and forward-thinking.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-9 bg-[#6A89A7] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience our food?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who enjoy our delicious meals every day.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            Explore Our Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;