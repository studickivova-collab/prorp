import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, useMap, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { iconFor } from './icons';
import { zoneIconFor, personalPinIcon } from '../echo/icons';
import { suggestedSpeciesFor } from '../echo/echoText';
import { useI18n } from '../i18n/I18nContext';
import type { WaterBodySummary, WaterBodyKind } from '../types/waterBody';
import type { EchoZone } from '../echo/zones';

const LATVIA_CENTER: [number, number] = [56.85, 24.8];
const LATVIA_BOUNDS: [[number, number], [number, number]] = [
  [55.3, 19.5],
  [58.4, 29.0],
];

export interface PersonalPin {
  id: string;
  lat: number;
  lon: number;
  species: string;
  dateIso: string;
}

interface Props {
  items: WaterBodySummary[];
  onSelect: (item: WaterBodySummary) => void;
  echoMode?: boolean;
  outline?: [number, number][][] | null;
  waterKind?: WaterBodyKind;
  zones?: EchoZone[];
  personalPins?: PersonalPin[];
  onMapTap?: (lat: number, lon: number) => void;
}

/** Pans/zooms to fit the selected water body's outline whenever it changes. */
function FitToOutline({ outline }: { outline?: [number, number][][] | null }) {
  const map = useMap();
  useEffect(() => {
    if (!outline || outline.length === 0) return;
    const points = outline.flat();
    if (points.length === 0) return;
    map.fitBounds(points, { padding: [40, 40], maxZoom: 15 });
  }, [outline, map]);
  return null;
}

function MapClickCapture({ onTap }: { onTap: (lat: number, lon: number) => void }) {
  useMapEvents({
    click: (e) => onTap(e.latlng.lat, e.latlng.lng),
  });
  return null;
}

export function MapView({
  items,
  onSelect,
  echoMode = false,
  outline = null,
  waterKind,
  zones = [],
  personalPins = [],
  onMapTap,
}: Props) {
  const { t, locale } = useI18n();

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

      {echoMode && outline && (
        <>
          <FitToOutline outline={outline} />
          {outline.map((path, i) =>
            waterKind === 'river' ? (
              <Polyline key={i} positions={path} pathOptions={{ color: '#2f7fb8', weight: 3, dashArray: '4 4' }} />
            ) : (
              <Polygon
                key={i}
                positions={path}
                pathOptions={{ color: '#35825a', weight: 2, fillOpacity: 0.06 }}
              />
            ),
          )}
        </>
      )}

      {echoMode &&
        waterKind &&
        zones.map((zone) => (
          <Marker key={zone.id} position={zone.center} icon={zoneIconFor(zone.type)}>
            <Popup>
              <div className="text-xs space-y-1">
                <div className="font-semibold">{t(`echo.zone.${zone.type}` as const)}</div>
                <div className="text-ink-muted">{t(`echo.zone.${zone.type}.desc` as const)}</div>
                <div className="pt-1">
                  <span className="font-medium">{t('echo.zone.suggestedSpecies')}:</span>{' '}
                  {suggestedSpeciesFor(zone.type, waterKind, locale).join(', ')}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      {echoMode &&
        personalPins.map((pin) => (
          <Marker key={pin.id} position={[pin.lat, pin.lon]} icon={personalPinIcon()}>
            <Popup>
              <div className="text-xs">
                <div className="font-semibold">{t('echo.pin.title')}</div>
                <div>{pin.species}</div>
                <div className="text-ink-muted">{pin.dateIso}</div>
              </div>
            </Popup>
          </Marker>
        ))}

      {echoMode && onMapTap && <MapClickCapture onTap={onMapTap} />}
    </MapContainer>
  );
}
