import { ChangeEvent, Dispatch, useReducer } from "react";
import { Dimensions } from "react-native";
import { ActionType, PlanType } from "../../types/scheduleTypes";
import FormInput from "./FormInput";
import RadioButton from "./RadioButton";
import { Form, Button, YStack, H4 } from "tamagui";

export default function ScheduleForm({
  plan,
  updateList,
}: {
  plan: PlanType;
  updateList: Dispatch<ActionType>;
}) {
  const [dateMode, toggleMode] = useReducer((prev: boolean) => {
    return !prev;
  }, true);

  // const createHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const myForm = document.getElementById("myForm")! as HTMLFormElement;
  //   const formData = new FormData(myForm);
  //   const formDataObj = Object.fromEntries(formData);

  //   updateList({ type: "create", formDataObj });
  // };

  const changeHandler = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.currentTarget.value;
    if (name === "totalPage" || name === "dailyPage") value = +value;
    updateList({ type: "updatePlan", plan: { ...plan, [name]: value } });
  };

  return (
    <Form
      // onSubmit={createHandler}
      onSubmit={() => {}}
      width={Dimensions.get("window").width * 0.8}
    >
      {/* <div className="flex gap-5">
        <RadioButton label="날짜 기준" checked={dateMode} toggle={toggleMode} />
        <RadioButton
          label="페이지 기준"
          checked={!dateMode}
          toggle={toggleMode}
        />
      </div> */}
      <YStack gap={10}>
        <FormInput
          label="책 이름"
          type="text"
          name="title"
          value={plan.title}
          onChange={changeHandler.bind(null, "title")}
        />
        <FormInput
          label="총 페이지"
          type="number"
          name="totalPage"
          value={plan.totalPage || ""}
          onChange={changeHandler.bind(null, "totalPage")}
        />
        {dateMode ? (
          <FormInput
            label="언제까지"
            type="date"
            name="endDate"
            value={plan.endDate || ""}
            onChange={changeHandler.bind(null, "endDate")}
          />
        ) : (
          <FormInput
            label="하루 읽을 페이지"
            type="number"
            name="dailyPage"
            value={plan.dailyPage || ""}
            onChange={changeHandler.bind(null, "dailyPage")}
          />
        )}
      </YStack>
      <Form.Trigger marginTop={15}>
        <Button width="$10" marginLeft="auto" backgroundColor="$background">
          만들기
        </Button>
      </Form.Trigger>
    </Form>
  );
}
