const asyncHandler = require('express-async-handler');
//model
const PaymentOrder  = require('../models/PaymentOrder.js');
// error response
const ErrorResponse = require('../utils/errorResponse');


//@desc create new payment order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async(req,res)=>{
    const {
        checkInDate,
        checkOutDate,
        guests,
        billingAddress,
        stayFees,
        serviceFees,
        cleaningFees,
        totalPrice,
        paymentMethod
    } = req.body;

    if(!checkInDate || !checkOutDate){
        throw new ErrorResponse('No reservation handeled!', 400);
        return
    } else {
        const newOrder = new PaymentOrder({
            user: req.user.id,
            checkInDate,
            checkOutDate,
            guests,
            billingAddress,
            stayFees,
            serviceFees,
            cleaningFees,
            totalPrice,
            paymentMethod
        })

        const createdOrder = await newOrder.save();
        res.status(201).json(createdOrder);
    }
})



// @desc    Get an order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderByID = asyncHandler(async(req,res,next)=>{
    const order = await (await PaymentOrder.findById(req.params.id)).populated('user', 'name email');

    if(order){
        res.json(order)
    } else {
        throw new ErrorResponse('Payment Order is Not Found!', 404)
    }
})



// @desc    Update an order to be paid
// @route   PUT /api/orders/:id
// @access  Private
const proceedToPayment = asyncHandler(async(req,res,next)=>{
    const order = await PaymentOrder.findById(req.params.id).populate('user', 'name email');

    if(order){
        order.paymentDone = true;
        order.paymentDoneAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const paidOrder = await order.save()
    } else {
        throw new ErrorResponse('Payment Order is Not Found!', 404)
    }
})



// @desc    Get User's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler((req,res,next)=>{
    const orders = await PaymentOrder.find({user: req.user._id})
    res.json(orders)
})



// @desc    Get all orders
// @route   GET /api/orders/allorders
// @access  Private/Admin
const getAllOrders = asyncHandler((req,res,next)=>{
    const orders = await PaymentOrder.find({}).populate('user','id name')
    res.json(orders)
})





module.exports = {
    createOrder,
    getOrderByID,
    proceedToPayment,
    getMyOrders,
    getAllOrders
}