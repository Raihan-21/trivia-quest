import useFetch from "@/hooks/useFetch";
import { Box, Flex, Progress, Text, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { stayPixel, ubuntu } from "@/fonts/font";
import { queryGenerator } from "@/helpers/helper";
import { useRouter } from "next/router";

import { AnimatePresence, motion } from "framer-motion";

import { RxReload } from "react-icons/rx";
import { FiArrowLeft } from "react-icons/fi";

export const getServerSideProps = async (context: any) => {
  const queryString = queryGenerator(context.query);
  try {
    const res = await axios.get(
      "https://the-trivia-api.com/v2/questions" + queryString
    );
    return {
      props: {
        questions: res.data,
      },
    };
  } catch (error) {
    console.log(error);
    // throw error;
  }
};

const Play = ({ questions }: { questions: any[] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [choices, setChoices] = useState<any[]>([]);
  const [questionStatus, setQuestionStatus] = useState({
    correctAnswer: "",
    isChoosed: false,
    isCorrect: false,
  });
  const [time, setTime] = useState(10);
  const [score, setScore] = useState({
    total: 0,
    increment: 0,
    hasUpdated: false,
  });
  const [sessionEnd, setSessionEnd] = useState(false);

  const router = useRouter();
  const mixChoices = useCallback(() => {
    const mixedChoices = [
      ...questions[currentQuestion].incorrectAnswers,
      questions[currentQuestion].correctAnswer,
    ];
    for (let i = mixedChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = mixedChoices[i];
      mixedChoices[i] = mixedChoices[j];
      mixedChoices[j] = temp;
    }
    setChoices(mixedChoices);
    setQuestionStatus((prevState) => ({
      ...prevState,
      correctAnswer: questions[currentQuestion].correctAnswer,
    }));
  }, [currentQuestion]);
  const nextQuestion = useCallback(() => {
    if (currentQuestion === 9) {
      setSessionEnd(true);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  }, [currentQuestion]);
  const checkAnswer = useCallback(
    (answer: string) => {
      if (answer === questions[currentQuestion].correctAnswer) {
        setQuestionStatus((prevState) => ({ ...prevState, isCorrect: true }));
        switch (router.query.difficulties) {
          case "easy":
            setScore((prevState) => ({
              ...prevState,
              increment: 50,
              total: score.total + 50,
            }));
            break;
          case "medium":
            setScore((prevState) => ({
              ...prevState,
              increment: 100,
              total: score.total + 100,
            }));
            break;
          default:
            setScore((prevState) => ({
              ...prevState,
              increment: 200,
              total: score.total + 200,
            }));
            break;
        }
        setScore((prevState) => ({ ...prevState, hasUpdated: true }));
        setTimeout(() => {
          setScore((prevState) => ({ ...prevState, hasUpdated: false }));
        }, 1000);
      }
    },
    [currentQuestion]
  );
  const revealAnswer = useCallback(
    (choice: string, i: number) => {
      if (choice === questions[currentQuestion].correctAnswer)
        return "green.300";
      return "red.500";
    },
    [questionStatus, checkAnswer, currentQuestion]
  );
  useEffect(() => {
    mixChoices();
    setTime(0);
  }, [currentQuestion]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 10);
    }, 1000);
    if (time === 100) nextQuestion();
    return () => clearInterval(interval);
  }, [time]);
  useEffect(() => {
    if (questionStatus.isChoosed)
      setTimeout(() => {
        nextQuestion();
        setQuestionStatus({
          isCorrect: false,
          isChoosed: false,
          correctAnswer: "",
        });
      }, 1000);
  }, [revealAnswer]);

  useEffect(() => {
    const highScore = localStorage.getItem("high-score");
    if (highScore)
      localStorage.setItem(
        "high-score",
        (Number(highScore) + score.total).toString()
      );
    else localStorage.setItem("high-score", score.total.toString());
  }, [sessionEnd]);

  return (
    <Box
      minHeight={"100vh"}
      width={"100vw"}
      backgroundColor={"purple.800"}
      paddingTop={"100px"}
      paddingX={10}
    >
      <Flex justifyContent={"center"}>
        {!sessionEnd ? (
          <Box>
            <Box marginBottom={10} width={"fit-content"} position={"relative"}>
              <AnimatePresence>
                {score.hasUpdated && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    <Text
                      color={"yellow.400"}
                      fontSize={18}
                      fontWeight={"bold"}
                      textAlign={"right"}
                      position={"absolute"}
                      right={0}
                      top={-5}
                    >
                      {"+" + score.increment}
                    </Text>
                  </motion.div>
                )}
              </AnimatePresence>
              <Text color={"yellow.400"} fontSize={25} fontWeight={"bold"}>
                Score:
                {" " + score.total}
              </Text>
            </Box>
            <Box width={["full", "500px"]}>
              <Progress
                value={time}
                colorScheme="green"
                marginX={"auto"}
                marginBottom={5}
              />
              <Text
                color={"white"}
                className={ubuntu.className}
                fontSize={20}
                marginBottom={5}
              >
                {questions[currentQuestion].question.text}
              </Text>
              <VStack spacing={3}>
                {choices.map((choice, i) => (
                  <motion.div
                    whileTap={{
                      scale: questionStatus.correctAnswer === choice ? 0.8 : 1,
                      y: questionStatus.correctAnswer !== choice ? 10 : 0,
                    }}
                    key={i}
                  >
                    <Box
                      borderRadius={10}
                      paddingY={1}
                      paddingX={4}
                      backgroundColor={
                        questionStatus.isChoosed
                          ? revealAnswer(choice, i)
                          : "white"
                      }
                      cursor={"pointer"}
                      width={"fit-content"}
                      onClick={() => {
                        // setSelectedAnswer(choice);
                        setQuestionStatus((prevState) => ({
                          ...prevState,
                          isChoosed: true,
                        }));
                        checkAnswer(choice);
                      }}
                    >
                      <Text>{choice}</Text>
                    </Box>
                  </motion.div>
                ))}
              </VStack>
            </Box>
          </Box>
        ) : (
          <Box maxWidth={"500px"}>
            <Text fontSize={15} color={"white"} className={stayPixel.className}>
              Yup,It&apos;s over,
            </Text>
            <Text fontSize={30} color={"white"} className={stayPixel.className}>
              Your Score is :
            </Text>
            <Text fontSize={45} color={"yellow.300"} textAlign={"center"}>
              {score.total}
            </Text>
            <Flex justifyContent={"center"} columnGap={3}>
              <Flex justifyContent={"center"} marginTop={5}>
                <motion.div whileTap={{ scale: 0.8 }}>
                  <Flex
                    alignItems={"center"}
                    backgroundColor={"yellow.300"}
                    paddingY={1}
                    paddingX={4}
                    borderRadius={5}
                    width={"fit-content"}
                    columnGap={2}
                    cursor={"pointer"}
                    onClick={() => {
                      router.reload();
                    }}
                  >
                    <RxReload />
                    <Text className={stayPixel.className} fontSize={20}>
                      Retry
                    </Text>
                  </Flex>
                </motion.div>
              </Flex>
              <Flex justifyContent={"center"} marginTop={5}>
                <motion.div whileTap={{ scale: 0.8 }}>
                  <Flex
                    alignItems={"center"}
                    backgroundColor={"red.500"}
                    paddingY={1}
                    paddingX={4}
                    borderRadius={5}
                    width={"fit-content"}
                    columnGap={2}
                    cursor={"pointer"}
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    <FiArrowLeft />
                    <Text className={stayPixel.className} fontSize={20}>
                      Go back home
                    </Text>
                  </Flex>
                </motion.div>
              </Flex>
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Play;
