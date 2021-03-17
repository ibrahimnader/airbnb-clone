const mongoose = require('mongoose');

const PaymentOrderSchema = mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    checkInDate:{
        type: Date,
        required: true
    },
    checkOutDate:{
        type: Date,
        required: true
    },
    guests:{
        type: Number,
        required: true,
        default:1
    },
    billingAddress:{
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    stayFees:{
        type: Number,
        required: true,
        default: 0.0,
    },
    serviceFees:{
        type: Number,
        required: true,
        default: 0.0,
    },
    cleaningFees:{
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult:{
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    paymentDone : {
        type: Boolean,
        required: true,
        default: false
    },
    paymentDoneAt: {
        type: Date
    }
},{
    timestamps: true
})

const PaymentOrder = mongoose.model('PaymentOrder', PaymentOrderSchema);

export default PaymentOrder;