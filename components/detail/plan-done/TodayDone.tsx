import { useState } from "react";
import { Button, Form, Input, Text, YStack } from "tamagui";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../context-provider/ScheduleProvider";
import Size from "../../../constants/Size";
import { useToast } from "react-native-toast-notifications";

export default function TodayDone() {
  const { scheduleList, dispatch } =
    useScheduleContext() as ScheduleContextType;
  const [pageDone, setPageDone] = useState("");
  const toast = useToast();

  const recalc = () => {
    if (scheduleList.length === 0) {
      return;
    }
    // page validation
    if (pageDone === "" || +pageDone < 0 || isNaN(+pageDone)) {
      toast.show("올바른 값을 입력하세요.", { type: "warning" });
      return;
    }
    dispatch({ type: "updateSchedule", pageDone: +pageDone });
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
          onSubmitEditing={recalc}
        />
        <Form.Trigger asChild>
          <Button size={Size.button} theme="active">
            적용
          </Button>
        </Form.Trigger>
      </YStack>
    </Form>
  );
}
