import { Label, RadioGroup, SizeTokens, XStack } from "tamagui";

type PropsType = {
  size: SizeTokens;
  value: string;
  label: string;
};

export default function RadioGroupItem({ size, value, label }: PropsType) {
  const id = `radiogroup-${value}`;
  return (
    <XStack
      flex={1}
      width={300}
      justifyContent="center"
      alignItems="center"
      gap="$3"
    >
      <Label size={size} htmlFor={id}>
        {label}
      </Label>

      <RadioGroup.Item value={value} id={id} size={size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>
    </XStack>
  );
}
