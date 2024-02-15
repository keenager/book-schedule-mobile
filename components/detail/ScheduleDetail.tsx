import { ListItem, XGroup, YStack } from "tamagui";
import { Schedule } from "../../models/scheduleModels";
import PlanAndDone from "../plan-done/PlanAndDone";
import Plan from "../plan-done/Plan";
import TodayDone from "../plan-done/TodayDone";

const dateWidth = "$11";
const numberWidth = "$6";

export default function ScheduleDetail({ list }: { list: Schedule[] }) {
  return (
    <YStack padding="$3" alignItems="center" borderRadius="$3">
      <PlanAndDone>
        <Plan />
        <TodayDone />
      </PlanAndDone>
      <XGroup
        size="$3"
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
      {list.map((d, i) => (
        <TableRow key={i} data={d} idx={i} />
      ))}
    </YStack>
  );
}

function TableRow({ data, idx }: { data: Schedule; idx: number }) {
  const { date, pagePlanOrigin, pagePlanModified, pageDone } = data;
  const isToday = date === new Date().toISOString().split("T")[0];
  const isGood = pagePlanModified && pageDone && pagePlanModified <= pageDone;
  const isBad = pagePlanModified && pageDone && pagePlanModified > pageDone;
  const bgColor = isGood ? "$green5" : isBad ? "$red5" : "";
  return (
    <XGroup
      size="$3"
      // gap="$3"
      $gtSm={{ size: "$5" }}
      backgroundColor={isToday ? "$blue4" : ""}
      borderRadius={0}
      // borderTopWidth={1}
      // borderTopColor="$borderColor"
    >
      <TableCell width={dateWidth} content={date} />
      <TableCell width={numberWidth} content={pagePlanOrigin} />
      <TableCell width={numberWidth} content={pagePlanModified} />
      <TableCell width={numberWidth} content={pageDone} />
    </XGroup>
  );
}

function TableCell({
  width,
  content,
}: {
  width: string;
  content: string | number | undefined;
}) {
  return (
    <XGroup.Item>
      <ListItem width={width} textAlign="center">
        {content?.toString()}
      </ListItem>
    </XGroup.Item>
  );
}
