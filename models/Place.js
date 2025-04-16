import mongoose from 'mongoose';

const placeLocationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const placeLocationInfoSchema = new mongoose.Schema({
    postCode: {
        type: String,
        required: true
    },
    sido: {
        type: String,
        required: true
    },
    sigungu: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    buildingName: {
        type: String
    }
});

const placeImagesSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    fileName: {
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
        required: true,
        unique: true
    },
    location: {
        type: placeLocationSchema,
        required: true
    },
    locationInfo: {
        type: placeLocationInfoSchema,
        required: true
    },
    images: {
        type: [placeImagesSchema],
        default: []
    },
    description: {
        type: String
    },
    keywords: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    approved: {
        type: Boolean,
        default: false
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

placeSchema.index({ location: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

export default Place;