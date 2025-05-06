import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface MapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  onClick?: (e: L.LeafletMouseEvent) => void;
  children?: React.ReactNode;
}
const Map: React.FC<MapProps> = ({
  center = [40.7128, -74.006],
  // Default to NYC
  zoom = 13,
  className = '',
  onClick,
  children
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView(center, zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap.current);
      if (onClick) {
        leafletMap.current.on('click', onClick);
      }
    }
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (leafletMap.current) {
      leafletMap.current.setView(center, zoom);
    }
  }, [center, zoom]);
  return <div className={`relative ${className}`}>
      <div ref={mapRef} className="h-full w-full z-10" />
      {children}
    </div>;
};
export default Map;