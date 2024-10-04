import { generateCode } from '../lib/verifyUtil.js';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { receiver } = req.query;

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
                text: `인증 코드는 ${verificationCode.value}입니다.`,
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json(verificationCode);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Failed to send code', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}