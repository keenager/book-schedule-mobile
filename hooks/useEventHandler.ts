import { router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../components/context-provider/ScheduleProvider";
import { DataType } from "../types/scheduleTypes";
import { getErrorMessage } from "../utils/error";

export default function useEventHandler() {
  const { plan, scheduleList, dispatch } =
    useScheduleContext() as ScheduleContextType;
  const toast = useToast();

  const { title, totalPage, dailyPage, endDate } = plan;
  const isValidPlan =
    title.length > 0 &&
    totalPage > 0 &&
    (/\d{4}-\d{2}-\d{2}/.test(endDate || "") || dailyPage > 0);

  const onCreate = () => {
    if (isValidPlan) {
      dispatch({ type: "create", formDataObj: plan });
      router.push("/detail-screen");
    } else {
      toast.show("유효한 제목, 날짜 또는 페이지를 입력하세요!", {
        type: "warning",
      });
    }
  };

  const onSave = async () => {
    if (scheduleList.length === 0) return;

    try {
      const prev = JSON.parse(
        (await AsyncStorage.getItem("bookSchedule")) ?? "{}"
      );
      const dataToSave: DataType = {
        ...prev,
        [plan.title]: {
          totalPage: plan.totalPage,
          dailyPage: plan.dailyPage,
          scheduleList: scheduleList.map((schedule) => schedule.toObj()),
        },
      };
      await AsyncStorage.setItem("bookSchedule", JSON.stringify(dataToSave));

      dispatch({ type: "updateBookList", bookList: Object.keys(dataToSave) });

      toast.show("저장되었습니다!", {
        type: "success",
      });
    } catch (e) {
      toast.show(getErrorMessage(e), {
        type: "warning",
      });
    }
  };

  const onReset = () => {
    dispatch({ type: "reset" });
  };

  return { onCreate, onSave, onReset };
}
