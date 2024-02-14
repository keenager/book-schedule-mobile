import { Text, View } from "tamagui";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../components/context-provider/ScheduleProvider";
import ScheduleDetail from "../../components/detail/ScheduleDetail";

export default function DetailScreen() {
  const { bookList, plan, scheduleList, dispatch } =
    useScheduleContext() as ScheduleContextType;

  return (
    <View>
      <Text>스케줄 디테일</Text>
      <ScheduleDetail list={scheduleList} />
    </View>
  );
}
