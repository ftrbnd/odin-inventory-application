const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SwitchSchema = new Schema({
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
    type: {
        type: String,
        required: true,
        enum: ['Linear', 'Tactile', 'Clicky'],
        default: 'Linear'
    },
    manufacturer: {
        type: String,
        required: true
    }
});

SwitchSchema.virtual('url').get(function () {
    return `/categories/switches/${this._id}`;
});

module.exports = mongoose.model("Switch", SwitchSchema);