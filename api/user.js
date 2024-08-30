import { verifyToken } from "../lib/authUtil.js";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const decoded = verifyToken(req);
        if (decoded) {
            console.log(decoded);
            res.status(200).json({ username: decoded.username, nickname: decoded.nickname });
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } else if (req.method === 'POST') {
        
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }


    
}