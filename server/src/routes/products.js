const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// Get all products with advanced filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { 
      type, 
      sortBy, 
      order = 'asc', 
      minTotalCannabinoids, 
      maxTotalCannabinoids,
      minPungency,
      maxPungency,
      search,
      page = 1,
      limit = 10
    } = req.query;
    
    let query = {};
    let sort = {};

    // Filtering
    if (type) {
      query.type = type;
    }
    if (minTotalCannabinoids || maxTotalCannabinoids) {
      query.totalCannabinoids = {};
      if (minTotalCannabinoids) query.totalCannabinoids.$gte = Number(minTotalCannabinoids);
      if (maxTotalCannabinoids) query.totalCannabinoids.$lte = Number(maxTotalCannabinoids);
    }
    if (minPungency || maxPungency) {
      query.pungency = {};
      if (minPungency) query.pungency.$gte = Number(minPungency);
      if (maxPungency) query.pungency.$lte = Number(maxPungency);
    }
    if (search) {
      query.$or = [
        { strainName: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Default sort by creation date, newest first
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort
    };

    const products = await Product.paginate(query, options);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
router.post('/', auth, upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'video', maxCount: 1 },
  { name: 'testReport', maxCount: 1 }
]), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      images: req.files.images ? req.files.images.map(file => file.path) : [],
      video: req.files.video ? req.files.video[0].path : null,
      testReport: req.files.testReport ? req.files.testReport[0].path : null
    };
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', auth, upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'video', maxCount: 1 },
  { name: 'testReport', maxCount: 1 }
]), async (req, res) => {
  try {
    const updates = {
      ...req.body,
      images: req.files.images ? req.files.images.map(file => file.path) : undefined,
      video: req.files.video ? req.files.video[0].path : undefined,
      testReport: req.files.testReport ? req.files.testReport[0].path : undefined
    };
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;