import jwt from 'jsonwebtoken';

const verifyToken = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } else {
        throw new Error('Token not found');
    }
};

export { verifyToken };