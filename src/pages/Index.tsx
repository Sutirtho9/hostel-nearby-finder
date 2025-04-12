
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBox from '@/components/SearchBox';
import HostelCard, { Hostel } from '@/components/HostelCard';
import { searchHostels } from '@/data/hostels';
import { MapPin } from 'lucide-react';

const Index = () => {
  const [searchResults, setSearchResults] = useState<Hostel[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (location: string) => {
    setIsLoading(true);
    setSearchLocation(location);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = searchHostels(location);
      setSearchResults(results);
      setHasSearched(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
            Find the Perfect Hostel Near You
          </h1>
          <p className="text-xl text-white text-center mb-8 max-w-2xl">
            Discover affordable and social accommodations wherever your journey takes you
          </p>
          
          {/* Search Box */}
          <div className="w-full max-w-3xl">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      {hasSearched && (
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hostel-blue mb-4"></div>
              <p className="text-xl text-gray-600">Searching hostels near your location...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {searchResults.length > 0 
                    ? `${searchResults.length} hostels found` 
                    : "No hostels found"}
                </h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={18} className="mr-1" />
                  <span>{searchLocation.split(',').length > 1 ? 'Your location' : searchLocation}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(hostel => (
                  <HostelCard key={hostel.id} hostel={hostel} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Features Section (only show if no search has been made) */}
      {!hasSearched && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose HostelConnect?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="rounded-full bg-hostel-lightBlue bg-opacity-20 p-4 inline-flex items-center justify-center mb-4">
                <MapPin className="text-hostel-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Location-Based Search</h3>
              <p className="text-gray-600">Find hostels near your current location or any destination with our precise search.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="rounded-full bg-hostel-lightOrange bg-opacity-20 p-4 inline-flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-hostel-orange">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
              <p className="text-gray-600">Get the best deals on hostels with our price comparison and exclusive offers.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="rounded-full bg-hostel-lightBlue bg-opacity-20 p-4 inline-flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-hostel-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Reviews</h3>
              <p className="text-gray-600">Read authentic reviews from fellow travelers to make informed decisions.</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
