import { ListItem, Text, YStack, Group } from "tamagui";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../context-provider/ScheduleProvider";

export default function Plan() {
  const {
    plan: { totalPage, dailyPage },
  } = useScheduleContext() as ScheduleContextType;
  return (
    <Group
      orientation="horizontal"
      width="$10"
      // marginVertical="$5"
      // marginLeft={(Dimensions.get("window").width - 100) / 3}
      // marginRight="auto"
    >
      <PlanPanel title="전체" page={totalPage} />
      <PlanPanel title="하루" page={dailyPage} />
    </Group>
  );
}

function PlanPanel({ title, page }: { title: string; page: number }) {
  const fontColor = title === "하루" ? "$pink9" : undefined;
  const width = page < 1000 ? "$6" : "$7";
  return (
    <Group.Item>
      <ListItem
        borderRightWidth={1}
        backgroundColor="$blue2"
        justifyContent="center"
      >
        <YStack width={width} alignItems="center" gap={0.1}>
          <Text color="gray">{title}</Text>
          <Text color={fontColor} fontSize="$9">
            {page}
          </Text>
          <Text color="gray">page</Text>
        </YStack>
      </ListItem>
    </Group.Item>
  );
}
