import { View, H1 } from "tamagui";
import ScheduleForm from "../../components/form/ScheduleForm";
import PlanAndDone from "../../components/plan-done/PlanAndDone";
import Plan from "../../components/plan-done/Plan";
import TodayDone from "../../components/plan-done/TodayDone";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../components/context-provider/ScheduleProvider";

export default function CreateScheduleScreen() {
  const { bookList, plan, scheduleList, dispatch } =
    useScheduleContext() as ScheduleContextType;

  const { title, totalPage, dailyPage } = plan;
  const isValidPlan = title.length > 0 && totalPage > 0 && dailyPage > 0;
  console.log("isValidPlan", isValidPlan);
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
    <View alignItems="center">
      <H1 fontSize={20}>스케줄 입력 페이지</H1>

      <>
        {/* {bookList.length > 0 && (
          <BookList savedBooks={bookList} updateList={dispatch} />
        )} */}
        <ScheduleForm plan={plan} updateList={dispatch} />
        {isValidPlan && (
          <>
            <PlanAndDone>
              <Plan />
              <TodayDone />
            </PlanAndDone>
            {/* <ScheduleDetail list={scheduleList} />
            <div className="flex justify-end">
              <button
                className="btn btn-sm lg:btn-md btn-primary"
                onClick={dispatch.bind(null, { type: "save", scheduleList })}
              >
                저장
              </button>
            </div> */}
          </>
        )}
      </>
    </View>
  );
}
