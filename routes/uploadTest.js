const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");

router.post("/", upload.single("image"), async (req, res) => {
  console.log("FILE:", req.file);
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    res.json({
      message: "Image uploaded",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
