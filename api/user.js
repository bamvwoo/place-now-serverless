import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ username: decoded.username });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}