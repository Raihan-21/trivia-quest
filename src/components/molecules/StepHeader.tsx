import { stayPixel } from "@/fonts/font";
import { Text } from "@chakra-ui/react";
import React from "react";

const StepHeader = ({ text }: { text: string }) => {
  return (
    <Text
      fontSize={25}
      color={"white"}
      className={stayPixel.className}
      data-testid="step-header"
    >
      {text}
    </Text>
  );
};

export default StepHeader;
