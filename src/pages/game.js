import QuizQuestion from "../components/QuizQuestion";
import Header from "../components/Header";
import { useEffect, useState } from "react";

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
  const [shareText, setShareText] = useState("");

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

  useEffect(() => {
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
    const generatedText = generateShareText(rightAnswers, wrongAnswers); // Generate text when copying
    setShareText(generatedText);

    navigator.clipboard.writeText(generatedText).then(() => {
      alert("Share text copied to clipboard!");
    });
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

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

export default QuizPage;
