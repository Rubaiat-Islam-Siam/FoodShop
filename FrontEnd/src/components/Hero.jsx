import React, { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      title: "Delicious Italian Pasta",
      subtitle: "Freshly Made with Authentic Ingredients",
    },
    {
      src: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
      title: "Gourmet Burgers",
      subtitle: "Juicy, Flavorful & Handmade Daily",
    },
    {
      src: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
      title: "Healthy Salads",
      subtitle: "Crisp, Fresh & Packed with Flavor",
    },
    {
      src: "https://images.pexels.com/photos/954677/pexels-photo-954677.jpeg",
      title: "Decadent Desserts",
      subtitle: "Indulge in Sweet Treats Today",
    },
  ];

  // Auto-change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="carousel w-full h-[500px] relative overflow-hidden">
        {images.map((item, index) => (
          <div
            key={index}
            className={`w-full h-full absolute top-0 left-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={item.src}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />

            {/* Text Overlay - Only shows on active slide */}
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 flex items-center justify-center">
                <div className="text-center text-[#8c7ae6] px-4 z-20">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                    {item.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-6 drop-shadow-md">
                    {item.subtitle}
                  </p>
                  <button className="btn mt-7 bg-transparent border border-white text-white btn-lg font-bold hover:bg-white hover:text-[#192a56] transition-all duration-300 shadow-lg">
                    Shop Now
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
