const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const superAdminRoutes = require("./routes/superAdminRoutes");
const businessOwnerRoutes = require("./routes/businessOwnerRoutes");
const staffRoutes = require("./routes/staffRoutes");
const businessCategoryRoutes = require("./routes/businessCategoryRoutes");
const businessRoutes = require("./routes/businessRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const indexRoutes = require("./routes/indexRoutes");
const requestedBusinessRoutes = require("./routes/requestedBusinessRoutes");
const reservationAnalyticsRoutes = require("./routes/reservationAnalyticsRoutes");

const app = express();

//CORS
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors());

app.use(bodyParser.json());

// Auth Routes
app.use(superAdminRoutes);
app.use(businessOwnerRoutes);
app.use(staffRoutes);
app.use(indexRoutes);

// Features Routes
app.use(requestedBusinessRoutes);
app.use(businessRoutes);
app.use(businessCategoryRoutes);
app.use(reservationRoutes);

//AnalyticRoutes
app.use(reservationAnalyticsRoutes);

// Mongoose Connection
mongoose.connect(
  "mongodb+srv://admin:delicon@reservation-system-cluster-wccqj.mongodb.net/apiv1?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connenting to mongo", err);
});

// For Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(PORT);
});
