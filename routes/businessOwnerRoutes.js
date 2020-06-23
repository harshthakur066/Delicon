const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAdmin = require("../middlewares/requireSuperAdmin");
const BusinessCategory = require("../models/BusinessCategory");
const Business = require("../models/Business");
const BusinessOwner = require("../models/BusinessOwner");
const Staff = require("../models/Staff");
const Reservation = require("../models/Reservation");
const Valet = require("../models/Valets");
const WalkIn = require("../models/WalkIn");

const router = express.Router();

// Signup for Business Owner
router.post("/api/v1/businessowner/signup", requireAdmin, async (req, res) => {
  const { name, email, password, category } = req.body;
  try {
    const business = new BusinessOwner({
      name: name,
      email: email,
      password: password,
      category: category,
    });
    await business.save();
    const token = jwt.sign(
      { userId: business._id, userRole: "Owner" },
      "BUSINESS SECRETE KEY"
    );
    try {
      await User.create({
        userId: business._id,
        userRole: "Owner",
        email: email,
      });
      try {
        const currentcatagory = await BusinessCategory.findOne({
          name: category,
        });
        currentcatagory.businessowners.push(business._id);
        await BusinessCategory.findOneAndUpdate(
          { name: category },
          currentcatagory
        );
        res.send({ token });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err.message,
          message: "Error while adding id to Business Categories!",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

// SignIp for Business Owner
router.post("/api/v1/businessowner/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const business = await BusinessOwner.findOne({ email });
  if (!business) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
  try {
    await business.comparePassword(password);
    const token = jwt.sign(
      { userId: business._id, userRole: "Owner" },
      "BUSINESS SECRETE KEY"
    );
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

//Get All Owner details for admin
router.get("/api/v1/businessowner", requireAdmin, async (req, res) => {
  try {
    const owners = await BusinessOwner.find({});
    const ownersdata = owners.map((own) => ({
      businesses: own.businesses,
      reqbusinesses: own.reqbusinesses,
      name: own.name,
      email: own.email,
      category: own.category,
      categoryId: own.categoryId,
      id: own._id,
    }));
    res.send(ownersdata);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

//Get Owner details for admin
router.get("/api/v1/businessowner/:ownerId", requireAdmin, async (req, res) => {
  const { ownerId } = req.params;
  try {
    const own = await BusinessOwner.findById(ownerId);
    const ownerdata = {
      businesses: own.businesses,
      reqbusinesses: own.reqbusinesses,
      name: own.name,
      email: own.email,
      category: own.category,
      categoryId: own.categoryId,
      id: own._id,
    };
    res.send(ownerdata);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

// Update details for admin
router.put("/api/v1/businessowner/:ownerId", requireAdmin, async (req, res) => {
  const { ownerId } = req.params;
  const { name, category, categoryId } = req.body;
  try {
    const update = { name, categoryId, category };
    const owner = await BusinessOwner.findByIdAndUpdate(ownerId, update);
    res.send(owner);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

// Delete owner for admin
router.delete(
  "/api/v1/businessowner/:ownerId",
  requireAdmin,
  async (req, res) => {
    const { ownerId } = req.params;
    try {
      const owner = await BusinessOwner.findByIdAndDelete(ownerId);
      try {
        const currentcategory = await BusinessCategory.findById(
          owner.categoryId
        );
        currentcategory.businessowners = currentcategory.businessowners.filter(
          (id) => id != ownerId
        );
        await BusinessCategory.findByIdAndUpdate(
          owner.categoryId,
          currentcategory
        );
        try {
          await Business.deleteMany({ ownerId: ownerId });
          await Staff.deleteMany({ ownerId: ownerId });
          await Reservation.deleteMany({ ownerId: ownerId });
          await Valet.deleteMany({ ownerId: ownerId });
          await WalkIn.deleteMany({ ownerId: ownerId });
          res.send(owner);
        } catch {
          return res.status(500).json({ error: err.message });
        }
      } catch (err) {}
    } catch (err) {
      return res.status(404).send({ error: err.message });
    }
  }
);

module.exports = router;
