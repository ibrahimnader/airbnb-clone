const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'please specify owner'],
        ref: 'User'
    },
    reserverations: [{startDate: Date, endDate: Date}],
    approved: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: [true, 'title is required'],
        minlength: [5, 'title min length is 5 characters'],
        maxlength: [100, 'title max length is 100 characters']
    },
    description: {
        type: String,
        required: [true, 'please add description'],
        minlength: [5, 'description min length is 5 characters'],
        maxlength: [500, 'description max length is 500 characters']
    },
    address: {
        type: String,
        required: [true, 'please add address'],
        minlength: [5, 'address min length is 5 characters'],
        maxlength: [100, 'address max length is 100 characters']
    },
    price: {
        type: Number,
        min: [1, 'minimum price is 1$'],
        max: [1000000, 'maximum price is 1000000'],
        required: [true, 'please add price']
    },
    propertyType: {
        type: String,
        required: [true, 'please add property type'],
        enum: ['apartment', 'house', 'room']
    },
    guests: {
        type: Number,
        required: [true, 'please add max number of guests'],
        min: [1, 'minimum guests number is 1'],
        max: [100, 'maximum guests number is 100']
    },
    bedrooms: {
        type: Number,
        required: [true, 'please add bedrooms number '],
        min: [1, 'minimum bedrooms number is 1'],
        max: [100, 'maximum bedrooms number is 100']
    },
    beds: {
        type: Number,
        required: [true, 'please add beds number '],
        min: [1, 'minimum beds number is 1'],
        max: [100, 'maximum beds number is 100']
    },
    bathrooms: {
        type: Number,
        required: [true, 'please add bathrooms number '],
        min: [1, 'minimum bathrooms number is 1'],
        max: [100, 'maximum bathrooms number is 100']
    },
    location: {
        country: {
            required: [true, 'please add country'],
            type: String, required: true, minlength: 3,
            maxlength: 50
        },
        city: { required: [true, 'please add city'], type: String, required: true, minlength: 3, maxlength: 50 },
        street: { required: [true, 'please add street'], type: String, required: true, minlength: 3, maxlength: 50 }
    },
    aminities: {
        wifi: { type: Boolean, default: false },
        tv: { type: Boolean, default: false },
        iron: { type: Boolean, default: false },
        heat: { type: Boolean, default: false },
        shampoo: { type: Boolean, default: false },
        ac: { type: Boolean, default: false },
        fireplace: { type: Boolean, default: false }
    },
    images: [String]
}, {
    timestamps: true
})

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
