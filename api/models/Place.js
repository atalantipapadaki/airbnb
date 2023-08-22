const mongoose = require('mongoose');

const PlaceSchema = new Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,
    numBedrooms: Number,
    maxBeds: Number,
    numBaths: Number,
    area: Number,
    minDays: Number
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;
