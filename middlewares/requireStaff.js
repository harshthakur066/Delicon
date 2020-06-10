const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "STAFF SECRETE KEY", (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be logged in." });
      }

      const { userId } = payload;
      Staff.findById(userId)
        .then((staff) => {
          req.staff = staff;
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ error: "Staff does not exists!" });
        });
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
