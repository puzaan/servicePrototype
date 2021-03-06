
const catcAsync = require("express-async-handler");


exports.deleteOne = Model => catcAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new Error('No document found with that ID', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null,
        message: 'File deleted'
    })
})



exports.updateOne = (Model) => catcAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });



    if (!doc) {
        return next(new Error('No document found with this Id', 404));
    }
    res.status(202).json(data)

})


exports.createOne = Model => catcAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
})




exports.listall = Model = catcAsync(async (req, res, next) => {
  try {
    const doc = await Model.find();

    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error("Something went Wrong");
  }
});


exports.getOne = (Model, popOptions) => catcAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
        return next(new Error('No document found with tha ID', 404))
    }
    res.status(200).json(
        {
        status: 'success',
        data: {
            data: doc
        }
        }
    )
})