import { ListItem, XGroup } from "tamagui";

const TodayColor = "$blue6";

export default function TableCell({
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
        bg={bg ? bg : isToday ? TodayColor : ""}
      >
        {content?.toString()}
      </ListItem>
    </XGroup.Item>
  );
}
