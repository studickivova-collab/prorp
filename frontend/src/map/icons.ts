import L from 'leaflet';
import type { WaterBodyKind } from '../types/waterBody';

// Lower half of the marker is coloured by water-body kind — the rest reads
// as a classic red/white-style fishing bobber (float) rather than a flat
// generic map dot.
const COLORS: Record<WaterBodyKind, string> = {
  lake: '#35825a',
  river: '#2f7fb8',
  water: '#8a7a5c',
};

const cache = new Map<WaterBodyKind, L.DivIcon>();

/** Small fishing-bobber (float) marker: cream top, kind-coloured bottom, antenna. */
function bobberSvg(color: string): string {
  return `
<svg width="20" height="26" viewBox="0 0 20 26" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,0.5))">
  <line x1="10" y1="1" x2="10" y2="6" stroke="#2a2213" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M10 6 C4 6 2 10 2 13.5 C2 18.5 6 23 10 25 C14 23 18 18.5 18 13.5 C18 10 16 6 10 6 Z"
        fill="#faf5e7" stroke="#2a2213" stroke-width="1.3"/>
  <path d="M2.05 13.7 C2.3 18.4 6.1 22.8 10 24.9 C13.9 22.8 17.7 18.4 17.95 13.7 Z" fill="${color}"/>
</svg>`.trim();
}

export function iconFor(kind: WaterBodyKind): L.DivIcon {
  const cached = cache.get(kind);
  if (cached) return cached;

  const color = COLORS[kind] ?? COLORS.water;
  const icon = L.divIcon({
    className: '',
    html: bobberSvg(color),
    iconSize: [20, 26],
    iconAnchor: [10, 25],
  });
  cache.set(kind, icon);
  return icon;
}
