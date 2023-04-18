import { connectToDatabase } from "@/utils/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const query = req.body.query;

    if (!query) {
      res
        .status(400)
        .json({ message: "Bad request: No search query provided" });
      return;
    }

    try {
      const db = await connectToDatabase();
      const movies = await db
        .collection("movies")
        .find({ title: { $regex: query, $options: "i" } })
        .toArray();

      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
