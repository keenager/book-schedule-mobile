import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Text, View } from "tamagui";
import { DataType } from "../../types/scheduleTypes";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../components/context-provider/ScheduleProvider";
import BookList from "../../components/book-list/BookList";

export default function TabOneScreen() {
  const { bookList, dispatch } = useScheduleContext() as ScheduleContextType;

  useEffect(() => {
    (async function () {
      const savedData = await AsyncStorage.getItem("bookSchedule");
      if (savedData) {
        const loadedData: DataType = JSON.parse(savedData);
        dispatch({ type: "loadBookList", bookList: Object.keys(loadedData) });
      } else {
        dispatch({ type: "loadBookList", bookList: [] });
      }
    })();
  }, []);

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      {bookList.length > 0 && <BookList />}
    </View>
  );
}
