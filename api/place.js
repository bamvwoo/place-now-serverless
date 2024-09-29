import { verifyToken } from "../lib/authUtil.js";
import { connectToDatabase } from "../lib/mongodb.js";
import mongoose from 'mongoose';
import { Formidable } from 'formidable';
import { upload } from "../lib/uploadUtil.js";
import Place from "../models/Place.js";

export const config = {
    api: {
        bodyParser: false, // formidable을 사용하기 위해 bodyParser 비활성화
    },
};

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
            let user = verifyToken(req);
            
            const form = new Formidable();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                
                const thumbnailIndex = fields.thumbnail;

                const images = await upload(files["images"]);
                images[thumbnailIndex].thumbnail = true;

                const isPlaceAdmin = fields.isAdmin[0] === 'true';

                const placeData = {
                    name: fields.name[0],
                    address: {
                        postCode: fields.postCode[0],
                        address: fields.address[0],
                        detailedAddress: fields.detailedAddress[0]
                    },
                    region: 'GG',
                    images: images,
                    admin: (isPlaceAdmin ? user._id : null),
                    creator: user._id
                };

                console.log(placeData);

                // Place 인스턴스 생성 및 저장
                // const place = new Place(placeData);
                // await place.save();

                return res.status(201).json(placeData);
            });
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}