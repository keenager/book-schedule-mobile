import React, { Dispatch } from "react";
import { KeyboardTypeOptions } from "react-native";
import { YStack, Text, Input } from "tamagui";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDatePicker } from "../../hooks/useDatePicker";
import { ActionType, PlanType } from "../../types/scheduleTypes";

type PropsType = {
  label: string;
  type: string;
  name: string;
  value: string | number;
  plan: PlanType;
  updateList: Dispatch<ActionType>;
};

export default function InputItem({
  label,
  type,
  name,
  value,
  plan,
  updateList,
}: PropsType) {
  const keyboardType: KeyboardTypeOptions =
    type === "number" ? "number-pad" : "default";

  const onChange = (newText: string) => {
    let newValue: string | number = newText;
    if (name === "totalPage" || name === "dailyPage") newValue = +newValue;
    const newPlan = { ...plan, [name]: newValue };
    // 'byPage' 모드일 때는 endDate가 undefined여야 제대로 계산됨(reducer.ts 참조)
    if (name === "dailyPage") newPlan.endDate = undefined;
    updateList({ type: "updatePlan", plan: newPlan });
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
