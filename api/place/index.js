import { connectToDatabase } from "../../lib/mongodb.js";

export default async function handler(req, res) {
    try {
        const { database } = await connectToDatabase();
        const collection = database.collection("places");
        const results = await collection.find({}).toArray();
        res.status(200).json(results);
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}