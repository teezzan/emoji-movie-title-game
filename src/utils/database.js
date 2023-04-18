import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_CONNECTION_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  await client.connect();
  return client.db("emoji-movie-title-game-db");
}

export { connectToDatabase };
