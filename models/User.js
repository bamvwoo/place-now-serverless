import mongoose from 'mongoose';

const agreementSchema = new mongoose.Schema({
    marketingUsage: {
        type: Boolean,
        default: false
    },
    emailNotification: {
        type: Boolean,
        default: false
    },
    phoneNotification: {
        type: Boolean,
        default: false
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    googleId: {
        type: String
    },
    naverId: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    profile: {
        type: String
    },
    agreement: {
        type: agreementSchema,
        default: {
            marketingUsage: false,
            emailNotification: false,
            phoneNotification: false
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;