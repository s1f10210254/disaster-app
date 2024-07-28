import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { NEXT_PUBLIC_MAPBOX_API_KEY } from 'utils/envValues';

mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_API_KEY as string;
export const useMap = () => {
  console.log('next_public_mapbox_api_key: ', NEXT_PUBLIC_MAPBOX_API_KEY);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 12,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      return () => {
        map.remove();
      };
    }
  }, []);

  return mapContainerRef;
};
