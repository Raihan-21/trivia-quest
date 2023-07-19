import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Flex, Text } from "@chakra-ui/react";
import { stayPixel } from "@/fonts/font";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [onClickedPlay, setOnClickedPlay] = useState(false);
  const [onPlay, setOnPlay] = useState(false);
  useEffect(() => {}, [onPlay]);

  return (
    <Box minHeight={"100vh"} width={"100vw"} backgroundColor={"purple.800"}>
      <AnimatePresence>
        {!onPlay && (
          <Flex flexDirection={"column"} alignItems={"center"}>
            <motion.div
              exit={{ scale: 0, originX: 0.5, originY: "50%" }}
              transition={{ duration: 0.6 }}
            >
              <Text
                fontSize={"6xl"}
                className={stayPixel.className}
                textAlign={"center"}
                color={"white"}
                paddingTop={20}
              >
                Trivia Quest
              </Text>
            </motion.div>
            <motion.div
              exit={{ scale: 0, originX: 0.5, originY: "50%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                className={stayPixel.className}
                backgroundColor={"white"}
                width={"fit-content"}
                paddingY={2}
                paddingX={4}
                borderRadius={10}
                marginTop={50}
                cursor={"pointer"}
                boxShadow={"3px 3px 3px 3px black"}
                transform={onClickedPlay ? "scale(0.8)" : "none"}
                _hover={{ boxShadow: "none" }}
                transition={"all 100ms ease-out"}
                onClick={() => {
                  setOnClickedPlay(true);
                  setTimeout(() => {
                    setOnClickedPlay(false);
                  }, 100);
                  setOnPlay(true);
                }}
              >
                <Text fontSize={"2xl"}>Play now</Text>
              </Box>
            </motion.div>
          </Flex>
        )}
      </AnimatePresence>
    </Box>
  );
}
