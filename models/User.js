import mongoose from 'mongoose';

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
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;