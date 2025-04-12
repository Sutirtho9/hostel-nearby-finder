
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHostelById } from '@/data/hostels';
import { Hostel } from '@/components/HostelCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar, Users, ArrowLeft, Wifi, Coffee, CheckCircle } from 'lucide-react';

const HostelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API fetch delay
      setTimeout(() => {
        const foundHostel = getHostelById(parseInt(id));
        if (foundHostel) {
          setHostel(foundHostel);
        }
        setLoading(false);
      }, 800);
    }
  }, [id]);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" size={18} />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="relative">
          <Star className="text-gray-300" size={18} />
          <Star className="absolute top-0 left-0 fill-yellow-400 text-yellow-400 overflow-hidden w-1/2" size={18} />
        </span>
      );
    }
    
    // Add empty stars to complete 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300" size={18} />);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hostel-blue"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hostel) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Hostel Not Found</h2>
          <p className="mb-6">The hostel you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2" size={18} />
              Return to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-hostel-blue hover:underline mb-4">
          <ArrowLeft size={18} className="mr-1" />
          Back to search results
        </Link>
        
        {/* Hostel details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero image */}
          <div className="relative h-64 md:h-96">
            <img 
              src={hostel.image} 
              alt={hostel.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="bg-hostel-orange text-white text-lg px-4 py-1.5">
                ${hostel.price}/night
              </Badge>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{hostel.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {renderStars(hostel.rating)}
                  </div>
                  <span className="ml-2 text-gray-600">({hostel.rating.toFixed(1)})</span>
                </div>
                
                <div className="flex items-start mt-3 text-gray-700">
                  <MapPin size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>{hostel.location}</p>
                    <p className="text-hostel-blue">{hostel.distance} from city center</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button className="bg-hostel-blue hover:bg-hostel-lightBlue text-white px-6 py-6 text-lg w-full md:w-auto">
                  Book Now
                </Button>
              </div>
            </div>
            
            <hr className="my-6" />
            
            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hostel.amenities.includes('WiFi') && (
                  <div className="flex items-center">
                    <Wifi size={18} className="mr-2 text-hostel-blue" />
                    <span>Free WiFi</span>
                  </div>
                )}
                {hostel.amenities.includes('Breakfast') && (
                  <div className="flex items-center">
                    <Coffee size={18} className="mr-2 text-hostel-blue" />
                    <span>Breakfast included</span>
                  </div>
                )}
                {hostel.amenities.includes('Social') && (
                  <div className="flex items-center">
                    <Users size={18} className="mr-2 text-hostel-blue" />
                    <span>Social activities</span>
                  </div>
                )}
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-2 text-hostel-blue" />
                  <span>24/7 Reception</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-2 text-hostel-blue" />
                  <span>Lockers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-2 text-hostel-blue" />
                  <span>Hot showers</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">
                Located in the heart of {hostel.location.split(',')[0]}, {hostel.name} offers comfortable accommodation for travelers on a budget. With a vibrant atmosphere and friendly staff, it's the perfect place to meet fellow travelers and explore the city. The hostel is just {hostel.distance} from the city center, making it easy to access all the main attractions.
              </p>
            </div>
            
            {/* Availability */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-hostel-blue" />
                  <span>Check-in date</span>
                </div>
                <Badge variant="outline" className="text-lg font-normal">Select date</Badge>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-hostel-blue" />
                  <span>Check-out date</span>
                </div>
                <Badge variant="outline" className="text-lg font-normal">Select date</Badge>
              </div>
            </div>
            
            {/* CTA */}
            <div className="bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xl font-semibold">${hostel.price} <span className="text-sm font-normal text-gray-600">per night</span></p>
                <p className="text-gray-600">Free cancellation up to 24 hours before check-in</p>
              </div>
              <Button className="bg-hostel-blue hover:bg-hostel-lightBlue text-white px-6 py-2 mt-4 md:mt-0">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HostelDetail;
