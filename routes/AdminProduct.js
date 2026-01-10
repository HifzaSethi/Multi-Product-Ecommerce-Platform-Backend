// routes/adminProduct.js
const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const Product = require("../model/Product");

// @route   POST /api/admin/adminProduct
// @desc    Add a new product (Admin only)
router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const { name, description, price, tags, images, categories } = req.body;

    // Validate required fields
    if (!name || !price || !images || images.length === 0) {
      return res.status(400).json({
        message: "Product name, price, and at least one image are required",
      });
    }

    // Create new product
    const product = new Product({
      title: name,
      description,
      price,
      images, // array of Cloudinary URLs
      categories: categories || "general",
      tags,
      createdBy: req.user._id,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// @route   GET /api/products
// @desc    Get all products for users
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 }) // newest first
      .select("_id title price images description categories tags"); // select needed fields

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

module.exports = router;
