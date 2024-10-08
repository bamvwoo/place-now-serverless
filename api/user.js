import { verifyToken } from "../lib/authUtil.js";
import User from "../models/User.js";
import { connectToDatabase } from '../lib/mongodb.js';
import { getUserByEmail, getUserByGoogleId, getUserByNaverId } from '../lib/userUtil.js';

const doGet = async (req, res) => {
    try {
        const { userId, email, googleId, naverId } = req.query;
        
        let user;
        if (userId) {
            // userId 를 파라미터로 받은 경우 해당 유저 정보를 가져옴
            user = await User.findOne({ userId });
        } else if (email) {
            user = await getUserByEmail(email);
        } else if (googleId) {
            user = await getUserByGoogleId(googleId);
        } else if (naverId) {
            user = await getUserByNaverId(naverId);
        } else {
            // 토큰을 통해 유저 정보를 가져옴
            user = verifyToken(req);
        }

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export default async function handler(req, res) {
    try {
        await connectToDatabase();

        if (req.method === 'GET') {
            doGet(req, res);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}