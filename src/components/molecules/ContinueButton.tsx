import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { stayPixel } from "@/fonts/font";

const ContinueButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div whileTap={{ scale: 0.8 }}>
      <Flex justifyContent={"center"} onClick={onClick}>
        <Text
          backgroundColor={"yellow.400"}
          paddingY={2}
          paddingX={4}
          width={"fit-content"}
          borderRadius={5}
          fontSize={20}
          className={stayPixel.className}
          cursor={"pointer"}
        >
          Continue
        </Text>
      </Flex>
    </motion.div>
  );
};

export default ContinueButton;
