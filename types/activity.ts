export const SPORT_TYPES = [
  "running",
  "cycling",
  "swimming",
  "trail",
] as const;

export type SportType = typeof SPORT_TYPES[number];

export interface Activity {
  id: string;
  name: string;
  description: string;
  sport: SportType;
  lat: number;
  lng: number;
}
