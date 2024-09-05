import { connectToDatabase } from '../../lib/mongodb.js';

export default async function handler(req, res) {
    try {
        const { database } = await connectToDatabase('common_api');

        if (req.method === 'GET') {
            // "adjectives" 컬렉션에서 랜덤한 데이터 1개 가져오기
            const adjectivesCollection = database.collection('adjectives');
            const randomAdjective = await adjectivesCollection.aggregate([{ $sample: { size: 1 } }]).toArray();
    
            // "nouns" 컬렉션에서 랜덤한 데이터 1개 가져오기
            const nounsCollection = database.collection('nouns');
            const randomNoun = await nounsCollection.aggregate([{ $sample: { size: 1 } }]).toArray();
    
            // 랜덤한 adjective와 noun을 조합하여 문자열 생성
            const name = `${randomAdjective[0].value} ${randomNoun[0].value}`;

            return res.status(200).json({ name });
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}