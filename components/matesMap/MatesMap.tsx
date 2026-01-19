// components/matesMap/MatesMap.tsx
import React, { useMemo } from "react";
import {
  MapView,
  ShapeSource,
  SymbolLayer,
  CircleLayer,
  Images,
  Camera,
} from "@maplibre/maplibre-react-native";
import { StyleSheet } from "react-native";
import type { FeatureCollection } from "geojson";

import { ClusterStyleConfig, IconConfig, RawData, StartupLocation, ToFeatureCollection } from "./map.types";
import {
  defaultClusterCircle,
  defaultClusterText,
  defaultSymbolStyle,
} from "./defaultStyles";

export interface MatesMapProps<T = RawData> {
  /** Option 1 : données déjà prêtes */
  featureCollection?: FeatureCollection;
  /** Option 2 : données + callback */
  data?: T[];
  toFeatureCollection?: ToFeatureCollection<T>;

  mapStyle?: string;
  startupLocation?: StartupLocation;
  icons?: IconConfig;
  clusters?: ClusterStyleConfig;
}

export default function MatesMap<T>({
  featureCollection,
  data = [],
  toFeatureCollection,
  mapStyle = "https://tiles.openfreemap.org/styles/liberty",
  startupLocation,
  icons,
  clusters,
}: MatesMapProps<T>) {
  const geojson: FeatureCollection | undefined = useMemo(() => {
    if (featureCollection) return featureCollection;
    if (data.length && toFeatureCollection)
      return toFeatureCollection(data);
    return undefined;
  }, [featureCollection, data, toFeatureCollection]);

  if (!geojson) return null;

  return (
    <MapView style={styles.map} mapStyle={mapStyle}>
      {startupLocation && (
        <Camera
          zoomLevel={startupLocation.zoom ?? 10}
          centerCoordinate={[
            startupLocation.location.lng,
            startupLocation.location.lat,
          ]}
        />
      )}

      {icons && <Images images={icons.images} />}

      <ShapeSource
        id="source"
        shape={geojson}
        cluster
        clusterRadius={50}
        clusterMaxZoomLevel={14}
      >
        {/* Clusters */}
        <CircleLayer
          id="clusters"
          filter={["has", "point_count"]}
          style={{
            ...defaultClusterCircle,
            ...clusters?.circle,
          }}
        />

        <SymbolLayer
          id="cluster-count"
          filter={["has", "point_count"]}
          style={{
            ...defaultClusterText,
            ...clusters?.countText,
          }}
        />

        {/* Points */}
        {icons && (
          <SymbolLayer
            id="markers"
            filter={["!", ["has", "point_count"]]}
            style={{
              ...defaultSymbolStyle,
              ...icons.style,
              iconImage: ["get", icons.property],
            }}
          />
        )}
      </ShapeSource>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
