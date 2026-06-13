require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const propertyRoutes = require('./Routes/property.routes.js');
const reviewRoutes = require('./Routes/review.routes.js');
const userRoutes = require('./Routes/user.routes.js');


const connectDB = require('./Config/db');
connectDB();


//Express middlewares -> 
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/property', propertyRoutes);
app.use('/property/:id/review', reviewRoutes);
app.use('/user', userRoutes);


//basic error handling.
app.use((err, req, res, next) => {
    if (err.name === "CastError") {
        return res.status(404).json({ message: `Page Not found` });
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(e => e.message);
        return res.status(406).json({ message: message });
    }
    const { status = 500, message = 'something went wrong' } = err;
    return res.status(status).json({ message: message });
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
