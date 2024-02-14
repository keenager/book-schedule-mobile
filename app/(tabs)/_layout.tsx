import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
      }}
    >
      <Tabs.Screen
        name="book-list-screen"
        options={{
          title: "책 목록",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <Text>책 목록</Text>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                <Text>Hello!</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="create-screen"
        options={{
          href: "/create-screen",
          title: "일정 만들기",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <Text>일정 만들기</Text>,
        }}
      />
      <Tabs.Screen
        name="detail-screen"
        options={{
          title: "세부 일정",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <Text>세부 일정</Text>,
        }}
      />
    </Tabs>
  );
}
