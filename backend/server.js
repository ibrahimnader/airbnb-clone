// modules
const express = require("express");
const dotenv = require("dotenv");
const fileupload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

// loggin module
const morgan = require('morgan');

// security modules
const helmet = require('helmet');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const expressMongoSanitize = require('express-mongo-sanitize');

// middlewares
const errorHandler = require('./middlewares/error');

// db connection
const DBConnection = require('./config/db');

// routes
const placeRoutes = require('./routes/places');
const authRoutes = require('./routes/auth');

// initialize app
const app = express();

// get env variables
dotenv.config();

// connect to db
DBConnection();

// use express.json to parse body
app.use(express.json());

// static folder
app.use(express.static(path.join(__dirname, '../public')))

// enable cors
app.use(cors());

// helmet for security headers
app.use(helmet());

// loggin middleware in development only
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// express file upload 
app.use(fileupload());

// sanatize data to prevent noSql injection
app.use(expressMongoSanitize())

// prevent xss attack
app.use(xssClean());

// rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 200
})
app.use(limiter)

// prevent http param pollution
app.use(hpp());

// routes
app.use('/api/v1/places', placeRoutes);
app.use('/api/v1/auth', authRoutes);


// PayPal Config
app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));


// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
})



