import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a>
            <h1 className="font-bold text-2xl flex items-center">🎬🤔</h1>
          </a>
        </Link>
        <nav>
          {/* Add navigation links here */}
          <Link href="/" legacyBehavior>
            <a className="mx-2 hover:text-gray-300">Home</a>
          </Link>
          <Link href="/game" legacyBehavior>
            <a className="mx-2 hover:text-gray-300">Game</a>
          </Link>
          <Link href="/search" legacyBehavior>
            <a className="mx-2 hover:text-gray-300">Search</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
