import L from 'leaflet';
import type { EchoZoneType } from './zones';

const ZONE_STYLE: Record<EchoZoneType, { emoji: string; color: string }> = {
  ambushPoint: { emoji: '🎯', color: '#c0392b' },
  cove: { emoji: '🌿', color: '#2e8b57' },
  openWater: { emoji: '🌊', color: '#2f7fb8' },
  riverBend: { emoji: '🔄', color: '#8a5a2f' },
  riverLane: { emoji: '➡️', color: '#4a7fc0' },
};

const zoneCache = new Map<EchoZoneType, L.DivIcon>();

export function zoneIconFor(type: EchoZoneType): L.DivIcon {
  const cached = zoneCache.get(type);
  if (cached) return cached;

  const { emoji, color } = ZONE_STYLE[type];
  const icon = L.divIcon({
    className: '',
    html: `<div style="
      width:26px;height:26px;border-radius:50%;
      background:${color}dd;border:2px solid #fff;
      display:flex;align-items:center;justify-content:center;
      font-size:13px;box-shadow:0 1px 3px rgba(0,0,0,0.5);
    ">${emoji}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
  zoneCache.set(type, icon);
  return icon;
}

let pinIcon: L.DivIcon | null = null;

export function personalPinIcon(): L.DivIcon {
  if (pinIcon) return pinIcon;
  pinIcon = L.divIcon({
    className: '',
    html: `<svg width="22" height="28" viewBox="0 0 22 28" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,0.5))">
      <path d="M11 1 C5 1 1 5.4 1 10.8 C1 17.5 11 27 11 27 C11 27 21 17.5 21 10.8 C21 5.4 17 1 11 1 Z" fill="#e0472a" stroke="#7a1f0f" stroke-width="1.2"/>
      <circle cx="11" cy="10.5" r="4.2" fill="#fff"/>
    </svg>`.trim(),
    iconSize: [22, 28],
    iconAnchor: [11, 27],
  });
  return pinIcon;
}
