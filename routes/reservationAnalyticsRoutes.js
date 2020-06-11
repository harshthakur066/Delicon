const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const requireBusinessOwner = require("../middlewares/requiredBusinessOwner");

export default router;
