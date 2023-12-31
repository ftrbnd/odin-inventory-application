const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const KeycapSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Number,
        required: true
    },
    material: {
        type: String,
        required: true,
        enum: ['ABS', 'PBT'],
        default: 'ABS'
    },
    profile: {
        type: String,
        required: true,
    }
});

KeycapSchema.virtual('url').get(function () {
    return `/categories/keycaps/${this._id}`;
});

module.exports = mongoose.model("Keycap", KeycapSchema);