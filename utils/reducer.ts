import { useToast } from "react-native-toast-notifications";
import { blankPlan, initialState } from "../models/scheduleModels";
import { ActionType } from "../types/scheduleTypes";
import { toLocaleDate } from "./date";
import {
  createSchedule,
  fromObjListToClassList,
  updateSchedule,
} from "./scheduleUtils";
import Colors from "../constants/Colors";

export const scheduleReducer = (
  state: typeof initialState,
  action: ActionType
) => {
  const toast = useToast();
  switch (action.type) {
    case "create":
      const newPlan = { ...state.plan };
      const formData = action.formDataObj;

      newPlan.title = formData.title.toString();
      newPlan.startDate = toLocaleDate(new Date());
      newPlan.endDate = formData.endDate?.toString();

      const start = new Date(newPlan.startDate).getTime();
      const end = new Date(newPlan.endDate).getTime();
      if (start > end) {
        alert("오늘보다 앞선 날을 선택할 수 없습니다.");
        return state;
      }

      const period = (end - start) / 1000 / 60 / 60 / 24 + 1;
      newPlan.totalPage = Number(formData.totalPage);
      newPlan.dailyPage = newPlan.endDate
        ? Math.ceil(newPlan.totalPage / period)
        : Number(formData.dailyPage);

      const newSchedule = createSchedule(newPlan);
      return { ...state, plan: newPlan, scheduleList: newSchedule };

    case "updateBookList":
      return { ...state, bookList: action.bookList };

    case "loadBookList":
      return { ...state, bookList: action.bookList };

    case "loadScheduleList":
      const { totalPage, dailyPage, scheduleList } = action.data;
      const loadedPlan = {
        title: action.title,
        totalPage: +totalPage,
        dailyPage: +dailyPage,
        startDate: scheduleList[0].date,
      };
      const loadedScheduleList = fromObjListToClassList(scheduleList);

      return { ...state, plan: loadedPlan, scheduleList: loadedScheduleList };

    case "updatePlan":
      return { ...state, plan: action.plan };

    case "updateSchedule":
      const todayStr = toLocaleDate();

      const lastDate = state.scheduleList[state.scheduleList.length - 1].date;
      if (new Date(todayStr) > new Date(lastDate)) {
        toast.show("이미 끝난 스케줄입니다.", { type: "warning" });
        return state;
      }
      const completeDate = state.scheduleList.findLast(
        (schedule) => schedule.pageDone === state.plan.totalPage
      )?.date;
      if (completeDate && new Date(todayStr) > new Date(completeDate)) {
        toast.show("이미 완료한 스케줄입니다.", {
          normalColor: Colors.info,
          textStyle: { color: "white" },
        });
        return state;
      }

      const pageDone =
        action.pageDone > state.plan.totalPage
          ? state.plan.totalPage
          : action.pageDone;
      const idx = state.scheduleList.findIndex(
        (schedule) => schedule.date === todayStr
      );
      const before = state.scheduleList[idx - 1];
      if (before && pageDone < before.pageDone!) {
        toast.show("전날보다 더 앞 페이지를 입력할 수 없습니다.", {
          type: "warning",
        });
        return state;
      }

      const updatedSchedule = updateSchedule(
        state.plan,
        state.scheduleList,
        todayStr,
        idx,
        pageDone
      );

      return { ...state, scheduleList: updatedSchedule };

    case "reset":
      return { ...state, plan: blankPlan, scheduleList: [] };

    case "delete":
      return {
        bookList: action.bookList,
        plan: { ...blankPlan },
        scheduleList: [],
      };

    default:
      throw new Error("Invalid action type...");
  }
};
