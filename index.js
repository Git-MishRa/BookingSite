import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js";
import usersRoute from "./api/routes/users.js";
import roomsRoute from "./api/routes/rooms.js";
import hotelsRoute from "./api/routes/hotels.js";
const app = express();

//
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("DB connection error");
    throw e;
  }
};

connect();

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("connected");
});

//middlewares
app.use(express.json());

app.use("api/auth", authRoute);
app.use("api/users", usersRoute);
app.use("api/hotels", hotelsRoute);
app.use("api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res
    .status(errorStatus)
    .json({ success: false, status: errorStatus, message: errorMessage,stack:err.stack });
});

// know api
app.get("/", (req, res) => {
  res.send("Hello First Req");
});
app.listen(8800, () => {
  console.log("connected to backend!");
});
