require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoDb = require('./connection');
const route = require('./Routes/foodRoute');
const app = express();

app.use(cors());
app.use(express.json());

mongoDb();

app.use('/foods', route);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}, http://localhost:${PORT}`);
});