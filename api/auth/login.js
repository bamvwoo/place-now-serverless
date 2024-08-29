import { connectToDatabase } from "../../lib/mongodb.js";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // const { username, password } = req.body;

        const username = 'anonymous_' + Math.floor(Math.random() * 1000);

        // 사용자 인증 로직 (예: 데이터베이스 조회)
        /*
        if (username === 'user' && password === 'password') {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
        */

        const { database } = await connectToDatabase("common_api");

        // "adjectives" 컬렉션에서 랜덤한 데이터 1개 가져오기
        const adjectivesCollection = database.collection('adjectives');
        const randomAdjective = await adjectivesCollection.aggregate([{ $sample: { size: 1 } }]).toArray();

        // "nouns" 컬렉션에서 랜덤한 데이터 1개 가져오기
        const nounsCollection = database.collection('nouns');
        const randomNoun = await nounsCollection.aggregate([{ $sample: { size: 1 } }]).toArray();

        // 랜덤한 adjective와 noun을 조합하여 문자열 생성
        const nickname = `${randomAdjective[0].value} ${randomNoun[0].value}`;

        const payload = {
            username,
            nickname
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, username });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}