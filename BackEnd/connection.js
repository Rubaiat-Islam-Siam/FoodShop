const mongoose = require ('mongoose')

const mongoDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/food-shop')
        console.log('MongoDb is connected ');
    }catch(err){
        console.log("Database Error ",err)
    }
}

module.exports = mongoDb ;