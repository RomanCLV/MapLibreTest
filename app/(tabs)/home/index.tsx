// app/(tabs)/home/index.tsx
import React from "react";
import MatesMap from "@components/matesMap/MatesMap";

import type { MapPoint } from "types/map";

const points: MapPoint[] = Array.from({ length: 300 }).map((_, i) => ({
  id: `activity-${i}`,
  latitude: 48.85 + Math.random() * 0.2 - 0.1,
  longitude: 2.35 + Math.random() * 0.2 - 0.1,
  sport: i % 3 === 0 ? "running" : i % 3 === 1 ? "cycling" : "swimming",
  level:
    i % 3 === 0
      ? "beginner"
      : i % 3 === 1
      ? "intermediate"
      : "advanced",
}));

export default function index() {
  return <MatesMap points={points} />
}
