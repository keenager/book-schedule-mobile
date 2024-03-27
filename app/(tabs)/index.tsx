import { Image, Text, View } from "tamagui";

export default function IndexScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center" gap="$5">
      <View gap="$3">
        <Image source={require("../../assets/images/book-friend.jpg")} />
        <Text textAlign="right">신영복 선생님 글씨</Text>
      </View>
      <View gap="$3">
        <Text fontStyle="italic">"책 읽는 즐거움을 알아서 다행입니다."</Text>
        <Text textAlign="right">만든이</Text>
      </View>
    </View>
  );
}
