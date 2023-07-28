const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const KeyboardSchema = new Schema({
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
    designer: {
        type: String,
        required: true
    },
    layout: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    solderable: {
        type: Boolean,
        required: true
    }
});

KeyboardSchema.virtual('url').get(function () {
    return `/category/keyboards/${this._id}`;
});

module.exports = mongoose.model("Keyboard", KeyboardSchema);