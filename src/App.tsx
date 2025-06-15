import { useState, useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Progress,
  Container,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface Question {
  id: number;
  text: string;
  weight: number;
}

const questions: Question[] = [
  { id: 1, text: "Do you always wear a jacket?", weight: 1 },
  { id: 2, text: "Do you know what soap is?", weight: 2 },
  { id: 3, text: "Are you a nerd?", weight: 1 },
  { id: 4, text: "Do you watch anime?", weight: 1 },
  { id: 5, text: "Do you play Genshin/Valorant/Honkai?", weight: 1 },
  { id: 6, text: "Are you a Discord expert?", weight: 1 },
  { id: 7, text: "Do you avoid making the first move?", weight: 1 },
  { id: 8, text: "Are you an introvert?", weight: 1 },
  { id: 9, text: "Can you fix a refrigerator?", weight: 1 },
  { id: 10, text: "Are you a red flag?", weight: 2 },
  { id: 11, text: "Are you always busy?", weight: 1 },
  { id: 12, text: "Do you use a mechanical keyboard?", weight: 1 },
  { id: 13, text: "Do you give mixed signals?", weight: 1 },
  { id: 14, text: "Do you drink coffee?", weight: 1 },
  { id: 15, text: "Are Indian YouTubers your best friends?", weight: 1 },
  { id: 16, text: "Are you good at math?", weight: 1 },
  { id: 17, text: "Do you hate GE courses?", weight: 1 },
  { id: 18, text: "Are you a procrastinator?", weight: 1 },
];

function DarkModeToggle({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) {
  return (
    <IconButton
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      icon={darkMode ? <SunIcon /> : <MoonIcon color="black"/> }
      onClick={() => setDarkMode(!darkMode)}
      position="absolute"
      top={4}
      right={4}
      zIndex={10}
      size="lg"
      variant="ghost"
    />
  );
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [scoreBonus, setScoreBonus] = useState(0);
  const [showBonus, setShowBonus] = useState<null | "+1" | "-1">(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lastDarkMode, setLastDarkMode] = useState(false);

  // Add +1 or -1 when switching modes
  useEffect(() => {
    if (darkMode !== lastDarkMode) {
      if (darkMode) {
        setScoreBonus((prev) => prev + 1);
        setShowBonus("+1");
      } else {
        setScoreBonus((prev) => prev - 1);
        setShowBonus("-1");
      }
      setTimeout(() => setShowBonus(null), 1200);
    }
    setLastDarkMode(darkMode);
  }, [darkMode]);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer) {
        score += questions[index].weight;
      }
    });
    return score + scoreBonus;
  };

  const getScoreMessage = (score: number) => {
    if (score >= 15) return "You're a certified CS student! 🎓";
    if (score >= 10) return "You're getting there! Keep coding! 💻";
    if (score >= 5) return "You might be in the wrong major... 😅";
    return "Are you sure you're a CS student? 🤔";
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowScore(false);
    setScoreBonus(0);
    setShowBonus(null);
  };

  // High-contrast colors for both modes
  const bg = darkMode ? '#181a20' : '#f7f7fa';
  const cardBg = darkMode ? '#23272f' : '#fff';
  const headingColor = darkMode ? '#fff' : '#22223b';
  const textColor = darkMode ? '#f7f7fa' : '#22223b';
  const borderColor = darkMode ? '#444857' : '#e2e8f0';
  const buttonYesBg = darkMode ? 'purple.400' : 'blue.500';
  const buttonNoBg = darkMode ? 'gray.600' : 'gray.300';
  const buttonYesColor = 'white';
  const buttonNoColor = darkMode ? 'white' : 'gray.800';
  const progressBarColor = darkMode ? 'purple' : 'blue';

  return (
    <ChakraProvider>
      <Box minH="100vh" minW="100vw" bg={bg} position="relative" transition="background 0.3s">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        {showBonus && (
          <Box
            position="absolute"
            top={12}
            right={8}
            zIndex={20}
            bg={showBonus === "+1" ? "green.400" : "red.400"}
            color="white"
            px={3}
            py={1}
            borderRadius="md"
            fontWeight="bold"
            fontSize="lg"
            boxShadow="lg"
            animation="popUp 1.2s cubic-bezier(.36,1.01,.32,1)"
          >
            {showBonus}
          </Box>
        )}
        <style>{`
          @keyframes popUp {
            0% { opacity: 0; transform: translateY(20px) scale(0.7); }
            20% { opacity: 1; transform: translateY(0) scale(1.1); }
            60% { opacity: 1; transform: translateY(-10px) scale(1); }
            100% { opacity: 0; transform: translateY(-30px) scale(0.7); }
          }
        `}</style>
        <Flex minH="100vh" minW="100vw" align="center" justify="center">
          <Container maxW="container.md" py={10}>
            <VStack spacing={8}>
              <Heading color={headingColor}>What's My CS Score? 🎮</Heading>
              {!showScore ? (
                <>
                  <Progress
                    value={(currentQuestion / questions.length) * 100}
                    width="100%"
                    colorScheme={progressBarColor}
                    bg={darkMode ? '#35374a' : '#e2e8f0'}
                    borderRadius="md"
                    height="8px"
                  />
                  <Box
                    p={6}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor={borderColor}
                    width="100%"
                    bg={cardBg}
                  >
                    <VStack spacing={6} align="stretch">
                      <Text fontSize="xl" color={textColor}>
                        {questions[currentQuestion].text}
                      </Text>
                      <Flex gap={4} justify="center">
                        <Button
                          size="lg"
                          bg={buttonYesBg}
                          color={buttonYesColor}
                          _hover={{ bg: darkMode ? 'purple.500' : 'blue.600' }}
                          flex={1}
                          onClick={() => handleAnswer(true)}
                        >
                          YES
                        </Button>
                        <Button
                          size="lg"
                          bg={buttonNoBg}
                          color={buttonNoColor}
                          _hover={{ bg: darkMode ? 'gray.500' : 'gray.400' }}
                          flex={1}
                          onClick={() => handleAnswer(false)}
                        >
                          NO
                        </Button>
                      </Flex>
                    </VStack>
                  </Box>
                </>
              ) : (
                <Box
                  p={6}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={borderColor}
                  width="100%"
                  textAlign="center"
                  bg={cardBg}
                >
                  <VStack spacing={4}>
                    <Heading size="lg" color={headingColor}>Your CS Score: {calculateScore()}</Heading>
                    <Text fontSize="xl" color={textColor}>{getScoreMessage(calculateScore())}</Text>
                    <Button colorScheme={darkMode ? 'purple' : 'blue'} onClick={resetTest}>
                      Take Test Again
                    </Button>
                  </VStack>
                </Box>
              )}
            </VStack>
          </Container>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App 