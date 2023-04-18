const axios = require("axios");

async function getMovieTitleFromEmojis(emojis) {
  if (!emojis) throw new Error("No emojis provided");
  const prompt = `Given the following emojis "${emojis}", provide the movie title it represents.`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  };

  const data = JSON.stringify({
    prompt: prompt,
    max_tokens: 20,
    temperature: 0.8,
    model: "text-davinci-003",
  });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      data,
      config
    );

    const result = response.data;

    if (!result.choices || result.choices.length === 0)
      throw new Error("No movie title found");

    return result.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    throw new Error("Error completing request to OpenAI API");
  }
}

export { getMovieTitleFromEmojis };
