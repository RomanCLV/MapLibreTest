import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "@components/themedComponents/ThemedText";
import ThemedCard from "@components/themedComponents/ThemedCard";
import { Activity } from "types/activity";
import { useTheme } from "@hooks/useTheme";

interface CardActivityProps {
  activity: Activity;
  variant?: "reduced" | "full";
}

export function CardActivity({ activity, variant = "reduced" }: CardActivityProps) {
  const theme = useTheme();
  const isFull = variant === "full";
  const lat = activity.location.lat;
  const lng = activity.location.lng;

  return (
    <ThemedCard
      style={[
        styles.card,
        isFull ? styles.cardFull : styles.cardReduced,
        { backgroundColor: theme.background.card },
      ]}
    >
      <View style={styles.headerRow}>
        <ThemedText style={[styles.title, isFull && styles.titleFull]}>
          {activity.name}
        </ThemedText>
        <View
          style={[
            styles.badge,
            { backgroundColor: theme.brand.primary + "22" },
          ]}
        >
          <ThemedText style={[styles.badgeText, { color: theme.brand.primary }]}>
            {activity.sport}
          </ThemedText>
        </View>
      </View>

      <ThemedText
        style={[styles.description, isFull && styles.descriptionFull]}
        numberOfLines={isFull ? 6 : 2}
      >
        {activity.description}
      </ThemedText>

      {isFull && (
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <ThemedText style={styles.metaLabel}>Latitude</ThemedText>
            <ThemedText style={styles.metaValue}>{lat.toFixed(4)}</ThemedText>
          </View>
          <View style={styles.metaItem}>
            <ThemedText style={styles.metaLabel}>Longitude</ThemedText>
            <ThemedText style={styles.metaValue}>{lng.toFixed(4)}</ThemedText>
          </View>
        </View>
      )}
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
  cardReduced: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  cardFull: {
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  titleFull: {
    fontSize: 22,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    opacity: 0.8,
  },
  descriptionFull: {
    fontSize: 15,
    marginTop: 12,
    opacity: 0.9,
  },
  metaRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  metaLabel: {
    fontSize: 11,
    opacity: 0.6,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
  },
});
