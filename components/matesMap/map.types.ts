// components/matesMap/map.types.ts
import type { FeatureCollection } from "geojson";
import type {
  CircleLayerStyle,
  SymbolLayerStyle,
} from "@maplibre/maplibre-react-native";

export interface MapLocation {
  lat: number;
  lng: number;
}

export interface FocusOptions extends MapLocation {
  minZoom?: number;
}

export interface StartupLocation {
  location: MapLocation;
  zoom?: number;
}

/**
 * Callback de transformation
 */
export interface ToFeatureCollection<T> { (data: T[]): FeatureCollection; }

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

export interface ClusterConfig {
  radius?: number;
  maxZoom?: number;
  styles?: ClusterStyleConfig;
}

/**
 * Styles des clusters
 */
export interface ClusterStyleConfig {
  circle?: CircleLayerStyle;
  countText?: SymbolLayerStyle;
}
