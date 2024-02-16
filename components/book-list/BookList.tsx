import React from "react";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ListItem, ScrollView, XGroup, YStack } from "tamagui";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../context-provider/ScheduleProvider";
import { DataType } from "../../types/scheduleTypes";
import { ConfirmDialog } from "./Dialog";

const idxWidth = "$5";
const titleWidth = "$10";
const delWidth = "$7";

export default function BookList() {
  const { bookList } = useScheduleContext() as ScheduleContextType;

  return (
    <YStack>
      {/* <XGroup
        size="$3"
        $gtSm={{ size: "$5" }}
        borderRadius={0}
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <TableCell width={idxWidth} content="" />
        <TableCell width={titleWidth} content="책 이름" />
        <TableCell width={delWidth} content="" />
      </XGroup> */}
      <ScrollView maxHeight={350}>
        {bookList.map((title, i) => (
          <TableRow key={i} title={title} idx={i} />
        ))}
      </ScrollView>
    </YStack>
  );
}

function TableRow({ title, idx }: { title: string; idx: number }) {
  const { dispatch } = useScheduleContext() as ScheduleContextType;

  const onLoad = async () => {
    const savedStr = (await AsyncStorage.getItem("bookSchedule"))!;
    const savedData: DataType = JSON.parse(savedStr);

    dispatch({ type: "loadScheduleList", title, data: savedData[title] });
    router.push("/detail-screen");
  };

  const onDelete = async () => {
    const prevData: DataType = JSON.parse(
      (await AsyncStorage.getItem("bookSchedule")) ?? "{}"
    );
    const { [title]: target, ...newData } = prevData;
    await AsyncStorage.setItem("bookSchedule", JSON.stringify(newData));
    dispatch({ type: "delete", bookList: Object.keys(newData) });
  };
  return (
    <XGroup
      // size="$3"
      // gap="$3"
      $gtSm={{ size: "$5" }}
      borderRadius={0}
      // borderTopWidth={1}
      // borderTopColor="$borderColor"
    >
      <TableCell width={idxWidth} content={idx + 1} />
      <Pressable onPress={onLoad}>
        <TableCell width={titleWidth} content={title} />
      </Pressable>

      <TableCell width={delWidth}>
        <ConfirmDialog
          title="삭제"
          description={`${title} 책을 삭제하시겠습니까?`}
          func={onDelete}
        />
      </TableCell>
    </XGroup>
  );
}

function TableCell({
  width,
  content,
  children,
}: {
  width?: string;
  content?: string | number;
  children?: React.ReactNode;
}) {
  return (
    <XGroup.Item>
      <ListItem width={width} textAlign="center">
        {content && content.toString()}
        {children}
      </ListItem>
    </XGroup.Item>
  );
}
