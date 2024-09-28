import jwt from "jsonwebtoken";
import crypto from "crypto";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { token } = req.body;
            const user = jwt.verify(token, process.env.JWT_SECRET);
            return res.status(200).json(user);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}