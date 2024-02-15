import { View } from "tamagui";
import ScheduleForm from "../../components/form/ScheduleForm";

export default function CreateScheduleScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ScheduleForm />
    </View>
  );
}
