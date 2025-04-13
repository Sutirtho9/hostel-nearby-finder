export interface University {
  id: number;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rank?: number; // NIRF Ranking (optional but not displayed)
}

// Top Indian universities from NIRF 2024 rankings with approximate coordinates
export const universities: University[] = [
  {
    id: 1,
    name: "Indian Institute of Science",
    location: "Bengaluru, Karnataka",
    coordinates: { lat: 13.0219, lng: 77.5671 },
    rank: 1
  },
  {
    id: 2,
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    coordinates: { lat: 28.5403, lng: 77.1675 },
    rank: 2
  },
  {
    id: 3,
    name: "Jamia Millia Islamia",
    location: "New Delhi",
    coordinates: { lat: 28.5612, lng: 77.2811 },
    rank: 3
  },
  {
    id: 4,
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    coordinates: { lat: 22.4968, lng: 88.3714 },
    rank: 4
  },
  {
    id: 5,
    name: "Banaras Hindu University",
    location: "Varanasi, Uttar Pradesh",
    coordinates: { lat: 25.2677, lng: 82.9913 },
    rank: 5
  },
  {
    id: 6,
    name: "Manipal Academy of Higher Education",
    location: "Manipal, Karnataka",
    coordinates: { lat: 13.3524, lng: 74.7937 },
    rank: 6
  },
  {
    id: 7,
    name: "Amrita Vishwa Vidyapeetham",
    location: "Coimbatore, Tamil Nadu",
    coordinates: { lat: 10.9026, lng: 76.9019 },
    rank: 7
  },
  {
    id: 8,
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    coordinates: { lat: 12.9692, lng: 79.1559 },
    rank: 8
  },
  {
    id: 9,
    name: "Aligarh Muslim University",
    location: "Aligarh, Uttar Pradesh",
    coordinates: { lat: 27.9150, lng: 78.0777 },
    rank: 9
  },
  {
    id: 10,
    name: "University of Hyderabad",
    location: "Hyderabad, Telangana",
    coordinates: { lat: 17.4617, lng: 78.3340 },
    rank: 10
  },
  {
    id: 11,
    name: "University of Delhi",
    location: "Delhi",
    coordinates: { lat: 28.6889, lng: 77.3178 },
    rank: 11
  },
  {
    id: 12,
    name: "Savitribai Phule Pune University",
    location: "Pune, Maharashtra",
    coordinates: { lat: 18.5567, lng: 73.8233 },
    rank: 12
  },
  {
    id: 13,
    name: "Calcutta University",
    location: "Kolkata, West Bengal",
    coordinates: { lat: 22.5771, lng: 88.3665 },
    rank: 13
  },
  {
    id: 14,
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    coordinates: { lat: 13.0108, lng: 80.2339 },
    rank: 14
  },
  {
    id: 15,
    name: "Bharathiar University",
    location: "Coimbatore, Tamil Nadu",
    coordinates: { lat: 11.0376, lng: 77.0083 },
    rank: 15
  },
  {
    id: 16,
    name: "Mahatma Gandhi University",
    location: "Kottayam, Kerala",
    coordinates: { lat: 9.5457, lng: 76.5462 },
    rank: 16
  },
  {
    id: 17,
    name: "Jamia Hamdard",
    location: "New Delhi",
    coordinates: { lat: 28.5639, lng: 77.2636 },
    rank: 17
  },
  {
    id: 18,
    name: "Siksha 'O' Anusandhan University",
    location: "Bhubaneswar, Odisha",
    coordinates: { lat: 20.2537, lng: 85.8001 },
    rank: 18
  },
  {
    id: 19,
    name: "Alagappa University",
    location: "Karaikudi, Tamil Nadu",
    coordinates: { lat: 10.5126, lng: 78.8182 },
    rank: 19
  },
  {
    id: 20,
    name: "Tezpur University",
    location: "Tezpur, Assam",
    coordinates: { lat: 26.6319, lng: 92.8283 },
    rank: 20
  },
  {
    id: 50,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    coordinates: { lat: 28.5456, lng: 77.1926 },
    rank: 50
  },
  {
    id: 51,
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    coordinates: { lat: 19.1334, lng: 72.9133 },
    rank: 51
  },
  {
    id: 52,
    name: "Indian Institute of Technology Madras",
    location: "Chennai, Tamil Nadu",
    coordinates: { lat: 12.9914, lng: 80.2336 },
    rank: 52
  },
  {
    id: 100,
    name: "Central University of Tamil Nadu",
    location: "Thiruvarur, Tamil Nadu",
    coordinates: { lat: 10.7667, lng: 79.1333 },
    rank: 100
  },
  {
    id: 150,
    name: "Dr. Harisingh Gour Vishwavidyalaya",
    location: "Sagar, Madhya Pradesh",
    coordinates: { lat: 23.8346, lng: 78.7456 },
    rank: 150
  },
  {
    id: 200,
    name: "Tamil Nadu Agricultural University",
    location: "Coimbatore, Tamil Nadu",
    coordinates: { lat: 11.0134, lng: 76.9382 },
    rank: 200
  }
];

// Function to search universities by name
export const searchUniversities = (query: string): University[] => {
  if (!query.trim()) return universities.slice(0, 20); // Return first 20 universities when no query
  
  const lowercaseQuery = query.toLowerCase();
  return universities.filter(university => 
    university.name.toLowerCase().includes(lowercaseQuery) ||
    university.location.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 30); // Return up to 30 matching results
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
