import { ScrollView, XGroup, YStack } from "tamagui";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../context-provider/ScheduleProvider";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import Size from "../../constants/Size";

export default function ScheduleDetail() {
  const { plan, scheduleList } = useScheduleContext() as ScheduleContextType;
  return (
    <YStack>
      {/* 제목 행 */}
      <XGroup
        size="$3.5"
        $gtSm={{ size: "$5" }}
        borderRadius={0}
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <TableCell width={Size.width.date} content="날짜" />
        <TableCell width={Size.width.number} content="계획" />
        <TableCell width={Size.width.number} content="수정" />
        <TableCell width={Size.width.number} content="실행" />
      </XGroup>
      {/* 실제 데이터 행 */}
      <ScrollView maxHeight={350}>
        {scheduleList.map((d, i) => (
          <TableRow key={plan.title + scheduleList[i].date} data={d} idx={i} />
        ))}
      </ScrollView>
    </YStack>
  );
}
