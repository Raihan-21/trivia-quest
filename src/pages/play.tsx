import useFetch from "@/hooks/useFetch";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { ubuntu } from "@/fonts/font";

export const getServerSideProps = async () => {
  try {
    const res = await axios.get("https://the-trivia-api.com/v2/questions");
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
  const [nextQuestion, setNextQuestion] = useState(true);
  const [choices, setChoices] = useState<any[]>([]);
  //   const [fetch, data, isLoading] = useFetch("");
  //   useEffect(() => {
  //     fetch();
  //   }, []);
  useEffect(() => {
    const mixedChoices = [
      ...questions[currentQuestion].incorrectAnswers,
      questions[currentQuestion].correctAnswer,
    ];
    console.log(mixedChoices);
    for (let i = mixedChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = mixedChoices[i];
      mixedChoices[i] = mixedChoices[j];
      mixedChoices[j] = temp;
    }
    setChoices(mixedChoices);
  }, [nextQuestion]);

  return (
    <Box minHeight={"100vh"} width={"100vw"} backgroundColor={"purple.800"}>
      <Flex justifyContent={"center"} paddingTop={40}>
        <Box>
          <Text color={"white"} className={ubuntu.className} fontSize={20}>
            {questions[currentQuestion].question.text}
          </Text>
          {choices.map((choice, i) => (
            <Box key={i}>
              <Text>{choice}</Text>
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default play;
