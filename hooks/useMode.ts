import { useReducer } from "react";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../components/context-provider/ScheduleProvider";

export default function useMode() {
  const { plan, dispatch } = useScheduleContext() as ScheduleContextType;

  // 토글할 때마다 날짜 또는 페이지 중 나머지 값을 디폴트로 바꾸기(isValidPlan 관련)
  return useReducer((prev: string) => {
    if (prev === "byDate") {
      dispatch({ type: "updatePlan", plan: { ...plan, endDate: undefined } });
      return "byPage";
    } else {
      dispatch({ type: "updatePlan", plan: { ...plan, dailyPage: 0 } });
      return "byDate";
    }
  }, "byDate");
}
