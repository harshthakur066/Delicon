const express = require("express");
const jwt = require("jsonwebtoken");

const Business = require("../models/Business");
const Staff = require("../models/Staff");
const User = require("../models/User");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");
const isStaff = require("../middlewares/requireStaff");

const router = express.Router();

// Signup for Admin access to Business Owner
router.post(
  "/api/v1/business/staff/signup",
  isBusinessOwner,
  async (req, res) => {
    const {
      name,
      email,
      password,
      business,
      businessId,
      mobno,
      address,
      qualification,
      experience,
      position,
      dateOfJoining,
      details,
    } = req.body;
    try {
      const staff = new Staff({
        name,
        email,
        password,
        business,
        businessId,
        mobno,
        address,
        qualification,
        experience,
        position,
        dateOfJoining,
        details,
      });
      await staff.save();
      const token = jwt.sign(
        { userId: staff._id, userRole: "Staff" },
        "STAFF SECRETE KEY"
      );
      try {
        await User.create({
          userId: staff._id,
          userRole: "Staff",
          email: email,
        });
        try {
          const currentbusiness = await Business.findById(businessId);
          currentbusiness.staff.push(staff._id);
          await Business.findByIdAndUpdate(businessId, currentbusiness);
          res.send(staff);
        } catch (err) {
          console.log(err);
          res.status(500).json({
            error: err.message,
            message: "Error while adding id to Business Categories!",
          });
        }
      } catch (err) {
        return res.status(422).send(err.message);
      }
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

//Staff signin
router.post("/api/v1/staff/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const staff = await Staff.findOne({ email });
  if (!staff) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
  try {
    await staff.comparePassword(password);
    const token = jwt.sign(
      { userId: staff._id, userRole: "Staff" },
      "STAFF SECRETE KEY"
    );
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

//Business owner edits Staff Profile Data
router.put(
  "/api/v1/business/staff/profile/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    const {
      mobno,
      address,
      qualification,
      experience,
      position,
      dateOfJoining,
      details,
      business,
      businessId,
    } = req.body;
    data = {
      mobno,
      address,
      qualification,
      experience,
      position,
      dateOfJoining,
      details,
      business,
      businessId,
    };
    try {
      const staff = await Staff.findByIdAndUpdate(id, data);
      res.status(200).json(staff);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ All Staff Profiles by Owner
router.get(
  "/api/v1/business/staff/profile",
  isBusinessOwner,
  async (req, res) => {
    try {
      const staff = await Staff.find({ ownerId: req.owner._id });
      res.status(200).json(staff);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ All Staff Profiles of a particular business by Owner
router.get(
  "/api/v1/business/staff/profile/:businessid",
  isBusinessOwner,
  async (req, res) => {
    const businessid = req.params.businessid;
    try {
      const staff = await Staff.find({ businessId: businessid });
      res.status(200).json(staff);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ Staff Profile access to Business Owner
router.get(
  "/api/v1/business/staff/profile/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const staff = await Staff.findById(id);
      res.status(200).json(staff);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ Staff Profile access to Staff
router.get("/api/v1/staff/profile", isStaff, async (req, res) => {
  const id = req.staff._id;
  try {
    const staff = await Staff.findById(id);
    res.status(200).json(staff);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// SET working false by business owner

router.put(
  "/api/v1/business/staff/profile/working/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    data = {
      working: false,
    };
    try {
      const staff = await Staff.findByIdAndUpdate(id, data);
      res.status(200).json(staff);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To get as per working true by business owner
router.get(
  "/api/v1/staff/profile/working/true/:businessid",
  isBusinessOwner,
  async (req, res) => {
    const businesssId = req.params;
    data = {
      businessId: businesssId,
      working: true,
    };
    try {
      const staff = await Staff.find(data);
      res.status(200).json(staff);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To get as per working false by business owner
router.get(
  "/api/v1/staff/profile/working/false/:businessid",
  isBusinessOwner,
  async (req, res) => {
    const businesssID = req.params;
    data = {
      businessId: businesssId,
      working: false,
    };
    try {
      const staff = await Staff.find(data);
      res.status(200).json(staff);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);
// // DELETE Staff Profile aceess to Business Owner
// router.delete(
//   "/api/v1/business/staff/profile/:id",
//   isBusinessOwner,
//   async (req, res) => {
//     const id = req.params.id;
//     try {
//       const profile = await Staff.findByIdAndDelete(id);
//       try {
//         await User.findOneAndDelete({ email: profile.email });
//         try {
//           const currentbusiness = await Business.findById(businessId);
//           currentbusiness.staff = currentbusiness.staff.filter(
//             (Id) => Id !== staff._id
//           );
//           await Business.findByIdAndUpdate(profile.businessId, currentbusiness);
//           res.status(200).json(profile);
//         } catch (err) {
//           console.log(err);
//           res.status(500).json({
//             error: err.message,
//             message: "Error while adding id to Business Categories!",
//           });
//         }
//       } catch (err) {
//         return res.status(422).send(err.message);
//       }
//     } catch (err) {
//       return res.status(500).json({ error: err.message });
//     }
//   }
// );

module.exports = router;
