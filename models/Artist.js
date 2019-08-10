const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    external_urls: String,
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    genres: [{
        type: String
    }],
    href: String,
    id: String,
    images: [{
        type: String,
    }],
    name: String,
    popularity: Number,
})

module.exports = Artist = mongoose.model('artist', ArtistSchema);