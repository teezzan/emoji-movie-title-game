import QuizQuestion from "../components/QuizQuestion";
import Header from "../components/Header";
import { useState } from "react";

const quizQuestions = [
  { emojiTitle: "👨‍👩‍👧‍👦🐕", correctTitle: "Marley & Me" },
  { emojiTitle: "👦🔪🕵️‍♂️", correctTitle: "Home Alone" },
  // Add more questions here
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");

  const generateShareText = (correctAnswers, incorrectAnswers) => {
    let shareText = "I got ";

    // Add the number of correct answers to the shareText
    shareText += correctAnswers.length;
    shareText += " out of ";
    shareText += quizQuestions.length;
    shareText += " correct!\n\n";

    // Add the list of correct answers to the shareText
    if (correctAnswers.length > 0) {
      shareText += "Correct answers:\n";
      shareText += correctAnswers
        .map((question) => question.correctTitle)
        .join(", ");
      shareText += "\n\n";
    }

    // Add the list of incorrect answers to the shareText
    if (incorrectAnswers.length > 0) {
      shareText += "Incorrect answers:\n";
      shareText += incorrectAnswers
        .map((question) => question.emojiTitle)
        .join(", ");
      shareText += "\n\n";
    }

    // Add a message to encourage people to take the quiz
    shareText += "Can you beat my score? Take the quiz now!";

    return shareText;
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
  };

  const handleCorrectAnswer = () => {
    setScore((currentScore) => currentScore + 1);
    setRightAnswers((currentRightAnswers) => [
      ...currentRightAnswers,
      currentQuestionIndex,
    ]);
  };

  const handleAnswerSubmit = () => {
    if (
      userAnswer.toLowerCase() === currentQuestion.correctTitle.toLowerCase()
    ) {
      setIsCorrect(true);
      onCorrectAnswer();
    } else {
      setIsCorrect(false);
      setWrongAnswers((currentWrongAnswers) => [
        ...currentWrongAnswers,
        currentQuestionIndex,
      ]);
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    // Generate representation
    const representation = quizQuestions
      .map((question, index) => {
        if (rightAnswers.includes(index)) {
          return "✅"; // Mark correct answers with an "O"
        } else if (wrongAnswers.includes(index)) {
          return "❌"; // Mark incorrect answers with an "X"
        } else {
          return "-"; // Mark unanswered questions with a "-"
        }
      })
      .join("");

    return (
      <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white min-h-screen">
        <Header />
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-4xl font-bold mb-8">
            Congratulations, you finished the quiz!
          </p>
          <p className="text-2xl font-bold mb-8">
            Your score is: <span className="text-yellow-300">{score}</span>
          </p>
          <p className="text-xl font-bold mb-8">
            Representation: {representation}
          </p>
          <button
            onClick={() =>
              window.alert(generateShareText(rightAnswers, wrongAnswers))
            }
            className="bg-white text-black font-bold py-2 px-4 rounded mt-8 hover:bg-gray-200"
          >
            Share your results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-300 to-grey-900 text-white min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center h-full">
        <QuizQuestion
          emojiTitle={currentQuestion.emojiTitle}
          correctTitle={currentQuestion.correctTitle}
          onNextQuestion={handleNextQuestion}
          onCorrectAnswer={handleCorrectAnswer}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          onSubmit={handleAnswerSubmit}
        />
        <p className="text-2xl font-bold mt-8">
          Score: <span className="text-yellow-300">{score}</span>
        </p>
      </div>
    </div>
  );
};

export default QuizPage;
