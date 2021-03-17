import mongoose from 'mongoose'
import dotenv from 'dotenv'
import places from './data/places.js'
import users from './data/users.js'
import Place from './models/Place.js'
import User from './models/User.js'
import DBConnection from './config/db.js'

dotenv.config();
DBConnection();

const importData = async()=>{
    try{
        await Place.deleteMany();
        await User.deleteMany();

        const newPlace = await Place.insertMany(places);
        const newUsers = await User.insertMany(users)
        console.log('Data Imported!');
        process.exit();
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

const destroyData = async()=>{
    try{
        await Place.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch(err){
        console.log(err);
        process.exit(1);
    }

}

process.argv[2] === '-d' ? destroyData() : importData();