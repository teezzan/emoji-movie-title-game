import { useState } from "react";

const QuizQuestion = ({
  emojiTitle,
  correctTitle,
  onNextQuestion,
  onCorrectAnswer,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const handleAnswerSubmit = () => {
    if (userAnswer.toLowerCase() === correctTitle.toLowerCase()) {
      setIsCorrect(true);
      onCorrectAnswer();
    } else {
      setIsCorrect(false);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setIsCorrect(null);
    setIsAnswerSubmitted(false);
    onNextQuestion();
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg border-4 border-purple-600">
      <h2 className="text-4xl font-bold text-white mb-8">{emojiTitle}</h2>
      <div className="flex items-center mb-8">
        <input
          className="border border-gray-400 p-4 rounded-lg text-black mr-4 flex-grow"
          type="text"
          placeholder="Type your answer here"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isAnswerSubmitted}
        />
        <button
          className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
          onClick={handleAnswerSubmit}
          disabled={isAnswerSubmitted}
        >
          Submit
        </button>
      </div>
      {isCorrect === null ? null : isCorrect ? (
        <div className="flex flex-col items-center">
          <p className="text-green-400 text-3xl font-bold mb-8">Correct!</p>
          <button
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-red-500 text-3xl font-bold mb-8">Wrong!</p>
          <p className="text-gray-400 text-2xl font-bold mb-8">
            The correct answer is:
          </p>
          <h3 className="text-white text-3xl font-bold mb-8">{correctTitle}</h3>
          <button
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
