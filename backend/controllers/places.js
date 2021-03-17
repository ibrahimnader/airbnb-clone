const path = require("path");

// model
const Place = require("../models/Place");

// middleware
const asyncHandler = require("../middlewares/async");

// error response
const ErrorResponse = require("../utils/errorResponse");

const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid");

// @desc All places
// @route GET api/v1/places
// access-> public
const getPlaces = asyncHandler(async (req, res, next) => {
    const { city, startDate, endDate, guests, beds, bedrooms, bathrooms, minPrice, maxPrice } = req.body;
    console.log(123, startDate, endDate, guests, city);
    let places;
    console.log(9898, startDate, endDate);
    console.log(req.user);
    if (startDate && endDate && guests && city) {
        places = await Place.find({
            approved: true,
            $nor: [
                { "reserverations.startDate": { $lte: new Date(startDate) }, "reserverations.endDate": { $gte: new Date(startDate) } },
                { "reserverations.startDate": { $lte: new Date(endDate) }, "reserverations.endDate": { $gte: new Date(endDate) } },
                { "reserverations.startDate": { $gte: new Date(startDate) }, "reserverations.endDate": { $lte: new Date(endDate) } },
                { "reserverations.startDate": { $lte: new Date(startDate) }, "reserverations.endDate": { $gte: new Date(endDate) } },
            ],
            "location.city": city,
            guests: { $gte: guests || 1 },
            beds: { $gte: beds || 1 },
            bedrooms: { $gte: bedrooms || 1 },
            bathrooms: { $gte: bathrooms || 1 },
            price: { $gte: minPrice || 1 },
            $and: [{ price: { $gt: minPrice || 0 } }, { price: { $lt: maxPrice || 100000 } }],
        });
        res.status(200).send({
            success: true,
            data: places,
        });
    } else {
        res.status(400).send({
            success: false,
            message: 'please add search search params'
        });
    }

});

// @desc get single place
// @route GET api/v1/places/:placeId
// access-> public
const getPlace = asyncHandler(async (req, res, next) => {
    const placeId = req.params.placeId;
    const place = await Place.findOne({
        _id: placeId,
        approved: true
    }).populate('owner');
    if (!place) {
        return next(new ErrorResponse("Resource Not Found", 404));
    }
    res.status(200).json({
        success: true,
        data: place,
    });
});

// @desc get logged in user places
// @route GET api/v1/places/getuserplace
// access-> public
const getUserPlaces = asyncHandler(async (req, res, next) => {
    console.log("11111111");
    const userId = req.user.id;
    const places = await Place.find({ owner: userId });
    console.log(places);
    res.status(200).json({
        success: true,
        data: places,
    });
});

// @desc create place, user must be logged in
// @route POST api/v1/places
// access-> private
const createPlace = asyncHandler(async (req, res, next) => {
    delete req.body._id;
    delete req.body.approved;
    delete req.body.images;
    req.body.owner = req.user.id;

    // images validation
    // check if there are files uploaded
    if (!req.files) {
        return next(new ErrorResponse("please upload valid 5 photos", 400));
    }

    const { file1, file2, file3, file4, file5 } = req.files;

    // check for existance of 5 files
    if (!file1 || !file2 || !file3 || !file4 || !file5) {
        return next(new ErrorResponse("please upload valid 5 photos", 400));
    }

    const files = [file1, file2, file3, file4, file5];
    const images = [];

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        // validate image type
        if (!file.mimetype.startsWith("image")) {
            return next(new ErrorResponse("please upload valid 5 photos", 400));
        }

        // Check filesize
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(new ErrorResponse(`Please upload photo less than ${process.env.MAX_FILE_UPLOAD}`, 400));
        }

        // Create custom filename
        file.name = `photo_${i}_${Date.now()}${path.parse(file.name).ext}`;
        images.push(file.name);
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
            if (err) {
                console.error("problem with file upload", err);
                return next(new ErrorResponse(`Problem with file upload`, 500));
            }
        });
    }

    req.body.images = images;
    req.body.location = JSON.parse(req.body.location);
    req.body.aminities = JSON.parse(req.body.aminities);
    let newPlace = new Place(req.body);
    newPlace = await newPlace.save();
    res.status(201).json({
        success: true,
        data: newPlace,
    });
});

// @desc update place, user must be logged in
// @route PUT api/v1/places/:placeId
// access-> private
const updatePlace = asyncHandler(async (req, res, next) => {
    delete req.body._id;
    delete req.body.approved;
    delete req.body.owner;

    const placeId = req.params.placeId;
    let place = await Place.findById(placeId);
    if (!place) {
        return next(new ErrorResponse("Resource Not Found", 404));
    }

    if (place.owner.toString() !== req.user.id && !req.user.isAdmin) {
        return next(new ErrorResponse("Not Authorized", 401));
    }

    if (req.files) {
        const { file1, file2, file3, file4, file5 } = req.files;

        // check for existance of 5 files
        if (!file1 || !file2 || !file3 || !file4 || !file5) {
            return next(new ErrorResponse("please upload valid 5 photos", 400));
        }

        const files = [file1, file2, file3, file4, file5];
        const images = [];

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            // validate image type
            if (!file.mimetype.startsWith("image")) {
                return next(new ErrorResponse("please upload valid 5 photos", 400));
            }

            // Check filesize
            if (file.size > process.env.MAX_FILE_UPLOAD) {
                return next(new ErrorResponse(`Please upload photo less than ${process.env.MAX_FILE_UPLOAD}`, 400));
            }

            // Create custom filename
            file.name = `photo_${i}_${Date.now()}${path.parse(file.name).ext}`;
            images.push(file.name);
            file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
                if (err) {
                    console.error("problem with file upload", err);
                    return next(new ErrorResponse(`Problem with file upload`, 500));
                }
            });
        }
        req.body.images = images;
    }

    req.body.location = JSON.parse(req.body.location);
    req.body.aminities = JSON.parse(req.body.aminities);


    place = await Place.findByIdAndUpdate(placeId, req.body, {
        runValidators: true,
        new: true,
    });
    res.status(200).json({
        success: true,
        data: place,
    });
});

// @desc delete place, only admin or owner can delete place
// @route Delete api/v1/places/:placeId
// @access private
const deletePlace = asyncHandler(async (req, res, next) => {
    let placeId = req.params.placeId;
    let place = await Place.findById(placeId);
    if (!place) {
        return next(new ErrorResponse("Resource not found", 404));
    }

    if (place.owner.toString() !== req.user.id && !req.user.isAdmin) {
        return next(new ErrorResponse("Not Authorized", 401));
    }
    await place.remove();
    res.status(200).json({
        success: true,
    });
});

// @desc rent place, any user can rent place
// @route POST api/v1/places/rent
// @access private
const rentPlace = asyncHandler(async (req, res, next) => {
    console.log("reacged retn plac")
    const { paymentToken, rentDetails } = req.body;
    const { _id, startDate, endDate } = rentDetails;
    console.log(new Date(startDate), new Date(endDate));
    const place = await Place.findOne({
        _id,
        $nor: [
            { "reserverations.startDate": { $lte: new Date(startDate) }, "reserverations.endDate": { $gte: new Date(startDate) } },
            { "reserverations.startDate": { $lte: new Date(endDate) }, "reserverations.endDate": { $gte: new Date(endDate) } },
            { "reserverations.startDate": { $gte: new Date(startDate) }, "reserverations.endDate": { $lte: new Date(endDate) } },
            { "reserverations.startDate": { $lte: new Date(startDate) }, "reserverations.endDate": { $gte: new Date(endDate) } },
        ]
    })
    if (!place) {
        console.log('place not found');
        return res.status(400).json({
            success: false,
            message: 'failed to rent place at specific time'
        })
    }
    console.log(123, place);
    const ms = new Date(endDate).getTime() - new Date(startDate).getTime();
    const days = ms / (24 * 60 * 60 * 1000);
    const amount = days * place.price * 100
    console.log("amount", typeof amount, amount);
    const idempotencyKey = uuid.v4();
    stripe.charges.create({
        amount,
        currency: "usd",
        description: `renting ${place.title}`,
        source: paymentToken.id
    }, {
        idempotencyKey
    }, function (err, charge) {
        if (err) {
            console.log("failed");
            console.log(err);
            return res.status(400).json({
                success: false,
                message: 'something went wrong'
            })
        } else {
            console.log("success")
            place.reserverations.push({
                startDate,
                endDate
            })
            place.save(() => {
                return res.status(200).json({
                    success: true,
                    message: 'rented successfully'
                });
            });
        }
    });
});


// @desc get unapproved places, only admins can get these places
// @route GET api/v1/places/unapproved
// @access private
const getUnapprovedPlaces = asyncHandler(async (req, res, next) => {
    const places = await Place.find({ approved: false, rejected:{$ne: true} })
    res.status(200).json({
        success: true,
        count: places.length,
        data: places
    })
});


// @desc approve place, only admins approve places
// @route PUT api/v1/places/approve
// @access private
const approvePlace = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const place = await Place.findOne({ approved: false, _id: req.body._id })
    place.approved = true;
    await place.save();
    res.status(200).json({
        success: true
    })
});


// @desc reject place, only admins reject places
// @route PUT api/v1/places/reject
// @access private
const rejectPlace = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const place = await Place.findOne({ approved: false, _id: req.body._id })
    place.rejected = true;
    await place.save();
    res.status(200).json({
        success: true
    })
});


module.exports = {
    rentPlace,
    getPlace,
    getPlaces,
    createPlace,
    updatePlace,
    deletePlace,
    getUserPlaces,
    getUnapprovedPlaces,
    approvePlace,
    rejectPlace
};
