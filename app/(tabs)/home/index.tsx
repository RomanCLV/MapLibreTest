// app/home/index.tsx
import React, { useMemo, useState } from "react";
import MatesMap from "@components/matesMap";
import { activitiesToFeatureCollection, generateActivities } from "utils/activity.utils";

import MarkerRed from "@assetsMap/marker-red.png";
import MarkerGreen from "@assetsMap/marker-green.png";
import MarkerBlue from "@assetsMap/marker-blue.png";
import { Activity } from "types/activity";
import ThemedView from "@components/themedComponents/ThemedView";
import ThemedBottomSheetModal from "@components/themedComponents/ThemedBottomSheetModal";
import { CardActivity } from "@components/map/CardActivity";
import { useT } from "@i18n/useT";

const activities = generateActivities(
  1000,
  { lat: 48.8566, lng: 2.3522 },
  0.4
);

export default function Home() {
  const t = useT();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const activityById = useMemo(() => {
    return Object.fromEntries(activities.map((a) => [a.id, a]));
  }, []);

  const onPressFeature = (feature: GeoJSON.Feature) => {
    const id = feature.properties?.id;
    if (!id) return;

    const activity = activityById[id];
    if (!activity) 
      return;

    const lat = activity.location.lat;
    const lng = activity.location.lng;
    const minZoom =  13;

    setSelectedActivity(activity);
  };

  const closeActivity = () => setSelectedActivity(null);

  return (
    <ThemedView style={{ flex: 1 }}>
      <MatesMap
        data={activities}
        toFeatureCollection={activitiesToFeatureCollection}
        startupLocation={{
          location: { lat: 48.8566, lng: 2.3522 },
          zoom: 11,
        }}
        icons={{
          property: "sport",
          images: {
            running: MarkerRed,
            cycling: MarkerGreen,
            swimming: MarkerBlue,
            trail: MarkerGreen,
          },
          style: {
            iconSize: 0.05,
          },
        }}
        onPressFeature={onPressFeature}
      />

      <ThemedBottomSheetModal
        visible={!!selectedActivity}
        onClose={closeActivity}
        header={{
          title: selectedActivity?.name,
          cancelText: t("global.close"),
          confirmText: t("global.ok"),
          onCancel: closeActivity,
          onConfirm: closeActivity,
        }}
        contentStyle={{ flex: 1, alignItems: "stretch", padding: 16 }}
      >
        {selectedActivity && <CardActivity activity={selectedActivity} /> }
      </ThemedBottomSheetModal>
    </ThemedView>
  );
}
