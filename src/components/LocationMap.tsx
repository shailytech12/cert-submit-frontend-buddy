
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
  const [error, setError] = useState<string>('');

  const initializeMap = async (apiKey: string) => {
    if (!mapRef.current || !apiKey) {
      setError('Map container or API key not available');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      console.log('Loading Google Maps script with API key:', apiKey.substring(0, 10) + '...');
      
      // Load Google Maps script
      await loadGoogleMapsScript(apiKey);
      console.log('Google Maps script loaded successfully');
      
      // Check if Google Maps loaded properly
      if (!window.google || !window.google.maps) {
        throw new Error('Google Maps failed to load');
      }

      console.log('Initializing map with', locations.length, 'locations');
      
      // Initialize the map with JNTUH coordinates
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 17.4932, lng: 78.3931 }, // JNTUH main campus coordinates
        zoom: 17,
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

      console.log('Map instance created');

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow();

      // Add markers for each location
      const newMarkers = locations.map((location, index) => {
        console.log(`Creating marker ${index + 1}:`, location.name, 'at', location.coordinates);
        
        const marker = new window.google.maps.Marker({
          position: { lat: location.coordinates.lat, lng: location.coordinates.lng },
          map: mapInstance,
          title: location.name,
          icon: {
            url: 'data:image/svg+xml;base64,' + btoa(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C11.58 2 8 5.58 8 10C8 16 16 30 16 30S24 16 24 10C24 5.58 20.42 2 16 2Z" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
                <circle cx="16" cy="10" r="4" fill="#ffffff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32)
          }
        });

        // Create info window content
        const infoContent = `
          <div style="padding: 12px; max-width: 300px; font-family: Arial, sans-serif;">
            <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 8px 0; color: #1f2937;">${location.name}</h3>
            <p style="font-size: 14px; color: #6b7280; margin: 0 0 4px 0;"><strong>Location:</strong> ${location.building}, ${location.floor}</p>
            <p style="font-size: 14px; color: #6b7280; margin: 0 0 8px 0;"><strong>Room:</strong> ${location.room}</p>
            <div style="margin-bottom: 8px;">
              <p style="font-size: 14px; font-weight: 500; margin: 0 0 4px 0; color: #374151;">Certificates:</p>
              <p style="font-size: 12px; color: #6b7280; margin: 0;">${location.certificates.join(', ')}</p>
            </div>
            <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
              <p style="margin: 2px 0;"><strong>Hours:</strong> ${location.hours}</p>
              <p style="margin: 2px 0;"><strong>Days:</strong> ${location.days}</p>
              <p style="margin: 2px 0;"><strong>Contact:</strong> ${location.contact}</p>
            </div>
          </div>
        `;

        // Add click listener to marker
        marker.addListener('click', () => {
          console.log('Marker clicked:', location.name);
          infoWindow.setContent(infoContent);
          infoWindow.open(mapInstance, marker);
          
          if (onLocationSelect) {
            onLocationSelect(location);
          }
        });

        return { marker, location };
      });

      console.log('Created', newMarkers.length, 'markers');
      setMap(mapInstance);
      setMarkers(newMarkers);
      setShowApiKeyInput(false);
      setIsLoading(false);
      
      // Fit map to show all markers
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        newMarkers.forEach(({ marker }) => {
          bounds.extend(marker.getPosition());
        });
        mapInstance.fitBounds(bounds);
        // Set a maximum zoom level to ensure we don't zoom in too close
        const listener = window.google.maps.event.addListener(mapInstance, 'idle', () => {
          if (mapInstance.getZoom() > 18) mapInstance.setZoom(18);
          window.google.maps.event.removeListener(listener);
        });
      }
      
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      setError(`Failed to load Google Maps: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = () => {
    const trimmedKey = googleMapsApiKey.trim();
    if (trimmedKey) {
      console.log('Submitting API key for map initialization');
      initializeMap(trimmedKey);
    } else {
      setError('Please enter a valid API key');
    }
  };

  const handleRetry = () => {
    setShowApiKeyInput(true);
    setError('');
    setMap(null);
    setMarkers([]);
  };

  useEffect(() => {
    if (map && selectedLocation && markers.length > 0) {
      console.log('Selected location changed:', selectedLocation.name);
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
            <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enable Interactive Map</h3>
            <p className="text-muted-foreground mb-4">
              Enter your Google Maps API key to view the interactive campus map with real JNTUH locations.
            </p>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
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
                className="bg-red-700 hover:bg-red-800"
                disabled={isLoading || !googleMapsApiKey.trim()}
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
        {error && (
          <div className="bg-red-50 border-b border-red-200 p-4">
            <div className="flex justify-between items-center">
              <p className="text-red-800 text-sm">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry}
                className="text-red-700 border-red-300 hover:bg-red-50"
              >
                Retry
              </Button>
            </div>
          </div>
        )}
        <div 
          ref={mapRef} 
          className="h-[600px] w-full rounded-lg"
          style={{ minHeight: '400px' }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
