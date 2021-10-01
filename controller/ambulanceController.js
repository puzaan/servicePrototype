const catchAsync = require("express-async-handler");
const Ambulance = require("../module/AmbulanceDetail");
const { unlink } = require("fs");
const factory = require("./handlerController");

const addAmbulances = catchAsync(async (req, res, next) => {
  try {
    const createAmbulance = new Ambulance({
      name: req.body.name,
      contact: req.body.contact,
      lat: req.body.lat,
      log: req.body.log,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice,
    });
    if (req.file) {
      createAmbulance.photo = req.file.path;
    }
    // else {
    //   res.status(400);
    //   throw new Error("photo file required");
    // }
    await createAmbulance.save();
    res.status(201).send(createAmbulance);
  } catch (error) {
    res.status(500);
    return res.send({
      error: error.message ? error.message : "Internal server error",
    });
  }
});

const listAmbulance = catchAsync(async (req, res, next) => {
  try {
    const doc = await Ambulance.find();

    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error("Something went Wrong");
  }
});

const AmbulanceById = catchAsync(async (req, res, next) => {
  try {
    const doc = await Ambulance.findById(req.params.id);

    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error("Something went Wrong");
  }
});

const updateAmbulance = catchAsync(async (req, res, next) => {
  const Doc = await Ambulance.findById(req.params.id);

  if (Doc) {
    if (req.file) {
      const datas = Doc.photo;
      // console.log(datas)
      unlink(datas, (err) => {
        if (err) throw err;
        console.log(`${datas} is deleted`);
      });
      Doc.name = req.body.name || Doc.name;
      Doc.contact = req.body.contact || Doc.contact;
      Doc.lat = req.body.lat || Doc.lat;
        Doc.log = req.body.log || Doc.log;
        Doc.minPrice = req.body.minPrice || Doc.minPrice;
                Doc.maxPrice = req.body.maxPrice || Doc.maxPrice;

      Doc.photo = req.file.path;
    } else {
      Doc.name = req.body.name || Doc.name;
      Doc.contact = req.body.contact || Doc.contact;
      Doc.lat = req.body.lat || Doc.lat;
        Doc.log = req.body.log || Doc.log;
        Doc.minPrice = req.body.minPrice || Doc.minPrice;
        Doc.maxPrice = req.body.maxPrice || Doc.maxPrice;

    }
    updatedDoc = await Doc.save();
    res.json(updatedDoc);
  } else {
    res.status(404);
    throw new Error("Doc details not found");
  }
});

const AmbulanceDelete = catchAsync(async (req, res, next) => {
  const doc = await Ambulance.findById(req.params.id);

  if (doc) {
    const datas = doc.photo;
    // console.log(datas)
    unlink(datas, (err) => {
      if (err) throw err;
      console.log(`${datas} is deleted`);
    });

    await doc.remove();
    res.json({
      message: "File Deleted",
    });
  } else {
    res.status(404);
    throw new Error("id not found");
  }
});

//const listAmbulance = factory.listall(Ambulance);

module.exports = {
  listAmbulance,
  addAmbulances,
  AmbulanceById,
  AmbulanceDelete,
  updateAmbulance,
};
