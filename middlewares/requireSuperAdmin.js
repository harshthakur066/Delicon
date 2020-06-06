const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/SuperAdmin");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).send({ error: "You must be logged in. 1" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "ADMIN SECRETE KEY", (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be logged in. 2" });
      }
      const { adminId } = payload;
      SuperAdmin.findById(adminId)
        .then((admin) => {
          req.admin = admin;
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ error: "Admin not found!" });
        });
    });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};
