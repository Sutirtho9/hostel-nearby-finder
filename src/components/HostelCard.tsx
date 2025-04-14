
import React from 'react';
import { Star, MapPin, Users, Wifi, Coffee, Dumbbell, Book, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface Hostel {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  location: string;
  distance: string;
  amenities: string[];
}

interface HostelCardProps {
  hostel: Hostel;
}

const HostelCard = ({ hostel }: HostelCardProps) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" size={16} />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="relative">
          <Star className="text-gray-300" size={16} />
          <Star className="absolute top-0 left-0 fill-yellow-400 text-yellow-400 overflow-hidden w-1/2" size={16} />
        </span>
      );
    }
    
    // Add empty stars to complete 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300" size={16} />);
    }
    
    return stars;
  };
  
  // Function to render amenity icons
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi size={16} />;
      case 'breakfast':
        return <Coffee size={16} />;
      case 'social':
        return <Users size={16} />;
      case 'gym':
        return <Dumbbell size={16} />;
      case 'library':
      case 'study rooms':
      case 'study areas':
        return <Book size={16} />;
      case 'security':
        return <ShieldCheck size={16} />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="hostel-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          src={hostel.image} 
          alt={hostel.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-hostel-orange text-white">
            ${hostel.price}/night
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg line-clamp-1">{hostel.name}</h3>
        <div className="flex items-center mt-1 mb-2">
          {renderStars(hostel.rating)}
          <span className="ml-1 text-sm text-gray-600">({hostel.rating.toFixed(1)})</span>
        </div>
        
        <div className="flex items-start text-sm text-gray-600 mb-3">
          <MapPin size={16} className="mr-1 flex-shrink-0 mt-0.5" />
          <div>
            <p className="line-clamp-1">{hostel.location}</p>
            <p className="text-hostel-blue">{hostel.distance} from center</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {hostel.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs">
              {renderAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
          {hostel.amenities.length > 3 && (
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              +{hostel.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link 
          to={`/hostel/${hostel.id}`}
          className="w-full bg-hostel-blue hover:bg-hostel-lightBlue text-white py-2 rounded text-center block transition"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HostelCard;

