// types/map.ts
export type SportType = "running" | "cycling" | "swimming";
export type SportLevel = "beginner" | "intermediate" | "advanced";

export interface MapPoint {
  id: string;
  latitude: number;
  longitude: number;
  sport: SportType;
  level: SportLevel;
}
