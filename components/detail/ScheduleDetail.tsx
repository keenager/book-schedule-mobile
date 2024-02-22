import { ListItem, ScrollView, XGroup, YStack } from "tamagui";
import { Schedule } from "../../models/scheduleModels";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../context-provider/ScheduleProvider";
import { toLocaleDate } from "../../utils/date";
import Size from "../../constants/Size";

const dateWidth = "$11";
const numberWidth = "$6";

export default function ScheduleDetail() {
  const { scheduleList } = useScheduleContext() as ScheduleContextType;
  return (
    <YStack>
      <XGroup
        size={Size.button}
        $gtSm={{ size: "$5" }}
        borderRadius={0}
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <TableCell width={dateWidth} content="날짜" />
        <TableCell width={numberWidth} content="계획" />
        <TableCell width={numberWidth} content="수정" />
        <TableCell width={numberWidth} content="실행" />
      </XGroup>
      <ScrollView maxHeight={350}>
        {scheduleList.map((d, i) => (
          <TableRow key={i} data={d} idx={i} />
        ))}
      </ScrollView>
    </YStack>
  );
}

function TableRow({ data, idx }: { data: Schedule; idx: number }) {
  const { date, pagePlanOrigin, pagePlanModified, pageDone } = data;
  const isToday = date === toLocaleDate();
  // 달성 여부에 따라 색깔 부여.
  const isGood = pagePlanModified && pageDone && pagePlanModified <= pageDone;
  const isBad = pagePlanModified && pageDone && pagePlanModified > pageDone;
  const bgColor = isGood ? "$green7" : isBad ? "$red7" : "";
  return (
    <XGroup
      size="$3"
      // gap="$3"
      $gtSm={{ size: "$5" }}
      backgroundColor={isToday ? "$blue6" : ""}
      // borderRadius={5}
      // borderTopLeftRadius={5}
      // borderTopWidth={1}
      // borderTopColor="$borderColor"
    >
      <TableCell width={dateWidth} content={date} isToday={isToday} />
      <TableCell
        width={numberWidth}
        content={pagePlanOrigin}
        isToday={isToday}
      />
      <TableCell
        width={numberWidth}
        content={pagePlanModified}
        isToday={isToday}
      />
      <TableCell
        width={numberWidth}
        content={pageDone}
        isToday={isToday}
        bg={bgColor}
      />
    </XGroup>
  );
}

function TableCell({
  width,
  content,
  isToday,
  bg,
}: {
  width: string;
  content: string | number | undefined;
  isToday?: boolean;
  bg?: string;
}) {
  return (
    <XGroup.Item>
      <ListItem
        width={width}
        textAlign="center"
        bg={bg ? bg : isToday ? "$blue6" : ""}
      >
        {content?.toString()}
      </ListItem>
    </XGroup.Item>
  );
}
