export type WaterBodyKind = 'lake' | 'river' | 'water';

export interface WaterBodySummary {
  id: string;
  name: string;
  kind: WaterBodyKind;
  center: [number, number]; // [lat, lon]
}

export interface WaterBody extends WaterBodySummary {
  osmType: 'way' | 'relation';
  osmId: number;
  geometry: [number, number][][];
}
