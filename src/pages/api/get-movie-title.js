import { getMovieTitleFromEmojis } from "../../utils/openai";
import { connectToDatabase } from "../../utils/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const emojis = req.body.emojis;

    if (!emojis) {
      res.status(400).json({ message: "Bad request: No emojis provided" });
      return;
    }

    try {
      const db = await connectToDatabase();

      // First, search the database for existing emoji-title data
      let existingMovie = await db
        .collection("movies")
        .findOne({ emojis: emojis });

      let title;

      // If the data is not found in the database, use OpenAI API
      if (!existingMovie) {
        title = await getMovieTitleFromEmojis(emojis);

        // Save the emoji-title data in the database
        await db.collection("movies").insertOne({
          title: title,
          emojis: emojis,
        });
      } else {
        title = existingMovie.title;
      }

      res.status(200).json({ title: title });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
