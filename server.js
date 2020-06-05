const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const superAdminRoutes = "./routes/superAdminRoute";

const app = express();

app.use(bodyParser.json());

app.use(superAdminRoutes);

mongoose.connect(
  "mongodb+srv://admin:delicon@reservation-system-cluster-wccqj.mongodb.net/apiv1?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connenting to mongo", err);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(PORT);
});
