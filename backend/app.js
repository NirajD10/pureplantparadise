const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shopRoute = require("./routes/shop");
const authRoute = require("./routes/auth");
const AdminshopRoute = require("./routes/admin");


app.use("/", shopRoute);
app.use("/auth", authRoute);
app.use("/admin", AdminshopRoute);

/* Express Error handling middleware */
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const data = error.data;
  res.status(statusCode).json({
    message: error.message,
    status: statusCode,
    data: data,
  });
});

/* Mongodb options */
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000, // 5 minutes
  socketTimeoutMS: 45000, // 45 seconds timeout for inactivity
  serverSelectionTimeoutMS: 5000, // 5 seconds server selection timeout
  maxIdleTimeMS: 300000, // 5 minutes max idle time
};

mongoose
  .connect(process.env.MONGODB_SERVER_KEY, options)
  .then((result) => {
    console.log("mongodb connected");
    app.listen(3000, () => {
      console.log("Backend Server started");
    });
  })
  .catch((err) => console.log(err));
