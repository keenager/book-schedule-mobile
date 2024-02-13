import { Dispatch, FormEvent, useState } from "react";
import { ActionType } from "../../types/scheduleTypes";
import { Button, Form, Input, Text, YStack } from "tamagui";

export default function TodayDone({
  updateList,
}: {
  updateList: Dispatch<ActionType>;
}) {
  const [pageDone, setPageDone] = useState("");
  console.log("pageDone", pageDone);

  const recalc = () => {
    // page validation
    if (+pageDone < 0) {
      alert("올바른 값을 입력하세요.");
      return;
    }
    updateList({ type: "update", pageDone: +pageDone });
  };

  return (
    <Form onSubmit={recalc}>
      <YStack gap="$2">
        <Text>오늘</Text>
        <Input
          keyboardType="number-pad"
          value={pageDone}
          onChangeText={(newText) => setPageDone(newText)}
        />
        <Form.Trigger asChild>
          <Button>적용</Button>
        </Form.Trigger>
      </YStack>
    </Form>
  );
}
