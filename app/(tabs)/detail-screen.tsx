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
      {/* <div className="flex justify-end">
        <button
          className="btn btn-sm lg:btn-md btn-primary"
          onClick={dispatch.bind(null, { type: "save", scheduleList })}
        >
          저장
        </button>
      </div> */}
    </View>
  );
}
