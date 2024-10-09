import { verifyToken } from "../lib/authUtil.js";
import { connectToDatabase } from "../lib/mongodb.js";
import mongoose from 'mongoose';
import { Formidable } from 'formidable';
import { upload } from "../lib/uploadUtil.js";
import Place from "../models/Place.js";
import { getUserById } from "../lib/userUtil.js";

export const config = {
    api: {
        bodyParser: false, // formidable을 사용하기 위해 bodyParser 비활성화
    },
};

const doGet = async (req, res) => {
    const { database } = await connectToDatabase();
    const collection = database.collection("places");
    
    let result;
    if (req.query.id) {
        result = await collection.findOne({ _id: mongoose.Types.ObjectId(req.query.id) });
    } else {
        result = await collection.find({}).toArray();
    }

    return res.status(200).json(result);
};

const parseFormData = async (req) => {
    const user = verifyToken(req).decoded;

    const form = new Formidable();
    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject({ error: 'Internal server error' });
                return;
            }

            let images;
            if (files["images"] && files["images"].length > 0) {
                const thumbnailIndex = fields.thumbnail;

                images = await upload(files["images"]);
                images[thumbnailIndex].thumbnail = true;
            }

            const isPlaceAdmin = fields.isAdmin[0] === 'true';
            const creator = await getUserById(user._id);
            const keywords = `${fields.name}|${fields.address[0]}|${fields.buildingName[0]}|${fields.description[0]}`;

            const placeData = {
                name: fields.name[0],
                location: {
                    postCode: fields.postCode[0],
                    sido: fields.sido[0],
                    sigungu: fields.sigungu[0],
                    address: fields.address[0],
                    buildingName: fields.buildingName[0]
                },
                description: fields.description[0],
                keywords: keywords,
                images: images,
                admin: (isPlaceAdmin ? creator : null),
                creator: creator
            };

            resolve(placeData);
        });
    });
};

const doPost = async (req, res) => {
    const placeData = await parseFormData(req);

    // Place 인스턴스 생성 및 저장
    const place = new Place(placeData);
    await place.save();

    return res.status(201).json(placeData);
};

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            doGet(req, res);
        } else if (req.method === 'POST') {
            doPost(req, res);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}