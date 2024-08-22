import { connectToDatabase } from "../../lib/mongodb.js";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    try {
        const id = req.query.id;
        const { database } = await connectToDatabase();
        const collection = database.collection("places");
        const result = await collection.findOne({ _id: ObjectId.createFromHexString(id) });
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}