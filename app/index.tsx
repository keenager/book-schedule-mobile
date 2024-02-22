import { Redirect } from "expo-router";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../components/context-provider/ScheduleProvider";

export default function Entry() {
  const { bookList } = useScheduleContext() as ScheduleContextType;
  return bookList.length > 0 ? (
    <Redirect href="/book-list-screen" />
  ) : (
    <Redirect href="/(tabs)/create-screen" />
  );
}
