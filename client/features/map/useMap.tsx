import MapboxLanguage from '@mapbox/mapbox-gl-language';
import type { LngLatLike } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { NEXT_PUBLIC_MAPBOX_API_KEY } from 'utils/envValues';

mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_API_KEY as string;
export const useMap = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [139.7670516, 35.6811673], // 東京駅
        zoom: 12,
        preserveDrawingBuffer: true,
      });

      // Add language control to the map.
      const language = new MapboxLanguage({ defaultLanguage: 'ja' });
      map.addControl(language);

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add geolocate control to the map.
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });
      map.addControl(geolocateControl);

      // GeolocateControlで位置を取得し、地図の中心に設定
      map.on('load', () => {
        const handleGeolocate = (e: { coords: { longitude: number; latitude: number } }) => {
          const userLocation: LngLatLike = [e.coords.longitude, e.coords.latitude];
          map.setCenter(userLocation);
          map.setZoom(15);
          // 一度だけ中央に設定し、その後リスナーを削除
          geolocateControl.off('geolocate', handleGeolocate);
        };
        geolocateControl.on('geolocate', handleGeolocate);
        geolocateControl.trigger();
        setLoading(false);
      });

      return () => {
        map.remove();
      };
    }
  }, []);

  return { loading, mapContainerRef };
};
