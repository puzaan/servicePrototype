const catchAsync = require("express-async-handler");
const Blood = require("../module/BloodDetail");
const { unlink } = require("fs");
const factory = require("./handlerController");

const addBloods = catchAsync(async (req, res, next) => {
  try {
    const createBlood = new Blood({
      name: req.body.name,
      contact: req.body.contact,
      lat: req.body.lat,
      log: req.body.log,
    });
    if (req.file) {
      createBlood.photo = req.file.path;
    }
    // else {
    //   res.status(400);
    //   throw new Error("photo file required");
    // }
    await createBlood.save();
    res.status(201).send(createBlood);
  } catch (error) {
    res.status(500);
    return res.send({
      error: error.message ? error.message : "Internal server error",
    });
  }
});

const listBlood = catchAsync(async (req, res, next) => {
  try {
    const doc = await Blood.find();

    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error("Something went Wrong");
  }
});

const BloodById = catchAsync(async (req, res, next) => {
  try {
    const doc = await Blood.findById(req.params.id);
    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error("Detail not found");
  }
});

const updateBlood = catchAsync(async (req, res, next) => {
  const Doc = await Blood.findById(req.params.id);

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
      Doc.photo = req.file.path;
    } else {
      Doc.name = req.body.name || Doc.name;
      Doc.contact = req.body.contact || Doc.contact;
      Doc.lat = req.body.lat || Doc.lat;
      Doc.log = req.body.log || Doc.log;
    }
    updatedDoc = await Doc.save();
    res.json(updatedDoc);
  } else {
    res.status(404);
    throw new Error("Doc details not found");
  }
});

const BloodDelete = catchAsync(async (req, res, next) => {
  const doc = await Blood.findById(req.params.id);

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

//const listBlood = factory.listall(Blood);

module.exports = {
  listBlood,
  addBloods,
  BloodById,
  BloodDelete,
  updateBlood,
};
