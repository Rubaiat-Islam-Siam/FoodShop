const mongoose = require('mongoose')

const resSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    role: { 
    type: String, 
    enum: ["user", "Admin"], 
    default: "user" 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Food = mongoose.model('food', resSchema)

module.exports = Food;