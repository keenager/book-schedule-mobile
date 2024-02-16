import { YStack } from "tamagui";
import InputItem from "./InputItem";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../context-provider/ScheduleProvider";

export default function InputGroup({
  mode,
}: {
  mode: "byDate" | "byPage" | string;
}) {
  const { plan } = useScheduleContext() as ScheduleContextType;
  return (
    <YStack gap={10}>
      <InputItem
        label="책 이름"
        type="text"
        name="title"
        value={plan.title}
        // onChange={changeHandler.bind(null, "title")}
      />
      <InputItem
        label="총 페이지"
        type="number"
        name="totalPage"
        value={plan.totalPage || ""}
        // onChange={changeHandler.bind(null, "totalPage")}
      />
      {mode === "byDate" ? (
        <InputItem
          label="언제까지"
          type="date"
          name="endDate"
          value={plan.endDate || ""}
          //   onChange={changeHandler.bind(null, "endDate")}
        />
      ) : (
        <InputItem
          label="하루 읽을 페이지"
          type="number"
          name="dailyPage"
          value={plan.dailyPage || ""}
          //   onChange={changeHandler.bind(null, "dailyPage")}
        />
      )}
    </YStack>
  );
}
