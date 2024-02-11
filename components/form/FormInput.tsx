import React from "react";
import { YStack, Text, Input } from "tamagui";

interface PropsType extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

export default function FormInput(props: PropsType) {
  const { label, ...rest } = props;
  return (
    // <label className="form-control w-full max-w-xs">
    //   <div className="label">
    //     <span className="label-text">{label}</span>
    //   </div>
    //   <input
    //     className="input input-bordered input-sm lg:input-md w-full max-w-xs"
    //     {...rest}
    //   />
    // </label>
    <YStack gap={3}>
      <Text>{label}</Text>
      <Input size="$4" />
    </YStack>
  );
}
