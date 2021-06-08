// dependencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const env = require('dotenv').config();
const Product = require('./models/products')
const seed = require('./models/seed')

const app = express()
const db = mongoose.connection

// env variables
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

// mongoose connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongodb connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

// middleware
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// routes
//get all - index
app.get('/products', (req, res) => {
  Product.find({}, (error, foundProducts) => {
    res.render('index.ejs', {
      products: foundProducts
    });
  });
})
//create
app.post('/products', (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect('/products');
  });
})

// //seed
// app.post('/products/seed', (req, res) => {
//   req.body = seed;
//   Product.create(req.body, (error, createdProduct) => {
//     res.send(createdProduct);
//   });
// })
//delete
app.delete('/products/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (error, deletedProduct) => {
    res.send({ success: true });
  });
})
//update
app.put('/products/:id', (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedProduct) => {
      res.send(updatedProduct);
    }
  )
})
//edit
app.get('/products/:id/edit', (req, res) => {
  res.send('Hi I am you')
})
//new
app.get('/products/new', (req, res) => {
  res.render('new.ejs')
})
//get by id - show
app.get('/products/:id', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('show.ejs', { product: foundProduct });
  });
})

// listen
app.listen(PORT, () => {
  console.log(`express listening on port ${PORT}`)

})
