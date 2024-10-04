import mongoose from 'mongoose';

const verificationCodeSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);

export default VerificationCode;