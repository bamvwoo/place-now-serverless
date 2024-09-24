import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    googleId: {
        type: String,
        unique: true
    },
    naverId: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    },
    profile: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;