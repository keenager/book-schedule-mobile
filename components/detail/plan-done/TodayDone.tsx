import { useState } from "react";
import { Button, Form, Input, Text, YStack } from "tamagui";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../context-provider/ScheduleProvider";
import Size from "../../../constants/Size";

export default function TodayDone() {
  const { dispatch } = useScheduleContext() as ScheduleContextType;
  const [pageDone, setPageDone] = useState("");

  const recalc = () => {
    // page validation
    if (+pageDone < 0) {
      alert("올바른 값을 입력하세요.");
      return;
    }
    dispatch({ type: "update", pageDone: +pageDone });
    setPageDone("");
  };

  return (
    <Form onSubmit={recalc}>
      <YStack gap="$2">
        <Text fontSize="$2">오늘 읽은 페이지</Text>
        <Input
          keyboardType="number-pad"
          value={pageDone}
          onChangeText={(newText) => setPageDone(newText)}
        />
        <Form.Trigger asChild>
          <Button size={Size.button}>적용</Button>
        </Form.Trigger>
      </YStack>
    </Form>
  );
}
