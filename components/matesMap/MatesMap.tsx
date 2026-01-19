// components/matesMap/MatesMap.tsx
import React, { useMemo } from "react";
import {
  MapView,
  ShapeSource,
  SymbolLayer,
  CircleLayer,
  Images,
} from "@maplibre/maplibre-react-native";
import { StyleSheet } from "react-native";
import type { FeatureCollection } from "geojson";
import type { MapPoint } from "types/map";

import MarkerRedIcon from "@assetsMap/marker-red.png";
import MarkerGreenIcon from "@assetsMap/marker-green.png";
import MarkerBlueIcon from "@assetsMap/marker-blue.png";

interface MatesMapProps {
  points?: MapPoint[];
  mapStyle?: string;
}

export default function MatesMap({
  points = [],
  mapStyle = "https://tiles.openfreemap.org/styles/liberty",
}: MatesMapProps) {
  // Conversion métier -> GeoJSON
  const geojson: FeatureCollection = useMemo(
    () => ({
      type: "FeatureCollection",
      features: points.map((p) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [p.longitude, p.latitude],
        },
        properties: {
          id: p.id,
          sport: p.sport,
          level: p.level,
        },
      })),
    }),
    [points]
  );

  return (
    <MapView 
      style={styles.map} 
      mapStyle={mapStyle}
    >
      {/* Icônes disponibles pour les layers */}
      <Images 
        images={{
          running: MarkerRedIcon,
          cycling: MarkerGreenIcon,
          swimming: MarkerBlueIcon,
        }}
      />

      <ShapeSource
        id="activities"
        shape={geojson}
        cluster={true}
        clusterRadius={50}
        clusterMaxZoomLevel={14}
      >
        {/* Clusters */}
        <CircleLayer
          id="clusters"
          filter={["has", "point_count"]}
          style={{
            circleColor: "#4CAF50",
            circleRadius: [
              "step",
              ["get", "point_count"],
              18,
              10,
              24,
              30,
              30,
            ],
            circleOpacity: 0.85,
          }}
        />

        {/* Nombre dans cluster */}
        <SymbolLayer
          id="cluster-count"
          filter={["has", "point_count"]}
          style={{
            textField: ["get", "point_count_abbreviated"],
            textSize: 14,
            textColor: "#FFFFFF",
            textAllowOverlap: true,
            textFont: ["Noto Sans Regular"],
          }}
        />

        {/* Markers individuels */}
        <SymbolLayer
          id="activity-markers"
          filter={["!", ["has", "point_count"]]}
          style={{
            iconImage: ["get", "sport"],
            iconSize: 0.05,
            iconAllowOverlap: true,
            iconColor: [
              "match",
              ["get", "level"],
              "beginner",
              "#4CAF50",
              "intermediate",
              "#FFC107",
              "advanced",
              "#F44336",
              "#000000",
            ],
            textFont: ["Noto Sans Regular"],
          }}
        />
      </ShapeSource>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
