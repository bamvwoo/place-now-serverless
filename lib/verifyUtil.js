import { v4 as uuidv4 } from 'uuid';
import VerificationCode from '../models/VerificationCode.js';
import { connectToDatabase } from './mongodb.js';

const generateCode = async (email) => {
    const verificationCodeData = {
        value: uuidv4().slice(0, 6),
        email: email,
        expirationDate: new Date(Date.now() + 180 * 1000)
    };

    await connectToDatabase();

    // 만료된 코드 일괄 삭제
    await VerificationCode.deleteMany({ expirationDate: { $lt: new Date() } });

    // 기존에 발급된 코드가 있는지 확인
    const existingCode = await VerificationCode.findOne({ email });
    if (existingCode) {
        // 기존 코드가 있으면 갱신
        existingCode.value = verificationCodeData.value;
        existingCode.expirationDate = verificationCodeData.expirationDate;
        await existingCode.save();

        return existingCode;
    } else {
        // 기존 코드가 없으면 새로 발급
        const newCode =  new VerificationCode(verificationCodeData);
        await newCode.save();

        return newCode;
    }
};

export { generateCode };