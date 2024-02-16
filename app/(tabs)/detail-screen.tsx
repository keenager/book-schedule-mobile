import { Button, XStack, YStack } from "tamagui";
import ScheduleDetail from "../../components/detail/ScheduleDetail";
import PlanAndDone from "../../components/plan-done/PlanAndDone";
import Plan from "../../components/plan-done/Plan";
import TodayDone from "../../components/plan-done/TodayDone";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../components/context-provider/ScheduleProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataType } from "../../types/scheduleTypes";
import { blankPlan } from "../../models/scheduleModels";

export default function DetailScreen() {
  const { plan, scheduleList, dispatch } =
    useScheduleContext() as ScheduleContextType;

  const onSave = async () => {
    const prev = JSON.parse(
      (await AsyncStorage.getItem("bookSchedule")) ?? "{}"
    );
    const dataToSave: DataType = {
      ...prev,
      [plan.title]: {
        totalPage: plan.totalPage,
        dailyPage: plan.dailyPage,
        scheduleList: scheduleList.map((schedule) => schedule.toObj()),
      },
    };
    await AsyncStorage.setItem("bookSchedule", JSON.stringify(dataToSave));

    dispatch({ type: "updateBookList", bookList: Object.keys(dataToSave) });
  };

  const onReset = () => {
    dispatch({ type: "updatePlan", plan: blankPlan });
  };

  return (
    <YStack alignSelf="center" gap="$3">
      <PlanAndDone>
        <Plan />
        <TodayDone />
      </PlanAndDone>
      <ScheduleDetail />
      <XStack mt="$2" gap="$3">
        <Button size="$3" marginLeft="auto" onPress={onReset}>
          초기화
        </Button>
        <Button alignSelf="flex-end" onPress={onSave}>
          저장
        </Button>
      </XStack>
    </YStack>
  );
}
