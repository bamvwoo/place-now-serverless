import jwt from 'jsonwebtoken';

const verifyToken = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { token, decoded };
    } else {
        throw new Error('Token not found');
    }
};

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

export { verifyToken, generateToken };