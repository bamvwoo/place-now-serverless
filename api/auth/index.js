import { generateToken } from "../../lib/authUtil.js";
import { getUserByEmail } from "../../lib/userUtil.js";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { email, password } = req.body;

            // 사용자 유무 검증
            const user = await getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // 비밀번호 검증
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = generateToken(user);
            res.status(200).json({ token });
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}