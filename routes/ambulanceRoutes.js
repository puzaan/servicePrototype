const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/filehelper");

const { addAmbulances,
    listAmbulance,
    updateAmbulance,
    AmbulanceById,
    AmbulanceDelete
} = require('../controller/ambulanceController')

router.post("/", upload.single("photo"), addAmbulances);
router.get("/list", listAmbulance);
router.get("/:id", AmbulanceById);
router.delete("/:id", AmbulanceDelete);
router.patch("/:id", upload.single("photo"), updateAmbulance);
module.exports = {
  routers: router,
};