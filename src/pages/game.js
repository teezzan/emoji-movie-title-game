import QuizQuestion from "../components/QuizQuestion";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const quizQuestions = [
  { emojiTitle: "👨‍👩‍👧‍👦🐕", correctTitle: "Marley & Me" },
  { emojiTitle: "👦🔪🕵️‍♂️", correctTitle: "Home Alone" },
  // Add more questions here
];
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

    correctAnswers.forEach((question, index) => {
      shareText += quizQuestions[question].emojiTitle;
      shareText += "   ✅\n";
    });

    shareText += "\n";
  }

  // Add the list of incorrect answers to the shareText
  if (incorrectAnswers.length > 0) {
    shareText += "Incorrect answers:\n";

    incorrectAnswers.forEach((question, index) => {
      shareText += quizQuestions[question].emojiTitle;
      shareText += "   ❌\n";
    });

    shareText += "\n";
  }

  // Add a message to encourage people to take the quiz
  shareText += "Can you beat my score? Take the quiz now!";

  return shareText;
};

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [shareText, setShareText] = useState("");

  const hasPlayedToday = () => {
    if (typeof window !== "undefined") {
      const lastPlayedDate = localStorage.getItem("lastPlayedDate");
      if (!lastPlayedDate) return false;

      const lastPlayedTimestamp = new Date(lastPlayedDate).getTime();
      const currentTimestamp = new Date().getTime();

      // Check if 24 hours have passed since the last played date
      return currentTimestamp - lastPlayedTimestamp < 24 * 60 * 60 * 1000;
    }
    return false;
  };

  const [isBlocked, setIsBlocked] = useState(hasPlayedToday());
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleQuizFinished = () => {
    if (typeof window !== "undefined") {
      // Store the current date in local storage when the quiz is finished
      localStorage.setItem("lastPlayedDate", new Date().toISOString());
    }
  };

  useEffect(() => {
    if (!currentQuestion) {
      handleQuizFinished();
    }
    setShareText(generateShareText(rightAnswers, wrongAnswers));
  }, [currentQuestionIndex]);

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

  const handleWrongAnswer = () => {
    setWrongAnswers((currentWrongAnswers) => [
      ...currentWrongAnswers,
      currentQuestionIndex,
    ]);
  };
  const handleCopyShareText = () => {
    // Store the current date in local storage
    localStorage.setItem("lastPlayedDate", new Date().toISOString());

    const generatedText = generateShareText(rightAnswers, wrongAnswers);
    setShareText(generatedText);

    navigator.clipboard.writeText(generatedText).then(() => {
      alert("Share text copied to clipboard!");
    });
  };

  if (isBlocked) {
    return (
      <div className="bg-gradient-to-br from-purple-300 to-grey-900 text-white min-h-screen">
        <Header />
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-4xl font-bold mb-8">
            You already played the daily quiz today!
          </p>
          <p className="text-2xl font-bold mb-8">
            Please come back tomorrow for a new quiz.
          </p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    // Generate representation
    const representation = quizQuestions
      .map((question, index) => {
        if (rightAnswers.includes(index)) {
          return "✅";
        } else if (wrongAnswers.includes(index)) {
          return "❌";
        } else {
          return "❌";
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
          <div className="flex items-center">
            <textarea
              readOnly
              value={shareText}
              className="w-full h-48 bg-white text-black py-2 px-4 rounded" // Set `h-48` to make the default height larger
            />
            <button
              onClick={handleCopyShareText}
              className="bg-white text-black font-bold py-2 px-4 rounded ml-4 hover:bg-gray-200"
            >
              Copy
            </button>
          </div>
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
          onWrongAnswer={handleWrongAnswer}
        />
        <p className="text-2xl font-bold mt-8">
          Score: <span className="text-yellow-300">{score}</span>
        </p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(QuizPage), { ssr: false });
