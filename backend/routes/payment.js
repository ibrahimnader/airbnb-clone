const express = require('express');
const router = express.Router();
const { createOrder, getOrderByID, proceedToPayment, getMyOrders, getAllOrders } = require('../controllers/payment');
const { protect } = require('../middlewares/auth');

router.route('/api/orders').post(protect, createOrder);
router.route('/api/orders/:id').get(protect, getOrderByID).put(protect, proceedToPayment);
router.route('/api/orders/myorders').get(protect, getMyOrders);
router.route('/api/orders/allorders').get(protect, getAllOrders);




module.exports = router;