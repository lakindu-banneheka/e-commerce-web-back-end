const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
//routes
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cardRoutes = require('./routes/cart');
const path = require('path');


// environment variable ( or const) 
env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.arm8t.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    ).then(()=> {
        console.log('DataBase Connected')
    })
    ;
    // console.log(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.arm8t.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)


app.use(express.json());
app.use('/public', express.static(path.join(__dirname , 'uploads')));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cardRoutes);


app.listen(process.env.PORT, () => {
    console.log(`server is running in on port ${process.env.PORT}`)
});