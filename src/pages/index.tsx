import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Flex, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { stayPixel } from "@/fonts/font";
import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import useFetch from "@/hooks/useFetch";
import StepHeader from "@/components/molecules/StepHeader";

export default function Home() {
  const [steps, setSteps] = useState([
    {
      value: "step-1",

      active: true,
    },
    {
      value: "step-2",

      active: false,
    },
    {
      value: "step-3",

      active: false,
    },
    {
      value: "step-4",

      active: false,
    },
  ]);
  const [onClickedPlay, setOnClickedPlay] = useState(false);
  const [onPlay, setOnPlay] = useState(false);
  const [withCategory, setWithCategory] = useState(false);
  const [withoutCategory, setWithoutCategory] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [difficulties, setDifficulties] = useState([
    {
      label: "Easy",
      value: "easy",
    },
    {
      label: "Medium",
      value: "medium",
    },
    {
      label: "Hard",
      value: "hard",
    },
  ]);

  const [selectedDifficulty, setselectedDifficulty] = useState("");
  const [fetchTags, tagsData, tagLoading] = useFetch(
    "https://the-trivia-api.com/v2/tags"
  );
  const goToStep = useCallback(
    (name: string) => {
      setSteps(
        steps.map((step) => {
          if (step.value === name) {
            return { ...step, active: true };
          }
          return { ...step, active: false };
        })
      );
    },
    [steps]
  );
  useEffect(() => {
    fetchTags();
    if (tagsData) setTags(tagsData.slice(0, 19));
  }, [steps[2].active]);
  useEffect(() => {
    if (tagsData)
      setTags(
        tagsData.filter((tag: string) => tag.includes(tagInput)).slice(0, 19)
      );
  }, [tagInput]);

  return (
    <Box minHeight={"100vh"} width={"100vw"} backgroundColor={"purple.800"}>
      <AnimatePresence>
        {steps[0].active && (
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
              <motion.div whileTap={{ scale: 0.8 }}>
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
                  _hover={{ boxShadow: "none" }}
                  onClick={() => {
                    setOnClickedPlay(true);
                    setTimeout(() => {
                      setOnClickedPlay(false);
                    }, 100);
                    setSteps(
                      steps.map((step) => {
                        if (step.value === "step-1")
                          return { ...step, active: false };
                        if (step.value === "step-2")
                          return { ...step, active: true };
                        return { ...step };
                      })
                    );
                  }}
                >
                  <Text fontSize={"2xl"}>Play now</Text>
                </Box>
              </motion.div>
            </motion.div>
          </Flex>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {steps[1].active && (
          <Flex flexDirection={"column"} alignItems={"center"} paddingTop={40}>
            <motion.div exit={{ scale: 0 }} transition={{ duration: 0.5 }}>
              <motion.div
                initial={{ scale: 0, originX: 0.5, originY: 0.5 }}
                animate={{ scale: 1, originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <StepHeader text="Do you want to choose categories for your quest?" />
                {/* <Text color={"white"} fontSize={20}>
                  Do you want to choose categories for your quest?
                </Text> */}
              </motion.div>
            </motion.div>
            <motion.div
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Flex justifyContent={"center"} columnGap={5} marginTop={10}>
                <motion.div
                  initial={{ scale: 0, originX: 0.5, originY: 0.5 }}
                  animate={{ scale: 1, originX: 0.5, originY: 0.5 }}
                  transition={{ duration: 0.2, delay: 1.5 }}
                >
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <Box
                      backgroundColor={"green.300"}
                      color={"white"}
                      paddingY={2}
                      paddingX={10}
                      borderRadius={5}
                      fontSize={"large"}
                      cursor={"pointer"}
                      className={stayPixel.className}
                      onClick={() => {
                        setWithCategory(true);
                        goToStep("step-3");
                      }}
                    >
                      Yes
                    </Box>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, originX: 0.5, originY: 0.5 }}
                  animate={{ scale: 1, originX: 0.5, originY: 0.5 }}
                  transition={{ duration: 0.2, delay: 1.8 }}
                >
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <Box
                      backgroundColor={"red.500"}
                      color={"white"}
                      paddingY={2}
                      paddingX={10}
                      borderRadius={5}
                      fontSize={"large"}
                      cursor={"pointer"}
                      className={stayPixel.className}
                      onClick={() => {
                        setWithoutCategory(false);
                        goToStep("step-3");
                      }}
                    >
                      No
                    </Box>
                  </motion.div>
                </motion.div>
              </Flex>
            </motion.div>
            {/* </Box> */}
            {/* </motion.div> */}
          </Flex>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {steps[2].active && (
          <Flex flexDirection={"column"} alignItems={"center"} paddingTop={40}>
            <motion.div
              initial={{ scale: 0, originX: 0.5, originY: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <StepHeader text="Select categories :" />
              <Input
                backgroundColor={"white"}
                marginBottom={5}
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                }}
              />
              <Flex columnGap={5}>
                {!!selectedTags.length &&
                  selectedTags.map((tag: string) => (
                    <Box
                      borderRadius={10}
                      paddingY={1}
                      paddingX={4}
                      backgroundColor={"green.300"}
                      cursor={"pointer"}
                      onClick={() => {
                        setSelectedTags(
                          selectedTags.filter(
                            (selectedTag) => selectedTag !== tag
                          )
                        );
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
              </Flex>
              <Flex
                flexWrap={"wrap"}
                maxWidth={"500px"}
                columnGap={5}
                rowGap={2}
                marginTop={5}
              >
                {!tagLoading &&
                  tags.map((tag: string) => (
                    <Box
                      borderRadius={10}
                      paddingY={1}
                      paddingX={4}
                      backgroundColor={"white"}
                      cursor={"pointer"}
                      onClick={() => {
                        setSelectedTags([...selectedTags, tag]);
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
              </Flex>
              {!tagInput && (
                <Text fontSize={20} color={"white"}>
                  ..and More
                </Text>
              )}
              {!!selectedTags.length && (
                <Flex justifyContent={"center"}>
                  <Text
                    backgroundColor={"yellow.400"}
                    paddingY={2}
                    paddingX={4}
                    width={"fit-content"}
                    borderRadius={5}
                    cursor={"pointer"}
                    className={stayPixel.className}
                    onClick={() => {
                      goToStep("step-4");
                    }}
                  >
                    Continue
                  </Text>
                </Flex>
              )}
            </motion.div>
          </Flex>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {steps[3].active && (
          <Flex flexDirection={"column"} alignItems={"center"} paddingTop={40}>
            <motion.div
              initial={{ scale: 0, originX: 0.5, originY: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Text fontSize={20} color={"white"}>
                Select difficulty:
              </Text>
              <Flex flexDirection={"column"} alignItems={"center"} rowGap={2}>
                {difficulties.map((difficulty) => (
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <Text
                      backgroundColor={
                        selectedDifficulty === difficulty.value
                          ? "green.300"
                          : "white"
                      }
                      paddingY={2}
                      paddingX={4}
                      width={"fit-content"}
                      borderRadius={5}
                      cursor={"pointer"}
                      onClick={() => {
                        setselectedDifficulty(difficulty.value);
                      }}
                    >
                      {difficulty.label}
                    </Text>
                  </motion.div>
                ))}

                {/* <Text
                  backgroundColor={"white"}
                  paddingY={2}
                  paddingX={4}
                  width={"fit-content"}
                  borderRadius={5}
                >
                  Medium
                </Text>
                <Text
                  backgroundColor={"white"}
                  paddingY={2}
                  paddingX={4}
                  width={"fit-content"}
                  borderRadius={5}
                >
                  Hard
                </Text> */}
              </Flex>
              {!!selectedTags.length && (
                <Flex justifyContent={"center"}>
                  <Text
                    backgroundColor={"yellow.400"}
                    paddingY={2}
                    paddingX={4}
                    width={"fit-content"}
                    borderRadius={5}
                  >
                    Continue
                  </Text>
                </Flex>
              )}
            </motion.div>
          </Flex>
        )}
      </AnimatePresence>
    </Box>
  );
}
