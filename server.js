// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const env = require('dotenv').config();


const app = express();
const db = mongoose.connection;

// env variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// mongoose connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongodb connected'));
db.on('disconnected', () => console.log('mongod disconnected'));

// middleware
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const productController = require('./controllers/product_controller');
const productRouter = require('./controllers/product_controller');
app.use('/products', productController);

// listen
app.listen(PORT, () => {
  console.log(`express listening on port ${PORT}`);

});;
