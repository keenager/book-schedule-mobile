import { Tabs } from "expo-router";
import { Book, Calendar, List } from "@tamagui/lucide-icons";
import {
  ScheduleContextType,
  useScheduleContext,
} from "../../components/context-provider/ScheduleProvider";
import { View } from "tamagui";

export default function TabLayout() {
  const { plan } = useScheduleContext() as ScheduleContextType;
  const title = plan.title ? `(${plan.title})` : "";

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="book-list-screen"
        options={{
          headerTitle: "책 목록",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <List color={focused ? "$blue10Light" : "$gray10Light"} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-screen"
        options={{
          href: "/create-screen",
          headerTitle: "일정 만들기",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Book color={focused ? "$blue10Light" : "$gray10Light"} />
          ),
        }}
      />
      <Tabs.Screen
        name="detail-screen"
        options={{
          headerTitle: `세부 일정${title}`,
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Calendar color={focused ? "$blue10Light" : "$gray10Light"} />
          ),
        }}
      />
    </Tabs>
  );
}
