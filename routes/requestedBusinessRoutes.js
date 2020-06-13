const express = require("express");
const router = express.Router();

const Business = require("../models/Business");
const RequestedBusiness = require("../models/RequestedBusiness");
const BusinessOwner = require("../models/BusinessOwner");

const isBusinessOwner = require("../middlewares/requiredBusinessOwner");
const isSuperAdmin = require("../middlewares/requireSuperAdmin");

// To GET all requested business for Admin  Access to Super Admin
router.get("/api/v1/businesses/request/all", isSuperAdmin, async (req, res) => {
  try {
    const requestedBusiness = await RequestedBusiness.find();
    res.json(requestedBusiness);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

// For Business owner to request new Businesses  Access to Business Owner
router.post("/api/v1/businesses/request", isBusinessOwner, async (req, res) => {
  const { name, owner, address, details } = req.body;
  const ownerId = req.owner._id;
  var dateobj = new Date().toLocaleDateString();
  try {
    const requestBusiness = new RequestedBusiness({
      name: name,
      owner: owner,
      address: address,
      ownerId: ownerId,
      details: details,
      createdAt: dateobj,
      status: "Pending",
    });
    await requestBusiness.save();
    try {
      const currentowner = await BusinessOwner.findById(ownerId);
      currentowner.reqbusinesses.push(requestBusiness._id);
      await BusinessOwner.findByIdAndUpdate(ownerId, currentowner);
      res.json(requestBusiness);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
        message: "Error while adding id to Business Owner!",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To get all owner reqested businesses of Owner Access to Business Owner
router.get("/api/v1/businesses/request", isBusinessOwner, async (req, res) => {
  try {
    const requestedBusiness = await RequestedBusiness.find({
      ownerId: req.owner._id,
    });
    res.json(requestedBusiness);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

//TO delete a single request for owner Access to Business Owner
router.delete(
  "/api/v1/businesses/request/:businessId",
  isBusinessOwner,
  async (req, res) => {
    const businessId = req.params.businessId;
    const ownerId = req.owner._id;
    try {
      const reqbusiness = await RequestedBusiness.findByIdAndDelete(businessId);
      try {
        const currentowner = await BusinessOwner.findById(ownerId);
        currentowner.reqbusinesses = currentowner.reqbusinesses.filter(
          (id) => id != businessId
        );
        await BusinessOwner.findByIdAndUpdate(ownerId, currentowner);
        res.json(reqbusiness);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err.message,
          message: "Error while adding id to Business Owner!",
        });
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

// For Admin to approve new Businesses
router.get(
  "/api/v1/businesses/approve/:businessId",
  isSuperAdmin,
  async (req, res) => {
    try {
      const reqbusiness = await RequestedBusiness.findByIdAndUpdate(
        req.params.businessId,
        { status: "Approved" }
      );
      const newbusiness = new Business({
        name: reqbusiness.name,
        owner: reqbusiness.owner,
        ownerId: reqbusiness.ownerId,
        address: reqbusiness.address,
        details: reqbusiness.details,
        createdAt: reqbusiness.createdAt,
      });
      newbusiness.save();
      try {
        const currentowner = await BusinessOwner.findById(reqbusiness.ownerId);
        currentowner.businesses.push(newbusiness._id);
        await BusinessOwner.findByIdAndUpdate(
          reqbusiness.ownerId,
          currentowner
        );
        res.json(newbusiness);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err.message,
          message: "Error while adding id to Business Owner!",
        });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

//For Admin to reject business
router.get(
  "/api/v1/businesses/reject/:businessId",
  isSuperAdmin,
  async (req, res) => {
    try {
      const bussnessreq = await RequestedBusiness.findByIdAndUpdate(
        req.params.businessId,
        { status: "Rejected" }
      );
      res.json(bussnessreq);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
