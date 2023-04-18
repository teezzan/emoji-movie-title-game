import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-8 text-center">
        Welcome to 🎥 Emoji Movie Title Game 🎬
      </h1>
      <p className="text-2xl mb-8 text-center">
        Guess the movie title represented by a series of emojis. 🤔
      </p>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/game" legacyBehavior>
          <a className="bg-white text-purple-500 py-3 px-6 rounded-md font-medium text-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out w-full sm:w-auto">
            🚀 Play the Game 🕹️
          </a>
        </Link>
        <Link href="/search" legacyBehavior>
          <a className="bg-white text-purple-500 py-3 px-6 rounded-md font-medium text-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out w-full sm:w-auto">
            🕵🏼 Search our Database 🔎
          </a>
        </Link>
      </div>
    </div>
  );
}
