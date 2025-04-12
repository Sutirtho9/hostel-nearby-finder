
import { Hostel } from "@/components/HostelCard";

export const hostels: Hostel[] = [
  {
    id: 1,
    name: "Backpacker's Paradise",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    price: 25,
    location: "Downtown, New York",
    distance: "0.5 km",
    amenities: ["WiFi", "Breakfast", "Social"]
  },
  {
    id: 2,
    name: "Nomad's Home",
    image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.5,
    price: 22,
    location: "Central District, London",
    distance: "0.7 km",
    amenities: ["WiFi", "Social"]
  },
  {
    id: 3,
    name: "Travelers Hub",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.2,
    price: 18,
    location: "Temple Area, Bangkok",
    distance: "1.2 km",
    amenities: ["WiFi", "Breakfast"]
  },
  {
    id: 4,
    name: "Wanderer's Rest",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 28,
    location: "Beachfront, Barcelona",
    distance: "0.3 km",
    amenities: ["WiFi", "Breakfast", "Social"]
  },
  {
    id: 5,
    name: "Globe Trotter Inn",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.3,
    price: 20,
    location: "Historic Center, Rome",
    distance: "0.9 km",
    amenities: ["WiFi", "Social"]
  },
  {
    id: 6,
    name: "Wayfarer's Haven",
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.6,
    price: 23,
    location: "Marina District, San Francisco",
    distance: "0.6 km",
    amenities: ["WiFi", "Breakfast", "Social"]
  }
];

export const getHostelById = (id: number): Hostel | undefined => {
  return hostels.find(hostel => hostel.id === id);
};

// Function to simulate a search based on location
export const searchHostels = (location: string): Hostel[] => {
  // For demo purposes, this is a simplified search that just returns all hostels
  // In a real app, this would query an API with the location
  
  // Simulate loading delay
  return hostels;
};
