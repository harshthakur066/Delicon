const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const ownerAdmin = require('../middlewares/ownerAdmin');

// For Business owner And Admin to POST new Businesses 
router.post('/api/v1/:ownerId/businesses', ownerAdmin, async (req,res) => {        
  const { name, owner, catagory, catagoryId, details } = req.body;
  const ownerId = req.params.ownerId;
  var dateobj = new Date().toISOString(); 
  try {
    const business = new Business({ name: name, owner: owner, ownerId: ownerId, catagory: catagory, catagoryId: catagoryId, details: details, createdAt: dateobj });
    await business.save();
    res.json(business);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//For BusinessOwner and Admin to Show his businesses
router.get('/api/v1/:ownerId/businesses', ownerAdmin, async (req,res) => {
  const ownerId = req.params.ownerId;
  try {
    const businesses = await Business.find({ ownerId: ownerId });
    res.json(businesses);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

//For businessOwner and Admin to SHOW a perticular Business
router.get('/api/v1/:ownerId/businesses/:businessId', ownerAdmin, async (req,res) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findById(businessId);
    res.json(business);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

//For businessOwner and Admin to EDIT a perticular Business
router.put('/api/v1/:ownerId/businesses/:businessId', ownerAdmin, async (req,res) => {        
  const { name, details } = req.body;
  const { businessId } = req.params;
  try {
    const update = { name: name, details: details };
    const business = await Business.findByIdAndUpdate(businessId, update);
    res.json(business);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//For businessOwner and Admin to DELETE a perticular Business
router.delete('/api/v1/:ownerId/businesses/:businessId', ownerAdmin, async (req,res) => {
  const { businessId } = req.params;
  try {
    const business = await Business.findByIdAndDelete(businessId);
    res.json(business);
  } catch {
    return res.status(500).json({ error: err.message });
  }
})

module.exports = router;
