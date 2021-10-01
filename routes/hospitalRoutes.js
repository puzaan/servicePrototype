const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/filehelper");
const {
  addHospitals,
  listHospital,
  hospitalById,
  HospitalDelete,
  updateHospital,
} = require("../controller/hospitalController");

router.post("/", upload.single("photo"), addHospitals);
router.get('/list', listHospital)
router.get("/:id", hospitalById)
router.delete("/:id", HospitalDelete);
router.patch("/:id", upload.single("photo"), updateHospital);
module.exports = {
  routers: router,
};
