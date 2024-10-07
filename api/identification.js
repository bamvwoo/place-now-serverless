import { verifyToken } from '../lib/authUtil.js';
import { deleteCode, generateCode, getCode, verifyCode } from '../lib/verifyUtil.js';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import { getUserByEmail } from '../lib/userUtil.js';

const doGet = async (req, res) => {
    const { receiver } = req.query;

    const user = await getUserByEmail(receiver);
    if (user) {
        return res.status(400).json({ error: '이미 사용 중인 이메일 주소에요' });
    }

    const verificationCode = await generateCode(receiver);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.VITE_EMAIL_USER,
            pass: process.env.VITE_EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${process.env.VITE_EMAIL_NAME}" <${process.env.VITE_EMAIL_USER}>`,
        to: receiver,
        subject: 'Place-now 본인인증',
        html: `Place-now 이메일 인증 코드는 <strong>${verificationCode.value}</strong> 입니다. <br /> 이 코드는 3분 동안 유효해요.`
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json(verificationCode);
}

const doPost = async (req, res) => {
    const { email, verificationCodeValue } = req.body;

    let user;
    try {
        user = verifyToken(req).decoded;
    } catch (error) {
        // do nothing
    }

    const verificationCode = await getCode({ email, verificationCodeValue });
    const result = await verifyCode(verificationCode);

    if (result) {
        if (user) {
            await User.findByIdAndUpdate(user._id, { email });
        }

        await deleteCode(verificationCode);
    }

    return res.status(200).json({ result });
};

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            await doGet(req, res);
        } else if (req.method === 'POST') {
            await doPost(req, res);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '알 수 없는 문제가 발생했어요' });
    }
}