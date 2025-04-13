
import React, { useEffect, useRef } from 'react';
import { Hostel } from '@/components/HostelCard';
import { University } from '@/data/universities';
import { MapPin, School, Home } from 'lucide-react';

interface HostelMapProps {
  hostels: Hostel[];
  university?: University | null;
  className?: string;
}

const HostelMap = ({ hostels, university, className = "h-96" }: HostelMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, this would use an actual map API like Google Maps
    // For this demo, we'll create a simple visual representation
    if (!mapRef.current) return;
    
    const mapElement = mapRef.current;
    mapElement.innerHTML = '';
    
    // Create a container for the "map"
    const mapContainer = document.createElement('div');
    mapContainer.className = 'relative w-full h-full bg-slate-100 rounded-lg overflow-hidden';
    
    // If there's a university selected, render it
    if (university) {
      const uniMarker = document.createElement('div');
      uniMarker.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 z-20';
      uniMarker.style.left = '50%';
      uniMarker.style.top = '50%';
      
      const uniIcon = document.createElement('div');
      uniIcon.className = 'w-10 h-10 bg-hostel-blue rounded-full flex items-center justify-center text-white';
      uniIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-school"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>';
      
      uniMarker.appendChild(uniIcon);
      
      const uniLabel = document.createElement('div');
      uniLabel.className = 'mt-2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium';
      uniLabel.textContent = university.name.length > 25 
        ? university.name.substring(0, 25) + '...' 
        : university.name;
      
      uniMarker.appendChild(uniLabel);
      mapContainer.appendChild(uniMarker);
      
      // Add a 10km radius circle
      const radiusCircle = document.createElement('div');
      radiusCircle.className = 'absolute rounded-full border-2 border-hostel-blue border-opacity-30 bg-hostel-blue bg-opacity-10';
      radiusCircle.style.width = '60%';
      radiusCircle.style.height = '60%';
      radiusCircle.style.left = '20%';
      radiusCircle.style.top = '20%';
      
      const radiusLabel = document.createElement('div');
      radiusLabel.className = 'absolute top-1/4 right-1/4 bg-white px-2 py-1 rounded shadow-md text-xs';
      radiusLabel.textContent = '10km radius';
      
      mapContainer.appendChild(radiusCircle);
      mapContainer.appendChild(radiusLabel);
    }
    
    // Add hostel markers with random positions (in a real app these would be based on actual coordinates)
    hostels.forEach((hostel, index) => {
      const angle = (index / hostels.length) * Math.PI * 2;
      const radius = Math.random() * 0.2 + 0.1; // Random distance within the circle
      
      const x = 0.5 + Math.cos(angle) * radius;
      const y = 0.5 + Math.sin(angle) * radius;
      
      const marker = document.createElement('div');
      marker.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 z-10';
      marker.style.left = `${x * 100}%`;
      marker.style.top = `${y * 100}%`;
      
      const icon = document.createElement('div');
      icon.className = 'w-8 h-8 bg-hostel-orange rounded-full flex items-center justify-center text-white';
      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
      
      marker.appendChild(icon);
      
      // Only add labels for first few hostels to avoid cluttering
      if (index < 5) {
        const label = document.createElement('div');
        label.className = 'mt-1 bg-white px-1 py-0.5 rounded shadow-md text-xs whitespace-nowrap';
        label.textContent = hostel.name.length > 15 
          ? hostel.name.substring(0, 15) + '...' 
          : hostel.name;
        
        marker.appendChild(label);
      }
      
      mapContainer.appendChild(marker);
    });
    
    // Add a disclaimer for demo purposes
    const disclaimer = document.createElement('div');
    disclaimer.className = 'absolute bottom-2 right-2 bg-white bg-opacity-75 text-xs p-1 rounded';
    disclaimer.textContent = 'Demo map (not actual locations)';
    
    mapContainer.appendChild(disclaimer);
    mapElement.appendChild(mapContainer);
  }, [hostels, university]);
  
  return (
    <div className={`${className} border rounded-lg shadow-sm overflow-hidden`} ref={mapRef}>
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  );
};

export default HostelMap;
