import { verifyToken } from "../lib/authUtil.js";
import { connectToDatabase } from "../lib/mongodb.js";
import mongoose from 'mongoose';

export default async function handler(req, res) {
    try {
        const { database } = await connectToDatabase();
        const collection = database.collection("places");

        let result;
        if (req.method === 'GET') {
            if (req.query.id) {
                result = await collection.findOne({ _id: mongoose.Types.ObjectId(req.query.id) });
            } else {
                result = await collection.find({}).toArray();
            }
        } else if (req.method === 'POST') {
            verifyToken(req);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}