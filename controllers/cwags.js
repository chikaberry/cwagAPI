const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const getAll = async (req, res) => {
  try {
    const data = await mongodb.getDb().db().collection("clothes").find();
    data.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCwag = async (req, res) => {
  console.log(req.body);
  try {
    const cwag = {
      styleName: req.body.styleName,
      styleImages: req.body.styleImages,
      styleDescription: req.body.styleDescription,
      styleColor: req.body.styleColor,
      modelDescription: req.body.modelDescription,
      stylePrice: req.body.stylePrice,
      styleDetails: req.body.styleDetails,
      quantiy: req.body.quantiy,
    };
    console.log(cwag);

    const response = await mongodb
      .getDb()
      .db()
      .collection("clothes")
      .insertOne(cwag);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating cwag.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCwag = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must pass a valid ID to update a cwag item.");
  } else {
    const cwagId = new ObjectId(req.params.id);

    // be aware of updateOne if you only want to update specific fields
    const cwag = {
      styleName: req.body.styleName,
      styleImages: req.body.styleImages,
      styleDescription: req.body.styleDescription,
      styleColor: req.body.styleColor,
      modelDescription: req.body.modelDescription,
      stylePrice: req.body.stylePrice,
      styleDetails: req.body.styleDetails,
      quantiy: req.body.quantiy,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("clothes")
      .replaceOne({ _id: cwagId }, cwag);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating cwag.");
    }
  }
};

const deleteCwag = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must pass a valid ID to update a cwag item.');
  }
  else{
  const cwagId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("clothes")
    .deleteOne({ _id: cwagId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the info.");
  }
}
};

module.exports = {
  getAll,
  createCwag,
  updateCwag,
  deleteCwag,
};
