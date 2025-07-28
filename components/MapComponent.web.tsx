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
          // Coordenadas da Praia do Forte, Cabo Frio, RJ
          const praiaDoForte = {
            lat: -22.8808,
            lng: -42.0186
          };

          const map = new google.maps.Map(mapRef.current, {
            center: praiaDoForte,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.HYBRID,
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
              }
            ]
          });

          // Marcador na Praia do Forte
          const marker = new google.maps.Marker({
            position: praiaDoForte,
            map: map,
            title: '🏄‍♂️ Praia do Forte - Cabo Frio',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#00BCD4" stroke="#fff" stroke-width="2"/>
                  <text x="20" y="26" text-anchor="middle" fill="white" font-size="16">🏄‍♂️</text>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20)
            }
          });

          // Info Window com informações da praia
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; font-family: Arial, sans-serif;">
                <h3 style="color: #00BCD4; margin: 0 0 8px 0;">🏄‍♂️ Praia do Forte</h3>
                <p style="margin: 4px 0;"><strong>📍 Local:</strong> Cabo Frio, RJ</p>
                <p style="margin: 4px 0;"><strong>🌊 Ideal para:</strong> Surf, kitesurf e windsurf</p>
                <p style="margin: 4px 0;"><strong>🏖️ Características:</strong> Praia extensa com ventos constantes</p>
                <p style="margin: 4px 0;"><strong>🚗 Acesso:</strong> Fácil acesso de carro</p>
              </div>
            `
          });

          // Abrir info window ao clicar no marcador
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          // Abrir automaticamente ao carregar
          infoWindow.open(map, marker);

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

