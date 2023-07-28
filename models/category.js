const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { 
        type: String,
        required: true,
        enum: ['Keyboards', 'Keycaps', 'Switches'],
        default: 'Keyboards'
    },
    description: {
        type: String,
        required: true
    }
});

CategorySchema.virtual('url').get(function () {
    return `/category/${this.name}`;
})

module.exports = mongoose.model('Category', CategorySchema);