const jwt = require("jsonwebtoken");
const BusinessOwner = require("../models/BusinessOwner");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "BUSINESS SECRETE KEY", (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be logged in." });
      }

      const { userId } = payload;
      BusinessOwner.findById(userId)
        .then((owner) => {
          req.owner = owner;
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ error: "Owner not found!" });
        });
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
