import { YStack } from "tamagui";
import ScheduleDetail from "../../components/detail/ScheduleDetail";
import PlanAndDone from "../../components/detail/plan-done/PlanAndDone";
import Plan from "../../components/detail/plan-done/Plan";
import TodayDone from "../../components/detail/plan-done/TodayDone";
import Buttons from "../../components/detail/Buttons";

export default function DetailScreen() {
  return (
    <YStack alignSelf="center" gap="$3">
      <PlanAndDone>
        <Plan />
        <TodayDone />
      </PlanAndDone>
      <ScheduleDetail />
      <Buttons />
    </YStack>
  );
}
