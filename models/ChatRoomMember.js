import mongoose from 'mongoose';

const chatRoomMemberSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastReadAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const ChatRoomMember = mongoose.model('ChatRoomMember', chatRoomMemberSchema);

export default ChatRoomMember;