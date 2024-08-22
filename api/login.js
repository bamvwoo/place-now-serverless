import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // const { username, password } = req.body;

        const username = 'anonymous';

        // 사용자 인증 로직 (예: 데이터베이스 조회)
        /*
        if (username === 'user' && password === 'password') {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
        */

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}