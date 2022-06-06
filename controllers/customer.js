const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const getAll = async (req, res) => {
  try {
    const data = await mongodb.getDb().db().collection("customer").find();
    data.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCustomer = async (req, res) => {
    console.log(req.body);
    try {
      const createCustomer = {
        customerOrderStatus: req.body.customerOrder,
        customerOrderQuantity: req.body.customerOrderQuantity,
        customerAddress: req.body.customerAddress,
        customerEmail: req.body.customerEmail,
        customerOrderDate: req.body.customerOrderDate
        
      };
      console.log(createCustomer);
  
      const response = await mongodb
        .getDb()
        .db()
        .collection("customer")
        .insertOne(createCustomer);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(response.error || "Some error occurred while retriving order.");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateCustomer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must pass a valid ID to update a customer order item item.");
    } else {
      const customerId = new ObjectId(req.params.id);
  
      // be aware of updateOne if you only want to update specific fields
      const customer = {
        customerOrderStatus: req.body.customerOrder,
        customerOrderQuantity: req.body.customerOrderQuantity,
        customerAddress: req.body.customerAddress,
        customerEmail: req.body.customerEmail,
        customerOrderDate: req.body.customerOrderDate
        
      };
  
      const response = await mongodb
        .getDb()
        .db()
        .collection("customer")
        .replaceOne({ _id: customerId }, customer);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res
          .status(500)
          .json(response.error || "Some error occurred while updating customerId.");
      }
    }
  };
  
  const deleteCustomer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must pass a valid ID to delete a customer order status.');
    }
    else{
    const customerId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("customer")
      .deleteOne({ _id: customerId }, true);
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
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };