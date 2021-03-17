const mongoose = require('mongoose');

const DBConnection = async() =>{
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/airbnb',{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify: false
        })
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (err){
        console.log(`Error in DB Connection ${err.message}`);
        process.exit(1)
    }
}

module.exports = DBConnection;