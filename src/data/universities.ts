
export interface University {
  id: number;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Top Indian universities with approximate coordinates
export const universities: University[] = [
  {
    id: 1,
    name: "Indian Institute of Technology (IIT) Delhi",
    location: "New Delhi",
    coordinates: { lat: 28.5456, lng: 77.1926 }
  },
  {
    id: 2,
    name: "Indian Institute of Technology (IIT) Bombay",
    location: "Mumbai",
    coordinates: { lat: 19.1334, lng: 72.9133 }
  },
  {
    id: 3,
    name: "Indian Institute of Technology (IIT) Madras",
    location: "Chennai",
    coordinates: { lat: 12.9914, lng: 80.2336 }
  },
  {
    id: 4,
    name: "Indian Institute of Technology (IIT) Kanpur",
    location: "Kanpur",
    coordinates: { lat: 26.5123, lng: 80.2329 }
  },
  {
    id: 5,
    name: "Indian Institute of Technology (IIT) Kharagpur",
    location: "Kharagpur",
    coordinates: { lat: 22.3149, lng: 87.3110 }
  },
  {
    id: 6,
    name: "Indian Institute of Science (IISc)",
    location: "Bangalore",
    coordinates: { lat: 13.0219, lng: 77.5671 }
  },
  {
    id: 7,
    name: "Jawaharlal Nehru University (JNU)",
    location: "New Delhi",
    coordinates: { lat: 28.5403, lng: 77.1675 }
  },
  {
    id: 8,
    name: "Delhi University (DU)",
    location: "Delhi",
    coordinates: { lat: 28.6889, lng: 77.3178 }
  },
  {
    id: 9,
    name: "Banaras Hindu University (BHU)",
    location: "Varanasi",
    coordinates: { lat: 25.2677, lng: 82.9913 }
  },
  {
    id: 10,
    name: "Anna University",
    location: "Chennai",
    coordinates: { lat: 13.0108, lng: 80.2339 }
  },
  {
    id: 11,
    name: "University of Hyderabad",
    location: "Hyderabad",
    coordinates: { lat: 17.4617, lng: 78.3340 }
  },
  {
    id: 12,
    name: "Jadavpur University",
    location: "Kolkata",
    coordinates: { lat: 22.4968, lng: 88.3714 }
  },
  {
    id: 13,
    name: "National Institute of Technology (NIT) Tiruchirappalli",
    location: "Tiruchirappalli",
    coordinates: { lat: 10.7587, lng: 78.8173 }
  },
  {
    id: 14,
    name: "Manipal Academy of Higher Education",
    location: "Manipal",
    coordinates: { lat: 13.3524, lng: 74.7937 }
  },
  {
    id: 15,
    name: "Indian Institute of Management (IIM) Ahmedabad",
    location: "Ahmedabad",
    coordinates: { lat: 23.0313, lng: 72.5263 }
  },
  // Additional universities would be added here
];

// Function to search universities by name
export const searchUniversities = (query: string): University[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return universities.filter(university => 
    university.name.toLowerCase().includes(lowercaseQuery) ||
    university.location.toLowerCase().includes(lowercaseQuery)
  );
};

// Calculate distance between two coordinates using the Haversine formula (in km)
export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

// Get hostels near a university within a specific radius (in km)
export const getHostelsNearUniversity = (
  universityId: number,
  hostels: any[],
  radiusKm: number = 10
): any[] => {
  const university = universities.find(u => u.id === universityId);
  if (!university) return [];

  return hostels.filter(hostel => {
    // Extract coordinates from hostel location string (assumed format: "lat,lng")
    // In a real app, hostels would have proper coordinate data
    const hostelCoords = extractCoordinates(hostel.location);
    
    if (!hostelCoords) return false;
    
    const distance = calculateDistance(
      university.coordinates.lat,
      university.coordinates.lng,
      hostelCoords.lat,
      hostelCoords.lng
    );
    
    // Update the hostel object with the calculated distance
    hostel.distance = `${distance.toFixed(1)} km`;
    
    return distance <= radiusKm;
  });
};

// Helper function to extract coordinates from location strings
const extractCoordinates = (locationString: string): { lat: number, lng: number } | null => {
  // Check if it's already a coordinate string (e.g., from geolocation)
  if (locationString.includes(',')) {
    const [lat, lng] = locationString.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    }
  }
  
  // For demo purposes, generate random coordinates near the city
  // In a real app, you would use a geocoding service to get actual coordinates
  const cities: { [key: string]: { lat: number, lng: number } } = {
    'Delhi': { lat: 28.6139, lng: 77.2090 },
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'Bangalore': { lat: 12.9716, lng: 77.5946 },
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Kolkata': { lat: 22.5726, lng: 88.3639 },
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
    'Jaipur': { lat: 26.9124, lng: 75.7873 },
    'Varanasi': { lat: 25.3176, lng: 82.9739 },
    'Goa': { lat: 15.2993, lng: 74.1240 },
    'Shimla': { lat: 31.1048, lng: 77.1734 }
  };
  
  // Extract city name from the location string
  const cityMatch = locationString.match(/^([^,]+)/);
  const city = cityMatch ? cityMatch[0] : '';
  
  if (cities[city]) {
    // Add a small random offset (within 5km) to make points different
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    
    return {
      lat: cities[city].lat + latOffset,
      lng: cities[city].lng + lngOffset
    };
  }
  
  return null;
};
