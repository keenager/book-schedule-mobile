import {
  ListItem,
  ListItemText,
  Text,
  XGroup,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import { Schedule } from "../../models/scheduleModels";

const dateWidth = "$11";
const numberWidth = "$6";

export default function ScheduleDetail({ list }: { list: Schedule[] }) {
  return (
    // <section className="schedule-detail my-3">
    //   <div className="schedule-table my-3 overflow-x-auto">
    //     <table className="table table-zebra text-center">
    //       <thead>
    //         <tr>
    //           <th></th>
    //           <th>날짜</th>
    //           <th>계획</th>
    //           <th>수정</th>
    //           <th>실행</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {list.map((d, i) => (
    //           <TableRow key={i} data={d} idx={i} />
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </section>
    <YStack padding="$3" alignItems="center" borderRadius="$3">
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
    // <tr className={isToday ? "bg-blue-400" : ""}>
    //   <th className="rounded-l-lg">{idx + 1}</th>
    //   <td>{date}</td>
    //   <td>{pagePlanOrigin}</td>
    //   <td>{pagePlanModified}</td>
    //   <td className={`rounded-r-lg ${bgColor}`}>{pageDone}</td>
    // </tr>
    <XGroup
      size="$3"
      // gap="$3"
      $gtSm={{ size: "$5" }}
      bg={isToday ? "$blue4" : ""}
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
