import { Activity, SPORT_TYPES, SportType } from "types/activity";
import type { FeatureCollection, Point } from "geojson";
import { MapLocation } from "@components/matesMap";

export interface ActivityFeatureProperties {
  id: string,
  sport: SportType,
}

export function activitiesToFeatureCollection(list: Activity[]): FeatureCollection<Point, ActivityFeatureProperties> {
  return {
    type: "FeatureCollection",
    features: list.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.location.lng, item.location.lat],
      },
      properties: {
        id: item.id,
        sport: item.sport,
      },
    })),
  };
}

// Générateur réaliste
export function generateActivities(
  count: number,
  center: MapLocation = { lat: 48.8566, lng: 2.3522 },
  amplitude = 0.2
): Activity[] {
  const sports = SPORT_TYPES;

  return Array.from({ length: count }).map((_, i) => ({
    id: `activity-${i}`,
    name: `Sortie ${sports[i % sports.length]}`,
    description: "Sortie sportive conviviale",
    sport: sports[i % sports.length],
    location: {
      lat: center.lat + (Math.random() - 0.5) * amplitude,
      lng: center.lng + (Math.random() - 0.5) * amplitude,
    }
  }));
}
