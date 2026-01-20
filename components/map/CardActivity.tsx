import ThemedText from "@components/themedComponents/ThemedText";
import ThemedView from "@components/themedComponents/ThemedView";
import { Activity } from "types/activity";

interface CardActivityProps {
  activity: Activity;
}

export function CardActivity({ activity }: CardActivityProps) {
  return (
    <ThemedView style={{backgroundColor: "transparent"}}>
      <ThemedText>{activity.name}</ThemedText>
      <ThemedText>{activity.description}</ThemedText>
      <ThemedText>Sport : {activity.sport}</ThemedText>
    </ThemedView>
  );
}
