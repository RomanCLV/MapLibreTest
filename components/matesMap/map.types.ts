// components/matesMap/map.types.ts
// components/matesMap/matesMap.types.ts
import type { FeatureCollection } from "geojson";
import type {
  CircleLayerStyle,
  SymbolLayerStyle,
} from "@maplibre/maplibre-react-native";

export interface MapLocation {
  lat: number;
  lng: number;
}

export interface StartupLocation {
  location: MapLocation;
  zoom?: number;
}

/**
 * Données brutes quelconques
 */
export type RawData = unknown;

/**
 * Callback de transformation
 */
export type ToFeatureCollection<T = RawData> = (data: T[]) => FeatureCollection;

/**
 * Configuration des icônes
 */
export interface IconConfig {
  /**
   * Nom de la propriété à lire dans feature.properties
   * ex: "sport", "type", "category"
   */
  property: string;

  /**
   * Dictionnaire des icônes
   * ex: { running: require(...), cycling: require(...) }
   */
  images: Record<string, any>;

  /**
   * Style du SymbolLayer (iconSize, overlap, etc.)
   */
  style?: SymbolLayerStyle;
}

/**
 * Styles des clusters
 */
export interface ClusterStyleConfig {
  circle?: CircleLayerStyle;
  countText?: SymbolLayerStyle;
}
