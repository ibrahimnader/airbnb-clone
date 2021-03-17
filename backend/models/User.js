const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please add first name'],
        minlength: [3, 'firstName minimum length is 3'],
        maxlength: [20, 'firstName maximum length is 20']
    },
    lastName: {
        type: String,
        required: [true, 'please add last name'],
        minlength: [3, 'lastName minimum length is 3'],
        maxlength: [20, 'lastName maximum length is 20']
    },
    email: {
        type: String,
        unique: [true, 'email exists'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
        required: [true, 'please add email'],
        minlength: 3,
        maxlength: 30
    },
    isAdmin: {
        type: Boolean,
        default: false,
        enum: [false]
    },
    password: {
        type: String,
        required: [true, 'please add a password'],
        select: false,
        minlength: [8, 'password minimum length is 8 characters']
    },
    resetPasswordToken: String,
    resetPasswordExpiration: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.plugin(uniqueValidator, { message: 'email exists' });

// encrypy password using bcryptjs
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// generate and hash password token
UserSchema.methods.getResetPasswordToken =  function () {
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash token and set it to resetetToken fields
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set expire
    this.resetPasswordExpiration = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;