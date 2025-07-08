
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Phone } from "lucide-react";
import { loadGoogleMapsScript } from "@/utils/googleMapsLoader";

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
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const initializeMap = async (apiKey: string) => {
    if (!mapRef.current || !apiKey) return;

    try {
      setIsLoading(true);
      
      // Load Google Maps script
      await loadGoogleMapsScript(apiKey);
      
      // Initialize the map
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 17.4932, lng: 78.3931 }, // JNTUH coordinates
        zoom: 16,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'poi.government',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow();

      // Add markers for each location
      const newMarkers = locations.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.coordinates.lat, lng: location.coordinates.lng },
          map: mapInstance,
          title: location.name,
          icon: {
            url: 'data:image/svg+xml;base-64,' + btoa(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" fill="#7c2d12" stroke="#ffffff" stroke-width="2"/>
                <circle cx="12" cy="10" r="3" fill="#ffffff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15, 30)
          }
        });

        // Create info window content
        const infoContent = `
          <div style="padding: 8px; max-width: 300px;">
            <h3 style="font-size: 14px; font-weight: 600; margin: 0 0 8px 0; color: #1f2937;">${location.name}</h3>
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 4px 0;">${location.building}, ${location.floor}</p>
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">Room ${location.room}</p>
            <div style="margin-bottom: 8px;">
              <p style="font-size: 12px; font-weight: 500; margin: 0 0 4px 0; color: #374151;">Certificates:</p>
              <p style="font-size: 11px; color: #6b7280; margin: 0;">${location.certificates.join(', ')}</p>
            </div>
            <div style="font-size: 11px; color: #6b7280; line-height: 1.4;">
              <p style="margin: 2px 0;"><strong>Hours:</strong> ${location.hours}</p>
              <p style="margin: 2px 0;"><strong>Days:</strong> ${location.days}</p>
              <p style="margin: 2px 0;"><strong>Contact:</strong> ${location.contact}</p>
            </div>
          </div>
        `;

        // Add click listener to marker
        marker.addListener('click', () => {
          infoWindow.setContent(infoContent);
          infoWindow.open(mapInstance, marker);
          
          if (onLocationSelect) {
            onLocationSelect(location);
          }
        });

        return { marker, location };
      });

      setMap(mapInstance);
      setMarkers(newMarkers);
      setShowApiKeyInput(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = () => {
    if (googleMapsApiKey.trim()) {
      initializeMap(googleMapsApiKey.trim());
    }
  };

  useEffect(() => {
    if (map && selectedLocation && markers.length > 0) {
      // Find the marker for the selected location
      const selectedMarker = markers.find(m => m.location.id === selectedLocation.id);
      if (selectedMarker) {
        // Pan to the selected location
        map.panTo(selectedMarker.marker.getPosition());
        map.setZoom(18);
        
        // Trigger click event to open info window
        window.google.maps.event.trigger(selectedMarker.marker, 'click');
      }
    }
  }, [map, selectedLocation, markers]);

  if (showApiKeyInput) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-8">
            <MapPin className="h-12 w-12 text-maroon-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enable Interactive Map</h3>
            <p className="text-muted-foreground mb-4">
              Enter your Google Maps API key to view the interactive campus map with real JNTUH locations.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="password"
                placeholder="Enter Google Maps API key"
                value={googleMapsApiKey}
                onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApiKeySubmit()}
                disabled={isLoading}
              />
              <Button 
                onClick={handleApiKeySubmit} 
                className="bg-maroon-700 hover:bg-maroon-800"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Enable'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Get your free API key at{' '}
              <a 
                href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                Google Cloud Console
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
