import React from "react";
import { KeyboardTypeOptions } from "react-native";
import { YStack, Text, Input } from "tamagui";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDatePicker } from "../../hooks/useDatePicker";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../context-provider/ScheduleProvider";

type PropsType = {
  label: string;
  type: string;
  name: string;
  value: string | number;
};

export default function InputItem({ label, type, name, value }: PropsType) {
  const { plan, dispatch } = useScheduleContext() as ScheduleContextType;

  const keyboardType: KeyboardTypeOptions =
    type === "number" ? "number-pad" : "default";

  const onChange = (newText: string) => {
    let newValue: string | number = newText;
    if (name === "totalPage" || name === "dailyPage") newValue = +newValue;
    const newPlan = { ...plan, [name]: newValue };
    // 'byPage' 모드일 때는 endDate가 undefined여야 제대로 계산됨(reducer.ts 참조)
    if (name === "dailyPage") newPlan.endDate = undefined;
    console.log("plan in input", plan);
    console.log("newPlan", newPlan);
    dispatch({ type: "updatePlan", plan: newPlan });
  };

  const { show, setShow, date, onDateChange } = useDatePicker(onChange);

  return (
    <YStack gap={3}>
      <Text>{label}</Text>
      <Input
        size="$4"
        keyboardType={keyboardType}
        value={value.toString()}
        onPressOut={type === "date" ? () => setShow(true) : undefined}
        onChangeText={(newText) => onChange(newText)}
      />
      {show && (
        <DateTimePicker mode="date" value={date} onChange={onDateChange} />
      )}
    </YStack>
  );
}
