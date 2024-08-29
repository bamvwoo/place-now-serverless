import { verifyToken } from "../../lib/authUtil.js";

export default async function handler(req, res) {
    const decoded = verifyToken(req);
    if (decoded) {
        console.log(decoded);
        res.status(200).json({ username: decoded.username, nickname: decoded.nickname });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}