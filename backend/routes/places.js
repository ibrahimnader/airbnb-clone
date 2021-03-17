const express = require('express');
const router = express.Router();
const { getPlaces, getPlace, createPlace, updatePlace, deletePlace, getUserPlaces, rentPlace, getUnapprovedPlaces, approvePlace, rejectPlace } = require('../controllers/places');
const { protect, authorizeAdmin } = require('../middlewares/auth');

router.use((req, res, next) => {
    console.log('reached pleaces routes');
    next();
})

// get logged in user places for dashboard
router.get('/getuserplace', protect, getUserPlaces);

router.get('/unapproved', protect, authorizeAdmin, getUnapprovedPlaces);
router.get('/:placeId', getPlace);
router.post('/create', protect, createPlace);
router.post('/rent', protect, rentPlace);
router.post('/', getPlaces);
router.put('/approve', protect, authorizeAdmin, approvePlace);
router.put('/reject', protect, authorizeAdmin, rejectPlace);
router.put('/:placeId', protect, updatePlace);
router.delete('/:placeId', protect, deletePlace);

router.use((req, res, next) => {
    console.log('reached pleaces routes 2');
    next();
})


module.exports = router;
