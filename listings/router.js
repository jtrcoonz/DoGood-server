"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const { Listing } = require("./models");

const router = express.Router();

const jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  Listing.find()
    .then(listings => {
      res.json(listings.map(listing => listing.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.get("/:id", (req, res) => {
  Listing.findById(req.params.id)
    .then(listing => res.json(listing.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});

router.post("/", jsonParser, (req, res) => {
  const requiredFields = [
    "title",
    "description",
    "category",
    "location",
    "applyLink"
  ];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Listing.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    applyLink: req.body.applyLink
  })
    .then(listing => res.status(201).json(listing.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.delete("/:id", (req, res) => {
  Listing.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.put("/:id", jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updateableFields = [
    "title",
    "description",
    "category",
    "location",
    "applyLink"
  ];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Listing.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

module.exports = { router };
