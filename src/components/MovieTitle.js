const MovieTitle = ({ title, emojis }) => {
  return (
    <div className="bg-green-800 rounded-lg p-6 text-white text-center shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-lg mb-2">{emojis}</p>
    </div>
  );
};

export default MovieTitle;
