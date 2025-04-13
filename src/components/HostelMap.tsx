import React, { useEffect, useRef, useState } from 'react';
import { Hostel } from '@/components/HostelCard';
import { University } from '@/data/universities';
import { MapPin, School, Home } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface HostelMapProps {
  hostels: Hostel[];
  university?: University | null;
  className?: string;
}

const HostelMap = ({ hostels, university, className = "h-96" }: HostelMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Load Google Maps API script
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      script.onerror = () => {
        toast({
          title: "Error loading Google Maps",
          description: "Could not load the map. Please check your internet connection.",
          variant: "destructive"
        });
      };
      document.head.appendChild(script);
      
      return () => {
        // Clean up script if component unmounts before loading
        if (document.getElementById('google-maps-script')) {
          document.getElementById('google-maps-script')?.remove();
        }
      };
    } else {
      setMapLoaded(true);
    }
  }, []);
  
  useEffect(() => {
    // Initialize map once Google Maps API is loaded and we have data
    if (!mapLoaded || !mapRef.current || !window.google) return;
    
    try {
      // Create map instance
      const mapOptions = {
        zoom: university ? 13 : 12,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      const map = new google.maps.Map(mapRef.current, mapOptions);
      const bounds = new google.maps.LatLngBounds();
      const infoWindow = new google.maps.InfoWindow();
      
      // If there's a university selected, show it and its 10km radius
      if (university) {
        const uniPosition = new google.maps.LatLng(
          university.coordinates.lat, 
          university.coordinates.lng
        );
        
        // Center map on university
        map.setCenter(uniPosition);
        
        // Add university marker
        const uniMarker = new google.maps.Marker({
          position: uniPosition,
          map: map,
          title: university.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#3b82f6', // hostel-blue
            fillOpacity: 1,
            strokeColor: '#3b82f6',
            strokeWeight: 1,
            scale: 10
          }
        });
        
        // Add click event to university marker
        uniMarker.addListener('click', () => {
          infoWindow.setContent(`
            <div>
              <h3 style="font-weight: bold;">${university.name}</h3>
              <p>${university.location}</p>
              ${university.rank ? `<p>NIRF Rank: ${university.rank}</p>` : ''}
            </div>
          `);
          infoWindow.open(map, uniMarker);
        });
        
        bounds.extend(uniPosition);
        
        // Add a 10km radius circle
        const radiusCircle = new google.maps.Circle({
          strokeColor: '#3b82f6',
          strokeOpacity: 0.3,
          strokeWeight: 2,
          fillColor: '#3b82f6',
          fillOpacity: 0.1,
          map: map,
          center: uniPosition,
          radius: 10000, // 10km in meters
        });
      }
      
      // Add hostel markers
      hostels.forEach((hostel) => {
        // Extract coordinates from hostel location
        let hostelCoords;
        
        if (hostel.location.includes(',')) {
          // Check if it's directly a coordinate string
          const [lat, lng] = hostel.location.split(',').map(Number);
          if (!isNaN(lat) && !isNaN(lng)) {
            hostelCoords = { lat, lng };
          }
        }
        
        // If no coordinates found, generate random ones near the university or city
        if (!hostelCoords) {
          const cities: { [key: string]: { lat: number, lng: number } } = {
            'Delhi': { lat: 28.6139, lng: 77.2090 },
            'Mumbai': { lat: 19.0760, lng: 72.8777 },
            'Bangalore': { lat: 12.9716, lng: 77.5946 },
            'Chennai': { lat: 13.0827, lng: 80.2707 },
            // ... other cities
          };
          
          // Extract city name from location string
          const cityMatch = hostel.location.match(/^([^,]+)/);
          const city = cityMatch ? cityMatch[0] : '';
          
          // Get base coordinates
          let baseCoords;
          if (university) {
            baseCoords = university.coordinates;
          } else if (cities[city]) {
            baseCoords = cities[city];
          } else {
            // Default to center of India if no match
            baseCoords = { lat: 20.5937, lng: 78.9629 };
          }
          
          // Add a small random offset to make points different
          const latOffset = (Math.random() - 0.5) * 0.05;
          const lngOffset = (Math.random() - 0.5) * 0.05;
          
          hostelCoords = {
            lat: baseCoords.lat + latOffset,
            lng: baseCoords.lng + lngOffset
          };
        }
        
        const position = new google.maps.LatLng(hostelCoords.lat, hostelCoords.lng);
        
        // Create marker
        const hostelMarker = new google.maps.Marker({
          position: position,
          map: map,
          title: hostel.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#f97316', // hostel-orange
            fillOpacity: 1,
            strokeColor: '#f97316',
            strokeWeight: 1,
            scale: 8
          }
        });
        
        // Add click event to hostel marker
        hostelMarker.addListener('click', () => {
          infoWindow.setContent(`
            <div>
              <h3 style="font-weight: bold;">${hostel.name}</h3>
              <p>${hostel.location}</p>
              <p>₹${hostel.price} per night</p>
              <p>Rating: ${hostel.rating}/5</p>
              ${hostel.distance ? `<p>Distance: ${hostel.distance}</p>` : ''}
            </div>
          `);
          infoWindow.open(map, hostelMarker);
        });
        
        bounds.extend(position);
      });
      
      // Fit map to bounds if we have multiple markers
      if (hostels.length > 1 || (hostels.length > 0 && !university)) {
        map.fitBounds(bounds);
      }
      
      // Add a disclaimer for demo purposes
      const disclaimer = document.createElement('div');
      disclaimer.className = 'disclaimer';
      disclaimer.innerHTML = `
        <div style="
          background-color: rgba(255, 255, 255, 0.8);
          padding: 5px 10px;
          margin: 10px;
          border-radius: 4px;
          font-size: 12px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        ">
          NOTE: Replace "YOUR_GOOGLE_MAPS_API_KEY" with your actual API key
        </div>
      `;
      
      disclaimer.style.position = 'absolute';
      disclaimer.style.bottom = '0';
      disclaimer.style.right = '0';
      disclaimer.style.zIndex = '1';
      
      mapRef.current.appendChild(disclaimer);
      
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      toast({
        title: "Map Error",
        description: "There was an error displaying the map. Please try again later.",
        variant: "destructive"
      });
    }
  }, [mapLoaded, hostels, university]);
  
  return (
    <div className={`${className} border rounded-lg shadow-sm relative overflow-hidden`}>
      <div ref={mapRef} className="w-full h-full">
        {!mapLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <p className="text-muted-foreground flex items-center">
              <svg className="animate-spin mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading map...
            </p>
          </div>
        )}
      </div>
      
      {/* Display a note about API key replacement */}
      <div className="absolute bottom-2 left-2 text-xs bg-white bg-opacity-75 p-1 rounded-md z-10">
        To use actual maps, replace "YOUR_GOOGLE_MAPS_API_KEY" in the code
      </div>
    </div>
  );
};

export default HostelMap;
