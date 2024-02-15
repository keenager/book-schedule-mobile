import { Button, ScrollView, Text, View, XStack, YStack } from "tamagui";
import ScheduleDetail from "../../components/detail/ScheduleDetail";
import { Dimensions } from "react-native";
import PlanAndDone from "../../components/plan-done/PlanAndDone";
import Plan from "../../components/plan-done/Plan";
import TodayDone from "../../components/plan-done/TodayDone";

export default function DetailScreen() {
  return (
    <YStack alignItems="center" gap="$3">
      <PlanAndDone>
        <Plan />
        <TodayDone />
      </PlanAndDone>
      <ScheduleDetail />
      <XStack
        width={Dimensions.get("window").width * 0.8}
        justifyContent="flex-end"
      >
        <Button>저장</Button>
      </XStack>
    </YStack>
  );
}
