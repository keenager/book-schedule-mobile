import { useEffect, useReducer } from "react";
import { Text, View, Form, H1, Input } from "tamagui";
import { scheduleReducer } from "../../utils/reducer";
import { initialState } from "../../models/scheduleModels";
import { DataType } from "../../types/scheduleTypes";
import ScheduleForm from "../../components/form/ScheduleForm";
import FormInputList from "../../components/form/InputGroup";

export default function CreateScheduleScreen() {
  const [{ bookList, plan, scheduleList }, dispatch] = useReducer(
    scheduleReducer,
    initialState
  );
  const { title, totalPage, dailyPage } = plan;
  const isValidPlan = title.length > 0 && totalPage > 0 && dailyPage > 0;
  console.log("plan", plan);
  console.log("scheduleList", scheduleList);

  // useEffect(() => {
  //   const savedData = localStorage.getItem("bookSchedule");
  //   if (savedData) {
  //     const loadedData: DataType = JSON.parse(savedData);
  //     dispatch({ type: "loadBookList", bookList: Object.keys(loadedData) });
  //   } else {
  //     dispatch({ type: "loadBookList", bookList: [] });
  //   }
  // }, []);

  return (
    <View flex={1} alignItems="center">
      <H1 fontSize={20}>스케줄 입력 페이지</H1>

      <>
        {/* {bookList.length > 0 && (
          <BookList savedBooks={bookList} updateList={dispatch} />
        )} */}
        <ScheduleForm plan={plan} updateList={dispatch} />
        {/* {isValidPlan && (
          <>
            <PlanAndDone>
              <Plan totalPage={totalPage} dailyPage={dailyPage} />
              <TodayDone updateList={dispatch} />
            </PlanAndDone>
            <ScheduleDetail list={scheduleList} />
            <div className="flex justify-end">
              <button
                className="btn btn-sm lg:btn-md btn-primary"
                onClick={dispatch.bind(null, { type: "save", scheduleList })}
              >
                저장
              </button>
            </div>
          </>
        )} */}
      </>
    </View>
  );
}
