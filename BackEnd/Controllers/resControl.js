const Food = require("../Models/Res")

const getFood = async (req,res) => {
    try{
        const foods = await Food.find()
        res.json(foods)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food not Found' });
        res.json(food);
    } catch (err) {
        console.log("Error occur getFood by ID", err);
        res.status(500).json({ message: err.message });
    }
}

const createFood = async (req, res) => {
    try {
        const newFood = new Food(req.body);
        await newFood.save();
        res.status(201).json(newFood);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const createManyFood = async (req, res) => {
    try {
        const foods = await Food.insertMany(req.body);
        res.status(201).json(foods);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getFood,
    getFoodById,
    createFood,
    createManyFood
}