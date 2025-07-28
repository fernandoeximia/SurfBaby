import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loader } from '@googlemaps/js-api-loader';

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
            zoom: 15.76,
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
    <View style={[styles.container, { width, height }]}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
          overflow: 'hidden'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default MapComponent;

