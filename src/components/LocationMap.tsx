
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Phone } from "lucide-react";

interface Location {
  id: number;
  name: string;
  building: string;
  floor: string;
  room: string;
  coordinates: { lat: number; lng: number };
  certificates: string[];
  contact: string;
  hours: string;
  days: string;
}

interface LocationMapProps {
  locations: Location[];
  selectedLocation?: Location | null;
  onLocationSelect?: (location: Location) => void;
}

export const LocationMap: React.FC<LocationMapProps> = ({ 
  locations, 
  selectedLocation, 
  onLocationSelect 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [map, setMap] = useState<any>(null);

  const initializeMap = async (token: string) => {
    if (!mapRef.current || !token) return;

    try {
      // Dynamically import Mapbox GL JS
      const mapboxgl = await import('mapbox-gl');
      
      mapboxgl.default.accessToken = token;
      
      const newMap = new mapboxgl.default.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [78.3931, 17.4932], // JNTUH coordinates
        zoom: 16
      });

      // Add navigation controls
      newMap.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      // Add markers for each location
      locations.forEach(location => {
        const marker = new mapboxgl.default.Marker({
          color: '#7c2d12' // maroon color
        })
          .setLngLat([location.coordinates.lng, location.coordinates.lat])
          .setPopup(
            new mapboxgl.default.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-semibold text-sm">${location.name}</h3>
                  <p class="text-xs text-gray-600">${location.building}, ${location.floor}</p>
                  <p class="text-xs text-gray-600">Room ${location.room}</p>
                  <div class="mt-2">
                    <p class="text-xs font-medium">Certificates:</p>
                    <p class="text-xs">${location.certificates.join(', ')}</p>
                  </div>
                  <div class="mt-2">
                    <p class="text-xs"><strong>Hours:</strong> ${location.hours}</p>
                    <p class="text-xs"><strong>Days:</strong> ${location.days}</p>
                    <p class="text-xs"><strong>Contact:</strong> ${location.contact}</p>
                  </div>
                </div>
              `)
          )
          .addTo(newMap);

        // Handle marker click
        marker.getElement().addEventListener('click', () => {
          if (onLocationSelect) {
            onLocationSelect(location);
          }
        });
      });

      setMap(newMap);
      setShowTokenInput(false);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    if (map && selectedLocation) {
      map.flyTo({
        center: [selectedLocation.coordinates.lng, selectedLocation.coordinates.lat],
        zoom: 18,
        duration: 1000
      });
    }
  }, [map, selectedLocation]);

  if (showTokenInput) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-8">
            <MapPin className="h-12 w-12 text-maroon-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enable Interactive Map</h3>
            <p className="text-muted-foreground mb-4">
              Enter your Mapbox access token to view the interactive campus map with real JNTUH locations.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="password"
                placeholder="Enter Mapbox access token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTokenSubmit()}
              />
              <Button onClick={handleTokenSubmit} className="bg-maroon-700 hover:bg-maroon-800">
                Enable
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Get your free token at{' '}
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                mapbox.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div 
          ref={mapRef} 
          className="h-[600px] w-full rounded-lg"
          style={{ minHeight: '400px' }}
        />
      </CardContent>
    </Card>
  );
};
