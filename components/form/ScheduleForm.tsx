import React, { useReducer } from "react";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import { Form, Button, YStack, XStack, RadioGroup } from "tamagui";
import RadioGroupItem from "./RadioGroupItem";
import InputGroup from "./InputGroup";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../context-provider/ScheduleProvider";
import { blankPlan } from "../../models/scheduleModels";

export default function ScheduleForm() {
  const { plan, dispatch } = useScheduleContext() as ScheduleContextType;

  // 토글할 때마다 날짜 또는 페이지 중 나머지 값을 디폴트로 바꾸기(isValidPlan 관련)
  const [mode, toggleMode] = useReducer((prev: string) => {
    if (prev === "byDate") {
      dispatch({ type: "updatePlan", plan: { ...plan, endDate: undefined } });
      return "byPage";
    } else {
      dispatch({ type: "updatePlan", plan: { ...plan, dailyPage: 0 } });
      return "byDate";
    }
  }, "byDate");

  const { title, totalPage, dailyPage, endDate } = plan;
  const isValidPlan =
    title.length > 0 &&
    totalPage > 0 &&
    (/\d{4}-\d{2}-\d{2}/.test(endDate || "") || dailyPage > 0);

  const createHandler = () => {
    if (isValidPlan) {
      dispatch({ type: "create", formDataObj: plan });
      router.push("/detail-screen");
    } else {
      alert("유효한 제목, 날짜 또는 페이지를 입력하세요!");
    }
  };

  const onReset = () => {
    dispatch({ type: "updatePlan", plan: blankPlan });
  };

  return (
    <Form onSubmit={createHandler} width={Dimensions.get("window").width * 0.8}>
      <YStack gap="$3">
        <RadioGroup defaultValue={mode} onValueChange={(_) => toggleMode()}>
          <XStack
            maxWidth={Dimensions.get("window").width * 0.8}
            alignSelf="center"
          >
            <RadioGroupItem label="날짜 기준" size="$3" value="byDate" />
            <RadioGroupItem label="페이지 기준" size="$3" value="byPage" />
          </XStack>
        </RadioGroup>
        <InputGroup mode={mode} />
        <XStack mt="$2" gap="$3">
          <Button size="$3" marginLeft="auto" onPress={onReset}>
            초기화
          </Button>
          <Form.Trigger asChild>
            <Button size="$3">만들기</Button>
          </Form.Trigger>
        </XStack>
      </YStack>
    </Form>
  );
}
