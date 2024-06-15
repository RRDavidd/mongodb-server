import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

//get items
router.get("/", async(req, res) => {
  let items = db.collection("testCollection");
  let result = await items.find({}).toArray();
  res.send(result).status(200);
})

//get single collection by id
router.get("/:id", async(req, res) => {
  let items = db.collection("testCollection");
  let query = { _id: ObjectId(req.params.id) };
  let result = await items.findOne(query);

  if(result) {
    res.send(result).status(200);
  } else {
    res.send("Not Found").status(404);
  }
})

//create new collection
router.post("/", async(req, res) => {
  try {
    let newItem = {
      name: req.body.name,
      description: req.body.description,
    }
    let items = await db.collection("testCollection");
    let result = await items.insertOne(newItem);
    res.send(result).status(200);
  } catch(e) {
    console.error(e);
    res.send("Error adding a new item").status(500);
  }
})

//update collection
router.patch("/:id", async(req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const update = { $set: {
      name: req.body.name,
      description: req.body.description,
    }};
    let items = db.collection("testCollection");
    let result = await items.updateOne(query, update);
    res.send(result).status(200);
  } catch(e) {
    console.error(e);
    res.send("Error updating item").status(500);
  }
})

//delete collection
router.delete("/:id", async(req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let items = db.collection("testCollection");
    let result = await items.deleteOne(query);
    res.send(result).status(200);
  } catch(e) {
    console.error(e);
    res.send("Error deleting item").status(500);
  }
})

export default router;
