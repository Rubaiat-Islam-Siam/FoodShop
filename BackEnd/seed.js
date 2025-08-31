const mongoose = require ('mongoose');
const fs = require ('fs');
const Food = require('./Models/Res');
const mongoDb = require('./connection');

mongoDb();

const data = JSON.parse(fs.readFileSync('food.json','utf-8'));

Food.insertMany(data)
.then(()=> {
    console.log('Food inserted Successfully')
    mongoose.connection.close();
}).catch((err) => console.log(err))