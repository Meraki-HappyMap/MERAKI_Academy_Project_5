import { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";

const LocationMap = ({ location }) => {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to load the Google Maps script
    const loadGoogleMapsScript = () => {
      if (window.google) {
        initMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => setError("Failed to load Google Maps");
      document.head.appendChild(script);
    };

    // Function to initialize the map
    const initMap = () => {
      try {
        if (!location) {
          setError("Location not provided");
          setIsLoading(false);
          return;
        }

        // Create a geocoder instance
        const geocoder = new window.google.maps.Geocoder();

        // Geocode the location string
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === "OK" && results[0]) {
            const { lat, lng } = results[0].geometry.location;

            // Create the map instance
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat: lat(), lng: lng() },
              zoom: 15,
              mapTypeControl: false,
              fullscreenControl: true,
              streetViewControl: true,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
                },
              ],
            });

            // Add a marker at the location
            new window.google.maps.Marker({
              position: { lat: lat(), lng: lng() },
              map: map,
              animation: window.google.maps.Animation.DROP,
              title: location,
            });

            // Add an info window with the address
            const infoWindow = new window.google.maps.InfoWindow({
              content: `<div class="p-2">${results[0].formatted_address}</div>`,
            });

            // Show info window on marker click
            map.addListener("click", () => {
              infoWindow.open(map);
            });

            setIsLoading(false);
          } else {
            setError("Could not find the location on the map");
            setIsLoading(false);
          }
        });
      } catch (err) {
        console.error("Map initialization error:", err);
        setError("Error initializing map");
        setIsLoading(false);
      }
    };

    loadGoogleMapsScript();

    // Cleanup function
    return () => {
      const script = document.querySelector(
        'script[src*="maps.googleapis.com/maps/api"]'
      );
      if (script && !window.google) {
        script.remove();
      }
    };
  }, [location]);

  if (error) {
    return (
      <div className="w-full h-[400px] md:h-[500px] mt-6 rounded-lg shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-[400px] md:h-[500px] mt-6 rounded-lg shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] md:h-[500px] mt-6 rounded-lg shadow-lg overflow-hidden"
    />
  );
};

export default LocationMap;
