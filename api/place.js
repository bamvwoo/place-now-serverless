import { verifyToken } from "../lib/authUtil.js";
import { connectToDatabase } from "../lib/mongodb.js";
import mongoose from 'mongoose';

export default async function handler(req, res) {
    try {
        const { database } = await connectToDatabase();
        const collection = database.collection("places");

        if (req.method === 'GET') {
            let result;

            if (req.query.id) {
                result = await collection.findOne({ _id: mongoose.Types.ObjectId(req.query.id) });
            } else {
                result = await collection.find({}).toArray();
            }

            return res.status(200).json(result);
        } else if (req.method === 'POST') {
            try {
                const user = verifyToken(req);
                
                const place = req.body;
                const isUpdate = place.id ? true : false;

                const images = place.images;
                for (const index in images) {
                    console.log(images[index]);
                }
            } catch (error) {
                console.error(error);
                return res.status(401).json({ error: 'Unauthorized' });
            }
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}