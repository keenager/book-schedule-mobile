import { Button, YStack } from "tamagui";
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

export default function DetailScreen() {
  const { plan, scheduleList, dispatch } =
    useScheduleContext() as ScheduleContextType;
  const onSave = async () => {
    console.log("저장");

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
    console.log("dataToSave", dataToSave);
    await AsyncStorage.setItem("bookSchedule", JSON.stringify(dataToSave));

    dispatch({ type: "updateBookList", bookList: Object.keys(dataToSave) });
  };
  return (
    <YStack alignSelf="center" gap="$3">
      <PlanAndDone>
        <Plan />
        <TodayDone />
      </PlanAndDone>
      <ScheduleDetail />
      <Button alignSelf="flex-end" onPress={onSave}>
        저장
      </Button>
    </YStack>
  );
}
