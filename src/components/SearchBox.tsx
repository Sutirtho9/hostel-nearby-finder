
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface SearchBoxProps {
  onSearch: (location: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [location, setLocation] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    } else {
      toast({
        title: "Please enter a location",
        description: "Enter a city, address or point of interest",
        variant: "destructive"
      });
    }
  };
  
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Finding your location",
        description: "Please wait while we locate you...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // For demo purposes, we'll just show the coordinates
          toast({
            title: "Location found!",
            description: `Searching hostels near ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
          });
          onSearch(`${latitude.toFixed(6)},${longitude.toFixed(6)}`);
        },
        (error) => {
          toast({
            title: "Error finding location",
            description: error.message,
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Find hostels near you</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="City, address or point of interest"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
          <Button 
            type="submit"
            className="bg-hostel-blue hover:bg-hostel-lightBlue text-white px-6 py-2"
          >
            <Search size={18} className="mr-2" />
            Search
          </Button>
        </div>
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleGetCurrentLocation}
            className="text-hostel-blue border-hostel-blue hover:bg-hostel-blue hover:text-white"
          >
            <MapPin size={18} className="mr-2" />
            Use current location
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
