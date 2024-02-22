import React from "react";
import { Dimensions } from "react-native";
import { Form, Button, YStack, XStack, RadioGroup } from "tamagui";
import RadioGroupItem from "./RadioGroupItem";
import InputGroup from "./InputGroup";
import useEventHandler from "../../hooks/useEventHandler";
import useMode from "../../hooks/useMode";
import Size from "../../constants/Size";

export default function ScheduleForm() {
  const { onCreate, onReset } = useEventHandler();
  const [mode, setMode] = useMode();

  return (
    <Form onSubmit={onCreate} width={Dimensions.get("window").width * 0.8}>
      <YStack gap="$3">
        <RadioGroup defaultValue={mode} onValueChange={(_) => setMode()}>
          <XStack alignSelf="center">
            <RadioGroupItem label="날짜 기준" size="$3" value="byDate" />
            <RadioGroupItem label="페이지 기준" size="$3" value="byPage" />
          </XStack>
        </RadioGroup>
        <InputGroup mode={mode} />
        <XStack mt="$2" gap="$3">
          <Button size={Size.button} marginLeft="auto" onPress={onReset}>
            초기화
          </Button>
          <Form.Trigger asChild>
            <Button size={Size.button} theme="active">
              만들기
            </Button>
          </Form.Trigger>
        </XStack>
      </YStack>
    </Form>
  );
}
