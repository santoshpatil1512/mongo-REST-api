
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const createError = require('http-errors')

const app = express();

// Use CORS middleware
app.use(cors({ origin: 'http://localhost:3001/products' }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/RESTapi')
.then(()=>{console.log("MongoDB Connected....");})


const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);


// 404 handler and pass to error handler 
app.use((req, res, next)=>{
    next(createError(404, 'Not found'))
});

// Error Handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`server is running at port ${PORT}`);})