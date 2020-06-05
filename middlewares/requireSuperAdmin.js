// module.exports = (req,res,next) => {
//   next();
// }

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const SuperAdminSchema = mongoose.model("SuperAdmin");

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

    const { adminId } = payload;
    const admin = await SuperAdminSchema.findById(adminId);
    req.admin = admin;
    next();
  });
};
