const mongodb = require("../db/connect");

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


module.exports = {

    getAll,
    createCwag
    
}