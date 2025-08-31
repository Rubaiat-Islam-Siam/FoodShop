const mongoose = require ('mongoose')

const mongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDb is connected ');
    }catch(err){
        console.log("Database Error ",err)
    }
}

module.exports = mongoDb ;