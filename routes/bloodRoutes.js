const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/filehelper");
const {
    addBloods,
    listBlood,
    BloodById,
    BloodDelete,updateBlood
} = require("../controller/bloodController");

router.post("/", upload.single("photo"), addBloods);
router.get("/list", listBlood);
router.get("/:id", BloodById);
router.delete("/:id", BloodDelete);
router.patch("/:id", upload.single("photo"), updateBlood);
module.exports = {
  routers: router,
};
