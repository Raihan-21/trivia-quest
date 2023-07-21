import {
  Box,
  Collapse,
  Flex,
  Grid,
  GridItem,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { stayPixel } from "@/fonts/font";
import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import useFetch from "@/hooks/useFetch";
import StepHeader from "@/components/molecules/StepHeader";
import ContinueButton from "@/components/molecules/ContinueButton";
import { useRouter } from "next/router";
import CategoryDropdown from "@/components/organisms/CategoryDropdown";

import { RxCross2 } from "react-icons/rx";
import { queryGenerator } from "@/helpers/helper";

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

  const { isOpen, onToggle } = useDisclosure();
  const [selectedDifficulty, setselectedDifficulty] = useState("");
  const [score, setScore] = useState(0);
  const [fetchCategories, categoriesData, categoriesLoading] = useFetch(
    "https://the-trivia-api.com/v2/categories"
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
    fetchCategories();
    // if (categoriesData) setTags(categoriesData.slice(0, 19));
  }, [steps[2].active]);
  useEffect(() => {
    setScore(Number(localStorage.getItem("high-score")));
  }, []);
  const router = useRouter();
  return (
    <Box
      minHeight={"100vh"}
      // width={"100vw"}
      backgroundColor={"purple.800"}
      paddingBottom={10}
      paddingX={10}
    >
      <AnimatePresence>
        {steps[0].active && (
          <Flex flexDirection={"column"} alignItems={"center"}>
            {!!score && (
              <Box position={"absolute"} right={10} top={10}>
                <Text color={"yellow.300"} fontSize={30} fontWeight={"bold"}>
                  Total Score: {score}
                </Text>
              </Box>
            )}
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
                        goToStep("step-4");
                      }}
                    >
                      No
                    </Box>
                  </motion.div>
                </motion.div>
              </Flex>
            </motion.div>
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
              <Flex
                columnGap={5}
                rowGap={3}
                marginBottom={5}
                maxWidth={"500px"}
                flexWrap={"wrap"}
              >
                {!!selectedTags.length &&
                  selectedTags.map((tag: string, i) => (
                    <Flex
                      borderRadius={10}
                      paddingY={1}
                      paddingX={4}
                      backgroundColor={"green.300"}
                      cursor={"pointer"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      columnGap={2}
                      className={stayPixel.className}
                      onClick={() => {
                        setSelectedTags(
                          selectedTags.filter(
                            (selectedTag) => selectedTag !== tag
                          )
                        );
                      }}
                      key={i}
                    >
                      {tag.replaceAll("_", " ")} <RxCross2 />
                    </Flex>
                  ))}
              </Flex>
              <Flex
                flexWrap={"wrap"}
                maxWidth={"500px"}
                columnGap={5}
                rowGap={3}
              >
                {!categoriesLoading &&
                  Object.keys(categoriesData).map((tag: string, i: number) => (
                    <CategoryDropdown
                      group={categoriesData}
                      groupName={tag}
                      onCategoryClick={(category) => {
                        setSelectedTags([...selectedTags, category]);
                      }}
                      key={i}
                    />
                  ))}
              </Flex>
              {!!selectedTags.length && (
                <ContinueButton
                  onClick={() => {
                    goToStep("step-4");
                  }}
                />
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
              <StepHeader text="Select Difficulty :" />
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                rowGap={3}
                marginTop={5}
                marginBottom={5}
              >
                {difficulties.map((difficulty, i) => (
                  <motion.div whileTap={{ scale: 0.8 }} key={i}>
                    <Text
                      backgroundColor={
                        selectedDifficulty === difficulty.value
                          ? "green.300"
                          : "white"
                      }
                      paddingY={3}
                      paddingX={10}
                      width={"fit-content"}
                      borderRadius={5}
                      cursor={"pointer"}
                      className={stayPixel.className}
                      fontSize={20}
                      onClick={() => {
                        setselectedDifficulty(difficulty.value);
                      }}
                    >
                      {difficulty.label}
                    </Text>
                  </motion.div>
                ))}
              </Flex>

              <ContinueButton
                onClick={() => {
                  const params = {
                    categories: selectedTags,
                    difficulties: selectedDifficulty,
                  };
                  const queryString = queryGenerator(params);
                  router.push(`/play` + queryString);
                }}
              />
            </motion.div>
          </Flex>
        )}
      </AnimatePresence>
    </Box>
  );
}
