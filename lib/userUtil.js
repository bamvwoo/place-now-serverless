import User from "../models/User.js";
import { connectToDatabase } from "./mongodb.js";

const getUserById = async (id) => {
    await connectToDatabase();

    const user = await User.findById(id);
    if (user) {
        return user.toObject();
    } else {
        return null;
    }
};

const getUserByEmail = async (email) => {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (user) {
        return user.toObject();
    } else {
        return null;
    }
};

const getUserByGoogleId = async (googleId) => {
    await connectToDatabase();

    const user = await User.findOne({ googleId });
    if (user) {
        return user.toObject();
    } else {
        return null;
    }
};

const getUserByNaverId = async (naverId) => {
    await connectToDatabase();

    const user = await User.findOne({ naverId });
    if (user) {
        return user.toObject();
    } else {
        return null;
    }
}

const saveUser = async (userData) => {
    await connectToDatabase();

    const user = new User(userData);
    await user.save();
    return user.toObject();
}

export {
    getUserById,
    getUserByEmail,
    getUserByGoogleId,
    getUserByNaverId,
    saveUser
};