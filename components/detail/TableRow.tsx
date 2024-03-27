import { XGroup } from "tamagui";
import { toLocaleDate } from "../../utils/date";
import { Schedule } from "../../models/scheduleModels";
import TableCell from "./TableCell";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";

export default function TableRow({
  data,
  idx,
}: {
  data: Schedule;
  idx: number;
}) {
  const { date, pagePlanOrigin, pagePlanModified, pageDone } = data;
  const isToday = date === toLocaleDate();
  // 달성 여부에 따라 색깔 부여.
  const isGood = pagePlanModified && pageDone && pagePlanModified <= pageDone;
  const isBad = pagePlanModified && pageDone && pagePlanModified > pageDone;
  const bgColor = isGood ? Colors.success : isBad ? Colors.error : "";
  return (
    <XGroup
      size="$3"
      // $gtSm={{ size: "$5" }}
      backgroundColor={isToday ? "$blue6" : ""}
    >
      <TableCell width={Size.width.date} content={date} isToday={isToday} />
      <TableCell
        width={Size.width.number}
        content={pagePlanOrigin}
        isToday={isToday}
      />
      <TableCell
        width={Size.width.number}
        content={pagePlanModified}
        isToday={isToday}
      />
      <TableCell
        width={Size.width.number}
        content={pageDone}
        isToday={isToday}
        bg={bgColor}
      />
    </XGroup>
  );
}
