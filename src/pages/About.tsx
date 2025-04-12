
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About HostelConnect</h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80" 
              alt="Hostel common area" 
              className="w-full h-64 md:h-80 object-cover"
            />
            
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-hostel-blue mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                HostelConnect was founded in 2023 with a simple mission: to connect travelers with the best hostels around the world. We believe that travel should be accessible to everyone, and hostels provide an affordable and social way to explore new destinations.
              </p>
              
              <h2 className="text-2xl font-semibold text-hostel-blue mb-4 mt-8">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Comprehensive Search</h3>
                  <p className="text-gray-700">
                    Find hostels by location, price, and amenities to match your travel needs.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Verified Reviews</h3>
                  <p className="text-gray-700">
                    Read authentic reviews from fellow travelers to make informed decisions.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Best Price Guarantee</h3>
                  <p className="text-gray-700">
                    We work directly with hostels to ensure you get the best possible rates.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Community Connection</h3>
                  <p className="text-gray-700">
                    Connect with other travelers and find the perfect social environment.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-hostel-blue mb-4 mt-8">Our Team</h2>
              <p className="text-gray-700 mb-6">
                Our team consists of passionate travelers who have stayed in hundreds of hostels across the globe. We understand what makes a great hostel experience and are committed to helping you find the perfect place to stay.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
