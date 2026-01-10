const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

router.post("/", upload.array("images", 5), (req, res) => {
  try {
    console.log("Files received:", req.files.length);
    req.files.forEach((file, i) => {
      console.log(i, file.path); // Cloudinary URLs
    });

    const imageUrls = req.files.map((file) => file.path);

    res.json({ imageUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
