// const express = require("express");
// const router = express.Router();
// const isAuth = require("../middleware/isAuth");
// const isAdmin = require("../middleware/isAdmin");

// // Only admin can see this
// router.get("/", isAuth, isAdmin, (req, res) => {
//   res.json({ message: "Welcome Admin to Products" });
// });

// // Example: Add product (admin only)
// router.post("/", isAuth, isAdmin, (req, res) => {
//   // your product creation logic
//   res.json({ message: "Product added by admin" });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const Product = require("../model/Product");

router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const { name, description, price, tags, images, categories } = req.body;

    console.log("Request body:", req.body);
    console.log("User ID:", req.user._id);

    const product = new Product({
      title: name, // map name → title
      description,
      price,
      image: images[0], // first image in array
      categories: categories || "general", // default category
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

module.exports = router;
