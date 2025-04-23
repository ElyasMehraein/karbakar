import React from 'react';
import { Business } from '../types/business';

interface MapViewProps {
  businesses: Business[];
  onCenterChange?: (location: { lat: number; lng: number }) => void;
}

const MapView: React.FC<MapViewProps> = ({ businesses, onCenterChange }) => {
  return (
    <div className="h-96 bg-gray-100 rounded" data-testid="map-container">
      {/* Map implementation would go here */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded shadow">
        <button className="px-4 py-2 text-blue-500">رستوران‌ها</button>
        <button className="px-4 py-2 text-blue-500">کافه‌ها</button>
      </div>
      
      {businesses.map((business) => (
        <div
          key={business.id}
          className="absolute"
          style={{
            left: `${(business.location.lng + 180) * 2}px`,
            top: `${(90 - business.location.lat) * 2}px`
          }}
          data-testid="business-marker"
          onClick={() => onCenterChange?.(business.location)}
        >
          <div className="bg-white p-2 rounded shadow">
            <h3 className="font-semibold">{business.name}</h3>
            <p className="text-gray-600">{business.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapView; 