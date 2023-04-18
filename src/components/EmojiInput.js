import { useState } from "react";

const EmojiInput = ({ onEmojiInput }) => {
  const [emojiInputValue, setEmojiInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEmojiInput(emojiInputValue);
    setEmojiInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <label
        htmlFor="emojiInput"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Enter a series of emojis:
      </label>
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          id="emojiInput"
          type="text"
          value={emojiInputValue}
          onChange={(e) => setEmojiInputValue(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="e.g. 🐶🐱🐰"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmojiInput;
