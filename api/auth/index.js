import jwt from 'jsonwebtoken';
import { generateToken } from "../../lib/authUtil.js";
import { getUserById } from '../../lib/userUtil.js';

const doGet = async (req, res) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    let user = jwt.verify(token, process.env.JWT_SECRET);
    user = await getUserById(user._id);

    token = generateToken(user);

    res.status(200).json({ token });
};

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            doGet(req, res);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}