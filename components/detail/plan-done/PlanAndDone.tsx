import React from "react";
import { XStack } from "tamagui";

export default function PlanAndDone({
  children,
}: {
  children: React.ReactNode;
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <XStack marginVertical="$3" gap="$15">
      {childrenArray}
    </XStack>
  );
}
