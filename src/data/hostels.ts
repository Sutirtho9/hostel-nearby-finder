
import { Hostel } from "@/components/HostelCard";

export const hostels: Hostel[] = [
  {
    id: 1,
    name: "Backpacker's Paradise",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    price: 25,
    location: "Delhi, India",
    distance: "0.5 km",
    amenities: ["WiFi", "Breakfast", "Social"]
  },
  {
    id: 2,
    name: "Nomad's Home",
    image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.5,
    price: 22,
    location: "Mumbai, India",
    distance: "0.7 km",
    amenities: ["WiFi", "Social"]
  },
  {
    id: 3,
    name: "Travelers Hub",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.2,
    price: 18,
    location: "Bangalore, India",
    distance: "1.2 km",
    amenities: ["WiFi", "Breakfast"]
  },
  {
    id: 4,
    name: "Wanderer's Rest",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 28,
    location: "Jaipur, India",
    distance: "0.3 km",
    amenities: ["WiFi", "Breakfast", "Social"]
  },
  {
    id: 5,
    name: "Globe Trotter Inn",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.3,
    price: 20,
    location: "Kolkata, India",
    distance: "0.9 km",
    amenities: ["WiFi", "Social"]
  },
  {
    id: 6,
    name: "Wayfarer's Haven",
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.6,
    price: 23,
    location: "Chennai, India",
    distance: "0.6 km",
    amenities: ["WiFi", "Breakfast", "Social"]
  },
  {
    id: 7,
    name: "Urban Oasis Hostel",
    image: "https://images.unsplash.com/photo-1562884857-bfc31164gravity?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.4,
    price: 21,
    location: "Hyderabad, India",
    distance: "1.1 km",
    amenities: ["WiFi", "Breakfast"]
  },
  {
    id: 8,
    name: "Riverside Retreat",
    image: "https://images.unsplash.com/photo-1605610562040-e87b1ee67539?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    price: 30,
    location: "Varanasi, India",
    distance: "0.4 km",
    amenities: ["WiFi", "Breakfast", "Social"]
  },
  {
    id: 9,
    name: "Beachside Bungalow",
    image: "https://images.unsplash.com/photo-1587018681535-91a74f790e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    price: 27,
    location: "Goa, India",
    distance: "0.2 km",
    amenities: ["WiFi", "Social"]
  },
  {
    id: 10,
    name: "Mountain View Lodge",
    image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 26,
    location: "Shimla, India",
    distance: "0.8 km",
    amenities: ["WiFi", "Breakfast", "Social"]
  }
];

export const getHostelById = (id: number): Hostel | undefined => {
  return hostels.find(hostel => hostel.id === id);
};

// Function to get all Indian cities from hostels
export const getAllCities = (): string[] => {
  const cities = hostels.map(hostel => {
    // Extract city name from location (assuming format is "City, India")
    const cityMatch = hostel.location.match(/^([^,]+)/);
    return cityMatch ? cityMatch[0] : hostel.location;
  });
  
  // Remove duplicates and sort alphabetically
  return [...new Set(cities)].sort();
};

// Function to simulate a search based on location
export const searchHostels = (location: string): Hostel[] => {
  // If location is empty, return all hostels
  if (!location) return hostels;
  
  // If location is a specific city, filter by that city
  return hostels.filter(hostel => 
    hostel.location.toLowerCase().includes(location.toLowerCase())
  );
};
