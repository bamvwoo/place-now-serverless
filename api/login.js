import { connectToDatabase } from "../lib/mongodb.js";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        await connectToDatabase();

        if (req.method === 'POST') {
            let { userId, password } = req.body;
    
            // 사용자 유무 검증
            const user = await User.findOne({ userId });
            if (!User) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // 비밀번호 검증
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            delete user.password;

            const userObject = user.toObject();

            const token = jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, user });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}