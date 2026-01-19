// components/matesMap/defaultStyles.ts
import type {
  CircleLayerStyle,
  SymbolLayerStyle,
} from "@maplibre/maplibre-react-native";

export const defaultClusterCircle: CircleLayerStyle = {
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
};

export const defaultClusterText: SymbolLayerStyle = {
  textField: ["get", "point_count_abbreviated"],
  textSize: 14,
  textColor: "#FFFFFF",
  textFont: ["Noto Sans Regular"],
};

export const defaultSymbolStyle: SymbolLayerStyle = {
  iconSize: 0.8,
  iconAllowOverlap: true,
  textFont: ["Noto Sans Regular"],
};
