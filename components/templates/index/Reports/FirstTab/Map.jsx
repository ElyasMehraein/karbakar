import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LocationMarker } from 'react-leaflet';

export default function MyComponent() {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
  }
  
  function MyMapComponent() {
    return (
      <MapContainer center={[50.5, 30.5]} zoom={13}>
        <MyComponent />
      </MapContainer>
    )
  }
