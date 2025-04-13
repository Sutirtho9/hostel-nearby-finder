
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBox from '@/components/SearchBox';
import HostelCard, { Hostel } from '@/components/HostelCard';
import { searchHostels } from '@/data/hostels';
import { MapPin, School } from 'lucide-react';
import CitySelector from '@/components/CitySelector';
import UniversitySearch from '@/components/UniversitySearch';
import HostelMap from '@/components/HostelMap';
import { University, getHostelsNearUniversity } from '@/data/universities';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [searchResults, setSearchResults] = useState<Hostel[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [searchType, setSearchType] = useState<'location' | 'university'>('location');
  const [showMap, setShowMap] = useState(false);

  const handleSearch = (location: string) => {
    if (selectedUniversity) {
      setSelectedUniversity(null);
    }
    
    setIsLoading(true);
    setSearchLocation(location);
    setSelectedCity(null);
    setSearchType('location');
    
    // Simulate API call delay
    setTimeout(() => {
      const results = searchHostels(location);
      setSearchResults(results);
      setHasSearched(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleCitySelect = (city: string) => {
    if (city === "") {
      setSelectedCity(null);
      setHasSearched(false);
      setSearchResults([]);
      return;
    }

    if (selectedUniversity) {
      setSelectedUniversity(null);
    }

    setIsLoading(true);
    setSelectedCity(city);
    setSearchLocation(city);
    setSearchType('location');
    
    // Simulate API call delay
    setTimeout(() => {
      const results = searchHostels(city);
      setSearchResults(results);
      setHasSearched(true);
      setIsLoading(false);
    }, 800);
  };
  
  const handleUniversitySelect = (university: University | null) => {
    setSelectedUniversity(university);
    
    if (!university) {
      if (!selectedCity && !searchLocation) {
        setHasSearched(false);
        setSearchResults([]);
      }
      return;
    }
    
    setIsLoading(true);
    setSearchType('university');
    setSelectedCity(null);
    setSearchLocation(university.name);
    
    // Simulate API call delay to get hostels near the university
    setTimeout(() => {
      const allHostels = searchHostels(university.location);
      // Filter hostels to only include those within 10km of the university
      const nearbyHostels = getHostelsNearUniversity(university.id, allHostels, 10);
      setSearchResults(nearbyHostels);
      setHasSearched(true);
      setIsLoading(false);
    }, 1200);
  };
  
  const toggleMap = () => {
    setShowMap(prev => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
            Find the Perfect Hostel in India
          </h1>
          <p className="text-xl text-white text-center mb-8 max-w-2xl">
            Discover affordable and social accommodations in major Indian cities
          </p>
          
          {/* Search Box */}
          <div className="w-full max-w-3xl">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      {/* Search Options Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City Selector */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <CitySelector onCitySelect={handleCitySelect} selectedCity={selectedCity} />
          </div>
          
          {/* University Search */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <UniversitySearch 
              onUniversitySelect={handleUniversitySelect}
              selectedUniversity={selectedUniversity}
            />
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      {hasSearched && (
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hostel-blue mb-4"></div>
              <p className="text-xl text-gray-600">
                {searchType === 'university' 
                  ? `Searching hostels near ${searchLocation}...` 
                  : `Searching hostels in ${searchLocation}...`}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {searchResults.length > 0 
                      ? `${searchResults.length} hostels found` 
                      : "No hostels found"}
                  </h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    {searchType === 'university' ? (
                      <>
                        <School size={18} className="mr-1" />
                        <span>Near {selectedUniversity?.name}</span>
                      </>
                    ) : (
                      <>
                        <MapPin size={18} className="mr-1" />
                        <span>{selectedCity || searchLocation}</span>
                      </>
                    )}
                  </div>
                </div>
                
                {searchResults.length > 0 && (
                  <Button 
                    variant="outline" 
                    className="ml-4"
                    onClick={toggleMap}
                  >
                    {showMap ? "Hide Map" : "Show Map"}
                  </Button>
                )}
              </div>
              
              {/* Map View */}
              {showMap && searchResults.length > 0 && (
                <div className="mb-8">
                  <HostelMap 
                    hostels={searchResults}
                    university={selectedUniversity}
                    className="h-80 md:h-96 lg:h-[500px]"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(hostel => (
                  <HostelCard key={hostel.id} hostel={hostel} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Features Section (only show if no search has been made and no university/city selected) */}
      {!hasSearched && !selectedCity && !selectedUniversity && (
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
                <School className="text-hostel-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">University Proximity</h3>
              <p className="text-gray-600">Find hostels within a 10km radius of top educational institutions across India.</p>
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
