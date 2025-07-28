import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import CompassRose from './CompassRose.web';

interface MapComponentProps {
  width?: number | string;
  height?: number | string;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  width = '100%', 
  height = 400 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyBd8CUGtiTWfhAYx-U4H-x7L5acH8G6BXY',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (mapRef.current && !mapInstanceRef.current) {
          // Coordenadas específicas fornecidas pelo usuário
          const coordenadas = {
            lat: -22.8948315,
            lng: -42.0285161
          };

          const map = new google.maps.Map(mapRef.current, {
            center: coordenadas,
            zoom: 14.5, // Diminuído de 15.76 para 14.5 para mostrar mais área
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true, // Remove controles padrão para visual mais limpo
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#00BCD4' }]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{ color: '#E8F5E8' }]
              },
              {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }] // Remove pontos de interesse para visual mais limpo
              }
            ]
          });

          mapInstanceRef.current = map;
        }
      } catch (error) {
        console.error('Erro ao carregar Google Maps:', error);
      }
    };

    initMap();
  }, []);

  return (
    <div style={{ position: 'relative', width, height }}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
          overflow: 'hidden'
        }}
      />
      <CompassRose size={100} position="top-right" />
    </div>
  );
};

export default MapComponent;

