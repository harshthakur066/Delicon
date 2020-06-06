const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const SuperAdminSchema = mongoose.model("SuperAdmin");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "ADMIN SECRETE KEY", async (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be logged in." });
      }

      const { adminId } = payload;
      const admin = await SuperAdminSchema.findById(adminId);
      req.admin = admin;
      next();
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
