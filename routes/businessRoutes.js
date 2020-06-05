const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
// const ownerAdmin = require("../middlewares/ownerAdmin");

router.post("/api/v1/business", async (req, res) => {
  const { name, owner, ownerId, catagoryId, details } = req.body;
  try {
    const business = new Business({
      name: name,
      owner: owner,
      ownerId: ownerId,
      catagoryId: catagoryId,
      details: details,
    });
    await business.save();
    res.send(business);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});
