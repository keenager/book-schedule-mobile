import { Button, XStack } from "tamagui";
import useEventHandler from "../../hooks/useEventHandler";
import Size from "../../constants/Size";

export default function Buttons() {
  const { onReset, onSave } = useEventHandler();
  return (
    <XStack mt="$2" gap="$3">
      <Button size={Size.button} marginLeft="auto" onPress={onReset}>
        초기화
      </Button>
      <Button
        size={Size.button}
        theme="active"
        alignSelf="flex-end"
        onPress={onSave}
      >
        저장
      </Button>
    </XStack>
  );
}
