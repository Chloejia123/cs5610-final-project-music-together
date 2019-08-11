const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    // favouritesongs: {
    //     type: [String],
    //     required: true
    // },
    favouriteartistsId: [{
        type: String,
        // id: String,
    }],
    favouritesongsId: [{
        type: String,
        // id: String,
    }],
    favouriteartists: [{
        type: String,
        // id: String,
    }],
    favouritesongs: [{
        type: String,
        // id: String,
    }],
    // favouriteartists: {
    //     type: [String],
    //     required: true
    // },
    followers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    soundtrackusername: {
        type: String
    },
    youtube: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);