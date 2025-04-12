
import React from 'react';
import { getAllCities } from '@/data/hostels';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CitySelectorProps {
  onCitySelect: (city: string) => void;
  selectedCity: string | null;
}

const CitySelector = ({ onCitySelect, selectedCity }: CitySelectorProps) => {
  const cities = getAllCities();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Popular Cities in India</h3>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <Button
            key={city}
            variant={selectedCity === city ? "default" : "outline"}
            className={`flex items-center gap-1 ${
              selectedCity === city 
                ? "bg-hostel-blue hover:bg-hostel-lightBlue" 
                : "border-hostel-blue text-hostel-blue hover:bg-hostel-blue hover:text-white"
            }`}
            onClick={() => onCitySelect(city)}
          >
            <MapPin size={16} />
            {city}
          </Button>
        ))}
        {selectedCity && (
          <Button 
            variant="ghost" 
            className="text-gray-500"
            onClick={() => onCitySelect("")}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
