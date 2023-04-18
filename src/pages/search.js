import { useState } from "react";
import EmojiInput from "../components/EmojiInput";
import MovieTitle from "../components/MovieTitle";
import Header from "@/components/Header";

export default function GamePage() {
  const [emojis, setEmojis] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onEmojiInput = async (inputEmojis) => {
    try {
      setError(null);
      setIsLoading(true);

      // Call the API route
      const response = await fetch("/api/get-movie-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emojis: inputEmojis }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 400
            ? "No emojis provided"
            : "Failed to fetch movie title"
        );
      }

      const data = await response.json();
      const title = data.title;
      setMovieTitle(title);
      setEmojis(inputEmojis);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <h1 className="text-4xl font-bold text-center text-blue-600 my-8">
        Search for Emoji Movie Titles
      </h1>
      <div className="w-full flex flex-col items-center">
        <EmojiInput onEmojiInput={onEmojiInput} />
        {isLoading && <p className="mt-4">Loading... ⏳</p>}
        {error && <p className="text-red-500 mt-4">❌ {error}</p>}
      </div>
      {movieTitle && (
        <MovieTitle title={movieTitle} emojis={emojis}>
          <span role="img" aria-label="clap">
            👏👏👏
          </span>
        </MovieTitle>
      )}
      {/* {movieTitle && (
        <div className="w-full flex justify-center mt-8">
          <Link href="/results" passHref>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              See Results
            </button>
          </Link>
        </div>
      )} */}
    </div>
  );
}
