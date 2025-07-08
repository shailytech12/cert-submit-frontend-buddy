
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Validate API key
    if (!apiKey || apiKey.trim().length === 0) {
      reject(new Error('Google Maps API key is required'));
      return;
    }

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      console.log('Google Maps already loaded');
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      console.log('Google Maps script already exists, waiting for load');
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps')));
      return;
    }

    // Create and load the script
    console.log('Creating new Google Maps script');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Google Maps script loaded successfully');
      // Additional check to ensure the API is ready
      if (window.google && window.google.maps) {
        resolve();
      } else {
        reject(new Error('Google Maps API not available after script load'));
      }
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Google Maps script:', error);
      reject(new Error('Failed to load Google Maps - check your API key and internet connection'));
    };
    
    document.head.appendChild(script);
  });
};
