import { Dispatch } from "react";
import { YStack } from "tamagui";
import InputItem from "./InputItem";
import { ActionType, PlanType } from "../../types/scheduleTypes";

export default function InputGroup({
  plan,
  updateList,
  mode,
}: {
  plan: PlanType;
  updateList: Dispatch<ActionType>;
  mode: "byDate" | "byPage";
}) {
  return (
    <YStack gap={10}>
      <InputItem
        label="책 이름"
        type="text"
        name="title"
        value={plan.title}
        // onChange={changeHandler.bind(null, "title")}
        plan={plan}
        updateList={updateList}
      />
      <InputItem
        label="총 페이지"
        type="number"
        name="totalPage"
        value={plan.totalPage || ""}
        // onChange={changeHandler.bind(null, "totalPage")}
        plan={plan}
        updateList={updateList}
      />
      {mode === "byDate" ? (
        <InputItem
          label="언제까지"
          type="date"
          name="endDate"
          value={plan.endDate || ""}
          //   onChange={changeHandler.bind(null, "endDate")}
          plan={plan}
          updateList={updateList}
        />
      ) : (
        <InputItem
          label="하루 읽을 페이지"
          type="number"
          name="dailyPage"
          value={plan.dailyPage || ""}
          //   onChange={changeHandler.bind(null, "dailyPage")}
          plan={plan}
          updateList={updateList}
        />
      )}
    </YStack>
  );
}
