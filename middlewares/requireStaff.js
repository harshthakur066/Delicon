const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const StaffSchema = mongoose.model("Staff");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "STAFF SECRETE KEY", async (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be logged in." });
      }

      const { staffId } = payload;
      const staff = await StaffSchema.findById(staffId);
      req.staff = staff;
      next();
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
