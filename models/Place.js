import mongoose from 'mongoose';

const placeImagesSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    thumbnail: {
        type: Boolean,
        default: false
    }
});

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    images: {
        type: [placeImagesSchema],
        default: []
    },
    approved: {
        type: Boolean,
        default: false
    },
    enabled: {
        type: Boolean,
        default: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);

export default Place;