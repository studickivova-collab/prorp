export interface CatchEntry {
  id: string;
  createdAt: number;
  dateIso: string; // YYYY-MM-DD
  waterBodyName: string;
  species: string;
  weightKg: number | null;
  conditions: string;
}
