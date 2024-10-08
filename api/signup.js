import { connectToDatabase } from "../lib/mongodb.js";
import bcrypt from 'bcrypt';
import User from "../models/User.js";

const doPost = async (req, res) => {
    const { email, name, password } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
        email: email,
        name: name,
        password: hashedPassword
    };

    await connectToDatabase();

    const user = new User(userData);
    await user.save();

    return res.status(201).json(user);
};

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            doPost(req, res);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}