const mongoose = require('mongoose');
const { Schema } = mongoose;


const cardSchema = new Schema({
    name: { type: String, required: true },
    set: { type: String, required: true },
    type: { type: String, required: true },
    lowestPrice: { type: Number, required: true },
    highestPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    rarity: { type: String, required: true },
    sold: { type: Boolean, required: true },
});


module.exports = mongoose.model('Card', cardSchema);

