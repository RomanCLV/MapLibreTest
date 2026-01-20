// components/matesMap/MatesMap.tsx
import React, {
  useMemo,
} from "react";
import { StyleSheet } from "react-native";
import {
  MapView,
  ShapeSource,
  SymbolLayer,
  CircleLayer,
  Images,
  Camera,
  OnPressEvent,
} from "@maplibre/maplibre-react-native";
import type { Feature, FeatureCollection } from "geojson";

import {
  ClusterConfig,
  IconConfig,
  StartupLocation,
  ToFeatureCollection,
} from "./map.types";
import {
  defaultClusterCircle,
  defaultClusterText,
  defaultSymbolStyle,
} from "./defaultStyles";

export interface FocusOptions {
  lat: number;
  lng: number;
  minZoom?: number;
  animationDuration?: number;
}

export interface MatesMapProps<T = any> {
  featureCollection?: FeatureCollection;

  /** données brutes + callback */
  data?: T[];
  toFeatureCollection?: ToFeatureCollection<T>;

  mapStyle?: string;
  startupLocation?: StartupLocation;
  icons?: IconConfig;
  clusters?: ClusterConfig;

  onPressFeature?: (feature: Feature) => void;
  onPressCluster?: (cluster: Feature) => void;
}

/* =========================
  Component
========================= */

function MatesMap({
    featureCollection,
    data = [],
    toFeatureCollection,
    mapStyle = "https://tiles.openfreemap.org/styles/liberty",
    startupLocation,
    icons,
    clusters,
    onPressFeature,
    onPressCluster,
  }: MatesMapProps) {

    const geojson: FeatureCollection | undefined = useMemo(() => {
      if (featureCollection) 
        return featureCollection;
      
      if (data.length && toFeatureCollection)
        return toFeatureCollection(data);

      return undefined; // Retourner une FeatureCollection vide si aucune donnée n'est fournie plutot que undefined
    }, [featureCollection, data, toFeatureCollection]);

    const onShapePressed = (event: OnPressEvent) => {
      const feature = event.features?.[0];
      if (!feature) 
        return;

      const isCluster = feature.properties?.point_count != null;
      if (isCluster) {
        onPressCluster?.(feature);
      }
      else {
        onPressFeature?.(feature);
      }
    };

    return (
      <MapView
        style={styles.map}
        mapStyle={mapStyle}
      >
        {startupLocation && (
          <Camera
            defaultSettings={{
              zoomLevel: startupLocation.zoom ?? 10,
              centerCoordinate: [
                startupLocation.location.lng,
                startupLocation.location.lat,
              ],
            }}
          />
        )}

        {icons && <Images images={icons.images} />}

        <ShapeSource
          id="source"
          shape={geojson}
          cluster
          clusterRadius={clusters?.radius ?? 50}
          clusterMaxZoomLevel={clusters?.maxZoom ?? 14}
          onPress={onShapePressed}
        >
          <CircleLayer
            id="clusters"
            filter={["has", "point_count"]}
            style={{
              ...defaultClusterCircle,
              ...clusters?.styles?.circle,
            }}
          />

          <SymbolLayer
            id="cluster-count"
            filter={["has", "point_count"]}
            style={{
              ...defaultClusterText,
              ...clusters?.styles?.countText,
            }}
          />

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

export default MatesMap;

const styles = StyleSheet.create({
  map: { flex: 1 },
});
