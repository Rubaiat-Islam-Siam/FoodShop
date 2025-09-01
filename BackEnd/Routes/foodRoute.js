const express = require ('express');
const { getFood, getFoodById, createFood, createManyFood, deleteFood } = require('../Controllers/resControl');
const route = express.Router();

route.get('/',getFood)
route.get('/:id',getFoodById)
route.post('/',createFood);
route.post('/add',createManyFood)
route.delete('/:id', deleteFood)

module.exports = route ;