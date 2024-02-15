import { Text, View } from "tamagui";

export default function TabOneScreen() {
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
      <Text fontSize={20}>책 목록</Text>
      {/* {bookList.length > 0 && (
          <BookList savedBooks={bookList} updateList={dispatch} />
        )} */}
    </View>
  );
}
