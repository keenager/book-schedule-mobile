import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Text, View } from "tamagui";
import { DataType } from "../../types/scheduleTypes";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../components/context-provider/ScheduleProvider";
import BookList from "../../components/book-list/BookList";
import { Book } from "@tamagui/lucide-icons";

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
      {bookList.length > 0 ? (
        <BookList />
      ) : (
        <>
          <Text>저장된 데이터가 없습니다.</Text>
          <Text>
            일정 만들기(
            <Book size="$1" />
            )로 가셔서 새 일정을 만들고 저장하세요.
          </Text>
        </>
      )}
    </View>
  );
}
