import React, { ChangeEvent, Dispatch, useReducer } from "react";
import { Dimensions } from "react-native";
import { ActionType, PlanType } from "../../types/scheduleTypes";
import FormInput from "./InputItem";
import RadioButton from "./RadioButton";
import { Form, Button, YStack, H4, XStack, RadioGroup } from "tamagui";
import RadioGroupItem from "./RadioGroupItem";
import FormInputList from "./InputGroup";
import InputGroup from "./InputGroup";
import { Link, Redirect } from "expo-router";

export default function ScheduleForm({
  plan,
  updateList,
}: {
  plan: PlanType;
  updateList: Dispatch<ActionType>;
}) {
  const [mode, toggleMode] = useReducer((prev: string) => {
    return prev === "byDate" ? "byPage" : "byDate";
  }, "byDate");

  // const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const myForm = document.getElementById("myForm")! as HTMLFormElement;
  //   const formData = new FormData(myForm);
  //   const formDataObj = Object.fromEntries(formData);

  //   updateList({ type: "create", formDataObj });
  // };

  const createHandler = () => {
    updateList({ type: "create", formDataObj: plan });
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
        <InputGroup plan={plan} updateList={updateList} mode={mode} />
        <Form.Trigger asChild>
          <Link href="/detail-screen" asChild>
            <Button width="$10" marginLeft="auto">
              만들기
            </Button>
          </Link>
        </Form.Trigger>
      </YStack>
    </Form>
  );
}
