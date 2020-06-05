const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const BusinessOwnerSchema = mongoose.model("BusinessOwner");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY SECRETE KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { ownerId } = payload;
    const owner = await BusinessOwnerSchema.findById(ownerId);
    req.owner = owner;
    next();
  });
};
