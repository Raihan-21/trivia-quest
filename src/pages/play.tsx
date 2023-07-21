import useFetch from "@/hooks/useFetch";
import { Box, Flex, Progress, Text, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { ubuntu } from "@/fonts/font";
import { queryGenerator } from "@/helpers/helper";

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
    throw error;
  }
};

const play = ({ questions }: { questions: any[] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [choices, setChoices] = useState<any[]>([]);
  const [questionStatus, setQuestionStatus] = useState({
    isChoosed: false,
    isCorrect: false,
  });
  const [time, setTime] = useState(10);
  const [score, setScore] = useState(0);
  const [sessionEnd, setSessionEnd] = useState(false);
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
        setQuestionStatus({ isCorrect: false, isChoosed: false });
      }, 1000);
  }, [revealAnswer]);

  return (
    <Box minHeight={"100vh"} width={"100vw"} backgroundColor={"purple.800"}>
      <Flex justifyContent={"center"} paddingTop={40}>
        {!sessionEnd ? (
          <Box maxWidth={"500px"}>
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
                <Box
                  key={i}
                  borderRadius={10}
                  paddingY={1}
                  paddingX={4}
                  backgroundColor={
                    questionStatus.isChoosed ? revealAnswer(choice, i) : "white"
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
              ))}
            </VStack>
          </Box>
        ) : (
          <Box maxWidth={"500px"}>
            <Text>It's over</Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default play;
