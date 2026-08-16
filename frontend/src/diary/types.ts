export interface CatchEntry {
  id: string;
  createdAt: number;
  dateIso: string; // YYYY-MM-DD
  waterBodyName: string;
  species: string;
  weightKg: number | null;
  conditions: string;
  /** Set when the catch was logged by tapping a spot on the map in "echo
   * sounder" mode — lets it double as a personal mark on that water body's
   * map, in addition to being a regular diary entry. Absent for entries
   * logged the normal way (no exact spot picked). */
  waterBodyId?: string;
  lat?: number;
  lon?: number;
}
