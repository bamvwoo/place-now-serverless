import jwt from 'jsonwebtoken';

const verifyToken = (req) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        }
    } catch (error) {
        console.error(error, 'Invalid token');
    }
};

export { verifyToken };