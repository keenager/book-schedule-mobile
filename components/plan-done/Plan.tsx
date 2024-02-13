import { Dimensions } from "react-native";
import {
  ListItem,
  Separator,
  Text,
  View,
  XStack,
  YStack,
  XGroup,
  YGroup,
  Group,
} from "tamagui";

export default function Plan({
  totalPage,
  dailyPage,
}: {
  totalPage: number;
  dailyPage: number;
}) {
  return (
    <Group
      orientation="horizontal"
      width={100}
      // marginVertical="$5"
      // marginLeft={(Dimensions.get("window").width - 100) / 3}
      // marginRight="auto"
    >
      <Group.Item>
        <ListItem
          borderRightWidth={1}
          bg="$blue2"
          // title="전체"
          // subTitle={`${totalPage} page`}
        >
          <YStack width="$6" alignItems="center" gap={0.1}>
            <Text color="gray">전체</Text>
            <Text fontSize="$9">{totalPage}</Text>
            <Text color="gray">page</Text>
          </YStack>
        </ListItem>
      </Group.Item>
      <Group.Item>
        <ListItem bg="$blue2">
          <YStack width="$6" alignItems="center" gap={0.1}>
            <Text color="gray">하루</Text>
            <Text color="$pink9" fontSize="$9">
              {dailyPage}
            </Text>
            <Text color="gray">page</Text>
          </YStack>
        </ListItem>
      </Group.Item>
    </Group>
  );
}
