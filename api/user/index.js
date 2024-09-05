import bcrypt from 'bcrypt';
import { verifyToken } from "../../lib/authUtil.js";
import User from "../../models/User.js";
import { connectToDatabase } from '../../lib/mongodb.js';

export default async function handler(req, res) {
    try {
        await connectToDatabase();

        if (req.method === 'GET') {
            try {
                const { userId } = req.query;
                
                let user;
                if (userId) {
                    // userId 를 파라미터로 받은 경우 해당 유저 정보를 가져옴
                    user = await User.findOne({ userId });
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
                return res.status(401).json({ error: 'Unauthorized' });
            }
        } else if (req.method === 'POST') {
            const { userId, name, password, email } = req.body;

            // 비밀번호 해싱
            const hashedPassword = await bcrypt.hash(password, 10);

            const userData = {
                userId: userId,
                name: name,
                password: hashedPassword,
                email: email
            };

            const user = new User(userData);
            await user.save();

            return res.status(201).json(user);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}