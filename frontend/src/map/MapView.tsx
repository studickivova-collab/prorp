import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { iconFor } from './icons';
import type { WaterBodySummary } from '../types/waterBody';

const LATVIA_CENTER: [number, number] = [56.85, 24.8];
const LATVIA_BOUNDS: [[number, number], [number, number]] = [
  [55.3, 19.5],
  [58.4, 29.0],
];

interface Props {
  items: WaterBodySummary[];
  onSelect: (item: WaterBodySummary) => void;
}

export function MapView({ items, onSelect }: Props) {
  return (
    <MapContainer
      center={LATVIA_CENTER}
      zoom={7}
      minZoom={6}
      maxBounds={LATVIA_BOUNDS}
      maxBoundsViscosity={0.6}
      className="w-full h-full"
    >
      <TileLayer
        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        maxNativeZoom={17}
      />
      <MarkerClusterGroup chunkedLoading spiderfyOnMaxZoom disableClusteringAtZoom={15}>
        {items.map((item) => (
          <Marker
            key={item.id}
            position={item.center}
            icon={iconFor(item.kind)}
            eventHandlers={{ click: () => onSelect(item) }}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
