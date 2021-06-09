const express = require('express');
const productRouter = express.Router();

const Product = require('../models/products');

// routes
//get all - index
productRouter.get('/', (req, res) => {
  Product.find({}, (error, foundProducts) => {
    res.render('index.ejs', {
      products: foundProducts
    });
  });
});
//new
productRouter.get('/new', (req, res) => {
  res.render('new.ejs');
});
//delete
productRouter.delete('/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (error, deletedProduct) => {
    //res.send({ success: true });
    res.redirect('/products');
  });
});

//seeder
const seed = require('../models/seed');
productRouter.get('/seed', (req, res) => {
  Product.deleteMany({}, (error, allProducts) => { });

  Product.create(seed, (error, data) => {
    res.redirect('/products');
  });
});

//update
productRouter.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedProduct) => {
      res.redirect(`/products/${req.params.id}`);
    }
  );
});
//create
productRouter.post('/', (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect('/products');
  });
});
//edit
productRouter.get('/:id/edit', (req, res) => {
  Product.findById(req.params.id, (error, foundProductToEdit) => {
    res.render('edit.ejs', {
      product: foundProductToEdit
    });
  });
});

//get by id - show
productRouter.get('/:id', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('show.ejs', { product: foundProduct });
  });
});


module.exports = productRouter;